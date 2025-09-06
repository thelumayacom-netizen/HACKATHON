import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
  Zap
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

export default function Investments() {
  const [tradingPrompt, setTradingPrompt] = useState("");
  const [tradingResponse, setTradingResponse] = useState("");
  const [tradingLoading, setTradingLoading] = useState(false);
  const [tradingHistory, setTradingHistory] = useState([]);
  
  const [investmentPrompt, setInvestmentPrompt] = useState("");
  const [investmentResponse, setInvestmentResponse] = useState("");
  const [investmentLoading, setInvestmentLoading] = useState(false);
  const [investmentHistory, setInvestmentHistory] = useState([]);

  const handleTradingSubmit = async () => {
    if (!tradingPrompt.trim()) return;
    
    const userMessage = tradingPrompt.trim();
    setTradingLoading(true);
    
    // Add user message to history
    setTradingHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setTradingPrompt("");
    
    try {
      const context = `You are an AI trading assistant for StackX, a GenZ fintech app. Provide trading advice, market analysis, and investment strategies. Keep responses concise, actionable, and include emojis. Focus on stocks, crypto, and modern trading strategies suitable for young investors.`;
      
      const response = await generateChatResponse(userMessage, context);
      
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
      const context = `You are an AI investment manager for StackX, a GenZ fintech app. Provide personalized investment advice, portfolio recommendations, and long-term wealth building strategies. Keep responses practical, educational, and include emojis. Focus on SIPs, mutual funds, ETFs, and diversified investment approaches for young professionals.`;
      
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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 pt-24 pb-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-cyan-400">AI Investment Hub</span>
          </h1>
          <p className="text-gray-400 text-lg">Your personal AI-powered investment assistant</p>
          <div className="flex items-center justify-center space-x-3 mt-4 p-3 rounded-xl bg-gray-900/50">
            <Brain className="w-6 h-6 animate-pulse text-cyan-400" />
            <span className="font-semibold text-cyan-400">Gemini Powered</span>
          </div>
        </div>

        <Tabs defaultValue="trading" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-900">
            <TabsTrigger value="trading" className="font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900">
              <TrendingUp className="w-4 h-4 mr-2" />
              AI Trading Assistant
            </TabsTrigger>
            <TabsTrigger value="investment" className="font-semibold data-[state=active]:bg-cyan-500 data-[state=active]:text-gray-900">
              <Target className="w-4 h-4 mr-2" />
              Investment Manager
            </TabsTrigger>
          </TabsList>

          {/* AI Trading Assistant Tab */}
          <TabsContent value="trading" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span>AI Trading Oracle</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Chat History */}
                {tradingHistory.length > 0 && (
                  <div className="bg-gray-800 rounded-2xl p-6 max-h-96 overflow-y-auto">
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
                  </div>
                )}

                {/* Input Section */}
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lightbulb className="w-6 h-6 animate-pulse text-cyan-400" />
                    <span className="font-bold text-cyan-400">Ask Your Trading Question</span>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Ask me anything about trading, market analysis, stock picks, crypto strategies, or technical analysis..."
                      value={tradingPrompt}
                      onChange={(e) => setTradingPrompt(e.target.value)}
                      className="min-h-[100px] bg-gray-700 border-gray-600 text-white resize-none"
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
                      className="w-full font-bold text-lg py-6 bg-cyan-500 hover:bg-cyan-600 text-gray-900"
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

                {/* Quick Trading Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickPrompt("What are the top 3 stocks to watch this week?", true)}
                    className="p-4 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                  >
                    <div>
                      <div className="font-bold mb-1">Weekly Stock Picks</div>
                      <div className="text-sm text-gray-400">Get top stock recommendations</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickPrompt("Analyze Bitcoin's current trend and give me a trading strategy", true)}
                    className="p-4 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                  >
                    <div>
                      <div className="font-bold mb-1">Crypto Analysis</div>
                      <div className="text-sm text-gray-400">Bitcoin trading strategies</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Manager Tab */}
          <TabsContent value="investment" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl text-white">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center">
                    <DollarSign className="w-7 h-7 text-cyan-400" />
                  </div>
                  <span>AI Investment Manager</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Chat History */}
                {investmentHistory.length > 0 && (
                  <div className="bg-gray-800 rounded-2xl p-6 max-h-96 overflow-y-auto">
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
                  </div>
                )}

                {/* Input Section */}
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageSquare className="w-6 h-6 animate-pulse text-cyan-400" />
                    <span className="font-bold text-cyan-400">Plan Your Investment Journey</span>
                  </div>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Ask me about SIPs, mutual funds, portfolio diversification, retirement planning, or any investment strategy..."
                      value={investmentPrompt}
                      onChange={(e) => setInvestmentPrompt(e.target.value)}
                      className="min-h-[100px] bg-gray-700 border-gray-600 text-white resize-none"
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
                      className="w-full font-bold text-lg py-6 bg-cyan-500 hover:bg-cyan-600 text-gray-900"
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

                {/* Quick Investment Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => handleQuickPrompt("I'm 25 years old and want to start investing ₹10,000 monthly. Create a diversified portfolio plan for me.", false)}
                    className="p-4 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                  >
                    <div>
                      <div className="font-bold mb-1">Portfolio Builder</div>
                      <div className="text-sm text-gray-400">Create diversified investment plan</div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleQuickPrompt("Explain SIP vs lump sum investment. Which is better for long-term wealth creation?", false)}
                    className="p-4 h-auto text-left bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                  >
                    <div>
                      <div className="font-bold mb-1">SIP Strategy</div>
                      <div className="text-sm text-gray-400">Learn about systematic investing</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Features Showcase */}
        <Card className="mt-8 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center">
                <Brain className="w-5 h-5 animate-pulse text-cyan-400" />
              </div>
              <span>AI Capabilities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gray-800">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-cyan-400/20 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Market Analysis</h3>
                <p className="text-gray-400 text-sm">
                  Real-time market insights, trend analysis, and technical indicators powered by AI
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gray-800">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-cyan-400/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Personalized Advice</h3>
                <p className="text-gray-400 text-sm">
                  Tailored investment strategies based on your risk profile and financial goals
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-gray-800">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 bg-cyan-400/20 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-white">Instant Responses</h3>
                <p className="text-gray-400 text-sm">
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