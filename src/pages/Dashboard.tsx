import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Sparkles,
  Calculator,
  Zap,
  Brain,
  Rocket,
  BarChart3,
  Activity
} from "lucide-react";
import dashboardBg from "@/assets/dashboard-bg.jpg";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState("");
  const [personality, setPersonality] = useState("");
  const [portfolio, setPortfolio] = useState<{[key: string]: number} | null>(null);
  const [simulationInput, setSimulationInput] = useState("");
  const [simulationResult, setSimulationResult] = useState("");

  useEffect(() => {
    // TODO: replace with Supabase query
    fetchAnalysis();
    fetchPersonality();
    fetchPortfolio();
  }, []);

  const fetchAnalysis = async () => {
    // TODO: replace with Supabase query
    // const { data } = await supabase.from("analysis").select("*");
    setAnalysis("Market looks bullish 📈");
  };

  const fetchPersonality = async () => {
    // TODO: replace with Supabase query
    // const { data } = await supabase.from("user_personality").select("*");
    setPersonality("Risk-Taker");
  };

  const fetchPortfolio = async () => {
    // TODO: replace with Supabase query
    // const { data } = await supabase.from("portfolio").select("*");
    setPortfolio({
      stocks: 40,
      crypto: 20,
      bonds: 25,
      cash: 15
    });
  };

  const handleSimulation = () => {
    const savings = parseFloat(simulationInput);
    if (savings) {
      const yearlyReturn = savings * 12 * 1.12; // 12% annual return
      const fiveYearProjection = yearlyReturn * 5 * 1.08; // Compound growth
      setSimulationResult(`₹${fiveYearProjection.toLocaleString()} in 5 years`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyberpunk Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${dashboardBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
        <div className="flex items-center justify-between mb-8 animate-slide-up">
          <div>
            <h1 className="text-4xl font-space font-black text-glow mb-2">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">Command Center</span>
            </h1>
            <p className="text-muted-foreground font-inter">Your financial empire awaits</p>
          </div>
          <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl glow-primary">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-space font-semibold text-primary">AI Powered</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 glass glow-primary mb-8">
            <TabsTrigger value="overview" className="font-space font-semibold">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-oracle" className="font-space font-semibold">
              <Brain className="w-4 h-4 mr-2" />
              AI Oracle
            </TabsTrigger>
            <TabsTrigger value="risk-profile" className="font-space font-semibold">
              <Target className="w-4 h-4 mr-2" />
              Risk Profile
            </TabsTrigger>
            <TabsTrigger value="empire-value" className="font-space font-semibold">
              <Rocket className="w-4 h-4 mr-2" />
              Empire Value
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="font-space font-semibold">
              <PieChart className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="simulator" className="font-space font-semibold">
              <Calculator className="w-4 h-4 mr-2" />
              Simulator
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Stats Cards */}
              <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth hover-float">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-space">
                    <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                      <Brain className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-glow">AI Market Oracle</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl mb-4 font-space font-bold text-primary text-glow animate-pulse-glow">
                      {analysis || "Analyzing..."}
                    </div>
                    <p className="text-sm text-muted-foreground font-inter">
                      Neural network analysis of 10M+ data points
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass glow-accent hover:glow-secondary transition-all duration-smooth hover-float">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-space">
                    <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
                      <Target className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <span className="text-glow">Investor DNA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl font-space font-bold text-accent mb-4 text-glow animate-pulse-glow">
                      {personality || "Scanning..."}
                    </div>
                    <p className="text-sm text-muted-foreground font-inter">
                      Psychological profile based on behavior
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass glow-success hover:glow-primary transition-all duration-smooth hover-float">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 font-space">
                    <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center glow-success">
                      <Rocket className="w-5 h-5 text-success-foreground" />
                    </div>
                    <span className="text-glow">Empire Value</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-4xl font-space font-black text-success mb-4 text-glow animate-pulse-glow">₹2,45,000</div>
                    <div className="flex items-center justify-center text-sm glass px-3 py-1 rounded-full">
                      <TrendingUp className="w-4 h-4 text-success mr-2" />
                      <span className="text-success font-semibold font-space">+12.5% this month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}
            <Card className="glass glow-cyber">
              <CardHeader>
                <CardTitle className="font-space text-glow">Portfolio Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 glass rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url(${dashboardBg})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="relative z-10 text-center">
                    <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6 glow-primary animate-float" />
                    <p className="text-2xl font-space font-bold text-primary text-glow mb-2">
                      Advanced Analytics Loading
                    </p>
                    <p className="text-muted-foreground font-inter">
                      Neural network processing your financial data...
                    </p>
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Oracle Tab */}
          <TabsContent value="ai-oracle" className="space-y-8">
            <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
                    <Brain className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="text-glow">AI Market Oracle</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-5xl mb-6 font-space font-black text-primary text-glow animate-pulse-glow">
                    {analysis || "Analyzing..."}
                  </div>
                  <p className="text-xl text-muted-foreground font-inter mb-8">
                    Neural network analysis of 10M+ data points across global markets
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
                      <div className="text-3xl mb-3">📊</div>
                      <h3 className="font-space font-bold text-lg mb-2">Market Sentiment</h3>
                      <p className="text-primary font-bold text-2xl">Bullish</p>
                    </div>
                    <div className="p-6 glass rounded-2xl glow-secondary hover:glow-primary transition-all duration-smooth">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-space font-bold text-lg mb-2">Confidence Level</h3>
                      <p className="text-secondary font-bold text-2xl">94%</p>
                    </div>
                    <div className="p-6 glass rounded-2xl glow-accent hover:glow-success transition-all duration-smooth">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="font-space font-bold text-lg mb-2">Risk Level</h3>
                      <p className="text-accent font-bold text-2xl">Moderate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Profile Tab */}
          <TabsContent value="risk-profile" className="space-y-8">
            <Card className="glass glow-accent hover:glow-secondary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
                    <Target className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <span className="text-glow">Investor DNA Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-5xl font-space font-black text-accent mb-6 text-glow animate-pulse-glow">
                    {personality || "Scanning..."}
                  </div>
                  <p className="text-xl text-muted-foreground font-inter mb-8">
                    Psychological profile based on your trading behavior and risk preferences
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 glass rounded-2xl glow-accent hover:glow-primary transition-all duration-smooth">
                      <h3 className="font-space font-bold text-xl mb-4 text-accent">Risk Tolerance</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-space font-semibold">High Risk Appetite</span>
                          <span className="font-space font-bold text-accent">85%</span>
                        </div>
                        <Progress value={85} className="h-3 glass" />
                      </div>
                    </div>
                    <div className="p-8 glass rounded-2xl glow-secondary hover:glow-accent transition-all duration-smooth">
                      <h3 className="font-space font-bold text-xl mb-4 text-secondary">Investment Style</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-inter">Aggressive Growth</span>
                          <span className="text-secondary font-bold">70%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-inter">Value Investing</span>
                          <span className="text-secondary font-bold">20%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-inter">Conservative</span>
                          <span className="text-secondary font-bold">10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Empire Value Tab */}
          <TabsContent value="empire-value" className="space-y-8">
            <Card className="glass glow-success hover:glow-primary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center glow-success animate-pulse-glow">
                    <Rocket className="w-7 h-7 text-success-foreground" />
                  </div>
                  <span className="text-glow">Empire Valuation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-6xl font-space font-black text-success mb-6 text-glow animate-pulse-glow">₹2,45,000</div>
                  <div className="flex items-center justify-center text-lg glass px-6 py-3 rounded-full mb-8">
                    <TrendingUp className="w-6 h-6 text-success mr-3" />
                    <span className="text-success font-semibold font-space">+12.5% this month</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 glass rounded-2xl glow-success hover:glow-primary transition-all duration-smooth">
                      <div className="text-3xl mb-3">💰</div>
                      <h3 className="font-space font-bold text-lg mb-2">Total Assets</h3>
                      <p className="text-success font-bold text-2xl">₹2,45,000</p>
                    </div>
                    <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
                      <div className="text-3xl mb-3">📈</div>
                      <h3 className="font-space font-bold text-lg mb-2">Monthly Growth</h3>
                      <p className="text-primary font-bold text-2xl">+12.5%</p>
                    </div>
                    <div className="p-6 glass rounded-2xl glow-accent hover:glow-secondary transition-all duration-smooth">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-space font-bold text-lg mb-2">Goal Progress</h3>
                      <p className="text-accent font-bold text-2xl">68%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-8">
            <Card className="glass glow-primary hover:glow-secondary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
                    <PieChart className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="text-glow">Asset Distribution Matrix</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {portfolio && Object.entries(portfolio).map(([asset, percentage]) => (
                      <div key={asset} className="space-y-3">
                        <div className="flex justify-between text-lg">
                          <span className="capitalize font-space font-semibold text-foreground flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-3 ${
                              asset === 'stocks' ? 'bg-primary glow-primary' :
                              asset === 'crypto' ? 'bg-accent glow-accent' :
                              asset === 'bonds' ? 'bg-secondary glow-secondary' :
                              'bg-success glow-success'
                            }`} />
                            {asset}
                          </span>
                          <span className="font-space font-bold text-primary text-xl">{percentage}%</span>
                        </div>
                        <Progress 
                          value={percentage as number} 
                          className="h-4 glass"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
                      <h3 className="font-space font-bold text-xl mb-4">Portfolio Insights</h3>
                      <div className="space-y-4 text-sm font-inter">
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                          Stocks dominate your portfolio at 40% - good for growth
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                          Crypto allocation at 20% shows risk appetite
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
                          Bonds provide stability with 25% allocation
                        </p>
                        <p className="flex items-center">
                          <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
                          Cash reserves at 15% for opportunities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-8">
            <Card className="glass glow-accent hover:glow-primary transition-all duration-smooth">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 font-space text-2xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
                    <Calculator className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <span className="text-glow">Wealth Simulator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="max-w-2xl mx-auto">
                  <div className="space-y-6">
                    <div>
                      <label className="text-lg font-space font-semibold mb-4 block text-foreground">
                        Monthly Investment Amount (₹)
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter amount..."
                        value={simulationInput}
                        onChange={(e) => setSimulationInput(e.target.value)}
                        className="glass border-primary/20 focus:glow-primary font-space text-lg h-14"
                      />
                    </div>
                    <Button onClick={handleSimulation} className="w-full glow-primary bg-gradient-primary hover:glow-accent font-space font-bold text-xl py-6">
                      <Zap className="w-6 h-6 mr-3" />
                      Calculate Future Empire
                    </Button>
                    {simulationResult && (
                      <div className="text-center p-8 glass glow-success rounded-xl">
                        <div className="text-4xl font-space font-black text-success text-glow mb-4">
                          {simulationResult}
                        </div>
                        <p className="text-lg text-muted-foreground font-inter mb-6">
                          Projected wealth with AI-optimized 12% returns
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 glass rounded-xl">
                            <div className="text-2xl mb-2">🎯</div>
                            <div className="font-space font-bold text-success">Target Achieved</div>
                          </div>
                          <div className="p-4 glass rounded-xl">
                            <div className="text-2xl mb-2">📊</div>
                            <div className="font-space font-bold text-primary">12% Annual Return</div>
                          </div>
                          <div className="p-4 glass rounded-xl">
                            <div className="text-2xl mb-2">⚡</div>
                            <div className="font-space font-bold text-accent">AI Optimized</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}