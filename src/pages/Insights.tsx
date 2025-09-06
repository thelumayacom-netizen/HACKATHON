
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