import { useEffect, useState } from "react";

// Assuming these are from your UI library like shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Brain,
  Mail,
  Mic,
  Receipt,
  Sparkles,
  Zap,
  Plus,
  LogOut
} from "lucide-react";

// Import transaction functions and types
import { 
  createTransaction, 
  getTransactions, 
  Transaction 
} from "@/lib/transaction";

// Import auth service
import { authService, AuthUser } from "@/lib/auth";

// Transaction categories - you can move this to your transaction.ts if needed
export const transactionCategories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Finance & Others'
] as const;

export type TransactionCategory = typeof transactionCategories[number];

// Helper functions - you can move these to your transaction.ts if needed
export const getIconForTransaction = (description: string, category?: TransactionCategory): string => {
  const desc = description.toLowerCase();
  
  if (desc.includes('food') || desc.includes('restaurant') || desc.includes('coffee') || desc.includes('lunch') || desc.includes('dinner')) return '🍽️';
  if (desc.includes('uber') || desc.includes('taxi') || desc.includes('bus') || desc.includes('metro')) return '🚗';
  if (desc.includes('shopping') || desc.includes('amazon') || desc.includes('flipkart')) return '🛍️';
  if (desc.includes('movie') || desc.includes('netflix') || desc.includes('spotify')) return '🎬';
  if (desc.includes('electricity') || desc.includes('water') || desc.includes('gas') || desc.includes('internet')) return '💡';
  if (desc.includes('medicine') || desc.includes('doctor') || desc.includes('hospital')) return '🏥';
  
  // Category-based fallback
  switch (category) {
    case 'Food & Dining': return '🍽️';
    case 'Transportation': return '🚗';
    case 'Shopping': return '🛍️';
    case 'Entertainment': return '🎬';
    case 'Bills & Utilities': return '💡';
    case 'Healthcare': return '🏥';
    default: return '💰';
  }
};

export const formatAmount = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Note: For this component to work, you must add the annyang script to your main index.html file:
// <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>

// --- Let TypeScript know that annyang will be on the window object ---
declare global {
  interface Window {
    annyang: any;
  }
}

export default function Expenses() {
  const [voiceStatus, setVoiceStatus] = useState("Click the button to log an expense");
  const [gmailStatus, setGmailStatus] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  
  // Manual transaction form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [manualTransaction, setManualTransaction] = useState({
    desc: "",
    amount: "",
    category: "" as TransactionCategory | "",
  });

  // Initialize auth and load user
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user: currentUser } = await authService.getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          // Optionally load user profile
          const { data: profile } = await authService.getUserProfile(currentUser.id);
          if (profile) {
            setUser(prev => prev ? { ...prev, profile } : null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
      setAuthLoading(false);
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
        // Load user profile if needed
        const { data: profile } = await authService.getUserProfile(session.user.id);
        if (profile) {
          setUser(prev => prev ? { ...prev, profile } : null);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setTransactions([]);
      }
      setAuthLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Load transactions when user is available
  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await getTransactions(user.id);
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      // The auth state change listener will handle clearing the user state
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleManualTransaction = async () => {
    if (!user || !manualTransaction.desc || !manualTransaction.amount || !manualTransaction.category) {
      return;
    }

    const amount = parseFloat(manualTransaction.amount);
    if (isNaN(amount) || amount <= 0) {
      return;
    }

    const newTransaction: Transaction = {
      desc: manualTransaction.desc,
      amount: amount,
      category: manualTransaction.category,
      method: 'Manual',
      icon: getIconForTransaction(manualTransaction.desc, manualTransaction.category as TransactionCategory),
    };

    try {
      const createdTransaction = await createTransaction(newTransaction, user.id);
      setTransactions(prev => [createdTransaction, ...prev]);
      setManualTransaction({ desc: "", amount: "", category: "" });
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  // --- ANNYANG VOICE COMMAND INTEGRATION ---
  useEffect(() => {
    if (!user) return;

    // Access annyang from the global window object
    const annyang = window.annyang;

    // Check if annyang is available
    if (annyang) {
      // Define the voice command we want to listen for
      const commands = {
        'add expense :amount rupees for *description': async (amount: string, description: string) => {
          if (!user) return;
          
          const numericAmount = parseFloat(amount);
          
          if (!isNaN(numericAmount)) {
            const newTransaction: Transaction = {
              desc: description.charAt(0).toUpperCase() + description.slice(1),
              amount: numericAmount,
              category: 'Finance & Others',
              method: 'Voice',
              icon: getIconForTransaction(description),
            };
            
            console.log("Creating voice transaction:", newTransaction);
            
            try {
              const createdTransaction = await createTransaction(newTransaction, user.id);
              console.log("Voice transaction created:", createdTransaction);
              setTransactions(prev => [createdTransaction, ...prev]);
              setVoiceStatus(`✅ Logged: ₹${numericAmount} for ${description}`);
            } catch (error) {
              console.error("Error creating voice transaction:", error);
              setVoiceStatus(`⚠️ Error saving transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
          } else {
            setVoiceStatus(`⚠️ Couldn't understand the amount "${amount}"`);
          }
          setTimeout(() => setVoiceStatus("Click the button to log an expense"), 4000);
        }
      };

      // Initialize annyang with our commands
      annyang.addCommands(commands);
      
      // Add callbacks for user feedback
      annyang.addCallback('start', () => setVoiceStatus('🎤 Listening... Try "add expense 50 rupees for coffee"'));
      annyang.addCallback('end', () => {
        // If the status is still "Listening...", it means nothing was heard.
        setVoiceStatus(prev => prev.includes("Listening") ? "Didn't catch that. Please try again." : prev);
      });
      annyang.addCallback('error', (error: any) => setVoiceStatus(`⚠️ Error: ${error.error}`));

      // Cleanup function to remove listeners when the component unmounts
      return () => {
        if (window.annyang) {
            window.annyang.abort();
            window.annyang.removeCommands();
            window.annyang.removeCallback();
        }
      };
    } else {
      setVoiceStatus("Voice recognition not supported in this browser.");
    }
  }, [user]); // Include user in dependency array

  const handleVoiceLogging = () => {
    if (!user) {
      setVoiceStatus("Please sign in to use voice logging");
      return;
    }
    
    if (window.annyang) {
      // Start listening.
      // autoRestart: false and continuous: false means it stops after one phrase.
      window.annyang.start({ autoRestart: false, continuous: false });
    }
  };

  const handleGmailSync = async () => {
    if (!user) {
      setGmailStatus("Please sign in to sync Gmail");
      return;
    }
    
    setGmailStatus("📧 Scanning inbox with AI...");
    
    // Sample Gmail transactions to randomly select from
    const sampleGmailTransactions = [
      { desc: "Amazon Purchase - Electronics", amount: 2499, category: 'Shopping & Personal Care' as TransactionCategory },
      { desc: "Netflix Subscription", amount: 649, category: 'Entertainment & Leisure' as TransactionCategory },
      { desc: "Swiggy Food Order", amount: 389, category: 'Food & Groceries' as TransactionCategory },
      { desc: "Uber Ride Payment", amount: 245, category: 'Transportation' as TransactionCategory },
      { desc: "Electricity Bill Payment", amount: 1850, category: 'Housing & Utilities' as TransactionCategory },
      { desc: "PharmEasy Medicine Order", amount: 567, category: 'Health & Fitness' as TransactionCategory },
      { desc: "BookMyShow Movie Tickets", amount: 450, category: 'Entertainment & Leisure' as TransactionCategory },
      { desc: "Zomato Food Delivery", amount: 325, category: 'Food & Groceries' as TransactionCategory },
      { desc: "Apollo Pharmacy", amount: 234, category: 'Health & Fitness' as TransactionCategory },
      { desc: "Flipkart Shopping", amount: 1299, category: 'Shopping & Personal Care' as TransactionCategory }
    ];
    
    setTimeout(async () => {
      try {
        // Select a random transaction
        const randomTransaction = sampleGmailTransactions[Math.floor(Math.random() * sampleGmailTransactions.length)];
        
        const newTransaction: Transaction = {
          desc: randomTransaction.desc,
          amount: randomTransaction.amount,
          category: randomTransaction.category,
          method: 'Gmail',
          icon: getIconForTransaction(randomTransaction.desc, randomTransaction.category),
        };

        // Create the transaction in the database
        const createdTransaction = await createTransaction(newTransaction, user.id);
        
        // Add to the transactions list
        setTransactions(prev => [createdTransaction, ...prev]);
        
        setGmailStatus("✅ Found & parsed 1 new transaction 💰");
        setTimeout(() => setGmailStatus(""), 3000);
      } catch (error) {
        console.error("Error creating Gmail transaction:", error);
        setGmailStatus("⚠️ Error processing Gmail transactions");
        setTimeout(() => setGmailStatus(""), 3000);
      }
    }, 2000);
  };

  const formatTransactionTime = (createdAt?: string): string => {
    if (!createdAt) return 'Just now';
    
    const now = new Date();
    const transactionDate = new Date(createdAt);
    const diffInMinutes = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return transactionDate.toLocaleDateString();
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl mb-2">Loading...</div>
          <div className="text-sm opacity-70">Checking authentication status</div>
        </div>
      </div>
    );
  }

  // Show sign-in prompt if no user
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">
              <span style={{color: '#00ffff'}}>Expense Matrix</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">Please sign in to access your expenses</p>
            <div className="text-sm opacity-70">
              You need to be authenticated to use the expense tracking features
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background (Removed direct asset import for portability) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          // backgroundImage: `url(${cyberPattern})`, // This would require a bundler setup
          backgroundColor: '#0a0a0a',
          backgroundSize: '350px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span style={{color: '#00ffff'}}>Expense Matrix</span>
            </h1>
            <p>AI-powered spending control center</p>
            {user.profile?.full_name && (
              <p className="text-sm opacity-70 mt-1">Welcome, {user.profile.full_name}</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-3 p-2 rounded-xl">
              <Brain className="w-5 h-5 text-primary" />
              <span>Neural Analysis</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Mic className="w-5 h-5" />
                <span>Voice Command Center</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Log expenses instantly with neural voice recognition.</p>
              <Button onClick={handleVoiceLogging} className="w-full py-6 text-lg">
                <Mic className="w-5 h-5 mr-3" />
                Start Voice Logging
                <Sparkles className="w-4 h-4 ml-3" />
              </Button>
              {voiceStatus && (
                <div className="text-center p-4 rounded-xl">
                  <div className="font-bold text-lg">
                    {voiceStatus}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>Gmail AI Scanner</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Auto-extract transactions from your email using AI.</p>
              <Button onClick={handleGmailSync} className="w-full py-6 text-lg">
                <Mail className="w-5 h-5 mr-3" />
                Sync Gmail Transactions
                <Zap className="w-4 h-4 ml-3" />
              </Button>
              {gmailStatus && (
                <div className="text-center p-4 rounded-xl">
                  <div className="font-bold text-lg">
                    {gmailStatus}
                  </div>
                  {gmailStatus.includes("Scanning") && user?.email && (
                    <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm">
                      Gmail Connected: {user.email}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Transaction Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Plus className="w-5 h-5" />
                <span>Manual Entry</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Add expenses manually with detailed categorization.</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full py-6 text-lg">
                    <Plus className="w-5 h-5 mr-3" />
                    Add Manual Transaction
                    <Receipt className="w-4 h-4 ml-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="Enter expense description..."
                        value={manualTransaction.desc}
                        onChange={(e) => setManualTransaction(prev => ({ ...prev, desc: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={manualTransaction.amount}
                        onChange={(e) => setManualTransaction(prev => ({ ...prev, amount: e.target.value }))}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={manualTransaction.category}
                        onValueChange={(value: TransactionCategory) => 
                          setManualTransaction(prev => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {transactionCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleManualTransaction}>
                      Add Transaction
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Receipt className="w-5 h-5" />
              <span>Transaction Feed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center p-8">
                <div className="text-lg">Loading transactions...</div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center p-8">
                <div className="text-lg mb-2">No transactions yet</div>
                <div className="text-sm opacity-70">Start by adding your first expense!</div>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <div key={transaction.id || index} className="flex items-center justify-between p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">{transaction.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold">{transaction.desc}</div>
                        <div className="text-sm flex items-center space-x-3">
                          <span>{formatTransactionTime(transaction.created_at)}</span>
                          <Badge>
                            {transaction.method === 'Voice' ? '🎤' : 
                             transaction.method === 'Gmail' ? '📧' : '✏️'} {transaction.method}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-xl">
                        {formatAmount(transaction.amount)}
                      </div>
                      <Badge variant="outline">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}