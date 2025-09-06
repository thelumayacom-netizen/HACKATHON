import cyberPattern from "@/assets/cyber-pattern.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Coffee, Shield, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Cyberpunk Background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${cyberPattern})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-space font-black mb-6 leading-tight">
              <span className="bg-gradient-cyber bg-clip-text text-transparent text-glow animate-pulse-glow">
                Master Your
              </span>
              <br />
              <span className="text-foreground">Money Game</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-inter leading-relaxed">
              Level up your finances with <span className="text-primary font-semibold">AI-powered insights</span>, 
              gamified investing, and <span className="text-accent font-semibold">next-gen banking</span> for the digital generation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="group glow-primary bg-gradient-primary hover:glow-accent font-space font-bold text-lg px-8 py-4 hover-float" asChild>
              <Link to="/dashboard">
                <Zap className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Start Building Wealth
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group glass hover:glow-secondary font-space font-bold text-lg px-8 py-4 cyber-border hover-float" asChild>
              <Link to="/gamification">
                <TrendingUp className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                View Rewards
              </Link>
            </Button>
          </div>
        </div>

        {/* Daily Tip Card */}
        <Card className="max-w-3xl mx-auto mb-16 glass glow-accent hover:glow-primary transition-all duration-smooth hover-float animate-slide-up">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center flex-shrink-0 glow-accent animate-pulse-glow">
                <Coffee className="w-8 h-8 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-space font-bold mb-3 text-foreground text-glow">
                  💡 Today's Money Hack
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-3 font-inter">
                  Save ₹200 today = 1 less Starbucks ☕
                </p>
                <p className="text-primary font-semibold font-space text-lg">
                  Small saves = Big gains! 🚀 Compound that wealth!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="glass glow-primary hover:glow-secondary transition-all duration-smooth hover-float animate-slide-up">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-primary mx-auto mb-6 flex items-center justify-center glow-primary animate-float">
                <Brain className="w-10 h-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-space font-bold mb-4 text-glow">AI Money Brain</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Neural networks analyze your spending patterns and predict optimal investment moves in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="glass glow-accent hover:glow-primary transition-all duration-smooth hover-float animate-slide-up">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-accent mx-auto mb-6 flex items-center justify-center glow-accent animate-float">
                <span className="text-4xl animate-pulse">🎮</span>
              </div>
              <h3 className="text-2xl font-space font-bold mb-4 text-glow">Level Up Finances</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Unlock achievements, compete with friends, and earn rewards while building your financial empire
              </p>
            </CardContent>
          </Card>

          <Card className="glass glow-success hover:glow-accent transition-all duration-smooth hover-float animate-slide-up">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-success mx-auto mb-6 flex items-center justify-center glow-success animate-float">
                <Shield className="w-10 h-10 text-success-foreground" />
              </div>
              <h3 className="text-2xl font-space font-bold mb-4 text-glow">Crypto Secured</h3>
              <p className="text-muted-foreground font-inter leading-relaxed">
                Bank-grade security meets blockchain transparency for the ultimate digital wealth protection
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Active Users", value: "50K+", icon: "👥" },
            { label: "Money Saved", value: "₹2.5Cr", icon: "💰" },
            { label: "AI Predictions", value: "99.2%", icon: "🎯" },
            { label: "Crypto Secured", value: "100%", icon: "🔒" }
          ].map((stat, index) => (
            <Card key={index} className="glass text-center p-6 hover:glow-primary transition-all duration-smooth hover-float">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-space font-bold text-primary text-glow mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-inter">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center glass p-12 rounded-3xl glow-cyber animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-space font-black mb-6 text-glow">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">
              Ready to Dominate
            </span>
            <br />
            <span className="text-foreground">Your Financial Future?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 font-inter max-w-2xl mx-auto">
            Join <span className="text-primary font-semibold">50,000+ GenZ</span> users already 
            building generational wealth with StackX's AI-powered platform
          </p>
          <Button size="lg" className="group glow-accent bg-gradient-accent hover:glow-primary font-space font-bold text-xl px-12 py-6 hover-float" asChild>
            <Link to="/dashboard">
              <Zap className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Launch Your Empire
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}














// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { ArrowRight, Coffee, TrendingUp, Zap, Shield, Brain } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* Background */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundColor: '#0a0a0a',
//           backgroundSize: '350px',
//           backgroundRepeat: 'repeat'
//         }}
//       />
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32">
//         {/* Hero Section */}
//         <div className="text-center mb-16">
//           <div className="mb-8">
//             <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//               <span style={{color: '#00ffff'}}>
//                 Master Your
//               </span>
//               <br />
//               <span className="text-foreground">Money Game</span>
//             </h1>
//             <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
//               Level up your finances with <span className="font-semibold" style={{color: '#00ffff'}}>AI-powered insights</span>, 
//               gamified investing, and <span className="font-semibold" style={{color: '#00ffff'}}>next-gen banking</span> for the digital generation.
//             </p>
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
//             <Button size="lg" className="font-bold text-lg px-8 py-4" asChild>
//               <Link to="/dashboard">
//                 <Zap className="w-5 h-5 mr-2" />
//                 Start Building Wealth
//                 <ArrowRight className="w-5 h-5 ml-2" />
//               </Link>
//             </Button>
//             <Button variant="outline" size="lg" className="font-bold text-lg px-8 py-4" asChild>
//               <Link to="/gamification">
//                 <TrendingUp className="w-5 h-5 mr-2" />
//                 View Rewards
//               </Link>
//             </Button>
//           </div>
//         </div>

//         {/* Daily Tip Card */}
//         <Card className="max-w-3xl mx-auto mb-16">
//           <CardContent className="p-8">
//             <div className="flex items-start space-x-6">
//               <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#00ffff20'}}>
//                 <Coffee className="w-8 h-8" style={{color: '#00ffff'}} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-2xl font-bold mb-3">
//                   Today's Money Hack
//                 </h3>
//                 <p className="text-muted-foreground text-lg leading-relaxed mb-3">
//                   Save ₹200 today = 1 less Starbucks ☕
//                 </p>
//                 <p className="font-semibold text-lg" style={{color: '#00ffff'}}>
//                   Small saves = Big gains! Compound that wealth!
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//           <Card>
//             <CardContent className="p-8 text-center">
//               <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Brain className="w-10 h-10" style={{color: '#00ffff'}} />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">AI Money Brain</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Neural networks analyze your spending patterns and predict optimal investment moves in real-time
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-8 text-center">
//               <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <span className="text-4xl">🎮</span>
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Level Up Finances</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Unlock achievements, compete with friends, and earn rewards while building your financial empire
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-8 text-center">
//               <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Shield className="w-10 h-10" style={{color: '#00ffff'}} />
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Crypto Secured</h3>
//               <p className="text-muted-foreground leading-relaxed">
//                 Bank-grade security meets blockchain transparency for the ultimate digital wealth protection
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
//           {[
//             { label: "Active Users", value: "50K+", icon: "👥" },
//             { label: "Money Saved", value: "₹2.5Cr", icon: "💰" },
//             { label: "AI Predictions", value: "99.2%", icon: "🎯" },
//             { label: "Crypto Secured", value: "100%", icon: "🔒" }
//           ].map((stat, index) => (
//             <Card key={index} className="text-center p-6">
//               <div className="text-3xl mb-2">{stat.icon}</div>
//               <div className="text-2xl font-bold mb-1" style={{color: '#00ffff'}}>{stat.value}</div>
//               <div className="text-sm text-muted-foreground">{stat.label}</div>
//             </Card>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="text-center p-12 rounded-3xl border border-gray-800">
//           <h2 className="text-4xl md:text-5xl font-bold mb-6">
//             <span style={{color: '#00ffff'}}>
//               Ready to Dominate
//             </span>
//             <br />
//             <span className="text-foreground">Your Financial Future?</span>
//           </h2>
//           <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//             Join <span className="font-semibold" style={{color: '#00ffff'}}>50,000+ GenZ</span> users already 
//             building generational wealth with StackX's AI-powered platform
//           </p>
//           <Button size="lg" className="font-bold text-xl px-12 py-6" asChild>
//             <Link to="/dashboard">
//               <Zap className="w-6 h-6 mr-3" />
//               Launch Your Empire
//               <ArrowRight className="w-6 h-6 ml-3" />
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }