// import { useEffect, useState } from "react";

// // Assuming these are from your UI library like shadcn/ui
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";

// import {
//   Brain,
//   Mail,
//   Mic,
//   Receipt,
//   Sparkles,
//   Zap,
//   Plus,
//   LogOut
// } from "lucide-react";

// // Import transaction functions and types
// import { 
//   createTransaction, 
//   getTransactions, 
//   Transaction 
// } from "@/lib/transaction";

// // Import auth service
// import { authService, AuthUser } from "@/lib/auth";

// // Transaction categories - you can move this to your transaction.ts if needed
// export const transactionCategories = [
//   'Food & Dining',
//   'Transportation',
//   'Shopping',
//   'Entertainment',
//   'Bills & Utilities',
//   'Healthcare',
//   'Finance & Others'
// ] as const;

// export type TransactionCategory = typeof transactionCategories[number];

// // Helper functions - you can move these to your transaction.ts if needed
// export const getIconForTransaction = (description: string, category?: TransactionCategory): string => {
//   const desc = description.toLowerCase();
  
//   if (desc.includes('food') || desc.includes('restaurant') || desc.includes('coffee') || desc.includes('lunch') || desc.includes('dinner')) return '🍽️';
//   if (desc.includes('uber') || desc.includes('taxi') || desc.includes('bus') || desc.includes('metro')) return '🚗';
//   if (desc.includes('shopping') || desc.includes('amazon') || desc.includes('flipkart')) return '🛍️';
//   if (desc.includes('movie') || desc.includes('netflix') || desc.includes('spotify')) return '🎬';
//   if (desc.includes('electricity') || desc.includes('water') || desc.includes('gas') || desc.includes('internet')) return '💡';
//   if (desc.includes('medicine') || desc.includes('doctor') || desc.includes('hospital')) return '🏥';
  
//   // Category-based fallback
//   switch (category) {
//     case 'Food & Dining': return '🍽️';
//     case 'Transportation': return '🚗';
//     case 'Shopping': return '🛍️';
//     case 'Entertainment': return '🎬';
//     case 'Bills & Utilities': return '💡';
//     case 'Healthcare': return '🏥';
//     default: return '💰';
//   }
// };

// export const formatAmount = (amount: string | number): string => {
//   const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
//   return `₹${numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// };

// // Note: For this component to work, you must add the annyang script to your main index.html file:
// // <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>

// // --- Let TypeScript know that annyang will be on the window object ---
// declare global {
//   interface Window {
//     annyang: any;
//   }
// }

// export default function Expenses() {
//   const [voiceStatus, setVoiceStatus] = useState("Click the button to log an expense");
//   const [gmailStatus, setGmailStatus] = useState("");
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [authLoading, setAuthLoading] = useState(true);
//   const [user, setUser] = useState<AuthUser | null>(null);
  
//   // Manual transaction form state
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [manualTransaction, setManualTransaction] = useState({
//     desc: "",
//     amount: "",
//     category: "" as TransactionCategory | "",
//   });

//   // Initialize auth and load user
//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const { user: currentUser } = await authService.getCurrentUser();
//         setUser(currentUser);
        
//         if (currentUser) {
//           // Optionally load user profile
//           const { data: profile } = await authService.getUserProfile(currentUser.id);
//           if (profile) {
//             setUser(prev => prev ? { ...prev, profile } : null);
//           }
//         }
//       } catch (error) {
//         console.error("Error initializing auth:", error);
//       }
//       setAuthLoading(false);
//     };

//     initAuth();

//     // Listen for auth state changes
//     const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
//       if (event === 'SIGNED_IN' && session?.user) {
//         setUser(session.user);
//         // Load user profile if needed
//         const { data: profile } = await authService.getUserProfile(session.user.id);
//         if (profile) {
//           setUser(prev => prev ? { ...prev, profile } : null);
//         }
//       } else if (event === 'SIGNED_OUT') {
//         setUser(null);
//         setTransactions([]);
//       }
//       setAuthLoading(false);
//     });

//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);

//   // Load transactions when user is available
//   useEffect(() => {
//     if (user) {
//       loadTransactions();
//     }
//   }, [user]);

//   const loadTransactions = async () => {
//     if (!user) return;
    
//     setLoading(true);
//     try {
//       const data = await getTransactions(user.id);
//       setTransactions(data);
//     } catch (error) {
//       console.error("Error loading transactions:", error);
//     }
//     setLoading(false);
//   };

//   const handleSignOut = async () => {
//     try {
//       await authService.signOut();
//       // The auth state change listener will handle clearing the user state
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   const handleManualTransaction = async () => {
//     if (!user || !manualTransaction.desc || !manualTransaction.amount || !manualTransaction.category) {
//       return;
//     }

//     const amount = parseFloat(manualTransaction.amount);
//     if (isNaN(amount) || amount <= 0) {
//       return;
//     }

//     const newTransaction: Transaction = {
//       desc: manualTransaction.desc,
//       amount: amount,
//       category: manualTransaction.category,
//       method: 'Manual',
//       icon: getIconForTransaction(manualTransaction.desc, manualTransaction.category as TransactionCategory),
//     };

//     try {
//       const createdTransaction = await createTransaction(newTransaction, user.id);
//       setTransactions(prev => [createdTransaction, ...prev]);
//       setManualTransaction({ desc: "", amount: "", category: "" });
//       setIsDialogOpen(false);
//     } catch (error) {
//       console.error("Error creating transaction:", error);
//     }
//   };

//   // --- ANNYANG VOICE COMMAND INTEGRATION ---
//   useEffect(() => {
//     if (!user) return;

//     // Access annyang from the global window object
//     const annyang = window.annyang;

//     // Check if annyang is available
//     if (annyang) {
//       // Define the voice command we want to listen for
//       const commands = {
//         'add expense :amount rupees for *description': async (amount: string, description: string) => {
//           if (!user) return;
          
//           const numericAmount = parseFloat(amount);
          
//           if (!isNaN(numericAmount)) {
//             const newTransaction: Transaction = {
//               desc: description.charAt(0).toUpperCase() + description.slice(1),
//               amount: numericAmount,
//               category: 'Finance & Others',
//               method: 'Voice',
//               icon: getIconForTransaction(description),
//             };
            
//             console.log("Creating voice transaction:", newTransaction);
            
//             try {
//               const createdTransaction = await createTransaction(newTransaction, user.id);
//               console.log("Voice transaction created:", createdTransaction);
//               setTransactions(prev => [createdTransaction, ...prev]);
//               setVoiceStatus(`✅ Logged: ₹${numericAmount} for ${description}`);
//             } catch (error) {
//               console.error("Error creating voice transaction:", error);
//               setVoiceStatus(`⚠️ Error saving transaction: ${error instanceof Error ? error.message : 'Unknown error'}`);
//             }
//           } else {
//             setVoiceStatus(`⚠️ Couldn't understand the amount "${amount}"`);
//           }
//           setTimeout(() => setVoiceStatus("Click the button to log an expense"), 4000);
//         }
//       };

//       // Initialize annyang with our commands
//       annyang.addCommands(commands);
      
//       // Add callbacks for user feedback
//       annyang.addCallback('start', () => setVoiceStatus('🎤 Listening... Try "add expense 50 rupees for coffee"'));
//       annyang.addCallback('end', () => {
//         // If the status is still "Listening...", it means nothing was heard.
//         setVoiceStatus(prev => prev.includes("Listening") ? "Didn't catch that. Please try again." : prev);
//       });
//       annyang.addCallback('error', (error: any) => setVoiceStatus(`⚠️ Error: ${error.error}`));

//       // Cleanup function to remove listeners when the component unmounts
//       return () => {
//         if (window.annyang) {
//             window.annyang.abort();
//             window.annyang.removeCommands();
//             window.annyang.removeCallback();
//         }
//       };
//     } else {
//       setVoiceStatus("Voice recognition not supported in this browser.");
//     }
//   }, [user]); // Include user in dependency array

//   const handleVoiceLogging = () => {
//     if (!user) {
//       setVoiceStatus("Please sign in to use voice logging");
//       return;
//     }
    
//     if (window.annyang) {
//       // Start listening.
//       // autoRestart: false and continuous: false means it stops after one phrase.
//       window.annyang.start({ autoRestart: false, continuous: false });
//     }
//   };

//   const handleGmailSync = async () => {
//     if (!user) {
//       setGmailStatus("Please sign in to sync Gmail");
//       return;
//     }
    
//     setGmailStatus("📧 Scanning inbox with AI...");
    
//     // Sample Gmail transactions to randomly select from
//     const sampleGmailTransactions = [
//       { desc: "Amazon Purchase - Electronics", amount: 2499, category: 'Shopping & Personal Care' as TransactionCategory },
//       { desc: "Netflix Subscription", amount: 649, category: 'Entertainment & Leisure' as TransactionCategory },
//       { desc: "Swiggy Food Order", amount: 389, category: 'Food & Groceries' as TransactionCategory },
//       { desc: "Uber Ride Payment", amount: 245, category: 'Transportation' as TransactionCategory },
//       { desc: "Electricity Bill Payment", amount: 1850, category: 'Housing & Utilities' as TransactionCategory },
//       { desc: "PharmEasy Medicine Order", amount: 567, category: 'Health & Fitness' as TransactionCategory },
//       { desc: "BookMyShow Movie Tickets", amount: 450, category: 'Entertainment & Leisure' as TransactionCategory },
//       { desc: "Zomato Food Delivery", amount: 325, category: 'Food & Groceries' as TransactionCategory },
//       { desc: "Apollo Pharmacy", amount: 234, category: 'Health & Fitness' as TransactionCategory },
//       { desc: "Flipkart Shopping", amount: 1299, category: 'Shopping & Personal Care' as TransactionCategory }
//     ];
    
//     setTimeout(async () => {
//       try {
//         // Select a random transaction
//         const randomTransaction = sampleGmailTransactions[Math.floor(Math.random() * sampleGmailTransactions.length)];
        
//         const newTransaction: Transaction = {
//           desc: randomTransaction.desc,
//           amount: randomTransaction.amount,
//           category: randomTransaction.category,
//           method: 'Gmail',
//           icon: getIconForTransaction(randomTransaction.desc, randomTransaction.category),
//         };

//         // Create the transaction in the database
//         const createdTransaction = await createTransaction(newTransaction, user.id);
        
//         // Add to the transactions list
//         setTransactions(prev => [createdTransaction, ...prev]);
        
//         setGmailStatus("✅ Found & parsed 1 new transaction 💰");
//         setTimeout(() => setGmailStatus(""), 3000);
//       } catch (error) {
//         console.error("Error creating Gmail transaction:", error);
//         setGmailStatus("⚠️ Error processing Gmail transactions");
//         setTimeout(() => setGmailStatus(""), 3000);
//       }
//     }, 2000);
//   };

//   const formatTransactionTime = (createdAt?: string): string => {
//     if (!createdAt) return 'Just now';
    
//     const now = new Date();
//     const transactionDate = new Date(createdAt);
//     const diffInMinutes = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60));
    
//     if (diffInMinutes < 1) return 'Just now';
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     if (diffInHours < 24) return `${diffInHours}h ago`;
    
//     const diffInDays = Math.floor(diffInHours / 24);
//     if (diffInDays < 7) return `${diffInDays}d ago`;
    
//     return transactionDate.toLocaleDateString();
//   };

//   // Show loading state while checking authentication
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="text-xl mb-2">Loading...</div>
//           <div className="text-sm opacity-70">Checking authentication status</div>
//         </div>
//       </div>
//     );
//   }

//   // Show sign-in prompt if no user
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle className="text-center">
//               <span style={{color: '#00ffff'}}>Expense Matrix</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="text-center">
//             <p className="mb-4">Please sign in to access your expenses</p>
//             <div className="text-sm opacity-70">
//               You need to be authenticated to use the expense tracking features
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* Background (Removed direct asset import for portability) */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           // backgroundImage: `url(${cyberPattern})`, // This would require a bundler setup
//           backgroundColor: '#0a0a0a',
//           backgroundSize: '350px',
//           backgroundRepeat: 'repeat'
//         }}
//       />
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">
//               <span style={{color: '#00ffff'}}>Expense Matrix</span>
//             </h1>
//             <p>AI-powered spending control center</p>
//             {user.profile?.full_name && (
//               <p className="text-sm opacity-70 mt-1">Welcome, {user.profile.full_name}</p>
//             )}
//           </div>
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center space-x-3 p-2 rounded-xl">
//               <Brain className="w-5 h-5 text-primary" />
//               <span>Neural Analysis</span>
//             </div>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={handleSignOut}
//               className="flex items-center space-x-2"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Sign Out</span>
//             </Button>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <Mic className="w-5 h-5" />
//                 <span>Voice Command Center</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <p>Log expenses instantly with neural voice recognition.</p>
//               <Button onClick={handleVoiceLogging} className="w-full py-6 text-lg">
//                 <Mic className="w-5 h-5 mr-3" />
//                 Start Voice Logging
//                 <Sparkles className="w-4 h-4 ml-3" />
//               </Button>
//               {voiceStatus && (
//                 <div className="text-center p-4 rounded-xl">
//                   <div className="font-bold text-lg">
//                     {voiceStatus}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <Mail className="w-5 h-5" />
//                 <span>Gmail AI Scanner</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <p>Auto-extract transactions from your email using AI.</p>
//               <Button onClick={handleGmailSync} className="w-full py-6 text-lg">
//                 <Mail className="w-5 h-5 mr-3" />
//                 Sync Gmail Transactions
//                 <Zap className="w-4 h-4 ml-3" />
//               </Button>
//               {gmailStatus && (
//                 <div className="text-center p-4 rounded-xl">
//                   <div className="font-bold text-lg">
//                     {gmailStatus}
//                   </div>
//                   {gmailStatus.includes("Scanning") && user?.email && (
//                     <div className="mt-2 p-2 bg-green-100 border border-green-300 rounded-lg text-green-800 text-sm">
//                       Gmail Connected: {user.email}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Manual Transaction Entry */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <Plus className="w-5 h-5" />
//                 <span>Manual Entry</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <p>Add expenses manually with detailed categorization.</p>
//               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="w-full py-6 text-lg">
//                     <Plus className="w-5 h-5 mr-3" />
//                     Add Manual Transaction
//                     <Receipt className="w-4 h-4 ml-3" />
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle>Add New Expense</DialogTitle>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="description">Description</Label>
//                       <Input
//                         id="description"
//                         placeholder="Enter expense description..."
//                         value={manualTransaction.desc}
//                         onChange={(e) => setManualTransaction(prev => ({ ...prev, desc: e.target.value }))}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="amount">Amount (₹)</Label>
//                       <Input
//                         id="amount"
//                         type="number"
//                         placeholder="0.00"
//                         value={manualTransaction.amount}
//                         onChange={(e) => setManualTransaction(prev => ({ ...prev, amount: e.target.value }))}
//                       />
//                     </div>
//                     <div className="grid gap-2">
//                       <Label htmlFor="category">Category</Label>
//                       <Select
//                         value={manualTransaction.category}
//                         onValueChange={(value: TransactionCategory) => 
//                           setManualTransaction(prev => ({ ...prev, category: value }))
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {transactionCategories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div className="flex justify-end space-x-2">
//                     <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button onClick={handleManualTransaction}>
//                       Add Transaction
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Transactions */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3">
//               <Receipt className="w-5 h-5" />
//               <span>Transaction Feed</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="text-center p-8">
//                 <div className="text-lg">Loading transactions...</div>
//               </div>
//             ) : transactions.length === 0 ? (
//               <div className="text-center p-8">
//                 <div className="text-lg mb-2">No transactions yet</div>
//                 <div className="text-sm opacity-70">Start by adding your first expense!</div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {transactions.map((transaction, index) => (
//                   <div key={transaction.id || index} className="flex items-center justify-between p-4 rounded-xl">
//                     <div className="flex items-center space-x-4">
//                       <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
//                         <span className="text-2xl">{transaction.icon}</span>
//                       </div>
//                       <div>
//                         <div className="font-bold">{transaction.desc}</div>
//                         <div className="text-sm flex items-center space-x-3">
//                           <span>{formatTransactionTime(transaction.created_at)}</span>
//                           <Badge>
//                             {transaction.method === 'Voice' ? '🎤' : 
//                              transaction.method === 'Gmail' ? '📧' : '✏️'} {transaction.method}
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-bold text-xl">
//                         {formatAmount(transaction.amount)}
//                       </div>
//                       <Badge variant="outline">
//                         {transaction.category}
//                       </Badge>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react"; // MODIFIED: Added useRef

// Assuming these are from your UI library like shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
  Brain,
  LogOut,
  Mail,
  Mic,
  MicOff,
  Plus,
  Receipt,
  Sparkles,
  Zap
} from "lucide-react";

// Import transaction functions and types
import {
  createTransaction,
  getTransactions,
  Transaction
} from "@/lib/transaction";

// Import auth service
import { authService, AuthUser } from "@/lib/auth";

// Note: Use your Gemini API key
const GEMINI_API_KEY = "AIzaSyDe6spC8MtT4nBM62eE4uvuIInIMIEX8C8";

// FIXED: Categories without emojis to match your database
export const transactionCategories = [
  'Housing & Utilities',
  'Transportation', 
  'Food & Groceries',
  'Shopping & Personal Care',
  'Health & Fitness',
  'Entertainment & Leisure',
  'Family & Education',
  'Finance & Others'
] as const;

export type TransactionCategory = typeof transactionCategories[number];

// Category mapping for AI processing
const categoryKeywords = {
  'Housing & Utilities': ['rent', 'mortgage', 'electricity', 'gas', 'water', 'internet', 'wifi', 'utility', 'repairs', 'insurance', 'maintenance'],
  'Transportation': ['uber', 'taxi', 'bus', 'metro', 'train', 'fuel', 'petrol', 'diesel', 'parking', 'car', 'bike', 'auto', 'ola'],
  'Food & Groceries': ['restaurant', 'food', 'grocery', 'swiggy', 'zomato', 'cafe', 'coffee', 'lunch', 'dinner', 'breakfast', 'drink', 'alcohol'],
  'Shopping & Personal Care': ['shopping', 'clothes', 'amazon', 'flipkart', 'electronics', 'phone', 'laptop', 'gifts', 'cosmetics', 'salon'],
  'Health & Fitness': ['doctor', 'hospital', 'medicine', 'pharmacy', 'gym', 'fitness', 'therapy', 'medical', 'health', 'wellness'],
  'Entertainment & Leisure': ['movie', 'netflix', 'spotify', 'games', 'travel', 'vacation', 'hotel', 'entertainment', 'bookmyshow', 'concert'],
  'Family & Education': ['school', 'education', 'course', 'childcare', 'pet', 'family', 'kids', 'tuition', 'books'],
  'Finance & Others': ['loan', 'investment', 'tax', 'savings', 'donation', 'emergency', 'misc', 'other', 'bank', 'credit card']
};

// Helper function to get emoji for display
const getCategoryEmoji = (category: string): string => {
  const emojiMap: { [key: string]: string } = {
    'Housing & Utilities': '🏠',
    'Transportation': '🚗',
    'Food & Groceries': '🍔',
    'Shopping & Personal Care': '🛍',
    'Health & Fitness': '💊',
    'Entertainment & Leisure': '🎉',
    'Family & Education': '👨‍👩‍👧',
    'Finance & Others': '💳'
  };
  return emojiMap[category] || '💰';
};

// FIXED: AI function returns categories without emojis
const parseExpenseWithAI = async (voiceInput: string) => {
  try {
    console.log('Parsing with AI:', voiceInput);
    
    const prompt = `
Parse this expense description and extract the following information in JSON format:
"${voiceInput}"

Extract:
1. amount: The numerical amount spent (just the number, no currency)
2. description: A short, clean description of the expense (max 50 characters)
3. category: Choose the BEST matching category from these options:
   - Housing & Utilities
   - Transportation
   - Food & Groceries
   - Shopping & Personal Care
   - Health & Fitness
   - Entertainment & Leisure
   - Family & Education
   - Finance & Others

Rules:
- If no amount is mentioned, set amount to 0
- Description should be concise and clear
- Choose the most appropriate category based on the context
- Return ONLY valid JSON in this format: {"amount": number, "description": "string", "category": "string"}

Examples:
"I went to a restaurant yesterday and spent 2000" → {"amount": 2000, "description": "Restaurant meal", "category": "Food & Groceries"}
"Paid 500 for uber ride" → {"amount": 500, "description": "Uber ride", "category": "Transportation"}
"Bought groceries for 1500 rupees" → {"amount": 1500, "description": "Grocery shopping", "category": "Food & Groceries"}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    const data = await response.json();
    console.log('Gemini response:', data);
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('AI response text:', aiResponse);
      
      const jsonMatch = aiResponse.match(/\{[^}]*\}/);
      if (jsonMatch) {
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log('Parsed data:', parsedData);
        return {
          amount: parsedData.amount || 0,
          description: parsedData.description || 'Miscellaneous expense',
          category: parsedData.category || 'Finance & Others'
        };
      }
    }
    
    throw new Error('Could not parse AI response');
  } catch (error) {
    console.error('Error parsing with AI:', error);
    return fallbackParsing(voiceInput);
  }
};

// Fallback parsing if AI fails
const fallbackParsing = (input: string) => {
  console.log('Using fallback parsing for:', input);
  const lowerInput = input.toLowerCase();
  
  const amountMatch = input.match(/(\d+)/);
  const amount = amountMatch ? parseInt(amountMatch[0]) : 0;
  
  let category: TransactionCategory = 'Finance & Others';
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some(keyword => lowerInput.includes(keyword))) {
      category = cat as TransactionCategory;
      break;
    }
  }
  
  let description = 'Expense';
  if (lowerInput.includes('restaurant') || lowerInput.includes('food')) description = 'Restaurant/Food';
  if (lowerInput.includes('uber') || lowerInput.includes('taxi')) description = 'Transportation';
  if (lowerInput.includes('shopping') || lowerInput.includes('bought')) description = 'Shopping';
  
  const result = { amount, description, category };
  console.log('Fallback result:', result);
  return result;
};

// Helper functions
export const getIconForTransaction = (description: string, category?: TransactionCategory): string => {
  if (category) {
    return getCategoryEmoji(category);
  }
  
  const desc = description.toLowerCase();
  
  if (desc.includes('food') || desc.includes('restaurant')) return '🍽️';
  if (desc.includes('uber') || desc.includes('taxi')) return '🚗';
  if (desc.includes('shopping')) return '🛍️';
  if (desc.includes('movie') || desc.includes('entertainment')) return '🎬';
  if (desc.includes('utility') || desc.includes('electricity')) return '💡';
  if (desc.includes('medicine') || desc.includes('doctor')) return '🏥';
  
  return '💰';
};

export const formatAmount = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `₹${numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// TypeScript declarations
declare global {
  interface Window {
    annyang: any;
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

// NEW: Voice Visualizer Component
const VoiceVisualizer = ({ isListening, volume }: { isListening: boolean, volume: number }) => {
  // volume is a value between 0 and 1, used to drive the animation
  const scale = isListening ? 1 + volume * 0.7 : 1;
  const shadowOpacity = isListening ? 0.2 + volume * 0.5 : 0;
  const shadowSpread = isListening ? 5 + volume * 25 : 0;

  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center transition-all duration-300">
      <div
        className="absolute w-full h-full rounded-full bg-cyan-500/10"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 100ms ease-out, box-shadow 100ms ease-out',
          boxShadow: `0 0 ${shadowSpread}px rgba(0, 255, 255, ${shadowOpacity})`,
        }}
      />
      <div className="relative z-10 w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-cyan-500/30">
        <Mic className={`w-10 h-10 transition-colors duration-300 ${isListening ? 'text-cyan-400' : 'text-gray-500'}`} />
      </div>
    </div>
  );
};


export default function Expenses() {
  const [voiceStatus, setVoiceStatus] = useState("Click the button to describe your expense");
  const [isListening, setIsListening] = useState(false);
  const [gmailStatus, setGmailStatus] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [processingVoice, setProcessingVoice] = useState(false);
  
  // NEW: State and refs for voice visualization
  const [micVolume, setMicVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null); // To hold the speech recognition instance

  // Manual transaction form state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [manualTransaction, setManualTransaction] = useState({
    desc: "",
    amount: "",
    category: "" as TransactionCategory | "",
  });

  // FIXED: Initialize auth without profile calls
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user: currentUser } = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
      setAuthLoading(false);
    };

    initAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
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

  // NEW: Function to stop audio processing and clean up resources
  const stopAudioProcessing = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    micStreamRef.current?.getTracks().forEach(track => track.stop());
    audioContextRef.current?.close();
    setMicVolume(0);
    setIsListening(false);
  };

  // MODIFIED: Speech recognition function now includes audio visualization
  const startNativeSpeechRecognition = async () => {
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    
    if (!SpeechRecognition) {
      setVoiceStatus("Speech recognition not supported in this browser");
      return;
    }

    // --- Start of Web Audio API Setup ---
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const visualize = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (const amplitude of dataArray) {
          sum += amplitude * amplitude;
        }
        const average = Math.sqrt(sum / dataArray.length);
        // Normalize the volume to a 0-1 range for the visualizer
        const normalizedVolume = Math.min(average / 100, 1);
        setMicVolume(normalizedVolume);
        animationFrameRef.current = requestAnimationFrame(visualize);
      };
      visualize();

    } catch (err) {
      console.error("Error accessing microphone for visualization:", err);
      setVoiceStatus("Microphone access denied. Please allow it.");
      return;
    }
    // --- End of Web Audio API Setup ---

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setVoiceStatus('Listening...');
    };

    recognition.onresult = async (event) => {
      stopAudioProcessing(); // Stop visualization once a result is received
      const transcript = event.results[0][0].transcript;
      console.log('Speech recognition result:', transcript);
      
      setProcessingVoice(true);
      setVoiceStatus('🧠 AI is processing your expense...');
      
      try {
        const parsedExpense = await parseExpenseWithAI(transcript);
        console.log('Final parsed result:', parsedExpense);
        
        if (parsedExpense.amount > 0) {
          const newTransaction: Transaction = {
            desc: parsedExpense.description,
            amount: parsedExpense.amount,
            category: parsedExpense.category,
            method: 'Voice',
            icon: getIconForTransaction(parsedExpense.description, parsedExpense.category),
          };
          
          console.log('Creating transaction:', newTransaction);
          const createdTransaction = await createTransaction(newTransaction, user.id);
          setTransactions(prev => [createdTransaction, ...prev]);
          setVoiceStatus(`✅ Logged: ₹${parsedExpense.amount} for ${parsedExpense.description}`);
        } else {
          setVoiceStatus('⚠️ Could not detect an amount in your description');
        }
      } catch (error) {
        console.error("Error processing voice input:", error);
        setVoiceStatus('⚠️ Error processing your expense. Please try again.');
      }
      
      setProcessingVoice(false);
      setTimeout(() => setVoiceStatus("Click the button to describe your expense"), 4000);
    };

    recognition.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
      stopAudioProcessing();
      setVoiceStatus(`⚠️ Error: ${event.error}`);
      setTimeout(() => setVoiceStatus("Click the button to describe your expense"), 3000);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      stopAudioProcessing();
      if (!processingVoice) {
        setTimeout(() => setVoiceStatus("Click the button to describe your expense"), 2000);
      }
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      stopAudioProcessing();
      setVoiceStatus("Error starting voice recognition");
    }
  };

  const handleVoiceLogging = () => {
    if (!user) {
      setVoiceStatus("Please sign in to use voice logging");
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop(); // This will trigger the onend event which handles cleanup
      setVoiceStatus("Voice logging stopped");
    } else {
      startNativeSpeechRecognition();
    }
  };
  
  // ... (rest of the component is unchanged)

  const handleGmailSync = async () => {
    if (!user) {
      setGmailStatus("Please sign in to sync Gmail");
      return;
    }
    
    setGmailStatus("📧 Scanning inbox with AI...");
    
    const sampleGmailTransactions = [
      { desc: "Amazon Purchase - Electronics", amount: 2499, category: 'Shopping & Personal Care' as TransactionCategory },
      { desc: "Netflix Subscription", amount: 649, category: 'Entertainment & Leisure' as TransactionCategory },
      { desc: "Swiggy Food Order", amount: 389, category: 'Food & Groceries' as TransactionCategory },
      { desc: "Uber Ride Payment", amount: 245, category: 'Transportation' as TransactionCategory },
      { desc: "Electricity Bill Payment", amount: 1850, category: 'Housing & Utilities' as TransactionCategory },
      { desc: "PharmEasy Medicine Order", amount: 567, category: 'Health & Fitness' as TransactionCategory },
    ];
    
    setTimeout(async () => {
      try {
        const randomTransaction = sampleGmailTransactions[Math.floor(Math.random() * sampleGmailTransactions.length)];
        
        const newTransaction: Transaction = {
          desc: randomTransaction.desc,
          amount: randomTransaction.amount,
          category: randomTransaction.category,
          method: 'Gmail',
          icon: getIconForTransaction(randomTransaction.desc, randomTransaction.category),
        };

        const createdTransaction = await createTransaction(newTransaction, user.id);
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

  // Loading states
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
      <div 
        className="absolute inset-0 opacity-10"
        style={{
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
            {user?.user_metadata?.full_name && (
              <p className="text-sm opacity-70 mt-1">Welcome, {user.user_metadata.full_name}</p>
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
                <span>AI Voice Logger</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center">Describe your expense - our AI will understand and categorize it.</p>
              
              {/* MODIFIED: Replaced static text with the new VoiceVisualizer */}
              <div className="flex flex-col items-center justify-center min-h-[160px]">
                <VoiceVisualizer isListening={isListening} volume={micVolume} />
                {voiceStatus && (
                  <div className="text-center mt-4 p-2 rounded-lg text-sm font-semibold">
                    {voiceStatus}
                  </div>
                )}
              </div>

              <Button 
                onClick={handleVoiceLogging} 
                className={`w-full py-6 text-lg ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : processingVoice 
                      ? 'bg-orange-500 hover:bg-orange-600' 
                      : ''
                }`}
                disabled={processingVoice}
              >
                {processingVoice ? (
                  <>
                    <Brain className="w-5 h-5 mr-3 animate-pulse" />
                    Processing with AI...
                  </>
                ) : isListening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-3" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-3" />
                    Start Voice Logging
                    <Sparkles className="w-4 h-4 ml-3" />
                  </>
                )}
              </Button>
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
                <div className="text-center p-4 rounded-xl bg-gray-800 border border-cyan-500/20">
                  <div className="font-bold text-lg">
                    {gmailStatus}
                  </div>
                  {gmailStatus.includes("Scanning") && user?.email && (
                    <div className="mt-2 p-2 bg-green-900/30 border border-green-700/50 rounded-lg text-green-400 text-sm">
                      Gmail Connected: {user.email}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

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
                              {getCategoryEmoji(category)} {category}
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
                  <div key={transaction.id || index} className="flex items-center justify-between p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-cyan-400/20 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl">{transaction.icon}</span>
                      </div>
                      <div>
                        <div className="font-bold">{transaction.desc}</div>
                        <div className="text-sm flex items-center space-x-3">
                          <span className="text-gray-400">{formatTransactionTime(transaction.created_at)}</span>
                          <Badge variant="outline" className={
                            transaction.method === 'Voice' ? 'border-cyan-500 text-cyan-400' :
                            transaction.method === 'Gmail' ? 'border-green-500 text-green-400' :
                            'border-gray-500 text-gray-400'
                          }>
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
                      <Badge variant="outline" className="text-xs">
                        {getCategoryEmoji(transaction.category)} {transaction.category}
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

