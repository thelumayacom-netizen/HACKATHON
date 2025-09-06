import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Mail, 
  Sparkles,
  Brain,
  Zap,
  CreditCard,
  Wallet,
  Receipt
} from "lucide-react";
import cyberPattern from "@/assets/cyber-pattern.jpg";

export default function Expenses() {
  const [voiceStatus, setVoiceStatus] = useState("");
  const [gmailStatus, setGmailStatus] = useState("");

  const handleVoiceLogging = () => {
    setVoiceStatus("🎤 Neural voice processing...");
    setTimeout(() => {
      setVoiceStatus("✅ Expense logged: ₹250 Uber ride 🚗");
      setTimeout(() => setVoiceStatus(""), 3000);
    }, 2000);
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
      {/* Cyberpunk Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${cyberPattern})`,
          backgroundSize: '350px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-space font-black text-glow mb-2">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">Expense Matrix</span>
            </h1>
            <p className="text-muted-foreground font-inter">AI-powered spending control center</p>
          </div>
          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl glow-primary">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-space font-semibold text-primary">Neural Analysis</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth hover-float">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 font-space">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                  <Mic className="w-5 h-5 text-primary-foreground animate-pulse" />
                </div>
                <span className="text-glow">Voice Command Center</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground font-inter leading-relaxed">
                <Zap className="w-4 h-4 inline mr-2 text-primary" />
                Log expenses instantly with neural voice recognition
              </p>
              <Button onClick={handleVoiceLogging} className="w-full glow-primary bg-gradient-primary hover:glow-accent font-space font-bold text-lg py-6">
                <Mic className="w-5 h-5 mr-3 animate-pulse" />
                Start Voice Logging
                <Sparkles className="w-4 h-4 ml-3" />
              </Button>
              {voiceStatus && (
                <div className="text-center p-4 glass glow-primary rounded-xl">
                  <div className="text-primary font-space font-bold text-lg">
                    {voiceStatus}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass glow-secondary hover:glow-primary transition-all duration-smooth hover-float">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 font-space">
                <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center glow-secondary">
                  <Mail className="w-5 h-5 text-secondary-foreground animate-pulse" />
                </div>
                <span className="text-glow">Gmail AI Scanner</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground font-inter leading-relaxed">
                <Brain className="w-4 h-4 inline mr-2 text-secondary" />
                Auto-extract transactions from your email using AI
              </p>
              <Button onClick={handleGmailSync} className="w-full glow-secondary bg-gradient-secondary hover:glow-primary font-space font-bold text-lg py-6">
                <Mail className="w-5 h-5 mr-3 animate-pulse" />
                Sync Gmail Transactions
                <Zap className="w-4 h-4 ml-3" />
              </Button>
              {gmailStatus && (
                <div className="text-center p-4 glass glow-secondary rounded-xl">
                  <div className="text-secondary font-space font-bold text-lg">
                    {gmailStatus}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>


        {/* Recent Transactions */}
        <Card className="glass glow-primary mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 font-space">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                <Receipt className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-glow">Transaction Feed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { desc: "Uber Ride to Office", amount: "₹250", category: "Transport", time: "2 hours ago", method: "Voice", icon: "🚗" },
                { desc: "Starbucks Venti Latte", amount: "₹420", category: "Food", time: "5 hours ago", method: "Gmail", icon: "☕" },
                { desc: "Netflix Premium", amount: "₹799", category: "Entertainment", time: "1 day ago", method: "Gmail", icon: "🎬" },
                { desc: "BigBasket Groceries", amount: "₹1,250", category: "Food", time: "2 days ago", method: "Voice", icon: "🛒" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 glass rounded-xl hover:glow-primary transition-all duration-smooth hover-float">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-cyber flex items-center justify-center glow-primary">
                      <span className="text-2xl">{transaction.icon}</span>
                    </div>
                    <div>
                      <div className="font-space font-bold text-foreground">{transaction.desc}</div>
                      <div className="text-sm text-muted-foreground flex items-center space-x-3 font-inter">
                        <span>{transaction.time}</span>
                        <Badge className={`text-xs font-space font-bold ${
                          transaction.method === 'Voice' ? 'glow-primary bg-gradient-primary text-primary-foreground' : 
                          'glow-secondary bg-gradient-secondary text-secondary-foreground'
                        }`}>
                          {transaction.method === 'Voice' ? '🎤' : '📧'} {transaction.method}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-space font-bold text-xl text-foreground">{transaction.amount}</div>
                    <Badge variant="outline" className="text-xs glass border-primary/20 font-space">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card className="glass glow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 font-space">
              <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center glow-primary">
                <Wallet className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-glow">Spending Distribution Matrix</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Food & Dining", amount: "₹8,500", color: "bg-gradient-accent", icon: "🍕" },
                { name: "Transport", amount: "₹3,200", color: "bg-gradient-primary", icon: "🚗" },
                { name: "Entertainment", amount: "₹2,100", color: "bg-gradient-secondary", icon: "🎬" },
                { name: "Shopping", amount: "₹5,800", color: "bg-gradient-success", icon: "🛍️" },
              ].map((category, index) => (
                <div key={index} className="text-center p-6 glass rounded-2xl hover:glow-primary transition-all duration-smooth hover-float">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} mx-auto mb-4 flex items-center justify-center glow-primary animate-pulse-glow`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div className="font-space font-semibold text-sm mb-2 text-muted-foreground">{category.name}</div>
                  <div className="text-2xl font-space font-black text-foreground text-glow">{category.amount}</div>
                  <div className="text-xs text-muted-foreground font-inter mt-2">This month</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}