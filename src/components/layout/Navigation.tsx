import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  DollarSign,
  Home,
  LogOut,
  Menu,
  PieChart,
  TrendingUp,
  Trophy,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: PieChart },
  { path: "/gamification", label: "Rewards", icon: Trophy },
  { path: "/insights", label: "Insights", icon: TrendingUp },
  { path: "/expenses", label: "Expenses", icon: CreditCard },
  { path: "/investments", label: "Investments", icon: DollarSign },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-800">
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

            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(
                      "transition-all duration-300 font-medium",
                      isActive && "text-black",
                      !isActive && "hover:bg-gray-800"
                    )}
                    style={isActive ? {backgroundColor: '#00ffff'} : {}}
                  >
                    <Link to={item.path}>
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
              
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="ml-4 hover:bg-gray-800">
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem disabled>
                      <User className="w-4 h-4 mr-2" />
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <span className="font-bold text-lg" style={{color: '#00ffff'}}>S</span>
              </div>
              <span className="text-xl font-bold" style={{color: '#00ffff'}}>
                StackX
              </span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-gray-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(
                      "w-full justify-start",
                      isActive && "text-black",
                      !isActive && "hover:bg-gray-800"
                    )}
                    style={isActive ? {backgroundColor: '#00ffff'} : {}}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.path}>
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
              
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start hover:bg-gray-800"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-gray-800">
        <div className="grid grid-cols-5 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 text-xs transition-all duration-300 font-medium",
                  isActive 
                    ? "scale-105" 
                    : "text-muted-foreground hover:scale-110"
                )}
                style={isActive ? {color: '#00ffff'} : {}}
              >
                <Icon className={cn("w-5 h-5 mb-1", isActive && "scale-110")} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}