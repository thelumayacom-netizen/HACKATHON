// import dashboardBg from "@/assets/dashboard-bg.jpg";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Activity,
//   Brain,
//   Calculator,
//   PieChart,
//   Rocket,
//   Sparkles,
//   Target,
//   TrendingUp,
//   Zap
// } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Dashboard() {
//   const [analysis, setAnalysis] = useState("");
//   const [personality, setPersonality] = useState("");
//   const [portfolio, setPortfolio] = useState<{[key: string]: number} | null>(null);
//   const [simulationInput, setSimulationInput] = useState("");
//   const [simulationResult, setSimulationResult] = useState("");

//   useEffect(() => {
//     // TODO: replace with Supabase query
//     fetchAnalysis();
//     fetchPersonality();
//     fetchPortfolio();
//   }, []);

//   const fetchAnalysis = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("analysis").select("*");
//     setAnalysis("Market looks bullish 📈");
//   };

//   const fetchPersonality = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("user_personality").select("*");
//     setPersonality("Risk-Taker");
//   };

//   const fetchPortfolio = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("portfolio").select("*");
//     setPortfolio({
//       stocks: 40,
//       crypto: 20,
//       bonds: 25,
//       cash: 15
//     });
//   };

//   const handleSimulation = () => {
//     const savings = parseFloat(simulationInput);
//     if (savings) {
//       const yearlyReturn = savings * 12 * 1.12; // 12% annual return
//       const fiveYearProjection = yearlyReturn * 5 * 1.08; // Compound growth
//       setSimulationResult(`₹${fiveYearProjection.toLocaleString()} in 5 years`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* Cyberpunk Background */}
//       <div 
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: `url(${dashboardBg})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundAttachment: 'fixed'
//         }}
//       />

//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8 animate-slide-up">
//           <div>
//             <h1 className="text-4xl font-space font-black text-glow mb-2">
//               <span className="bg-gradient-cyber bg-clip-text text-transparent">Command Center</span>
//             </h1>
//             <p className="text-muted-foreground font-inter">Your financial empire awaits</p>
//           </div>
//           <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl glow-primary">
//             <Sparkles className="w-5 h-5 text-primary animate-pulse" />
//             <span className="font-space font-semibold text-primary">AI Powered</span>
//           </div>
//         </div>

//         <Tabs defaultValue="overview" className="w-full">
//           <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 glass glow-primary mb-8">
//             <TabsTrigger value="overview" className="font-space font-semibold">
//               <Activity className="w-4 h-4 mr-2" />
//               Overview
//             </TabsTrigger>
//             <TabsTrigger value="ai-oracle" className="font-space font-semibold">
//               <Brain className="w-4 h-4 mr-2" />
//               AI Oracle
//             </TabsTrigger>
//             <TabsTrigger value="risk-profile" className="font-space font-semibold">
//               <Target className="w-4 h-4 mr-2" />
//               Risk Profile
//             </TabsTrigger>
//             <TabsTrigger value="empire-value" className="font-space font-semibold">
//               <Rocket className="w-4 h-4 mr-2" />
//               Empire Value
//             </TabsTrigger>
//             <TabsTrigger value="portfolio" className="font-space font-semibold">
//               <PieChart className="w-4 h-4 mr-2" />
//               Portfolio
//             </TabsTrigger>
//             <TabsTrigger value="simulator" className="font-space font-semibold">
//               <Calculator className="w-4 h-4 mr-2" />
//               Simulator
//             </TabsTrigger>
//           </TabsList>

//           {/* Overview Tab */}
//           <TabsContent value="overview" className="space-y-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Quick Stats Cards */}
//               <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth hover-float">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-3 font-space">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
//                       <Brain className="w-5 h-5 text-primary-foreground" />
//                     </div>
//                     <span className="text-glow">AI Market Oracle</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-6">
//                     <div className="text-3xl mb-4 font-space font-bold text-primary text-glow animate-pulse-glow">
//                       {analysis || "Analyzing..."}
//                     </div>
//                     <p className="text-sm text-muted-foreground font-inter">
//                       Neural network analysis of 10M+ data points
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="glass glow-accent hover:glow-secondary transition-all duration-smooth hover-float">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-3 font-space">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
//                       <Target className="w-5 h-5 text-accent-foreground" />
//                     </div>
//                     <span className="text-glow">Investor DNA</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-6">
//                     <div className="text-3xl font-space font-bold text-accent mb-4 text-glow animate-pulse-glow">
//                       {personality || "Scanning..."}
//                     </div>
//                     <p className="text-sm text-muted-foreground font-inter">
//                       Psychological profile based on behavior
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card className="glass glow-success hover:glow-primary transition-all duration-smooth hover-float">
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-3 font-space">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center glow-success">
//                       <Rocket className="w-5 h-5 text-success-foreground" />
//                     </div>
//                     <span className="text-glow">Empire Value</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-center py-6">
//                     <div className="text-4xl font-space font-black text-success mb-4 text-glow animate-pulse-glow">₹2,45,000</div>
//                     <div className="flex items-center justify-center text-sm glass px-3 py-1 rounded-full">
//                       <TrendingUp className="w-4 h-4 text-success mr-2" />
//                       <span className="text-success font-semibold font-space">+12.5% this month</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Performance Chart Placeholder */}
//             <Card className="glass glow-cyber">
//               <CardHeader>
//                 <CardTitle className="font-space text-glow">Portfolio Performance Matrix</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 glass rounded-2xl flex items-center justify-center relative overflow-hidden">
//                   <div 
//                     className="absolute inset-0 opacity-10"
//                     style={{
//                       backgroundImage: `url(${dashboardBg})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center'
//                     }}
//                   />
//                   <div className="relative z-10 text-center">
//                     <TrendingUp className="w-16 h-16 text-primary mx-auto mb-6 glow-primary animate-float" />
//                     <p className="text-2xl font-space font-bold text-primary text-glow mb-2">
//                       Advanced Analytics Loading
//                     </p>
//                     <p className="text-muted-foreground font-inter">
//                       Neural network processing your financial data...
//                     </p>
//                     <div className="mt-4 flex justify-center space-x-2">
//                       <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
//                       <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//                       <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* AI Oracle Tab */}
//           <TabsContent value="ai-oracle" className="space-y-8">
//             <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 font-space text-2xl">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
//                     <Brain className="w-7 h-7 text-primary-foreground" />
//                   </div>
//                   <span className="text-glow">AI Market Oracle</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 <div className="text-center py-12">
//                   <div className="text-5xl mb-6 font-space font-black text-primary text-glow animate-pulse-glow">
//                     {analysis || "Analyzing..."}
//                   </div>
//                   <p className="text-xl text-muted-foreground font-inter mb-8">
//                     Neural network analysis of 10M+ data points across global markets
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
//                       <div className="text-3xl mb-3">📊</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Market Sentiment</h3>
//                       <p className="text-primary font-bold text-2xl">Bullish</p>
//                     </div>
//                     <div className="p-6 glass rounded-2xl glow-secondary hover:glow-primary transition-all duration-smooth">
//                       <div className="text-3xl mb-3">🎯</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Confidence Level</h3>
//                       <p className="text-secondary font-bold text-2xl">94%</p>
//                     </div>
//                     <div className="p-6 glass rounded-2xl glow-accent hover:glow-success transition-all duration-smooth">
//                       <div className="text-3xl mb-3">⚡</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Risk Level</h3>
//                       <p className="text-accent font-bold text-2xl">Moderate</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Risk Profile Tab */}
//           <TabsContent value="risk-profile" className="space-y-8">
//             <Card className="glass glow-accent hover:glow-secondary transition-all duration-smooth">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 font-space text-2xl">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
//                     <Target className="w-7 h-7 text-accent-foreground" />
//                   </div>
//                   <span className="text-glow">Investor DNA Analysis</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 <div className="text-center py-12">
//                   <div className="text-5xl font-space font-black text-accent mb-6 text-glow animate-pulse-glow">
//                     {personality || "Scanning..."}
//                   </div>
//                   <p className="text-xl text-muted-foreground font-inter mb-8">
//                     Psychological profile based on your trading behavior and risk preferences
//                   </p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="p-8 glass rounded-2xl glow-accent hover:glow-primary transition-all duration-smooth">
//                       <h3 className="font-space font-bold text-xl mb-4 text-accent">Risk Tolerance</h3>
//                       <div className="space-y-4">
//                         <div className="flex justify-between text-sm">
//                           <span className="font-space font-semibold">High Risk Appetite</span>
//                           <span className="font-space font-bold text-accent">85%</span>
//                         </div>
//                         <Progress value={85} className="h-3 glass" />
//                       </div>
//                     </div>
//                     <div className="p-8 glass rounded-2xl glow-secondary hover:glow-accent transition-all duration-smooth">
//                       <h3 className="font-space font-bold text-xl mb-4 text-secondary">Investment Style</h3>
//                       <div className="space-y-3">
//                         <div className="flex items-center justify-between">
//                           <span className="font-inter">Aggressive Growth</span>
//                           <span className="text-secondary font-bold">70%</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="font-inter">Value Investing</span>
//                           <span className="text-secondary font-bold">20%</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <span className="font-inter">Conservative</span>
//                           <span className="text-secondary font-bold">10%</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Empire Value Tab */}
//           <TabsContent value="empire-value" className="space-y-8">
//             <Card className="glass glow-success hover:glow-primary transition-all duration-smooth">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 font-space text-2xl">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-success flex items-center justify-center glow-success animate-pulse-glow">
//                     <Rocket className="w-7 h-7 text-success-foreground" />
//                   </div>
//                   <span className="text-glow">Empire Valuation</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 <div className="text-center py-12">
//                   <div className="text-6xl font-space font-black text-success mb-6 text-glow animate-pulse-glow">₹2,45,000</div>
//                   <div className="flex items-center justify-center text-lg glass px-6 py-3 rounded-full mb-8">
//                     <TrendingUp className="w-6 h-6 text-success mr-3" />
//                     <span className="text-success font-semibold font-space">+12.5% this month</span>
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div className="p-6 glass rounded-2xl glow-success hover:glow-primary transition-all duration-smooth">
//                       <div className="text-3xl mb-3">💰</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Total Assets</h3>
//                       <p className="text-success font-bold text-2xl">₹2,45,000</p>
//                     </div>
//                     <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
//                       <div className="text-3xl mb-3">📈</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Monthly Growth</h3>
//                       <p className="text-primary font-bold text-2xl">+12.5%</p>
//                     </div>
//                     <div className="p-6 glass rounded-2xl glow-accent hover:glow-secondary transition-all duration-smooth">
//                       <div className="text-3xl mb-3">🎯</div>
//                       <h3 className="font-space font-bold text-lg mb-2">Goal Progress</h3>
//                       <p className="text-accent font-bold text-2xl">68%</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Portfolio Tab */}
//           <TabsContent value="portfolio" className="space-y-8">
//             <Card className="glass glow-primary hover:glow-secondary transition-all duration-smooth">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 font-space text-2xl">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
//                     <PieChart className="w-7 h-7 text-primary-foreground" />
//                   </div>
//                   <span className="text-glow">Asset Distribution Matrix</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                   <div className="space-y-6">
//                     {portfolio && Object.entries(portfolio).map(([asset, percentage]) => (
//                       <div key={asset} className="space-y-3">
//                         <div className="flex justify-between text-lg">
//                           <span className="capitalize font-space font-semibold text-foreground flex items-center">
//                             <div className={`w-4 h-4 rounded-full mr-3 ${
//                               asset === 'stocks' ? 'bg-primary glow-primary' :
//                               asset === 'crypto' ? 'bg-accent glow-accent' :
//                               asset === 'bonds' ? 'bg-secondary glow-secondary' :
//                               'bg-success glow-success'
//                             }`} />
//                             {asset}
//                           </span>
//                           <span className="font-space font-bold text-primary text-xl">{percentage}%</span>
//                         </div>
//                         <Progress 
//                           value={percentage as number} 
//                           className="h-4 glass"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                   <div className="space-y-6">
//                     <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth">
//                       <h3 className="font-space font-bold text-xl mb-4">Portfolio Insights</h3>
//                       <div className="space-y-4 text-sm font-inter">
//                         <p className="flex items-center">
//                           <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
//                           Stocks dominate your portfolio at 40% - good for growth
//                         </p>
//                         <p className="flex items-center">
//                           <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
//                           Crypto allocation at 20% shows risk appetite
//                         </p>
//                         <p className="flex items-center">
//                           <span className="w-2 h-2 bg-secondary rounded-full mr-3"></span>
//                           Bonds provide stability with 25% allocation
//                         </p>
//                         <p className="flex items-center">
//                           <span className="w-2 h-2 bg-success rounded-full mr-3"></span>
//                           Cash reserves at 15% for opportunities
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>

//           {/* Simulator Tab */}
//           <TabsContent value="simulator" className="space-y-8">
//             <Card className="glass glow-accent hover:glow-primary transition-all duration-smooth">
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-3 font-space text-2xl">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
//                     <Calculator className="w-7 h-7 text-accent-foreground" />
//                   </div>
//                   <span className="text-glow">Wealth Simulator</span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-8">
//                 <div className="max-w-2xl mx-auto">
//                   <div className="space-y-6">
//                     <div>
//                       <label className="text-lg font-space font-semibold mb-4 block text-foreground">
//                         Monthly Investment Amount (₹)
//                       </label>
//                       <Input
//                         type="number"
//                         placeholder="Enter amount..."
//                         value={simulationInput}
//                         onChange={(e) => setSimulationInput(e.target.value)}
//                         className="glass border-primary/20 focus:glow-primary font-space text-lg h-14"
//                       />
//                     </div>
//                     <Button onClick={handleSimulation} className="w-full glow-primary bg-gradient-primary hover:glow-accent font-space font-bold text-xl py-6">
//                       <Zap className="w-6 h-6 mr-3" />
//                       Calculate Future Empire
//                     </Button>
//                     {simulationResult && (
//                       <div className="text-center p-8 glass glow-success rounded-xl">
//                         <div className="text-4xl font-space font-black text-success text-glow mb-4">
//                           {simulationResult}
//                         </div>
//                         <p className="text-lg text-muted-foreground font-inter mb-6">
//                           Projected wealth with AI-optimized 12% returns
//                         </p>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div className="p-4 glass rounded-xl">
//                             <div className="text-2xl mb-2">🎯</div>
//                             <div className="font-space font-bold text-success">Target Achieved</div>
//                           </div>
//                           <div className="p-4 glass rounded-xl">
//                             <div className="text-2xl mb-2">📊</div>
//                             <div className="font-space font-bold text-primary">12% Annual Return</div>
//                           </div>
//                           <div className="p-4 glass rounded-xl">
//                             <div className="text-2xl mb-2">⚡</div>
//                             <div className="font-space font-bold text-accent">AI Optimized</div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }



////NEWW


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Brain,
  Calculator,
  PieChart,
  Rocket,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { portfolioService, type PortfolioDistribution, type AdditionalHoldings } from "@/lib/portfolioService.ts";
import { authService } from "@/lib/auth.ts";

export default function Dashboard() {
  const [analysis, setAnalysis] = useState("");
  const [personality, setPersonality] = useState("");
  const [portfolioDistribution, setPortfolioDistribution] = useState<PortfolioDistribution | null>(null);
  const [additionalHoldings, setAdditionalHoldings] = useState<AdditionalHoldings>({
    user_id: '',
    cash_amount: 0,
    miscellaneous_amount: 0 // Remove crypto_amount
  });
  const [isEditingHoldings, setIsEditingHoldings] = useState(false);
  const [tempHoldings, setTempHoldings] = useState<{ cash: string; misc: string }>({
    cash: '',
    misc: '' // Remove crypto field
  });
  const [cryptoHoldings, setCryptoHoldings] = useState([]);
  const [simulationInput, setSimulationInput] = useState("");
  const [simulationResult, setSimulationResult] = useState("");
  const [simulatorMode, setSimulatorMode] = useState('wealth');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [years, setYears] = useState('10');
  const [targetAmount, setTargetAmount] = useState('');
  const [goalName, setGoalName] = useState('');
  const [results, setResults] = useState(null);
  const [expenseDistribution, setExpenseDistribution] = useState<ExpenseDistribution | null>(null);
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false);

  useEffect(() => {
    // TODO: replace with Supabase query
    fetchAnalysis();
    fetchPersonality();
    fetchPortfolio();
    fetchExpenseDistribution(); // Add this line
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
    try {
      const { user } = await authService.getCurrentUser();
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      // Fetch portfolio distribution
      const distributionResult = await portfolioService.getPortfolioDistribution(user.id);
      if (distributionResult.error) {
        console.error('Error fetching portfolio distribution:', distributionResult.error);
      } else {
        setPortfolioDistribution(distributionResult.data);
      }

      // Fetch crypto holdings from WazirX
      const cryptoResult = await portfolioService.getCryptoHoldings(user.id);
      if (cryptoResult.error) {
        console.error('Error fetching crypto from WazirX:', cryptoResult.error);
      } else {
        setCryptoHoldings(cryptoResult.data || []);
      }

      // Fetch additional holdings (cash and misc only)
      const holdingsResult = await portfolioService.getAdditionalHoldings(user.id);
      if (holdingsResult.error) {
        console.error('Error fetching additional holdings:', holdingsResult.error);
      } else {
        const holdings = holdingsResult.data || { cash_amount: 0, miscellaneous_amount: 0 };
        setAdditionalHoldings({ ...holdings, user_id: user.id });
        setTempHoldings({
          cash: holdings.cash_amount?.toString() || '0',
          misc: holdings.miscellaneous_amount?.toString() || '0'
        });
      }
    } catch (error) {
      console.error('Error in fetchPortfolio:', error);
    }
  };

  const fetchExpenseDistribution = async () => {
    try {
      setIsLoadingExpenses(true);
      const { user } = await authService.getCurrentUser();
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      // Fetch expense distribution for last 30 days
      const expenseResult = await portfolioService.getExpenseDistribution(user.id, 30);
      if (expenseResult.error) {
        console.error('Error fetching expense distribution:', expenseResult.error);
      } else {
        setExpenseDistribution(expenseResult.data);
      }
    } catch (error) {
      console.error('Error in fetchExpenseDistribution:', error);
    } finally {
      setIsLoadingExpenses(false);
    }
  };

  const handleUpdateHoldings = async () => {
    try {
      const { user } = await authService.getCurrentUser();
      if (!user) return;

      const updatedHoldings = {
        cash_amount: parseFloat(tempHoldings.cash) || 0,
        miscellaneous_amount: parseFloat(tempHoldings.misc) || 0,
        // Remove crypto_amount
      };

      const result = await portfolioService.updateAdditionalHoldings(user.id, updatedHoldings);

      if (result.error) {
        console.error('Error updating holdings:', result.error);
        return;
      }

      setAdditionalHoldings({ ...updatedHoldings, user_id: user.id });
      setIsEditingHoldings(false);

      // Refresh portfolio distribution
      await fetchPortfolio();
    } catch (error) {
      console.error('Error updating holdings:', error);
    }
  };


  const handleSimulation = () => {
    const savings = parseFloat(simulationInput);
    if (savings) {
      const yearlyReturn = savings * 12 * 1.12; // 12% annual return
      const fiveYearProjection = yearlyReturn * 5 * 1.08; // Compound growth
      setSimulationResult(`₹${fiveYearProjection.toLocaleString()} in 5 years`);
    }
  };



  const popularGoals = [
    { name: 'iPhone 15 Pro', amount: 134900 },
    { name: 'Car Down Payment', amount: 200000 },
    { name: 'Europe Trip', amount: 300000 },
    { name: 'Laptop', amount: 80000 },
    { name: 'Emergency Fund', amount: 500000 }
  ];

  const calculateCompoundInterest = (principal, monthlyContribution, annualRate, years) => {
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;

    // Future value of initial principal
    const futureValuePrincipal = principal * Math.pow(1 + monthlyRate, totalMonths);

    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);

    return futureValuePrincipal + futureValueContributions;
  };

  const calculateTimeToGoal = (monthlyInvestment, targetAmount, annualRate) => {
    const monthlyRate = annualRate / 12 / 100;
    const months = Math.log(1 + (targetAmount * monthlyRate) / monthlyInvestment) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const handleWealthCalculation = () => {
    const monthly = parseFloat(monthlyInvestment) || 0;
    const timeYears = parseFloat(years) || 10;

    const conservativeRate = 8; // 8% for conservative
    const moderateRate = 12; // 12% for moderate
    const aggressiveRate = 15; // 15% for aggressive

    const conservative = calculateCompoundInterest(0, monthly, conservativeRate, timeYears);
    const moderate = calculateCompoundInterest(0, monthly, moderateRate, timeYears);
    const aggressive = calculateCompoundInterest(0, monthly, aggressiveRate, timeYears);

    const totalInvested = monthly * timeYears * 12;

    setResults({
      type: 'wealth',
      conservative: Math.round(conservative),
      moderate: Math.round(moderate),
      aggressive: Math.round(aggressive),
      totalInvested,
      monthlyAmount: monthly,
      timeYears
    });
  };

  const handleGoalCalculation = () => {
    const target = parseFloat(targetAmount) || 0;
    const monthly = parseFloat(monthlyInvestment) || 0;

    if (target === 0 || monthly === 0) return;

    const conservativeMonths = calculateTimeToGoal(monthly, target, 8);
    const moderateMonths = calculateTimeToGoal(monthly, target, 12);
    const aggressiveMonths = calculateTimeToGoal(monthly, target, 15);

    setResults({
      type: 'goal',
      target,
      monthlyAmount: monthly,
      goalName: goalName || 'Your Goal',
      conservative: conservativeMonths,
      moderate: moderateMonths,
      aggressive: aggressiveMonths
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatMonths = (months) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
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
              <span style={{ color: '#00ffff' }}>Command Center</span>
            </h1>
            <p>Your financial empire awaits</p>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <Brain className="w-5 h-5 text-primary" />
            <span>AI Powered</span>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="ai-oracle">
              <Brain className="w-4 h-4 mr-2" />
              AI Oracle
            </TabsTrigger>
            {/* <TabsTrigger value="risk-profile">
              <Target className="w-4 h-4 mr-2" />
              Risk Profile
            </TabsTrigger> */}
            <TabsTrigger value="empire-value">
              <Rocket className="w-4 h-4 mr-2" />
              Empire Value
            </TabsTrigger>
            <TabsTrigger value="portfolio">
              <PieChart className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="simulator">
              <Calculator className="w-4 h-4 mr-2" />
              Simulator
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Stats Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                      <Brain className="w-5 h-5" style={{ color: '#00ffff' }} />
                    </div>
                    <span>AI Market Oracle</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl mb-4 font-bold" style={{ color: '#00ffff' }}>
                      {analysis || "Analyzing..."}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Neural network analysis of 10M+ data points
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                      <Target className="w-5 h-5" style={{ color: '#00ffff' }} />
                    </div>
                    <span>Investor DNA</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-3xl font-bold mb-4" style={{ color: '#00ffff' }}>
                      {personality || "Scanning..."}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Psychological profile based on behavior
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                      <Rocket className="w-5 h-5" style={{ color: '#00ffff' }} />
                    </div>
                    <span>Empire Value</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <div className="text-4xl font-bold mb-4" style={{ color: '#00ffff' }}>₹2,45,000</div>
                    <div className="flex items-center justify-center text-sm p-2 rounded-full">
                      <TrendingUp className="w-4 h-4 mr-2" style={{ color: '#00ffff' }} />
                      <span className="font-semibold" style={{ color: '#00ffff' }}>+12.5% this month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Chart Placeholder */}

            {/* Expense Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Expense Distribution (Last 30 Days)</span>
                  {isLoadingExpenses && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                      <span className="text-sm text-muted-foreground">Loading...</span>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {expenseDistribution && expenseDistribution.expenses.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Circular Pie Chart */}
                    <div className="flex flex-col items-center space-y-6">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>
                          ₹{expenseDistribution.totalExpenses.toLocaleString('en-IN')}
                        </div>
                        <p className="text-sm text-muted-foreground">Total Expenses</p>
                      </div>

                      {/* SVG Pie Chart */}
                      <div className="relative">
                        <svg width="280" height="280" viewBox="0 0 280 280" className="transform -rotate-90">
                          <circle
                            cx="140"
                            cy="140"
                            r="120"
                            fill="transparent"
                            stroke="#1f2937"
                            strokeWidth="2"
                          />
                          {(() => {
                            const colors = [
                              '#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1',
                              '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
                            ];
                            let cumulativePercentage = 0;
                            const radius = 120;
                            const circumference = 2 * Math.PI * radius;

                            return expenseDistribution.expenses.map((expense, index) => {
                              const strokeDasharray = `${(expense.percentage / 100) * circumference} ${circumference}`;
                              const strokeDashoffset = -cumulativePercentage * circumference / 100;
                              const color = colors[index % colors.length];

                              cumulativePercentage += expense.percentage;

                              return (
                                <circle
                                  key={expense.category}
                                  cx="140"
                                  cy="140"
                                  r={radius}
                                  fill="transparent"
                                  stroke={color}
                                  strokeWidth="24"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-300 hover:stroke-width-28"
                                />
                              );
                            });
                          })()}

                          {/* Center circle for better visual */}
                          <circle
                            cx="140"
                            cy="140"
                            r="80"
                            fill="#0a0a0a"
                            stroke="#1f2937"
                            strokeWidth="2"
                          />
                        </svg>

                        {/* Center text */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-xl font-bold" style={{ color: '#00ffff' }}>
                              {expenseDistribution.expenses.length}
                            </div>
                            <div className="text-xs text-muted-foreground">Categories</div>
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="grid grid-cols-2 gap-2 max-w-sm">
                        {expenseDistribution.expenses.map((expense, index) => {
                          const colors = [
                            '#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1',
                            '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'
                          ];
                          const color = colors[index % colors.length];

                          return (
                            <div key={expense.category} className="flex items-center space-x-2 text-xs">
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: color }}
                              />
                              <span className="truncate text-muted-foreground">
                                {expense.category.length > 15
                                  ? expense.category.substring(0, 15) + '...'
                                  : expense.category
                                }
                              </span>
                              <span className="font-semibold ml-auto" style={{ color }}>
                                {expense.percentage}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expense Details and Insights */}
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl border border-gray-800">
                        <h3 className="font-bold text-xl mb-4 flex items-center">
                          <PieChart className="w-5 h-5 mr-2" style={{ color: '#00ffff' }} />
                          Category Breakdown
                        </h3>
                        <div className="space-y-4">
                          {expenseDistribution.expenses.slice(0, 5).map((expense, index) => {
                            const colors = [
                              '#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'
                            ];
                            const color = colors[index % colors.length];

                            return (
                              <div key={expense.category} className="flex items-center justify-between p-3 rounded-lg border border-gray-800">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  <div>
                                    <p className="font-medium text-sm">{expense.category}</p>
                                    <p className="text-xs text-muted-foreground">
                                      ₹{expense.amount.toLocaleString('en-IN')}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg" style={{ color }}>
                                    {expense.percentage}%
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-gray-800 text-center">
                          <div className="text-2xl font-bold mb-1" style={{ color: '#00ffff' }}>
                            ₹{Math.round(expenseDistribution.totalExpenses / 30).toLocaleString('en-IN')}
                          </div>
                          <p className="text-xs text-muted-foreground">Daily Average</p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-800 text-center">
                          <div className="text-2xl font-bold mb-1" style={{ color: '#00ffff' }}>
                            {expenseDistribution.expenses[0]?.percentage || 0}%
                          </div>
                          <p className="text-xs text-muted-foreground">Top Category</p>
                        </div>
                      </div>

                      {/* Top Category Highlight */}
                      {expenseDistribution.expenses[0] && (
                        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Highest Spending</p>
                              <p className="text-lg font-bold" style={{ color: '#00ffff' }}>
                                {expenseDistribution.expenses[0].category}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Amount</p>
                              <p className="text-xl font-bold" style={{ color: '#00ffff' }}>
                                ₹{expenseDistribution.expenses[0].amount.toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Spending Insight */}
                      <div className="p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2 bg-yellow-500"></div>
                          <div>
                            <p className="font-medium text-sm">Spending Insight</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Your top 3 categories represent {' '}
                              {expenseDistribution.expenses.slice(0, 3).reduce((sum, exp) => sum + exp.percentage, 0)}%
                              {' '} of your total expenses. Consider reviewing these areas for potential savings.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-80 rounded-2xl flex items-center justify-center border border-gray-800">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 mx-auto mb-6" style={{ color: '#00ffff' }} />
                      <p className="text-2xl font-bold mb-2" style={{ color: '#00ffff' }}>
                        {isLoadingExpenses ? 'Loading Expenses...' : 'No Expenses Found'}
                      </p>
                      <p className="text-muted-foreground">
                        {isLoadingExpenses
                          ? 'Analyzing your spending patterns...'
                          : 'Start tracking expenses to see your spending distribution'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Oracle Tab */}
          <TabsContent value="ai-oracle" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                    <Brain className="w-7 h-7" style={{ color: '#00ffff' }} />
                  </div>
                  <span>AI Market Oracle</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-5xl mb-6 font-bold" style={{ color: '#00ffff' }}>
                    {analysis || "Analyzing..."}
                  </div>
                  <p className="text-xl text-muted-foreground mb-8">
                    Neural network analysis of 10M+ data points across global markets
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">📊</div>
                      <h3 className="font-bold text-lg mb-2">Market Sentiment</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>Bullish</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-bold text-lg mb-2">Confidence Level</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>94%</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">⚡</div>
                      <h3 className="font-bold text-lg mb-2">Risk Level</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>Moderate</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Risk Profile Tab */}
          {/* <TabsContent value="risk-profile" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                    <Target className="w-7 h-7" style={{ color: '#00ffff' }} />
                  </div>
                  <span>Investor DNA Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-5xl font-bold mb-6" style={{ color: '#00ffff' }}>
                    {personality || "Scanning..."}
                  </div>
                  <p className="text-xl text-muted-foreground mb-8">
                    Psychological profile based on your trading behavior and risk preferences
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-2xl border border-gray-800">
                      <h3 className="font-bold text-xl mb-4" style={{ color: '#00ffff' }}>Risk Tolerance</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">High Risk Appetite</span>
                          <span className="font-bold" style={{ color: '#00ffff' }}>85%</span>
                        </div>
                        <Progress value={85} className="h-3" />
                      </div>
                    </div>
                    <div className="p-8 rounded-2xl border border-gray-800">
                      <h3 className="font-bold text-xl mb-4" style={{ color: '#00ffff' }}>Investment Style</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Aggressive Growth</span>
                          <span className="font-bold" style={{ color: '#00ffff' }}>70%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Value Investing</span>
                          <span className="font-bold" style={{ color: '#00ffff' }}>20%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Conservative</span>
                          <span className="font-bold" style={{ color: '#00ffff' }}>10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          {/* Empire Value Tab */}
          <TabsContent value="empire-value" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                    <Rocket className="w-7 h-7" style={{ color: '#00ffff' }} />
                  </div>
                  <span>Empire Valuation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center py-12">
                  <div className="text-6xl font-bold mb-6" style={{ color: '#00ffff' }}>₹2,45,000</div>
                  <div className="flex items-center justify-center text-lg px-6 py-3 rounded-full mb-8">
                    <TrendingUp className="w-6 h-6 mr-3" style={{ color: '#00ffff' }} />
                    <span className="font-semibold" style={{ color: '#00ffff' }}>+12.5% this month</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">💰</div>
                      <h3 className="font-bold text-lg mb-2">Total Assets</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>₹2,45,000</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">📈</div>
                      <h3 className="font-bold text-lg mb-2">Monthly Growth</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>+12.5%</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-gray-800">
                      <div className="text-3xl mb-3">🎯</div>
                      <h3 className="font-bold text-lg mb-2">Goal Progress</h3>
                      <p className="font-bold text-2xl" style={{ color: '#00ffff' }}>68%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                      <PieChart className="w-7 h-7" style={{ color: '#00ffff' }} />
                    </div>
                    <span>Asset Distribution Matrix</span>
                  </div>
                  <Button
                    onClick={() => setIsEditingHoldings(!isEditingHoldings)}
                    variant="outline"
                    size="sm"
                  >
                    {isEditingHoldings ? 'Cancel' : 'Edit Holdings'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {isEditingHoldings ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Change from 3 to 2 columns */}
                      <div>
                        <label className="text-sm font-medium mb-2 block">Cash Amount (₹)</label>
                        <Input
                          type="number"
                          value={tempHoldings.cash}
                          onChange={(e) => setTempHoldings(prev => ({ ...prev, cash: e.target.value }))}
                          placeholder="Enter cash amount"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Miscellaneous (₹)</label>
                        <Input
                          type="number"
                          value={tempHoldings.misc}
                          onChange={(e) => setTempHoldings(prev => ({ ...prev, misc: e.target.value }))}
                          placeholder="Enter misc amount"
                        />
                      </div>
                      {/* Remove crypto input field */}
                    </div>
                    <div className="flex space-x-4">
                      <Button onClick={handleUpdateHoldings} className="flex-1">
                        Save Holdings
                      </Button>
                      <Button
                        onClick={() => setIsEditingHoldings(false)}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {portfolioDistribution && Object.entries(portfolioDistribution)
                        .filter(([key]) => key !== 'total')
                        .map(([asset, percentage], index) => {
                          const colors = ['#00ffff', '#ff6b6b', '#4ecdc4', '#45b7d1'];
                          const color = colors[index % colors.length];

                          return (
                            <div key={asset} className="space-y-3">
                              <div className="flex justify-between text-lg">
                                <span className="capitalize font-semibold flex items-center">
                                  <div
                                    className="w-4 h-4 rounded-full mr-3"
                                    style={{ backgroundColor: color }}
                                  />
                                  {asset === 'miscellaneous' ? 'Miscellaneous' : asset}
                                  {asset === 'crypto' && (
                                    <span className="text-xs text-muted-foreground ml-2">(WazirX)</span>
                                  )}
                                  {asset === 'stocks' && (
                                    <span className="text-xs text-muted-foreground ml-2">(Live)</span>
                                  )}
                                </span>
                                <span className="font-bold text-xl" style={{ color }}>
                                  {percentage}%
                                </span>
                              </div>
                              <Progress value={percentage as number} className="h-4" />
                            </div>
                          );
                        })}
                    </div>
                    <div className="space-y-6">
                      <div className="p-6 rounded-2xl border border-gray-800">
                        <h3 className="font-bold text-xl mb-4">Portfolio Insights</h3>
                        <div className="space-y-4 text-sm">
                          <p className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00ffff' }}></span>
                            {portfolioDistribution?.stocks
                              ? `Stocks represent ${portfolioDistribution.stocks}% of your portfolio`
                              : 'No stock holdings detected'}
                          </p>
                          <p className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#ff6b6b' }}></span>
                            {portfolioDistribution?.crypto
                              ? `Crypto allocation at ${portfolioDistribution.crypto}% (WazirX integration)`
                              : 'No crypto holdings'}
                          </p>
                          <p className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#4ecdc4' }}></span>
                            {portfolioDistribution?.cash
                              ? `Cash reserves at ${portfolioDistribution.cash}% for liquidity`
                              : 'No cash holdings'}
                          </p>
                          <p className="flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#45b7d1' }}></span>
                            {portfolioDistribution?.miscellaneous
                              ? `Miscellaneous assets at ${portfolioDistribution.miscellaneous}%`
                              : 'No miscellaneous holdings'}
                          </p>
                        </div>
                      </div>

                      {/* WazirX Crypto Holdings Section */}
                      {cryptoHoldings.length > 0 && (
                        <div className="p-6 rounded-2xl border border-gray-800">
                          <h3 className="font-bold text-xl mb-4 flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#ff6b6b' }}></span>
                            WazirX Holdings
                            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              Live Sync
                            </span>
                          </h3>
                          <div className="space-y-3 text-sm">
                            {cryptoHoldings.map((crypto, index) => (
                              <div key={crypto.id} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-b-0">
                                <div>
                                  <span className="font-semibold">{crypto.crypto_name}</span>
                                  <span className="text-muted-foreground ml-2">({crypto.crypto_symbol})</span>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold" style={{ color: '#ff6b6b' }}>
                                    ₹{crypto.current_value_inr?.toLocaleString('en-IN') || '0'}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {crypto.quantity} {crypto.crypto_symbol}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {portfolioDistribution && (
                        <div className="p-6 rounded-2xl border border-gray-800">
                          <h3 className="font-bold text-xl mb-4">Total Portfolio Value</h3>
                          <div className="text-center">
                            <div className="text-3xl font-bold mb-2" style={{ color: '#00ffff' }}>
                              ₹{portfolioDistribution.total.toLocaleString('en-IN')}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Across {Object.entries(portfolioDistribution).filter(([key, value]) => key !== 'total' && value > 0).length} asset classes
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                    <Calculator className="w-7 h-7" style={{ color: '#00ffff' }} />
                  </div>
                  <span>Smart Wealth Simulator</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="max-w-4xl mx-auto">
                  {/* Mode Selection */}
                  <div className="flex space-x-4 mb-8">
                    <Button
                      onClick={() => setSimulatorMode('wealth')}
                      variant={simulatorMode === 'wealth' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Build Wealth
                    </Button>
                    <Button
                      onClick={() => setSimulatorMode('goal')}
                      variant={simulatorMode === 'goal' ? 'default' : 'outline'}
                      className="flex-1"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Reach Goal
                    </Button>
                  </div>

                  {simulatorMode === 'wealth' ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-lg font-semibold mb-2 block">
                            Monthly Investment (₹)
                          </label>
                          <Input
                            type="number"
                            placeholder="e.g., 5000"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(e.target.value)}
                            className="text-lg h-12"
                          />
                        </div>
                        <div>
                          <label className="text-lg font-semibold mb-2 block">
                            Investment Period (Years)
                          </label>
                          <Input
                            type="number"
                            placeholder="e.g., 10"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="text-lg h-12"
                          />
                        </div>
                      </div>
                      <Button onClick={handleWealthCalculation} className="w-full font-bold text-xl py-6">
                        <Zap className="w-6 h-6 mr-3" />
                        Calculate Wealth Growth
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-lg font-semibold mb-2 block">
                            Goal Name
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g., iPhone, Car, Trip"
                            value={goalName}
                            onChange={(e) => setGoalName(e.target.value)}
                            className="text-lg h-12"
                          />
                        </div>
                        <div>
                          <label className="text-lg font-semibold mb-2 block">
                            Target Amount (₹)
                          </label>
                          <Input
                            type="number"
                            placeholder="e.g., 134900"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="text-lg h-12"
                          />
                        </div>
                      </div>

                      {/* Popular Goals */}
                      <div>
                        <label className="text-sm font-medium mb-3 block text-muted-foreground">
                          Popular Goals (Click to select)
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {popularGoals.map((goal, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setGoalName(goal.name);
                                setTargetAmount(goal.amount.toString());
                              }}
                              className="text-xs p-2 h-auto"
                            >
                              <div className="text-center">
                                <div className="font-semibold">{goal.name}</div>
                                <div className="text-muted-foreground">{formatCurrency(goal.amount)}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-lg font-semibold mb-2 block">
                          Monthly Investment (₹)
                        </label>
                        <Input
                          type="number"
                          placeholder="e.g., 5000"
                          value={monthlyInvestment}
                          onChange={(e) => setMonthlyInvestment(e.target.value)}
                          className="text-lg h-12"
                        />
                      </div>

                      <Button onClick={handleGoalCalculation} className="w-full font-bold text-xl py-6">
                        <Target className="w-6 h-6 mr-3" />
                        Calculate Time to Goal
                      </Button>
                    </div>
                  )}

                  {/* Results */}
                  {results && (
                    <div className="mt-8 p-6 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900/50 to-transparent">
                      {results.type === 'wealth' ? (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">Your Wealth Journey</h3>
                            <p className="text-muted-foreground">
                              Investing {formatCurrency(results.monthlyAmount)}/month for {results.timeYears} years
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Total Investment: {formatCurrency(results.totalInvested)}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                              <div className="text-center">
                                <div className="text-green-400 font-bold text-2xl">
                                  {formatCurrency(results.conservative)}
                                </div>
                                <div className="text-sm text-green-400 mt-1">Conservative (8%)</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {Math.round((results.conservative - results.totalInvested) / results.totalInvested * 100)}% growth
                                </div>
                              </div>
                            </div>

                            <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                              <div className="text-center">
                                <div className="text-blue-400 font-bold text-2xl">
                                  {formatCurrency(results.moderate)}
                                </div>
                                <div className="text-sm text-blue-400 mt-1">Moderate (12%)</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {Math.round((results.moderate - results.totalInvested) / results.totalInvested * 100)}% growth
                                </div>
                              </div>
                            </div>

                            <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
                              <div className="text-center">
                                <div className="text-purple-400 font-bold text-2xl">
                                  {formatCurrency(results.aggressive)}
                                </div>
                                <div className="text-sm text-purple-400 mt-1">Aggressive (15%)</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {Math.round((results.aggressive - results.totalInvested) / results.totalInvested * 100)}% growth
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">Time to Reach: {results.goalName}</h3>
                            <p className="text-muted-foreground">
                              Target: {formatCurrency(results.target)} | Monthly: {formatCurrency(results.monthlyAmount)}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg border border-green-500/30 bg-green-500/10">
                              <div className="text-center">
                                <div className="text-green-400 font-bold text-xl">
                                  {formatMonths(results.conservative)}
                                </div>
                                <div className="text-sm text-green-400 mt-1">Conservative (8%)</div>
                              </div>
                            </div>

                            <div className="p-4 rounded-lg border border-blue-500/30 bg-blue-500/10">
                              <div className="text-center">
                                <div className="text-blue-400 font-bold text-xl">
                                  {formatMonths(results.moderate)}
                                </div>
                                <div className="text-sm text-blue-400 mt-1">Moderate (12%)</div>
                              </div>
                            </div>

                            <div className="p-4 rounded-lg border border-purple-500/30 bg-purple-500/10">
                              <div className="text-center">
                                <div className="text-purple-400 font-bold text-xl">
                                  {formatMonths(results.aggressive)}
                                </div>
                                <div className="text-sm text-purple-400 mt-1">Aggressive (15%)</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                            <div className="text-center text-sm">
                              <span className="text-cyan-400 font-medium">💡 Pro Tip:</span>
                              <span className="text-muted-foreground ml-2">
                                Higher returns come with higher risk. Diversify your investments!
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

