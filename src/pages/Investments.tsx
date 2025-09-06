import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Brain,
  CheckCircle,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  X,
  Shield,
  AlertTriangle,
  Check,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

// Note: In a real app, you'd use environment variables
const GEMINI_API_KEY = "AIzaSyDe6spC8MtT4nBM62eE4uvuIInIMIEX8C8";

// Simulating the Google Generative AI library functionality
const generateChatResponse = async (prompt, context = '') => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: context ? `${context}\n\nUser Query: ${prompt}` : prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('No response generated');
    }
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};

// Order Confirmation Modal Component
const OrderConfirmationModal = ({ order, onConfirm, onCancel }) => {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleConfirm = async () => {
    setIsExecuting(true);
    // Simulate order execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsExecuting(false);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Confirm Order</h3>
          <p className="text-gray-400">Please review your order details before executing</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Stock:</span>
            <span className="text-white font-semibold">{order.stock}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Quantity:</span>
            <span className="text-white font-semibold">{order.quantity} shares</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <Badge variant={order.type === 'BUY' ? 'default' : 'destructive'} className="text-xs">
              {order.type}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Est. Price:</span>
            <span className="text-white font-semibold">₹{order.price}</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="text-gray-300 font-semibold">Total Amount:</span>
            <span className="text-cyan-400 font-bold text-lg">₹{order.total}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            disabled={isExecuting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold"
            disabled={isExecuting}
          >
            {isExecuting ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2" />
                Executing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Confirm Order
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Investments() {
  const [isOpen, setIsOpen] = useState(false);
  const [tradingPrompt, setTradingPrompt] = useState("");
  const [tradingResponse, setTradingResponse] = useState("");
  const [tradingLoading, setTradingLoading] = useState(false);
  const [tradingHistory, setTradingHistory] = useState([]);
  
  const [investmentPrompt, setInvestmentPrompt] = useState("");
  const [investmentResponse, setInvestmentResponse] = useState("");
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentHistory, setInvestmentHistory] = useState([]);

  // Order confirmation states
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

  // Mock Zerodha account data
  const zerodhaAccount = {
    isConnected: true,
    accountId: "ZD1234",
    username: "john_investor",
    balance: 50000,
    holdings: 15,
    lastSync: "2 mins ago"
  };

  // Function to detect order commands and show confirmation
  const detectAndConfirmOrder = (message, response) => {
    const orderKeywords = ['buy', 'sell', 'invest', 'purchase'];
    const hasOrderKeyword = orderKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    // Simple pattern matching for orders (in real app, you'd use NLP)
    const orderMatch = message.match(/(?:buy|invest|purchase)\s+(\d+)\s+(?:shares?\s+of\s+)?(\w+)/i);
    
    if (hasOrderKeyword && orderMatch) {
      const [, quantity, stock] = orderMatch;
      const mockPrice = Math.floor(Math.random() * 1000) + 500; // Random price between 500-1500
      const order = {
        stock: stock.toUpperCase(),
        quantity: parseInt(quantity),
        type: 'BUY',
        price: mockPrice,
        total: mockPrice * parseInt(quantity)
      };
      
      setPendingOrder(order);
      setShowOrderConfirmation(true);
      return true;
    }
    return false;
  };

  const handleTradingSubmit = async () => {
    if (!tradingPrompt.trim()) return;
    
    const userMessage = tradingPrompt.trim();
    setTradingLoading(true);
    
    // Add user message to history
    setTradingHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setTradingPrompt("");
    
    try {
      const context = `You are an AI trading assistant for StackX, a GenZ fintech app connected to Zerodha. Provide trading advice, market analysis, and investment strategies. Keep responses concise, actionable, and include emojis. Focus on stocks, crypto, and modern trading strategies suitable for young investors. If user mentions buying/selling specific stocks, acknowledge the order but mention that confirmation will be required.`;
      
      const response = await generateChatResponse(userMessage, context);
      
      // Check if this is an order and show confirmation
      const isOrder = detectAndConfirmOrder(userMessage, response);
      
      // Add AI response to history
      setTradingHistory(prev => [...prev, { type: 'ai', message: response }]);
      setTradingResponse(response);
    } catch (error) {
      setTradingHistory(prev => [...prev, { type: 'ai', message: 'Sorry, I encountered an error. Please try again.' }]);
    }
    
    setTradingLoading(false);
  };

  const handleInvestmentSubmit = async () => {
    if (!investmentPrompt.trim()) return;
    
    const userMessage = investmentPrompt.trim();
    setInvestmentLoading(true);
    
    // Add user message to history
    setInvestmentHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setInvestmentPrompt("");
    
    try {
      const context = `You are an AI investment manager for StackX, a GenZ fintech app connected to Zerodha. Provide personalized investment advice, portfolio recommendations, and long-term wealth building strategies. Keep responses practical, educational, and include emojis. Focus on SIPs, mutual funds, ETFs, and diversified investment approaches for young professionals.`;
      
      const response = await generateChatResponse(userMessage, context);
      
      // Add AI response to history
      setInvestmentHistory(prev => [...prev, { type: 'ai', message: response }]);
      setInvestmentResponse(response);
    } catch (error) {
      setInvestmentHistory(prev => [...prev, { type: 'ai', message: 'Sorry, I encountered an error. Please try again.' }]);
    }
    
    setInvestmentLoading(false);
  };

  const handleQuickPrompt = (prompt, isTrading = true) => {
    if (isTrading) {
      setTradingPrompt(prompt);
    } else {
      setInvestmentPrompt(prompt);
    }
  };

  const handleOrderConfirm = () => {
    setShowOrderConfirmation(false);
    // Add order success message to trading history
    setTradingHistory(prev => [...prev, { 
      type: 'ai', 
      message: `✅ Order executed successfully!\n\n📊 **Order Details:**\n• Stock: ${pendingOrder.stock}\n• Quantity: ${pendingOrder.quantity} shares\n• Type: ${pendingOrder.type}\n• Total: ₹${pendingOrder.total}\n\n🎉 Your order has been placed via Zerodha. You'll receive a confirmation shortly!` 
    }]);
    setPendingOrder(null);
  };

  const handleOrderCancel = () => {
    setShowOrderConfirmation(false);
    setTradingHistory(prev => [...prev, { 
      type: 'ai', 
      message: '❌ Order cancelled. No worries! Feel free to ask for any trading advice or try another order.' 
    }]);
    setPendingOrder(null);
  };

  const formatMessage = (message) => {
    // Split message into paragraphs and format for better readability
    return message.split('\n\n').map((paragraph, index) => (
      <div key={index} className="mb-3 last:mb-0">
        <p className="text-gray-100 leading-relaxed">
          {paragraph.split('\n').map((line, lineIndex) => (
            <span key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    ));
  };

  return (
    <>
      {/* Order Confirmation Modal */}
      {showOrderConfirmation && pendingOrder && (
        <OrderConfirmationModal
          order={pendingOrder}
          onConfirm={handleOrderConfirm}
          onCancel={handleOrderCancel}
        />
      )}

      {/* Main Screen Content */}
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-cyan-400/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <Brain className="w-12 h-12 text-cyan-400 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Meet Your AI Investment
              <span className="text-cyan-400"> Assistant</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-6">
              Get personalized trading advice, market analysis, and investment strategies powered by advanced AI. Make smarter financial decisions with instant insights.
            </p>
            
            {/* Zerodha Connection Status */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="flex items-center space-x-2 bg-green-900/30 border border-green-700/50 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">Connected to Zerodha</span>
                <Badge variant="secondary" className="text-xs bg-green-700 text-green-100">
                  {zerodhaAccount.accountId}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main CTA Button */}
          <Button 
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-6 rounded-2xl shadow-2xl transform transition-all duration-200 hover:scale-105 mb-8"
          >
            <Brain className="w-6 h-6 mr-3" />
            Start AI Chat
            <Sparkles className="w-5 h-5 ml-3" />
          </Button>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Trading Insights</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Portfolio Planning</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-gray-300 text-sm">Instant Execution</span>
            </div>
          </div>

          {/* Secondary Info */}
          <p className="text-gray-500 text-sm">
            Powered by Gemini AI • Integrated with Zerodha • Secure Trading
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-cyan-500 hover:bg-cyan-600 text-gray-900 shadow-lg border-0 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl h-[90vh] bg-gray-950 text-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-cyan-400">AI Investment Hub</h1>
                  <p className="text-gray-400">Your personal AI-powered investment assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Zerodha Status */}
                <div className="flex items-center space-x-2 bg-green-900/30 border border-green-700/50 px-3 py-1.5 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm font-medium">Zerodha Connected</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-400 hover:text-green-300 p-0 h-auto"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Account Info Bar */}
            <div className="px-6 py-3 bg-gray-900/50 border-b border-gray-800">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Account:</span>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                      {zerodhaAccount.username}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Available Balance:</span>
                    <span className="text-green-400 font-semibold">₹{zerodhaAccount.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">Holdings:</span>
                    <span className="text-white font-medium">{zerodhaAccount.holdings} stocks</span>
                  </div>
                </div>
                <div className="text-gray-500">
                  Last sync: {zerodhaAccount.lastSync}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="trading" className="h-full flex flex-col">
                <div className="px-6 pt-4">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                    <TabsTrigger value="trading" className="font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      AI Trading Assistant
                    </TabsTrigger>
                    <TabsTrigger value="investment" className="font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900">
                      <Target className="w-4 h-4 mr-2" />
                      Investment Manager
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* AI Trading Assistant Tab */}
                <TabsContent value="trading" className="flex-1 overflow-hidden px-6 pb-6">
                  <div className="h-full flex flex-col space-y-4">
                    {/* Chat History */}
                    <div className="flex-1 bg-gray-900 rounded-2xl p-6 overflow-y-auto">
                      {tradingHistory.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">
                          <TrendingUp className="w-16 h-16 mx-auto mb-4 text-cyan-400/50" />
                          <h3 className="text-xl font-bold mb-2">AI Trading Oracle</h3>
                          <p className="mb-4">Ask me anything about trading, market analysis, or investment strategies!</p>
                          <div className="text-xs bg-green-900/20 border border-green-700/30 rounded-lg p-3 inline-block">
                            <Shield className="w-4 h-4 inline mr-2 text-green-400" />
                            <span className="text-green-400">Ready to execute orders via Zerodha</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {tradingHistory.map((item, index) => (
                            <div key={index} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-4 rounded-2xl ${
                                item.type === 'user' 
                                  ? 'bg-cyan-500 text-gray-900 ml-4' 
                                  : 'bg-gray-700 text-gray-100 mr-4'
                              }`}>
                                {item.type === 'user' ? (
                                  <p className="font-medium">{item.message}</p>
                                ) : (
                                  <div>{formatMessage(item.message)}</div>
                                )}
                              </div>
                            </div>
                          ))}
                          {tradingLoading && (
                            <div className="flex justify-start">
                              <div className="bg-gray-700 text-gray-100 p-4 rounded-2xl mr-4">
                                <div className="flex items-center space-x-2">
                                  <Brain className="w-5 h-5 animate-pulse text-cyan-400" />
                                  <span>AI is thinking...</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Prompts */}
                    {tradingHistory.length === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleQuickPrompt("Buy 10 shares of Reliance Industries", true)}
                          className="p-3 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                        >
                          <div>
                            <div className="font-bold text-sm">Quick Buy Order</div>
                            <div className="text-xs text-gray-400">Buy 10 shares of Reliance</div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleQuickPrompt("Analyze Bitcoin's current trend and give me a trading strategy", true)}
                          className="p-3 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                        >
                          <div>
                            <div className="font-bold text-sm">Crypto Analysis</div>
                            <div className="text-xs text-gray-400">Bitcoin trading strategies</div>
                          </div>
                        </Button>
                      </div>
                    )}

                    {/* Input Section */}
                    <div className="bg-gray-800 rounded-2xl p-4">
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Try: 'Buy 5 shares of TCS' or 'Sell 10 HDFC shares' or 'What's the best stock to buy today?'"
                          value={tradingPrompt}
                          onChange={(e) => setTradingPrompt(e.target.value)}
                          className="min-h-[80px] bg-gray-700 border-gray-600 text-white resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleTradingSubmit();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleTradingSubmit}
                          disabled={tradingLoading || !tradingPrompt.trim()}
                          className="w-full font-bold py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-900"
                        >
                          {tradingLoading ? (
                            <>
                              <Brain className="w-4 h-4 mr-2 animate-pulse" />
                              AI Analyzing...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Get Trading Insights
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Investment Manager Tab */}
                <TabsContent value="investment" className="flex-1 overflow-hidden px-6 pb-6">
                  <div className="h-full flex flex-col space-y-4">
                    {/* Chat History */}
                    <div className="flex-1 bg-gray-900 rounded-2xl p-6 overflow-y-auto">
                      {investmentHistory.length === 0 ? (
                        <div className="text-center text-gray-400 mt-8">
                          <DollarSign className="w-16 h-16 mx-auto mb-4 text-cyan-400/50" />
                          <h3 className="text-xl font-bold mb-2">AI Investment Manager</h3>
                          <p>Ask me about SIPs, mutual funds, portfolio planning, or investment strategies!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {investmentHistory.map((item, index) => (
                            <div key={index} className={`flex ${item.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[80%] p-4 rounded-2xl ${
                                item.type === 'user' 
                                  ? 'bg-cyan-500 text-gray-900 ml-4' 
                                  : 'bg-gray-700 text-gray-100 mr-4'
                              }`}>
                                {item.type === 'user' ? (
                                  <p className="font-medium">{item.message}</p>
                                ) : (
                                  <div>{formatMessage(item.message)}</div>
                                )}
                              </div>
                            </div>
                          ))}
                          {investmentLoading && (
                            <div className="flex justify-start">
                              <div className="bg-gray-700 text-gray-100 p-4 rounded-2xl mr-4">
                                <div className="flex items-center space-x-2">
                                  <Brain className="w-5 h-5 animate-pulse text-cyan-400" />
                                  <span>AI is planning...</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Quick Prompts */}
                    {investmentHistory.length === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Button
                          variant="outline"
                          onClick={() => handleQuickPrompt("I'm 25 years old and want to start investing ₹10,000 monthly. Create a diversified portfolio plan for me.", false)}
                          className="p-3 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                        >
                          <div>
                            <div className="font-bold text-sm">Portfolio Builder</div>
                            <div className="text-xs text-gray-400">Create diversified investment plan</div>
                          </div>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleQuickPrompt("Explain SIP vs lump sum investment. Which is better for long-term wealth creation?", false)}
                          className="p-3 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                        >
                          <div>
                            <div className="font-bold text-sm">SIP Strategy</div>
                            <div className="text-xs text-gray-400">Learn about systematic investing</div>
                          </div>
                        </Button>
                      </div>
                    )}

                    {/* Input Section */}
                    <div className="bg-gray-800 rounded-2xl p-4">
                      <div className="space-y-3">
                        <Textarea
                          placeholder="Ask me about SIPs, mutual funds, portfolio diversification, retirement planning..."
                          value={investmentPrompt}
                          onChange={(e) => setInvestmentPrompt(e.target.value)}
                          className="min-h-[80px] bg-gray-700 border-gray-600 text-white resize-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleInvestmentSubmit();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleInvestmentSubmit}
                          disabled={investmentLoading || !investmentPrompt.trim()}
                          className="w-full font-bold py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-900"
                        >
                          {investmentLoading ? (
                            <>
                              <Brain className="w-4 h-4 mr-2 animate-pulse" />
                              AI Planning...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Get Investment Plan
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
}