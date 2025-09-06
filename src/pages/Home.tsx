"use client"

import cyberPattern from "@/assets/cyber-pattern.jpg"
import heroBg from "@/assets/hero-bg.jpg"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { ArrowRight, Brain, Coffee, Shield, TrendingUp, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Home() {
  const { user } = useAuth()

  const [currentSlide, setCurrentSlide] = useState(0)

  const features = [
    {
      icon: Brain,
      title: "AI Money Brain",
      description:
        "Advanced neural networks analyze market patterns, predict trends, and optimize your portfolio in real-time",
      tags: ["Machine Learning", "Real-time Analysis"],
      gradient: "from-cyan-500/10 via-transparent to-blue-500/10",
      accent: "from-cyan-500/20 to-transparent",
      iconBg: "from-cyan-500/20 to-blue-500/20",
    },
    {
      icon: () => <span className="text-5xl">🎮</span>,
      title: "Gamified Wealth Building",
      description:
        "Level up your financial journey with achievements, leaderboards, and rewards that make investing addictive",
      tags: ["Achievements", "Leaderboards"],
      gradient: "from-purple-500/10 via-transparent to-cyan-500/10",
      accent: "from-purple-500/20 to-transparent",
      iconBg: "from-purple-500/20 to-cyan-500/20",
    },
    {
      icon: Shield,
      title: "Fortress-Level Security",
      description:
        "Military-grade encryption, blockchain verification, and biometric authentication protect your digital wealth",
      tags: ["Blockchain", "Biometric Auth"],
      gradient: "from-green-500/10 via-transparent to-cyan-500/10",
      accent: "from-green-500/20 to-transparent",
      iconBg: "from-green-500/20 to-cyan-500/20",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Images */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${cyberPattern})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#00ffff20" }}
                >
                  <span className="font-bold text-xl" style={{ color: "#00ffff" }}>
                    S
                  </span>
                </div>
                <span className="text-2xl font-bold" style={{ color: "#00ffff" }}>
                  StackX
                </span>
              </Link>

              <div className="flex items-center space-x-4">
                {user ? (
                  <Button asChild style={{ backgroundColor: "#00ffff", color: "#000" }}>
                    <Link to="/dashboard">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      asChild
                      className="hover:bg-pink-400 hover:text-black transition-colors duration-200"
                    >
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button asChild style={{ backgroundColor: "#00ffff", color: "#000" }}>
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
          <div
            className="mb-8 p-12 rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(64,224,208,0.1), rgba(0,191,255,0.05))",
              border: "1px solid rgba(0,255,255,0.2)",
            }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, #00ffff, #40e0d0, #00bfff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: "0 0 40px rgba(0,255,255,0.3)",
                }}
              >
                Master Your
              </span>
              <br />
              <span className="text-foreground">Money Game</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Level up your finances with{" "}
              <span className="font-bold" style={{ color: "#00ffff" }}>
                AI-powered insights
              </span>
              , gamified investing, and{" "}
              <span className="font-bold" style={{ color: "#00ffff" }}>
                next-gen banking
              </span>{" "}
              for the digital generation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="font-bold text-lg px-8 py-4"
              style={{ backgroundColor: "#00ffff", color: "#000" }}
              asChild
            >
              <Link to={user ? "/dashboard" : "/signup"}>
                <Zap className="w-5 h-5 mr-2" />
                {user ? "Go to Dashboard" : "Start Building Wealth"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-bold text-lg px-8 py-4 border-2 bg-transparent"
              style={{ borderColor: "#00ffff", color: "#00ffff" }}
              asChild
            >
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
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#00ffff20" }}
              >
                <Coffee className="w-8 h-8" style={{ color: "#00ffff" }} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3 text-foreground">Today's Money Hack</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-3">Save ₹200 today = 1 less Starbucks</p>
                <p className="font-bold text-lg" style={{ color: "#00ffff" }}>
                  Small saves = Big gains! Compound that wealth!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Slider */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span
                style={{
                  background: "linear-gradient(135deg, #00ffff, #40e0d0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Revolutionary Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of finance with cutting-edge technology designed for the next generation
            </p>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-1000 ease-in-out">
              {[...features, ...features].map((feature, index) => {
                const IconComponent = feature.icon
                const isActive = index % features.length === currentSlide
                return (
                  <div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                    style={{
                      transform: `translateX(-${currentSlide * 100}%)`,
                    }}
                  >
                    <Card
                      className={`border border-gray-800 transition-all duration-700 bg-background/80 backdrop-blur-sm relative overflow-hidden h-96 ${
                        isActive
                          ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/20 scale-105"
                          : "hover:border-cyan-500/30"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-100 transition-opacity duration-700`}
                      />
                      <div
                        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.accent} rounded-full blur-xl opacity-100 transition-opacity duration-700`}
                      />

                      <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
                        <div className="flex flex-col items-center text-center">
                          <div
                            className="w-20 h-20 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 relative"
                            style={{ backgroundColor: "#00ffff15" }}
                          >
                            <div
                              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.iconBg} opacity-100 transition-opacity duration-500`}
                            />
                            {typeof IconComponent === "function" && IconComponent.name ? (
                              <IconComponent
                                className="w-10 h-10 animate-pulse relative z-10"
                                style={{ color: "#00ffff" }}
                              />
                            ) : (
                              <div className="animate-bounce relative z-10">
                                <IconComponent />
                              </div>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold mb-4 text-cyan-400 transition-colors duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-gray-300 leading-relaxed mb-6 text-base transition-colors duration-300">
                            {feature.description}
                          </p>

                          <div className="flex flex-wrap gap-2 justify-center">
                            {feature.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>

            <div className="mt-6 max-w-xs mx-auto">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear shadow-lg shadow-cyan-400/30"
                  style={{ width: `${((currentSlide + 1) / features.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl border border-gray-800">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span
              style={{
                background: "linear-gradient(135deg, #00ffff, #40e0d0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready to Dominate
            </span>
            <br />
            <span className="text-foreground">Your Financial Future?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the next generation of investors building generational wealth with StackX's AI-powered platform
          </p>
          <Button
            size="lg"
            className="font-bold text-xl px-12 py-6"
            style={{ backgroundColor: "#00ffff", color: "#000" }}
            asChild
          >
            <Link to={user ? "/dashboard" : "/signup"}>
              <Zap className="w-6 h-6 mr-3" />
              {user ? "Launch Your Empire" : "Join StackX Now"}
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
