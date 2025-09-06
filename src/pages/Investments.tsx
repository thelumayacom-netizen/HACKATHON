import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign,
  Brain,
  CheckCircle,
  Zap,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  BarChart3,
  Lightbulb
} from "lucide-react";
import cyberPattern from "@/assets/cyber-pattern.jpg";

const GEMINI_API_KEY = "AIzaSyDe6spC8MtT4nBM62eE4uvuIInIMIEX8C8";

export default function Investments() {
  const [tradingPrompt, setTradingPrompt] = useState("");
  const [tradingResponse, setTradingResponse] = useState("");
  const [tradingLoading, setTradingLoading] = useState(false);
  
  const [investmentPrompt, setInvestmentPrompt] = useState("");
  const [investmentResponse, setInvestmentResponse] = useState("");
  const [investmentLoading, setInvestmentLoading] = useState(false);

  const callGeminiAPI = async (prompt: string, context: string) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${context}\n\nUser Query: ${prompt}`
            }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Gemini API Error:', error);
      return "Error connecting to AI service. Please try again.";
    }
  };

  const handleTradingSubmit = async () => {
    if (!tradingPrompt.trim()) return;
    
    setTradingLoading(true);
    const context = `You are an AI trading assistant for StackX, a GenZ fintech app. Provide trading advice, market analysis, and investment strategies. Keep responses concise, actionable, and include emojis. Focus on stocks, crypto, and modern trading strategies suitable for young investors.`;
    
    const response = await callGeminiAPI(tradingPrompt, context);
    setTradingResponse(response);
    setTradingLoading(false);
  };

  const handleInvestmentSubmit = async () => {
    if (!investmentPrompt.trim()) return;
    
    setInvestmentLoading(true);
    const context = `You are an AI investment manager for StackX, a GenZ fintech app. Provide personalized investment advice, portfolio recommendations, and long-term wealth building strategies. Keep responses practical, educational, and include emojis. Focus on SIPs, mutual funds, ETFs, and diversified investment approaches for young professionals.`;
    
    const response = await callGeminiAPI(investmentPrompt, context);
    setInvestmentResponse(response);
    setInvestmentLoading(false);
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
              <span className="bg-gradient-cyber bg-clip-text text-transparent">AI Investment Hub</span>
            </h1>
            <p className="text-muted-foreground font-inter">Your personal AI-powered investment assistant</p>
          </div>
          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl glow-primary">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-space font-semibold text-primary">Gemini Powered</span>
          </div>
        </div>

        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-2 glass glow-primary mb-8">
            <TabsTrigger value="trading" className="font-space font-semibold">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Trading Assistant
            </TabsTrigger>
            <TabsTrigger value="investment" className="font-space font-semibold">
              <Target className="w-4 h-4 mr-2" />
              Investment Manager
            </TabsTrigger>
          </TabsList>

          {/* AI Trading Assistant Tab */}
          <TabsContent value="trading" className="space-y-8">
            <Card className="glass glow-accent hover:glow-primary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
                    <TrendingUp className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <span className="text-glow">AI Trading Oracle</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 glass rounded-2xl glow-accent">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-accent animate-pulse" />
                    <span className="font-space font-bold text-accent text-glow">Ask Your Trading Question</span>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Ask me anything about trading, market analysis, stock picks, crypto strategies, or technical analysis..."
                      value={tradingPrompt}
                      onChange={(e) => setTradingPrompt(e.target.value)}
                      className="glass border-accent/20 focus:glow-accent font-inter min-h-[100px]"
                    />
                    <Button 
                      onClick={handleTradingSubmit}
                      disabled={tradingLoading || !tradingPrompt.trim()}
                      className="w-full glow-accent bg-gradient-accent hover:glow-primary font-space font-bold text-lg py-6"
                    >
                      {tradingLoading ? (
                        <>
                          <Brain className="w-5 h-5 mr-3 animate-pulse" />
                          AI Analyzing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Get Trading Insights
                          <Sparkles className="w-4 h-4 ml-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {tradingResponse && (
                  <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="w-6 h-6 text-primary animate-pulse" />
                      <span className="font-space font-bold text-primary text-glow">AI Trading Advice</span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground font-inter leading-relaxed whitespace-pre-wrap">
                        {tradingResponse}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm glass px-3 py-2 rounded-full mt-4">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-muted-foreground font-inter">Powered by Gemini AI • Always do your own research</span>
                    </div>
                  </div>
                )}

                {/* Quick Trading Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setTradingPrompt("What are the top 3 stocks to watch this week?")}
                    className="glass cyber-border hover:glow-accent font-space p-4 h-auto text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">📈 Weekly Stock Picks</div>
                      <div className="text-sm text-muted-foreground">Get top stock recommendations</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setTradingPrompt("Analyze Bitcoin's current trend and give me a trading strategy")}
                    className="glass cyber-border hover:glow-accent font-space p-4 h-auto text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">₿ Crypto Analysis</div>
                      <div className="text-sm text-muted-foreground">Bitcoin trading strategies</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Manager Tab */}
          <TabsContent value="investment" className="space-y-8">
            <Card className="glass glow-success hover:glow-primary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center glow-success animate-pulse-glow">
                    <DollarSign className="w-7 h-7 text-success-foreground" />
                  </div>
                  <span className="text-glow">AI Investment Manager</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 glass rounded-2xl glow-success">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-success animate-pulse" />
                    <span className="font-space font-bold text-success text-glow">Plan Your Investment Journey</span>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Ask me about SIPs, mutual funds, portfolio diversification, retirement planning, or any investment strategy..."
                      value={investmentPrompt}
                      onChange={(e) => setInvestmentPrompt(e.target.value)}
                      className="glass border-success/20 focus:glow-success font-inter min-h-[100px]"
                    />
                    <Button 
                      onClick={handleInvestmentSubmit}
                      disabled={investmentLoading || !investmentPrompt.trim()}
                      className="w-full glow-success bg-gradient-success hover:glow-primary font-space font-bold text-lg py-6"
                    >
                      {investmentLoading ? (
                        <>
                          <Brain className="w-5 h-5 mr-3 animate-pulse" />
                          AI Planning...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          Get Investment Plan
                          <Sparkles className="w-4 h-4 ml-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {investmentResponse && (
                  <div className="p-6 glass rounded-2xl glow-primary hover:glow-success transition-all duration-smooth">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="w-6 h-6 text-primary animate-pulse" />
                      <span className="font-space font-bold text-primary text-glow">AI Investment Strategy</span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-foreground font-inter leading-relaxed whitespace-pre-wrap">
                        {investmentResponse}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm glass px-3 py-2 rounded-full mt-4">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-muted-foreground font-inter">Powered by Gemini AI • Personalized for your goals</span>
                    </div>
                  </div>
                )}

                {/* Quick Investment Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setInvestmentPrompt("I'm 25 years old and want to start investing ₹10,000 monthly. Create a diversified portfolio plan for me.")}
                    className="glass cyber-border hover:glow-success font-space p-4 h-auto text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">🎯 Portfolio Builder</div>
                      <div className="text-sm text-muted-foreground">Create diversified investment plan</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setInvestmentPrompt("Explain SIP vs lump sum investment. Which is better for long-term wealth creation?")}
                    className="glass cyber-border hover:glow-success font-space p-4 h-auto text-left"
                  >
                    <div>
                      <div className="font-bold mb-1">💰 SIP Strategy</div>
                      <div className="text-sm text-muted-foreground">Learn about systematic investing</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Features Showcase */}
        <Card className="glass glow-cyber mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 font-space">
              <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center glow-primary">
                <Brain className="w-5 h-5 text-primary-foreground animate-pulse" />
              </div>
              <span className="text-glow">AI Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 glass rounded-2xl hover:glow-primary transition-all duration-smooth hover-float">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center glow-primary animate-pulse-glow">
                  <BarChart3 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-space font-bold text-lg mb-2 text-glow">Market Analysis</h3>
                <p className="text-muted-foreground font-inter text-sm">
                  Real-time market insights, trend analysis, and technical indicators powered by AI
                </p>
              </div>

              <div className="text-center p-6 glass rounded-2xl hover:glow-accent transition-all duration-smooth hover-float">
                <div className="w-16 h-16 rounded-2xl bg-gradient-accent mx-auto mb-4 flex items-center justify-center glow-accent animate-pulse-glow">
                  <Target className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="font-space font-bold text-lg mb-2 text-glow">Personalized Advice</h3>
                <p className="text-muted-foreground font-inter text-sm">
                  Tailored investment strategies based on your risk profile and financial goals
                </p>
              </div>

              <div className="text-center p-6 glass rounded-2xl hover:glow-success transition-all duration-smooth hover-float">
                <div className="w-16 h-16 rounded-2xl bg-gradient-success mx-auto mb-4 flex items-center justify-center glow-success animate-pulse-glow">
                  <Zap className="w-8 h-8 text-success-foreground" />
                </div>
                <h3 className="font-space font-bold text-lg mb-2 text-glow">Instant Responses</h3>
                <p className="text-muted-foreground font-inter text-sm">
                  Get immediate answers to your investment questions 24/7 with AI assistance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}