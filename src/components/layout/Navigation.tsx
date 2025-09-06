import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommandPalette, { TOC_INTERFACE } from "@/components/ui/dynamic-scroll-island-toc";
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
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Navigation items configured for the Command Palette
const navItems = [
  { 
    path: "/", 
    label: "Home", 
    icon: Home, 
    name: "Home", 
    value: "/",
    description: "Go to homepage"
  },
  { 
    path: "/dashboard", 
    label: "Dashboard", 
    icon: PieChart, 
    name: "Dashboard", 
    value: "/dashboard",
    description: "View your financial overview"
  },
  { 
    path: "/gamification", 
    label: "Rewards", 
    icon: Trophy, 
    name: "Rewards", 
    value: "/gamification",
    description: "Check achievements and rewards"
  },
  { 
    path: "/insights", 
    label: "Insights", 
    icon: TrendingUp, 
    name: "Insights", 
    value: "/insights",
    description: "Financial insights and analysis"
  },
  { 
    path: "/expenses", 
    label: "Expenses", 
    icon: CreditCard, 
    name: "Expenses", 
    value: "/expenses",
    description: "Track and manage expenses"
  },
  { 
    path: "/investments", 
    label: "Investments", 
    icon: DollarSign, 
    name: "Investments", 
    value: "/investments",
    description: "Investment portfolio and analysis"
  },
];

// Convert nav items to Command Palette format
const COMMAND_NAV_DATA: TOC_INTERFACE[] = navItems.map(item => ({
  name: item.name,
  value: item.value,
  icon: <item.icon className="w-4 h-4" />,
  description: item.description,
}));

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Create a ref that will track the main content container for scroll
  const scrollRef = useRef<HTMLElement | null>(null);

  // Find current active nav item
  const activeNavItem = navItems.find(item => item.path === location.pathname) || navItems[0];
  const [activeTab, setActiveTab] = useState<TOC_INTERFACE>({
    name: activeNavItem.name,
    value: activeNavItem.value,
    icon: <activeNavItem.icon className="w-4 h-4" />,
    description: activeNavItem.description,
  });

  // Update active tab when location changes
  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname) || navItems[0];
    setActiveTab({
      name: currentItem.name,
      value: currentItem.value,
      icon: <currentItem.icon className="w-4 h-4" />,
      description: currentItem.description,
    });
  }, [location.pathname]);

  // Set up scroll container reference to track main content
  useEffect(() => {
    // Find the main content container or use window
    const mainContent = document.querySelector('main') || document.querySelector('[data-scroll-container]') || document.body;
    scrollRef.current = mainContent as HTMLElement;
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleNavigation = (tab: TOC_INTERFACE) => {
    setActiveTab(tab);
    if (tab.value) {
      navigate(tab.value);
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Desktop Navigation - Clean Header */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/30 transition-all duration-300 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                StackX
              </span>
            </Link>

            {/* Current Page Display */}
            <div className="flex items-center gap-3 text-gray-300">
              {activeTab.icon}
              <span className="font-medium">{activeTab.name}</span>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-800 border border-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                <DropdownMenuItem disabled className="text-gray-400">
                  <User className="w-4 h-4 mr-2" />
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-xl bg-cyan-400/20 flex items-center justify-center group-hover:bg-cyan-400/30 transition-all duration-300 border border-cyan-500/30">
                <span className="text-cyan-400 font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                StackX
              </span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-xl">
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
                      isActive 
                        ? "bg-cyan-500 text-gray-900 hover:bg-cyan-600" 
                        : "text-gray-300 hover:text-white hover:bg-gray-800"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to={item.path}>
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Command Palette - Bottom of Page */}
      <CommandPalette
        data={COMMAND_NAV_DATA}
        value={activeTab}
        setValue={handleNavigation}
        ref={scrollRef}
        lPrefix="nav"
      />

      {/* Bottom Mobile Navigation (Traditional) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-gray-950/90 backdrop-blur-md border-t border-gray-800">
        <div className="grid grid-cols-6 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center py-2 px-1 text-xs transition-all duration-300",
                  isActive 
                    ? "text-cyan-400 scale-110" 
                    : "text-gray-400 hover:text-gray-200 hover:scale-105"
                )}
              >
                <Icon className={cn("w-5 h-5 mb-1", isActive && "text-cyan-400")} />
                <span className="truncate font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}