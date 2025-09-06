import cyberPattern from "@/assets/cyber-pattern.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Brain, Coffee, Shield, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Images */}
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
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                  <span className="font-bold text-xl" style={{color: '#00ffff'}}>S</span>
                </div>
                <span className="text-2xl font-bold" style={{color: '#00ffff'}}>
                  StackX
                </span>
              </Link>

              <div className="flex items-center space-x-4">
                {user ? (
                  <Button asChild style={{backgroundColor: '#00ffff', color: '#000'}}>
                    <Link to="/dashboard">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="hover:bg-pink-400 hover:text-black transition-colors duration-200">
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild style={{backgroundColor: '#00ffff', color: '#000'}}>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with Gradient */}
        <div className="text-center mb-16">
          <div className="mb-8 p-12 rounded-3xl" style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(64,224,208,0.1), rgba(0,191,255,0.05))',
            border: '1px solid rgba(0,255,255,0.2)'
          }}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span style={{
                background: 'linear-gradient(135deg, #00ffff, #40e0d0, #00bfff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(0,255,255,0.3)'
              }}>
                Master Your
              </span>
              <br />
              <span className="text-foreground">Money Game</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Level up your finances with <span className="font-bold" style={{color: '#00ffff'}}>AI-powered insights</span>, 
              gamified investing, and <span className="font-bold" style={{color: '#00ffff'}}>next-gen banking</span> for the digital generation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button size="lg" className="font-bold text-lg px-8 py-4" style={{backgroundColor: '#00ffff', color: '#000'}} asChild>
              <Link to={user ? "/dashboard" : "/signup"}>
                <Zap className="w-5 h-5 mr-2" />
                {user ? "Go to Dashboard" : "Start Building Wealth"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="font-bold text-lg px-8 py-4 border-2" 
                    style={{borderColor: '#00ffff', color: '#00ffff'}} asChild>
              <Link to={user ? "/gamification" : "/login"}>
                <TrendingUp className="w-5 h-5 mr-2" />
                {user ? "View Rewards" : "Sign In"}
              </Link>
            </Button>
          </div>
        </div>

        {/* Daily Tip Card */}
        <Card className="max-w-3xl mx-auto mb-16 border border-gray-800">
          <CardContent className="p-8">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{backgroundColor: '#00ffff20'}}>
                <Coffee className="w-8 h-8" style={{color: '#00ffff'}} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Today's Money Hack
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-3">
                  Save ₹200 today = 1 less Starbucks
                </p>
                <p className="font-bold text-lg" style={{color: '#00ffff'}}>
                  Small saves = Big gains! Compound that wealth!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="border border-gray-800 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Brain className="w-10 h-10" style={{color: '#00ffff'}} />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Money Brain</h3>
              <p className="text-muted-foreground leading-relaxed">
                Neural networks analyze your spending patterns and predict optimal investment moves in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <span className="text-4xl">🎮</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Level Up Finances</h3>
              <p className="text-muted-foreground leading-relaxed">
                Unlock achievements, compete with friends, and earn rewards while building your financial empire
              </p>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Shield className="w-10 h-10" style={{color: '#00ffff'}} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Crypto Secured</h3>
              <p className="text-muted-foreground leading-relaxed">
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
            <Card key={index} className="text-center p-6 border border-gray-800 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold mb-1" style={{color: '#00ffff'}}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl border border-gray-800">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span style={{
              background: 'linear-gradient(135deg, #00ffff, #40e0d0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ready to Dominate
            </span>
            <br />
            <span className="text-foreground">Your Financial Future?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join <span className="font-bold" style={{color: '#00ffff'}}>50,000+ GenZ</span> users already 
            building generational wealth with StackX's AI-powered platform
          </p>
          <Button size="lg" className="font-bold text-xl px-12 py-6" style={{backgroundColor: '#00ffff', color: '#000'}} asChild>
            <Link to={user ? "/dashboard" : "/signup"}>
              <Zap className="w-6 h-6 mr-3" />
              {user ? "Launch Your Empire" : "Join StackX Now"}
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}