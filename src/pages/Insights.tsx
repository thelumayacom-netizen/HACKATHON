// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { 
//   Bell, 
//   AlertTriangle, 
//   Target, 
//   Calendar,
//   TrendingUp,
//   Smartphone,
//   AlertCircle,
//   CheckCircle,
//   Brain,
//   Zap,
//   Shield,
//   DollarSign
// } from "lucide-react";
// import cyberPattern from "@/assets/cyber-pattern.jpg";

// export default function Insights() {
//   const [reminders, setReminders] = useState<any>(null);

//   useEffect(() => {
//     // TODO: replace with Supabase query
//     fetchReminders();
//   }, []);

//   const fetchReminders = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("reminders").select("*");
//     setReminders({
//       sips: "₹5000 due tomorrow",
//       loan: "Home Loan EMI due in 5 days"
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* Cyberpunk Background */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `url(${cyberPattern})`,
//           backgroundSize: '400px',
//           backgroundRepeat: 'repeat'
//         }}
//       />
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8 animate-slide-up">
//           <div>
//             <h1 className="text-4xl font-space font-black text-glow mb-2">
//               <span className="bg-gradient-cyber bg-clip-text text-transparent">AI Insights Hub</span>
//             </h1>
//             <p className="text-muted-foreground font-inter">Your personal financial oracle</p>
//           </div>
//           <div className="flex items-center space-x-3 glass px-4 py-2 rounded-xl glow-primary">
//             <Brain className="w-5 h-5 text-primary animate-pulse" />
//             <span className="font-space font-semibold text-primary">Neural Processing</span>
//           </div>
//         </div>

//         {/* SIP Reminders */}
//         <Card className="glass glow-secondary hover:glow-primary transition-all duration-smooth mb-8 hover-float">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center glow-secondary">
//                 <Calendar className="w-5 h-5 text-secondary-foreground" />
//               </div>
//               <span className="text-glow">Smart Investment Alerts</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Alert className="glass border-secondary/20 bg-gradient-secondary/10 glow-secondary">
//               <Bell className="h-5 w-5 text-secondary" />
//               <AlertDescription className="text-base font-inter">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <strong className="font-space font-bold text-secondary">SIP Launch Tomorrow:</strong> {reminders?.sips || "Loading..."}
//                     <div className="mt-3 flex space-x-3">
//                       <Button size="sm" className="glow-primary bg-gradient-primary hover:glow-accent font-space font-bold">
//                         <Zap className="w-4 h-4 mr-2" />
//                         Pay Now
//                       </Button>
//                       <Button variant="outline" size="sm" className="glass cyber-border hover:glow-secondary font-space">
//                         Auto-Pay Setup
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="text-6xl opacity-20">💰</div>
//                 </div>
//               </AlertDescription>
//             </Alert>
//           </CardContent>
//         </Card>

//         {/* Spending Alert */}
//         <Card className="glass glow-accent hover:glow-primary transition-all duration-smooth mb-8 hover-float">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
//                 <AlertTriangle className="w-5 h-5 text-accent-foreground" />
//               </div>
//               <span className="text-glow">Spending Oracle</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Alert className="glass border-accent/20 bg-gradient-accent/10 glow-accent">
//               <AlertCircle className="h-5 w-5 text-accent" />
//               <AlertDescription className="text-base font-inter">
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1">
//                     <strong className="font-space font-bold text-accent">Budget Alert Triggered:</strong> 
//                     <div className="mt-2 text-foreground">This week spending = ₹12,000 (Target = ₹10,000)</div>
//                     <div className="mt-4 space-y-3">
//                       <div className="flex justify-between text-sm font-space">
//                         <span>Weekly Budget Progress</span>
//                         <span className="text-accent font-bold">120% (₹2,000 over)</span>
//                       </div>
//                       <Progress value={120} className="h-3 glass" />
//                       <div className="text-sm text-muted-foreground font-inter">
//                         💡 AI Suggestion: Skip 2 coffee runs to get back on track
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-6xl opacity-20">📊</div>
//                 </div>
//               </AlertDescription>
//             </Alert>
//           </CardContent>
//         </Card>

//         {/* Goal Progress */}
//         <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
//                 <Target className="w-5 h-5 text-primary-foreground" />
//               </div>
//               <span className="text-glow">Empire Building Progress</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-8">
//               {/* iPhone Goal */}
//               <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth hover-float">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center glow-primary animate-pulse-glow">
//                       <Smartphone className="w-8 h-8 text-primary-foreground" />
//                     </div>
//                     <div>
//                       <h3 className="font-space font-bold text-xl text-glow">iPhone 15 Pro Max</h3>
//                       <p className="text-sm text-muted-foreground font-inter">Target: ₹1,39,900</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-space font-black text-3xl text-primary text-glow">₹1,11,920</div>
//                     <div className="text-sm text-muted-foreground font-inter">80% complete</div>
//                   </div>
//                 </div>
//                 <Progress value={80} className="h-4 glass mb-4" />
//                 <div className="flex items-center text-sm">
//                   <CheckCircle className="w-5 h-5 mr-3 text-success" />
//                   <span className="font-space font-semibold text-success">You're crushing it! 80% closer to that iPhone! 📱</span>
//                 </div>
//               </div>

//               {/* Emergency Fund Goal */}
//               <div className="p-6 glass rounded-2xl glow-accent hover:glow-secondary transition-all duration-smooth hover-float">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center glow-accent animate-pulse-glow">
//                       <Shield className="w-8 h-8 text-accent-foreground" />
//                     </div>
//                     <div>
//                       <h3 className="font-space font-bold text-xl text-glow">Emergency Vault</h3>
//                       <p className="text-sm text-muted-foreground font-inter">Target: ₹5,00,000</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="font-space font-black text-3xl text-accent text-glow">₹2,25,000</div>
//                     <div className="text-sm text-muted-foreground font-inter">45% complete</div>
//                   </div>
//                 </div>
//                 <Progress value={45} className="h-4 glass mb-4" />
//                 <div className="text-sm text-muted-foreground font-inter">
//                   <DollarSign className="w-4 h-4 inline mr-2" />
//                   Keep stacking ₹15,000/month to reach financial fortress in 18 months
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Loan Reminders */}
//         <Card className="glass glow-success hover:glow-primary transition-all duration-smooth mb-8 hover-float">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-success flex items-center justify-center glow-success">
//                 <AlertCircle className="w-5 h-5 text-success-foreground" />
//               </div>
//               <span className="text-glow">Debt Management</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Alert className="glass border-success/20 bg-gradient-success/10 glow-success">
//               <AlertTriangle className="h-5 w-5 text-success" />
//               <AlertDescription className="text-base font-inter">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <strong className="font-space font-bold text-success">Payment Reminder:</strong> {reminders?.loan || "Loading..."}
//                     <div className="mt-3 flex space-x-3">
//                       <Button className="glow-success bg-gradient-success hover:glow-primary font-space font-bold" size="sm">
//                         <Zap className="w-4 h-4 mr-2" />
//                         Pay EMI
//                       </Button>
//                       <Button variant="outline" size="sm" className="glass cyber-border hover:glow-success font-space">
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="text-6xl opacity-20">🏠</div>
//                 </div>
//               </AlertDescription>
//             </Alert>
//           </CardContent>
//         </Card>

//         {/* AI Insights */}
//         <Card className="glass glow-cyber">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center glow-primary">
//                 <Brain className="w-5 h-5 text-primary-foreground animate-pulse" />
//               </div>
//               <span className="text-glow">AI Oracle Predictions</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-6">
//               <div className="p-6 glass rounded-2xl glow-primary hover:glow-accent transition-all duration-smooth hover-float">
//                 <h3 className="font-space font-bold text-primary mb-3 text-glow flex items-center">
//                   <Zap className="w-5 h-5 mr-2 animate-pulse" />
//                   💡 Optimization Hack
//                 </h3>
//                 <p className="text-muted-foreground font-inter leading-relaxed">
//                   You're spending 23% more on dining out vs last month. 
//                   Cook at home 2 more days/week = <span className="text-primary font-bold">₹3,200 monthly savings</span>! 
//                   That's iPhone money right there! 📱
//                 </p>
//               </div>

//               <div className="p-6 glass rounded-2xl glow-secondary hover:glow-primary transition-all duration-smooth hover-float">
//                 <h3 className="font-space font-bold text-secondary mb-3 text-glow flex items-center">
//                   <TrendingUp className="w-5 h-5 mr-2 animate-pulse" />
//                   📊 Investment Alpha
//                 </h3>
//                 <p className="text-muted-foreground font-inter leading-relaxed">
//                   Based on your risk DNA, allocate 15% more to equity funds. 
//                   Potential <span className="text-secondary font-bold">+2-3% annual returns</span>. 
//                   Your future self will thank you! 🚀
//                 </p>
//               </div>

//               <div className="p-6 glass rounded-2xl glow-accent hover:glow-success transition-all duration-smooth hover-float">
//                 <h3 className="font-space font-bold text-accent mb-3 text-glow flex items-center">
//                   <Target className="w-5 h-5 mr-2 animate-pulse" />
//                   🎯 Goal Crusher Mode
//                 </h3>
//                 <p className="text-muted-foreground font-inter leading-relaxed">
//                   You're <span className="text-accent font-bold">ahead of schedule</span> on iPhone savings! 
//                   Redirect ₹2,000/month to emergency fund after target achieved. 
//                   Double win strategy activated! 💪
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Brain,
  Calendar,
  CheckCircle,
  DollarSign,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Insights() {
  const [reminders, setReminders] = useState<any>(null);

  useEffect(() => {
    // TODO: replace with Supabase query
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    // TODO: replace with Supabase query
    // const { data } = await supabase.from("reminders").select("*");
    setReminders({
      sips: "₹5000 due tomorrow",
      loan: "Home Loan EMI due in 5 days"
    });
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
              <span style={{color: '#00ffff'}}>AI Insights Hub</span>
            </h1>
            <p className="text-muted-foreground">Your personal financial oracle</p>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-xl">
            <Brain className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
            <span className="font-semibold" style={{color: '#00ffff'}}>Neural Processing</span>
          </div>
        </div>

        {/* SIP Reminders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Calendar className="w-5 h-5" style={{color: '#00ffff'}} />
              </div>
              <span>Smart Investment Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-gray-800" style={{backgroundColor: '#00ffff10'}}>
              <Bell className="h-5 w-5" style={{color: '#00ffff'}} />
              <AlertDescription className="text-base">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="font-bold" style={{color: '#00ffff'}}>SIP Launch Tomorrow:</strong> {reminders?.sips || "Loading..."}
                    <div className="mt-3 flex space-x-3">
                      <Button size="sm" className="font-bold">
                        <Zap className="w-4 h-4 mr-2" />
                        Pay Now
                      </Button>
                      <Button variant="outline" size="sm">
                        Auto-Pay Setup
                      </Button>
                    </div>
                  </div>
                  <div className="text-6xl opacity-20">💰</div>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Spending Alert */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <AlertTriangle className="w-5 h-5" style={{color: '#00ffff'}} />
              </div>
              <span>Spending Oracle</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-gray-800" style={{backgroundColor: '#00ffff10'}}>
              <AlertCircle className="h-5 w-5" style={{color: '#00ffff'}} />
              <AlertDescription className="text-base">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <strong className="font-bold" style={{color: '#00ffff'}}>Budget Alert Triggered:</strong> 
                    <div className="mt-2">This week spending = ₹12,000 (Target = ₹10,000)</div>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Weekly Budget Progress</span>
                        <span className="font-bold" style={{color: '#00ffff'}}>120% (₹2,000 over)</span>
                      </div>
                      <Progress value={120} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        AI Suggestion: Skip 2 coffee runs to get back on track
                      </div>
                    </div>
                  </div>
                  <div className="text-6xl opacity-20">📊</div>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Goal Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Target className="w-5 h-5" style={{color: '#00ffff'}} />
              </div>
              <span>Empire Building Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* iPhone Goal */}
              <div className="p-6 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                      <Smartphone className="w-8 h-8" style={{color: '#00ffff'}} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">iPhone 15 Pro Max</h3>
                      <p className="text-sm text-muted-foreground">Target: ₹1,39,900</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-3xl" style={{color: '#00ffff'}}>₹1,11,920</div>
                    <div className="text-sm text-muted-foreground">80% complete</div>
                  </div>
                </div>
                <Progress value={80} className="h-4 mb-4" />
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-5 h-5 mr-3" style={{color: '#00ffff'}} />
                  <span className="font-semibold" style={{color: '#00ffff'}}>You're crushing it! 80% closer to that iPhone!</span>
                </div>
              </div>

              {/* Emergency Fund Goal */}
              <div className="p-6 rounded-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                      <Shield className="w-8 h-8" style={{color: '#00ffff'}} />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Emergency Vault</h3>
                      <p className="text-sm text-muted-foreground">Target: ₹5,00,000</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-3xl" style={{color: '#00ffff'}}>₹2,25,000</div>
                    <div className="text-sm text-muted-foreground">45% complete</div>
                  </div>
                </div>
                <Progress value={45} className="h-4 mb-4" />
                <div className="text-sm text-muted-foreground">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Keep stacking ₹15,000/month to reach financial fortress in 18 months
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Reminders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <AlertCircle className="w-5 h-5" style={{color: '#00ffff'}} />
              </div>
              <span>Debt Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="border-gray-800" style={{backgroundColor: '#00ffff10'}}>
              <AlertTriangle className="h-5 w-5" style={{color: '#00ffff'}} />
              <AlertDescription className="text-base">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="font-bold" style={{color: '#00ffff'}}>Payment Reminder:</strong> {reminders?.loan || "Loading..."}
                    <div className="mt-3 flex space-x-3">
                      <Button className="font-bold" size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Pay EMI
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="text-6xl opacity-20">🏠</div>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Brain className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
              </div>
              <span>AI Oracle Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold mb-3 flex items-center" style={{color: '#00ffff'}}>
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Optimization Hack
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You're spending 23% more on dining out vs last month. 
                  Cook at home 2 more days/week = <span className="font-bold" style={{color: '#00ffff'}}>₹3,200 monthly savings</span>! 
                  That's iPhone money right there!
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold mb-3 flex items-center" style={{color: '#00ffff'}}>
                  <TrendingUp className="w-5 h-5 mr-2 animate-pulse" />
                  Investment Alpha
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Based on your risk DNA, allocate 15% more to equity funds. 
                  Potential <span className="font-bold" style={{color: '#00ffff'}}>+2-3% annual returns</span>. 
                  Your future self will thank you!
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-gray-800">
                <h3 className="font-bold mb-3 flex items-center" style={{color: '#00ffff'}}>
                  <Target className="w-5 h-5 mr-2 animate-pulse" />
                  Goal Crusher Mode
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  You're <span className="font-bold" style={{color: '#00ffff'}}>ahead of schedule</span> on iPhone savings! 
                  Redirect ₹2,000/month to emergency fund after target achieved. 
                  Double win strategy activated!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}