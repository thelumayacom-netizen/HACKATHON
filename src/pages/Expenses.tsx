import { useEffect, useState } from "react";

// Assuming these are from your UI library like shadcn/ui
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Brain,
  Mail,
  Mic,
  Receipt,
  Sparkles,
  Zap
} from "lucide-react";

// Note: For this component to work, you must add the annyang script to your main index.html file:
// <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>

// --- TYPE DEFINITION for our transactions ---
interface Transaction {
  desc: string;
  amount: string;
  category: string;
  time: string;
  method: 'Voice' | 'Gmail';
  icon: string;
}

// --- Let TypeScript know that annyang will be on the window object ---
declare global {
  interface Window {
    annyang: any;
  }
}

// --- Initial Data ---
const initialTransactions: Transaction[] = [
  { desc: "Starbucks Venti Latte", amount: "₹420", category: "Food", time: "5 hours ago", method: "Gmail", icon: "☕" },
  { desc: "Netflix Premium", amount: "₹799", category: "Entertainment", time: "1 day ago", method: "Gmail", icon: "🎬" },
  { desc: "BigBasket Groceries", amount: "₹1,250", category: "Food", time: "2 days ago", method: "Gmail", icon: "🛒" },
];

/**
 * A helper function to intelligently pick an icon based on the expense description.
 * @param description - The description of the expense.
 * @returns A relevant emoji icon.
 */
const getIconForDescription = (description: string): string => {
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes('uber') || lowerDesc.includes('ola') || lowerDesc.includes('ride') || lowerDesc.includes('taxi')) return '🚗';
  if (lowerDesc.includes('coffee') || lowerDesc.includes('starbucks') || lowerDesc.includes('cafe')) return '☕';
  if (lowerDesc.includes('food') || lowerDesc.includes('lunch') || lowerDesc.includes('dinner') || lowerDesc.includes('swiggy') || lowerDesc.includes('zomato')) return '🍕';
  if (lowerDesc.includes('groceries') || lowerDesc.includes('basket')) return '🛒';
  if (lowerDesc.includes('movie') || lowerDesc.includes('netflix') || lowerDesc.includes('cinema')) return '🎬';
  if (lowerDesc.includes('shopping') || lowerDesc.includes('clothes')) return '🛍️';
  return '🧾'; // Default icon
};


export default function Expenses() {
  const [voiceStatus, setVoiceStatus] = useState("Click the button to log an expense");
  const [gmailStatus, setGmailStatus] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  // --- ANNYANG VOICE COMMAND INTEGRATION ---
  useEffect(() => {
    // Access annyang from the global window object
    const annyang = window.annyang;

    // Check if annyang is available
    if (annyang) {
      // Define the voice command we want to listen for
      const commands = {
        'add expense :amount rupees for *description': (amount: string, description: string) => {
          const numericAmount = parseFloat(amount);
          
          if (!isNaN(numericAmount)) {
            const newTransaction: Transaction = {
              desc: description.charAt(0).toUpperCase() + description.slice(1),
              amount: `₹${numericAmount.toLocaleString('en-IN')}`,
              category: 'Uncategorized', // You could add more logic to categorize this
              time: 'Just now',
              method: 'Voice' as 'Voice',
              icon: getIconForDescription(description),
            };
            
            // Add the new transaction to the top of the list
            setTransactions(prev => [newTransaction, ...prev]);
            setVoiceStatus(`✅ Logged: ₹${numericAmount} for ${description}`);
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
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleVoiceLogging = () => {
    if (window.annyang) {
      // Start listening.
      // autoRestart: false and continuous: false means it stops after one phrase.
      window.annyang.start({ autoRestart: false, continuous: false });
    }
  };

  const handleGmailSync = () => {
    setGmailStatus("📧 Scanning inbox with AI...");
    setTimeout(() => {
      setGmailStatus("✅ Found & parsed 2 new transactions 💰");
      setTimeout(() => setGmailStatus(""), 3000);
    }, 2000);
  };

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
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <Brain className="w-5 h-5 text-primary" />
            <span>Neural Analysis</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
                </div>
              )}
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
            <div className="space-y-4">
              {/* The list now renders from state */}
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">{transaction.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold">{transaction.desc}</div>
                      <div className="text-sm flex items-center space-x-3">
                        <span>{transaction.time}</span>
                        <Badge>
                          {transaction.method === 'Voice' ? '🎤' : '📧'} {transaction.method}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">{transaction.amount}</div>
                    <Badge variant="outline">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Placeholder for the rest of your UI */}

      </div>
    </div>
  );
}