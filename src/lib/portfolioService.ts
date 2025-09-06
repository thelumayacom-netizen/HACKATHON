import { supabase } from '@/integrations/supabase/client';

export interface PortfolioItem {
  id: string;
  user_id: string;
  stock_symbol: string;
  stock_name: string;
  quantity: number;
  average_price: number;
  current_price: number;
  total_invested: number;
  current_value: number;
  pnl: number;
  pnl_percentage: number;
  created_at: string;
  updated_at: string;
}

export interface Trade {
  id: string;
  user_id: string;
  stock_symbol: string;
  stock_name: string;
  trade_type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_amount: number;
  trade_date: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
}

export interface CreateTradeParams {
  stock_symbol: string;
  stock_name: string;
  trade_type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

export interface PriceUpdate {
  [stock_symbol: string]: number;
}

/**
 * Following the same pattern as transactions file - cast supabase to any
 * to avoid TypeScript errors with generated types
 */
const sb = supabase as any;

export const portfolioService = {
  // Get user's complete portfolio
  async getPortfolio(userId: string) {
    try {
      const resp = await (sb
        .from('portfolio')
        .select('*')
        .eq('user_id', userId)
        .order('current_value', { ascending: false }) as unknown as { data: any[] | null; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Portfolio fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Get portfolio exception:', error);
      return { data: null, error: 'Failed to fetch portfolio' };
    }
  },

  // Get portfolio summary
  async getPortfolioSummary(userId: string) {
    try {
      const resp = await (sb
        .from('portfolio')
        .select('total_invested, current_value, pnl')
        .eq('user_id', userId) as unknown as { data: any[] | null; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Portfolio summary fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      const summary = {
        total_invested: 0,
        current_value: 0,
        total_pnl: 0,
        total_pnl_percentage: 0,
        holdings_count: data?.length || 0
      };

      if (data && data.length > 0) {
        summary.total_invested = data.reduce((sum, item) => sum + Number(item.total_invested), 0);
        summary.current_value = data.reduce((sum, item) => sum + Number(item.current_value), 0);
        summary.total_pnl = data.reduce((sum, item) => sum + Number(item.pnl), 0);
        summary.total_pnl_percentage = summary.total_invested > 0 
          ? (summary.total_pnl / summary.total_invested) * 100 
          : 0;
      }

      return { data: summary, error: null };
    } catch (error) {
      console.error('Get portfolio summary exception:', error);
      return { data: null, error: 'Failed to fetch portfolio summary' };
    }
  },

  // Get specific stock position
  async getStockPosition(userId: string, stockSymbol: string) {
    try {
      const resp = await (sb
        .from('portfolio')
        .select('*')
        .eq('user_id', userId)
        .eq('stock_symbol', stockSymbol)
        .single() as unknown as { data: any; error: any });

      const { data, error } = resp;

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
        console.error('Stock position fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      return { data: data || null, error: null };
    } catch (error) {
      console.error('Get stock position exception:', error);
      return { data: null, error: 'Failed to fetch stock position' };
    }
  },

  // Execute a trade
  async executeTrade(userId: string, tradeParams: CreateTradeParams) {
    try {
      const { stock_symbol, stock_name, trade_type, quantity, price } = tradeParams;
      const total_amount = quantity * price;

      // For SELL orders, check if user has enough shares
      if (trade_type === 'SELL') {
        const positionResult = await this.getStockPosition(userId, stock_symbol);
        
        if (positionResult.error) {
          return { data: null, error: positionResult.error };
        }
        
        const position = positionResult.data;
        if (!position || position.quantity < quantity) {
          return { data: null, error: 'Insufficient shares to sell' };
        }
      }

      // Insert trade record
      const resp = await (sb
        .from('trades')
        .insert({
          user_id: userId,
          stock_symbol,
          stock_name,
          trade_type,
          quantity,
          price,
          total_amount,
          status: 'COMPLETED'
        })
        .select()
        .single() as unknown as { data: any; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Trade execution error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      if (!data) {
        return { data: null, error: 'No data returned from executeTrade' };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Execute trade exception:', error);
      return { data: null, error: 'Failed to execute trade' };
    }
  },

  // Get trade history
  async getTradeHistory(userId: string, limit: number = 50) {
    try {
      const resp = await (sb
        .from('trades')
        .select('*')
        .eq('user_id', userId)
        .order('trade_date', { ascending: false })
        .limit(limit) as unknown as { data: any[] | null; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Trade history fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Get trade history exception:', error);
      return { data: null, error: 'Failed to fetch trade history' };
    }
  },

  // Get trades for specific stock
  async getStockTrades(userId: string, stockSymbol: string) {
    try {
      const resp = await (sb
        .from('trades')
        .select('*')
        .eq('user_id', userId)
        .eq('stock_symbol', stockSymbol)
        .order('trade_date', { ascending: false }) as unknown as { data: any[] | null; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Stock trades fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      return { data: data || [], error: null };
    } catch (error) {
      console.error('Get stock trades exception:', error);
      return { data: null, error: 'Failed to fetch stock trades' };
    }
  },

  // Update current prices for portfolio
  async updateCurrentPrices(userId: string, priceUpdates: PriceUpdate) {
    try {
      const resp = await (sb.rpc('update_portfolio_current_prices', {
        p_user_id: userId,
        p_price_updates: priceUpdates
      }) as unknown as { data: any; error: any });

      const { error } = resp;

      if (error) {
        console.error('Update prices error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      return { data: true, error: null };
    } catch (error) {
      console.error('Update current prices exception:', error);
      return { data: null, error: 'Failed to update prices' };
    }
  },

  // Cancel pending trade
  async cancelTrade(userId: string, tradeId: string) {
    try {
      const resp = await (sb
        .from('trades')
        .update({ status: 'CANCELLED' })
        .eq('id', tradeId)
        .eq('user_id', userId)
        .eq('status', 'PENDING')
        .select()
        .single() as unknown as { data: any; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Cancel trade error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      if (!data) {
        return { data: null, error: 'No data returned from cancelTrade' };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Cancel trade exception:', error);
      return { data: null, error: 'Failed to cancel trade' };
    }
  },

  // Get portfolio performance
  async getPortfolioPerformance(userId: string, days: number = 30) {
    try {
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);

      const resp = await (sb
        .from('trades')
        .select('trade_date, total_amount, trade_type')
        .eq('user_id', userId)
        .eq('status', 'COMPLETED')
        .gte('trade_date', fromDate.toISOString())
        .order('trade_date', { ascending: true }) as unknown as { data: any[] | null; error: any });

      const { data, error } = resp;

      if (error) {
        console.error('Portfolio performance fetch error:', error);
        return { data: null, error: error.message ?? JSON.stringify(error) };
      }

      // Calculate daily investment flow
      const performanceData = data?.reduce((acc: Record<string, any>, trade) => {
        const date = new Date(trade.trade_date).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = { date, invested: 0, redeemed: 0, net: 0 };
        }
        
        if (trade.trade_type === 'BUY') {
          acc[date].invested += Number(trade.total_amount);
        } else {
          acc[date].redeemed += Number(trade.total_amount);
        }
        
        acc[date].net = acc[date].invested - acc[date].redeemed;
        return acc;
      }, {});

      return { data: Object.values(performanceData || {}), error: null };
    } catch (error) {
      console.error('Get portfolio performance exception:', error);
      return { data: null, error: 'Failed to fetch performance data' };
    }
  },

  // Subscribe to portfolio changes
  subscribeToPortfolioChanges(userId: string, callback: (payload: any) => void) {
    return sb
      .channel(`portfolio_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  // Subscribe to trade changes
  subscribeToTradeChanges(userId: string, callback: (payload: any) => void) {
    return sb
      .channel(`trades_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trades',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();
  },

  // Utility function to format currency
  formatCurrency(amount: number, currency: string = '₹'): string {
    return `${currency}${Math.abs(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  },

  // Utility function to format percentage
  formatPercentage(percentage: number): string {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  },

  // Mock price fetcher (replace with real API)
  async fetchCurrentPrices(stockSymbols: string[]): Promise<PriceUpdate> {
    // This is a mock implementation
    // In production, integrate with real stock price API
    const prices: PriceUpdate = {};
    
    for (const symbol of stockSymbols) {
      // Generate mock price (replace with real API call)
      prices[symbol] = Math.floor(Math.random() * 1000) + 500;
    }
    
    return prices;
  }
};