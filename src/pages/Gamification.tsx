// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";
// import { 
//   Trophy, 
//   Crown, 
//   Award, 
//   Users, 
//   Flame,
//   Volume2,
//   Send,
//   Zap,
//   Star,
//   Target
// } from "lucide-react";
// import cyberPattern from "@/assets/cyber-pattern.jpg";

// export default function Gamification() {
//   const [leaderboard, setLeaderboard] = useState<any[]>([]);
//   const [challengeFriend, setChallengeFriend] = useState("");
//   const [challengeStatus, setChallengeStatus] = useState("");

//   useEffect(() => {
//     // TODO: replace with Supabase query
//     fetchLeaderboard();
//   }, []);

//   const fetchLeaderboard = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("leaderboard").select("*");
//     setLeaderboard([
//       { name: "Aarav", return: "12%" },
//       { name: "Zara", return: "15%" },
//       { name: "Kabir", return: "9%" },
//       { name: "Maya", return: "20%" },
//       { name: "Ishaan", return: "7%" }
//     ]);
//   };

//   const playMemeSound = () => {
//     // Simulate meme sound button
//     setChallengeStatus("🎵 Ka-ching! Money vibes activated! 💰");
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const sendChallenge = () => {
//     if (challengeFriend.trim()) {
//       setChallengeStatus(`🚀 Challenge sent to ${challengeFriend}! Get ready to lose! 😎`);
//       setChallengeFriend("");
//       setTimeout(() => setChallengeStatus(""), 3000);
//     }
//   };

//   const levels = [
//     {
//       name: "Bronze Hustler",
//       progress: 100,
//       color: "bg-gradient-to-r from-orange-400 to-orange-600",
//       icon: Award,
//       description: "Stacked ₹10,000",
//       reward: "NFT Badge Unlocked"
//     },
//     {
//       name: "Silver Strategist",
//       progress: 65,
//       color: "bg-gradient-secondary",
//       icon: Trophy,
//       description: "Invested ₹50,000",
//       reward: "Premium Features"
//     },
//     {
//       name: "Gold Empire Builder",
//       progress: 30,
//       color: "bg-gradient-accent",
//       icon: Crown,
//       description: "Portfolio worth ₹2,00,000",
//       reward: "VIP Status + Exclusive Access"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-background relative overflow-hidden">
//       {/* Cyberpunk Background */}
//       <div 
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `url(${cyberPattern})`,
//           backgroundSize: '300px',
//           backgroundRepeat: 'repeat'
//         }}
//       />
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8 animate-slide-up">
//           <div>
//             <h1 className="text-4xl font-space font-black text-glow mb-2">
//               <span className="bg-gradient-cyber bg-clip-text text-transparent">Level Up Zone</span>
//             </h1>
//             <p className="text-muted-foreground font-inter">Compete, earn, dominate the leaderboard</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Flame className="w-6 h-6 text-accent animate-pulse" />
//             <Badge className="glass glow-accent bg-gradient-accent text-accent-foreground font-space font-bold px-4 py-2">
//               🔥 Day 7 streak
//             </Badge>
//           </div>
//         </div>

//         {/* Levels Section */}
//         <div className="mb-12">
//           <h2 className="text-3xl font-space font-bold mb-8 text-glow">
//             <span className="bg-gradient-primary bg-clip-text text-transparent">Your Progress</span>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {levels.map((level, index) => {
//               const Icon = level.icon;
//               return (
//                 <Card key={index} className={`glass hover-float transition-all duration-smooth ${level.progress === 100 ? 'glow-accent' : 'glow-primary'}`}>
//                   <CardContent className="p-8">
//                     <div className="flex items-center space-x-4 mb-6">
//                       <div className={`w-16 h-16 rounded-2xl ${level.color} flex items-center justify-center glow-accent animate-pulse-glow`}>
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="font-space font-bold text-xl text-glow">{level.name}</h3>
//                         <p className="text-sm text-muted-foreground font-inter">{level.description}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex justify-between text-sm">
//                         <span className="font-space font-semibold">Progress</span>
//                         <span className="font-space font-bold text-primary">{level.progress}%</span>
//                       </div>
//                       <Progress value={level.progress} className="h-3 glass" />
//                       <div className="text-xs text-muted-foreground font-inter">
//                         Reward: {level.reward}
//                       </div>
//                       {level.progress === 100 && (
//                         <Badge className="w-full justify-center glow-success bg-gradient-success text-success-foreground font-space font-bold">
//                           ✨ COMPLETED! Reward Claimed
//                         </Badge>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Leaderboard */}
//           <Card className="glass glow-primary hover:glow-accent transition-all duration-smooth">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3 font-space">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
//                   <Trophy className="w-5 h-5 text-accent-foreground" />
//                 </div>
//                 <span className="text-glow">Elite Leaderboard</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {leaderboard.map((user, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 glass rounded-xl hover:glow-primary transition-all duration-smooth">
//                     <div className="flex items-center space-x-4">
//                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-space font-black
//                         ${index === 0 ? 'bg-gradient-accent text-accent-foreground glow-accent' : 
//                           index === 1 ? 'bg-gradient-secondary text-secondary-foreground glow-secondary' : 
//                           index === 2 ? 'bg-gradient-primary text-primary-foreground glow-primary' : 
//                           'bg-muted text-muted-foreground'}`}>
//                         {index === 0 ? '👑' : index + 1}
//                       </div>
//                       <div>
//                         <span className="font-space font-bold text-lg">{user.name}</span>
//                         {index === 0 && <div className="text-xs text-accent font-space font-semibold">CHAMPION 🏆</div>}
//                       </div>
//                     </div>
//                     <Badge className={`glass font-space font-bold ${
//                       index === 0 ? 'glow-accent text-accent' : 'glow-primary text-primary'
//                     }`}>
//                       {user.return} return
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Challenge Friends */}
//           <Card className="glass glow-secondary hover:glow-primary transition-all duration-smooth">
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3 font-space">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center glow-secondary">
//                   <Users className="w-5 h-5 text-secondary-foreground" />
//                 </div>
//                 <span className="text-glow">Battle Arena</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <Input
//                   placeholder="Enter friend's username..."
//                   value={challengeFriend}
//                   onChange={(e) => setChallengeFriend(e.target.value)}
//                   className="glass border-secondary/20 focus:glow-secondary font-space"
//                 />
//                 <Button onClick={sendChallenge} className="w-full glow-secondary bg-gradient-secondary hover:glow-primary font-space font-bold">
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Battle Challenge
//                 </Button>
//               </div>

//               <div className="border-t border-border/20 pt-6">
//                 <Button 
//                   variant="outline" 
//                   onClick={playMemeSound}
//                   className="w-full glass cyber-border hover:glow-accent bg-gradient-accent/10 hover:bg-gradient-accent/20 font-space font-bold"
//                 >
//                   <Volume2 className="w-4 h-4 mr-2" />
//                   Drop the Beat 🎵
//                 </Button>
//               </div>

//               {challengeStatus && (
//                 <div className="text-center p-4 glass glow-primary rounded-xl">
//                   <div className="text-primary font-space font-bold text-lg">
//                     {challengeStatus}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Money Streaks */}
//         <Card className="glass glow-cyber mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
//                 <Flame className="w-5 h-5 text-accent-foreground animate-pulse" />
//               </div>
//               <span className="text-glow">Streak Empire</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-6 glass rounded-2xl hover:glow-accent transition-all duration-smooth hover-float">
//                 <div className="text-4xl mb-4 animate-pulse">🔥</div>
//                 <div className="font-space font-bold text-2xl text-accent text-glow mb-2">Day 7 streak</div>
//                 <div className="text-sm text-muted-foreground font-inter">Daily expense tracking</div>
//                 <Badge className="mt-3 glow-accent bg-gradient-accent text-accent-foreground font-space font-bold">
//                   +500 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 glass rounded-2xl hover:glow-success transition-all duration-smooth hover-float">
//                 <div className="text-4xl mb-4 animate-pulse">💰</div>
//                 <div className="font-space font-bold text-2xl text-success text-glow mb-2">5 days</div>
//                 <div className="text-sm text-muted-foreground font-inter">Under budget streak</div>
//                 <Badge className="mt-3 glow-success bg-gradient-success text-success-foreground font-space font-bold">
//                   +300 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 glass rounded-2xl hover:glow-primary transition-all duration-smooth hover-float">
//                 <div className="text-4xl mb-4 animate-pulse">📈</div>
//                 <div className="font-space font-bold text-2xl text-primary text-glow mb-2">3 weeks</div>
//                 <div className="text-sm text-muted-foreground font-inter">Investment growth</div>
//                 <Badge className="mt-3 glow-primary bg-gradient-primary text-primary-foreground font-space font-bold">
//                   +1000 XP
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Achievement Showcase */}
//         <Card className="glass glow-accent">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3 font-space">
//               <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center glow-accent">
//                 <Star className="w-5 h-5 text-accent-foreground animate-pulse" />
//               </div>             
//               <span className="text-glow">Recent Achievements</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { title: "First Investment", desc: "Made your first SIP investment", time: "2 hours ago", xp: "+200 XP" },
//                 { title: "Budget Master", desc: "Stayed under budget for a week", time: "1 day ago", xp: "+150 XP" },
//                 { title: "Crypto Explorer", desc: "Added crypto to your portfolio", time: "3 days ago", xp: "+300 XP" },
//                 { title: "Social Trader", desc: "Followed 5 investment experts", time: "1 week ago", xp: "+100 XP" }
//               ].map((achievement, index) => (
//                 <div key={index} className="flex items-center space-x-4 p-4 glass rounded-xl hover:glow-primary transition-all duration-smooth">
//                   <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center glow-primary">
//                     <Target className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-space font-bold text-foreground">{achievement.title}</h4>
//                     <p className="text-sm text-muted-foreground font-inter">{achievement.desc}</p>
//                     <div className="flex items-center justify-between mt-2">
//                       <span className="text-xs text-muted-foreground font-inter">{achievement.time}</span>
//                       <Badge className="glow-primary bg-gradient-primary text-primary-foreground font-space font-bold text-xs">
//                         {achievement.xp}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import {
//   Award,
//   Crown,
//   Flame,
//   Send,
//   Star,
//   Target,
//   Trophy,
//   Users,
//   Volume2
// } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Gamification() {
//   const [leaderboard, setLeaderboard] = useState<any[]>([]);
//   const [challengeFriend, setChallengeFriend] = useState("");
//   const [challengeStatus, setChallengeStatus] = useState("");

//   useEffect(() => {
//     // TODO: replace with Supabase query
//     fetchLeaderboard();
//   }, []);

//   const fetchLeaderboard = async () => {
//     // TODO: replace with Supabase query
//     // const { data } = await supabase.from("leaderboard").select("*");
//     setLeaderboard([
//       { name: "Aarav", return: "12%" },
//       { name: "Zara", return: "15%" },
//       { name: "Kabir", return: "9%" },
//       { name: "Maya", return: "20%" },
//       { name: "Ishaan", return: "7%" }
//     ]);
//   };

//   const playMemeSound = () => {
//     // Simulate meme sound button
//     setChallengeStatus("Ka-ching! Money vibes activated!");
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const sendChallenge = () => {
//     if (challengeFriend.trim()) {
//       setChallengeStatus(`Challenge sent to ${challengeFriend}! Get ready to lose!`);
//       setChallengeFriend("");
//       setTimeout(() => setChallengeStatus(""), 3000);
//     }
//   };

//   const levels = [
//     {
//       name: "Bronze Hustler",
//       progress: 100,
//       color: "from-orange-400 to-orange-600",
//       icon: Award,
//       description: "Stacked ₹10,000",
//       reward: "NFT Badge Unlocked"
//     },
//     {
//       name: "Silver Strategist",
//       progress: 65,
//       color: "from-gray-400 to-gray-600",
//       icon: Trophy,
//       description: "Invested ₹50,000",
//       reward: "Premium Features"
//     },
//     {
//       name: "Gold Empire Builder",
//       progress: 30,
//       color: "from-yellow-400 to-yellow-600",
//       icon: Crown,
//       description: "Portfolio worth ₹2,00,000",
//       reward: "VIP Status + Exclusive Access"
//     }
//   ];

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
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">
//               <span style={{color: '#00ffff'}}>Level Up Zone</span>
//             </h1>
//             <p className="text-muted-foreground">Compete, earn, dominate the leaderboard</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Flame className="w-6 h-6 animate-pulse" style={{color: '#00ffff'}} />
//             <Badge className="px-4 py-2 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//               Day 7 streak
//             </Badge>
//           </div>
//         </div>

//         {/* Levels Section */}
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold mb-8">
//             <span style={{color: '#00ffff'}}>Your Progress</span>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {levels.map((level, index) => {
//               const Icon = level.icon;
//               return (
//                 <Card key={index}>
//                   <CardContent className="p-8">
//                     <div className="flex items-center space-x-4 mb-6">
//                       <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center`}>
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-xl">{level.name}</h3>
//                         <p className="text-sm text-muted-foreground">{level.description}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex justify-between text-sm">
//                         <span className="font-semibold">Progress</span>
//                         <span className="font-bold" style={{color: '#00ffff'}}>{level.progress}%</span>
//                       </div>
//                       <Progress value={level.progress} className="h-3" />
//                       <div className="text-xs text-muted-foreground">
//                         Reward: {level.reward}
//                       </div>
//                       {level.progress === 100 && (
//                         <Badge className="w-full justify-center font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                           COMPLETED! Reward Claimed
//                         </Badge>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Leaderboard */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                   <Trophy className="w-5 h-5" style={{color: '#00ffff'}} />
//                 </div>
//                 <span>Elite Leaderboard</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {leaderboard.map((user, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-800">
//                     <div className="flex items-center space-x-4">
//                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold
//                         ${index === 0 ? 'text-white' : 
//                           index === 1 ? 'text-white' : 
//                           index === 2 ? 'text-white' : 
//                           'bg-muted text-muted-foreground'}`}
//                         style={{backgroundColor: index < 3 ? '#00ffff' : undefined}}>
//                         {index === 0 ? '👑' : index + 1}
//                       </div>
//                       <div>
//                         <span className="font-bold text-lg">{user.name}</span>
//                         {index === 0 && <div className="text-xs font-semibold" style={{color: '#00ffff'}}>CHAMPION</div>}
//                       </div>
//                     </div>
//                     <Badge className="font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                       {user.return} return
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Challenge Friends */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                   <Users className="w-5 h-5" style={{color: '#00ffff'}} />
//                 </div>
//                 <span>Battle Arena</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <Input
//                   placeholder="Enter friend's username..."
//                   value={challengeFriend}
//                   onChange={(e) => setChallengeFriend(e.target.value)}
//                 />
//                 <Button onClick={sendChallenge} className="w-full font-bold">
//                   <Send className="w-4 h-4 mr-2" />
//                   Send Battle Challenge
//                 </Button>
//               </div>

//               <div className="border-t border-border/20 pt-6">
//                 <Button 
//                   variant="outline" 
//                   onClick={playMemeSound}
//                   className="w-full font-bold"
//                 >
//                   <Volume2 className="w-4 h-4 mr-2" />
//                   Drop the Beat
//                 </Button>
//               </div>

//               {challengeStatus && (
//                 <div className="text-center p-4 rounded-xl border border-gray-800">
//                   <div className="font-bold text-lg" style={{color: '#00ffff'}}>
//                     {challengeStatus}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Money Streaks */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Flame className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
//               </div>
//               <span>Streak Empire</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">🔥</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>Day 7 streak</div>
//                 <div className="text-sm text-muted-foreground">Daily expense tracking</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +500 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">💰</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>5 days</div>
//                 <div className="text-sm text-muted-foreground">Under budget streak</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +300 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">📈</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>3 weeks</div>
//                 <div className="text-sm text-muted-foreground">Investment growth</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +1000 XP
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Achievement Showcase */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Star className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
//               </div>             
//               <span>Recent Achievements</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { title: "First Investment", desc: "Made your first SIP investment", time: "2 hours ago", xp: "+200 XP" },
//                 { title: "Budget Master", desc: "Stayed under budget for a week", time: "1 day ago", xp: "+150 XP" },
//                 { title: "Crypto Explorer", desc: "Added crypto to your portfolio", time: "3 days ago", xp: "+300 XP" },
//                 { title: "Social Trader", desc: "Followed 5 investment experts", time: "1 week ago", xp: "+100 XP" }
//               ].map((achievement, index) => (
//                 <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-800">
//                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                     <Target className="w-6 h-6" style={{color: '#00ffff'}} />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-bold">{achievement.title}</h4>
//                     <p className="text-sm text-muted-foreground">{achievement.desc}</p>
//                     <div className="flex items-center justify-between mt-2">
//                       <span className="text-xs text-muted-foreground">{achievement.time}</span>
//                       <Badge className="font-bold text-xs" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                         {achievement.xp}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from '@/integrations/supabase/client';
// import {
//   Award,
//   Check,
//   Crown,
//   Flame,
//   Mail,
//   Star,
//   Target,
//   Trophy,
//   Users,
//   Volume2,
//   X
// } from "lucide-react";
// import { useEffect, useState } from "react";

// // Simple battle service
// const battleService = {
//   async sendBattleInvite(inviterEmail: string, inviteeEmail: string, battleType: string = "savings_challenge") {
//     try {
//       const { data, error } = await supabase
//         .from('battle_invitations')
//         .insert({
//           inviter_email: inviterEmail,
//           invitee_email: inviteeEmail,
//           battle_type: battleType,
//           status: 'pending'
//         })
//         .select()
//         .single();
      
//       return { data, error };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   async getUserBattles(userEmail: string) {
//     try {
//       const { data, error } = await supabase
//         .from('battle_invitations')
//         .select('*')
//         .or(`inviter_email.eq.${userEmail},invitee_email.eq.${userEmail}`)
//         .order('created_at', { ascending: false });
      
//       return { data, error };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   async acceptBattle(battleId: string) {
//     try {
//       const { data, error } = await supabase
//         .from('battle_invitations')
//         .update({ status: 'accepted' })
//         .eq('id', battleId)
//         .select()
//         .single();
      
//       return { data, error };
//     } catch (error) {
//       return { data: null, error };
//     }
//   },

//   async declineBattle(battleId: string) {
//     try {
//       const { data, error } = await supabase
//         .from('battle_invitations')
//         .update({ status: 'declined' })
//         .eq('id', battleId)
//         .select()
//         .single();
      
//       return { data, error };
//     } catch (error) {
//       return { data: null, error };
//     }
//   }
// };

// export default function Gamification() {
//   const { user } = useAuth();
//   const [leaderboard, setLeaderboard] = useState<any[]>([]);
//   const [challengeFriend, setChallengeFriend] = useState("");
//   const [challengeStatus, setChallengeStatus] = useState("");
//   const [battles, setBattles] = useState<any[]>([]);

//   useEffect(() => {
//     fetchLeaderboard();
//     if (user?.email) {
//       fetchBattles();
//     }
//   }, [user]);

//   const fetchLeaderboard = async () => {
//     setLeaderboard([
//       { name: "Aarav", return: "12%" },
//       { name: "Zara", return: "15%" },
//       { name: "Kabir", return: "9%" },
//       { name: "Maya", return: "20%" },
//       { name: "Ishaan", return: "7%" }
//     ]);
//   };

//   const fetchBattles = async () => {
//     if (!user?.email) return;
    
//     const { data, error } = await battleService.getUserBattles(user.email);
//     if (!error && data) {
//       setBattles(data);
//     }
//   };

//   const sendBattleInvite = async () => {
//     if (!challengeFriend.trim() || !user?.email) return;
    
//     const { data, error } = await battleService.sendBattleInvite(
//       user.email,
//       challengeFriend.trim()
//     );
    
//     if (error) {
//       setChallengeStatus(`Error: Failed to send invite`);
//     } else {
//       setChallengeStatus(`Battle invite sent to ${challengeFriend}!`);
//       setChallengeFriend("");
//       fetchBattles();
//     }
    
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const handleAcceptBattle = async (battleId: string) => {
//     const { error } = await battleService.acceptBattle(battleId);
//     if (!error) {
//       setChallengeStatus("Battle accepted! The challenge begins now!");
//       fetchBattles();
//     }
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const handleDeclineBattle = async (battleId: string) => {
//     const { error } = await battleService.declineBattle(battleId);
//     if (!error) {
//       setChallengeStatus("Battle declined");
//       fetchBattles();
//     }
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const playMemeSound = () => {
//     setChallengeStatus("Ka-ching! Money vibes activated!");
//     setTimeout(() => setChallengeStatus(""), 3000);
//   };

//   const levels = [
//     {
//       name: "Bronze Hustler",
//       progress: 100,
//       color: "from-orange-400 to-orange-600",
//       icon: Award,
//       description: "Stacked ₹10,000",
//       reward: "NFT Badge Unlocked"
//     },
//     {
//       name: "Silver Strategist",
//       progress: 65,
//       color: "from-gray-400 to-gray-600",
//       icon: Trophy,
//       description: "Invested ₹50,000",
//       reward: "Premium Features"
//     },
//     {
//       name: "Gold Empire Builder",
//       progress: 30,
//       color: "from-yellow-400 to-yellow-600",
//       icon: Crown,
//       description: "Portfolio worth ₹2,00,000",
//       reward: "VIP Status + Exclusive Access"
//     }
//   ];

//   // Get pending invitations (received)
//   const pendingInvites = battles.filter(battle => 
//     battle.status === 'pending' && battle.invitee_email === user?.email
//   );

//   // Get active battles
//   const activeBattles = battles.filter(battle => battle.status === 'accepted');

//   // Get sent invites
//   const sentInvites = battles.filter(battle => 
//     battle.inviter_email === user?.email
//   );

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
      
//       <div className="relative z-10 container mx-auto px-4 py-8 pt-24 md:pt-32 pb-20 md:pb-8">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">
//               <span style={{color: '#00ffff'}}>Level Up Zone</span>
//             </h1>
//             <p className="text-muted-foreground">Compete, earn, dominate the leaderboard</p>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Flame className="w-6 h-6 animate-pulse" style={{color: '#00ffff'}} />
//             <Badge className="px-4 py-2 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//               Day 7 streak
//             </Badge>
//           </div>
//         </div>

//         {/* Levels Section */}
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold mb-8">
//             <span style={{color: '#00ffff'}}>Your Progress</span>
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {levels.map((level, index) => {
//               const Icon = level.icon;
//               return (
//                 <Card key={index}>
//                   <CardContent className="p-8">
//                     <div className="flex items-center space-x-4 mb-6">
//                       <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center`}>
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>
//                       <div>
//                         <h3 className="font-bold text-xl">{level.name}</h3>
//                         <p className="text-sm text-muted-foreground">{level.description}</p>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex justify-between text-sm">
//                         <span className="font-semibold">Progress</span>
//                         <span className="font-bold" style={{color: '#00ffff'}}>{level.progress}%</span>
//                       </div>
//                       <Progress value={level.progress} className="h-3" />
//                       <div className="text-xs text-muted-foreground">
//                         Reward: {level.reward}
//                       </div>
//                       {level.progress === 100 && (
//                         <Badge className="w-full justify-center font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                           COMPLETED! Reward Claimed
//                         </Badge>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
//           {/* Leaderboard */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                   <Trophy className="w-5 h-5" style={{color: '#00ffff'}} />
//                 </div>
//                 <span>Elite Leaderboard</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {leaderboard.map((user, index) => (
//                   <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-800">
//                     <div className="flex items-center space-x-4">
//                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold
//                         ${index === 0 ? 'text-white' : 
//                           index === 1 ? 'text-white' : 
//                           index === 2 ? 'text-white' : 
//                           'bg-muted text-muted-foreground'}`}
//                         style={{backgroundColor: index < 3 ? '#00ffff' : undefined}}>
//                         {index === 0 ? '👑' : index + 1}
//                       </div>
//                       <div>
//                         <span className="font-bold text-lg">{user.name}</span>
//                         {index === 0 && <div className="text-xs font-semibold" style={{color: '#00ffff'}}>CHAMPION</div>}
//                       </div>
//                     </div>
//                     <Badge className="font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                       {user.return} return
//                     </Badge>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Battle Arena */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                   <Users className="w-5 h-5" style={{color: '#00ffff'}} />
//                 </div>
//                 <span>Battle Arena</span>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Send Battle Invite */}
//               <div className="space-y-4">
//                 <h4 className="font-bold" style={{color: '#00ffff'}}>Challenge a Friend</h4>
//                 <Input
//                   placeholder="Enter friend's email..."
//                   value={challengeFriend}
//                   onChange={(e) => setChallengeFriend(e.target.value)}
//                 />
//                 <Button onClick={sendBattleInvite} className="w-full font-bold">
//                   <Mail className="w-4 h-4 mr-2" />
//                   Send Battle Invite
//                 </Button>
//               </div>

//               {/* Pending Invites */}
//               {pendingInvites.length > 0 && (
//                 <div className="border-t border-gray-600 pt-4">
//                   <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Incoming Challenges</h4>
//                   <div className="space-y-2">
//                     {pendingInvites.map((battle) => (
//                       <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium">Challenge from {battle.inviter_email}</p>
//                             <p className="text-xs text-muted-foreground">Savings Challenge</p>
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button 
//                               size="sm" 
//                               onClick={() => handleAcceptBattle(battle.id)}
//                               style={{backgroundColor: '#00ffff', color: '#000'}}
//                             >
//                               <Check className="w-4 h-4" />
//                             </Button>
//                             <Button 
//                               size="sm" 
//                               variant="outline"
//                               onClick={() => handleDeclineBattle(battle.id)}
//                             >
//                               <X className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Active Battles */}
//               {activeBattles.length > 0 && (
//                 <div className="border-t border-gray-600 pt-4">
//                   <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Active Battles</h4>
//                   <div className="space-y-2">
//                     {activeBattles.map((battle) => (
//                       <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium">
//                               Battle with {battle.inviter_email === user?.email ? battle.invitee_email : battle.inviter_email}
//                             </p>
//                             <p className="text-xs text-muted-foreground">Savings Challenge - Active</p>
//                           </div>
//                           <Badge style={{backgroundColor: '#00ff0020', color: '#00ff00'}}>
//                             Live
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Sent Invites */}
//               {sentInvites.length > 0 && (
//                 <div className="border-t border-gray-600 pt-4">
//                   <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Sent Challenges</h4>
//                   <div className="space-y-2">
//                     {sentInvites.filter(battle => battle.status === 'pending').map((battle) => (
//                       <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-medium">Challenge to {battle.invitee_email}</p>
//                             <p className="text-xs text-muted-foreground">Savings Challenge</p>
//                           </div>
//                           <Badge style={{backgroundColor: '#ffff0020', color: '#ffff00'}}>
//                             Pending
//                           </Badge>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="border-t border-border/20 pt-6">
//                 <Button 
//                   variant="outline" 
//                   onClick={playMemeSound}
//                   className="w-full font-bold"
//                 >
//                   <Volume2 className="w-4 h-4 mr-2" />
//                   Drop the Beat
//                 </Button>
//               </div>

//               {challengeStatus && (
//                 <div className="text-center p-4 rounded-xl border border-gray-800">
//                   <div className="font-bold text-lg" style={{color: '#00ffff'}}>
//                     {challengeStatus}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Money Streaks */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Flame className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
//               </div>
//               <span>Streak Empire</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">🔥</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>Day 7 streak</div>
//                 <div className="text-sm text-muted-foreground">Daily expense tracking</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +500 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">💰</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>5 days</div>
//                 <div className="text-sm text-muted-foreground">Under budget streak</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +300 XP
//                 </Badge>
//               </div>
              
//               <div className="text-center p-6 rounded-2xl border border-gray-800">
//                 <div className="text-4xl mb-4 animate-pulse">📈</div>
//                 <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>3 weeks</div>
//                 <div className="text-sm text-muted-foreground">Investment growth</div>
//                 <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                   +1000 XP
//                 </Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Achievement Showcase */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-3">
//               <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                 <Star className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
//               </div>             
//               <span>Recent Achievements</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { title: "First Investment", desc: "Made your first SIP investment", time: "2 hours ago", xp: "+200 XP" },
//                 { title: "Budget Master", desc: "Stayed under budget for a week", time: "1 day ago", xp: "+150 XP" },
//                 { title: "Crypto Explorer", desc: "Added crypto to your portfolio", time: "3 days ago", xp: "+300 XP" },
//                 { title: "Social Trader", desc: "Followed 5 investment experts", time: "1 week ago", xp: "+100 XP" }
//               ].map((achievement, index) => (
//                 <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-800">
//                   <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
//                     <Target className="w-6 h-6" style={{color: '#00ffff'}} />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-bold">{achievement.title}</h4>
//                     <p className="text-sm text-muted-foreground">{achievement.desc}</p>
//                     <div className="flex items-center justify-between mt-2">
//                       <span className="text-xs text-muted-foreground">{achievement.time}</span>
//                       <Badge className="font-bold text-xs" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
//                         {achievement.xp}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { emailService } from '@/lib/emailService';
import {
  Award,
  Check,
  Crown,
  Flame,
  Mail,
  Star,
  Target,
  Trophy,
  Users,
  Volume2,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
// Simple battle service
const battleService = {
  async sendBattleInvite(inviterEmail: string, inviteeEmail: string, battleType: string = "savings_challenge") {
    try {
      const { data, error } = await supabase
        .from('battle_invitations')
        .insert({
          inviter_email: inviterEmail,
          invitee_email: inviteeEmail,
          battle_type: battleType,
          status: 'pending'
        })
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUserBattles(userEmail: string) {
    try {
      const { data, error } = await supabase
        .from('battle_invitations')
        .select('*')
        .or(`inviter_email.eq.${userEmail},invitee_email.eq.${userEmail}`)
        .order('created_at', { ascending: false });
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async acceptBattle(battleId: string) {
    try {
      const { data, error } = await supabase
        .from('battle_invitations')
        .update({ status: 'accepted' })
        .eq('id', battleId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async declineBattle(battleId: string) {
    try {
      const { data, error } = await supabase
        .from('battle_invitations')
        .update({ status: 'declined' })
        .eq('id', battleId)
        .select()
        .single();
      
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  }
};

export default function Gamification() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [challengeFriend, setChallengeFriend] = useState("");
  const [challengeStatus, setChallengeStatus] = useState("");
  const [battles, setBattles] = useState<any[]>([]);

  useEffect(() => {
    fetchLeaderboard();
    if (user?.email) {
      fetchBattles();
    }
  }, [user]);

  const fetchLeaderboard = async () => {
    setLeaderboard([
      { name: "Aarav", return: "12%" },
      { name: "Zara", return: "15%" },
      { name: "Kabir", return: "9%" },
      { name: "Maya", return: "20%" },
      { name: "Ishaan", return: "7%" }
    ]);
  };

  const fetchBattles = async () => {
    if (!user?.email) return;
    
    const { data, error } = await battleService.getUserBattles(user.email);
    if (!error && data) {
      setBattles(data);
    }
  };

  const sendBattleInvite = async () => {
    if (!challengeFriend.trim() || !user?.email) return;
    
    const { data, error } = await battleService.sendBattleInvite(
      user.email,
      challengeFriend.trim()
    );
    
    if (error) {
      setChallengeStatus(`Error: Failed to send invite`);
    } else {
      // Send email invitation
      const emailResult = await emailService.sendBattleInvitation(
        user.email,
        challengeFriend.trim(),
        data.id
      );
      
      if (emailResult.success) {
        setChallengeStatus(`Battle invite sent to ${challengeFriend}! They'll receive an email with accept/decline options.`);
      } else {
        setChallengeStatus(`Invite created but email failed to send. They can still accept in the app.`);
      }
      
      setChallengeFriend("");
      fetchBattles();
    }
    
    setTimeout(() => setChallengeStatus(""), 5000);
  };

  const handleAcceptBattle = async (battleId: string) => {
    const { error } = await battleService.acceptBattle(battleId);
    if (!error) {
      setChallengeStatus("Battle accepted! The challenge begins now!");
      fetchBattles();
    }
    setTimeout(() => setChallengeStatus(""), 3000);
  };

  const handleDeclineBattle = async (battleId: string) => {
    const { error } = await battleService.declineBattle(battleId);
    if (!error) {
      setChallengeStatus("Battle declined");
      fetchBattles();
    }
    setTimeout(() => setChallengeStatus(""), 3000);
  };

  const playMemeSound = () => {
    setChallengeStatus("Ka-ching! Money vibes activated!");
    setTimeout(() => setChallengeStatus(""), 3000);
  };

  const levels = [
    {
      name: "Bronze Hustler",
      progress: 100,
      color: "from-orange-400 to-orange-600",
      icon: Award,
      description: "Stacked ₹10,000",
      reward: "NFT Badge Unlocked"
    },
    {
      name: "Silver Strategist",
      progress: 65,
      color: "from-gray-400 to-gray-600",
      icon: Trophy,
      description: "Invested ₹50,000",
      reward: "Premium Features"
    },
    {
      name: "Gold Empire Builder",
      progress: 30,
      color: "from-yellow-400 to-yellow-600",
      icon: Crown,
      description: "Portfolio worth ₹2,00,000",
      reward: "VIP Status + Exclusive Access"
    }
  ];

  // Get pending invitations (received)
  const pendingInvites = battles.filter(battle => 
    battle.status === 'pending' && battle.invitee_email === user?.email
  );

  // Get active battles
  const activeBattles = battles.filter(battle => battle.status === 'accepted');

  // Get sent invites
  const sentInvites = battles.filter(battle => 
    battle.inviter_email === user?.email
  );

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
              <span style={{color: '#00ffff'}}>Level Up Zone</span>
            </h1>
            <p className="text-muted-foreground">Compete, earn, dominate the leaderboard</p>
          </div>
          <div className="flex items-center space-x-3">
            <Flame className="w-6 h-6 animate-pulse" style={{color: '#00ffff'}} />
            <Badge className="px-4 py-2 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
              Day 7 streak
            </Badge>
          </div>
        </div>

        {/* Levels Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">
            <span style={{color: '#00ffff'}}>Your Progress</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {levels.map((level, index) => {
              const Icon = level.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{level.name}</h3>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">Progress</span>
                        <span className="font-bold" style={{color: '#00ffff'}}>{level.progress}%</span>
                      </div>
                      <Progress value={level.progress} className="h-3" />
                      <div className="text-xs text-muted-foreground">
                        Reward: {level.reward}
                      </div>
                      {level.progress === 100 && (
                        <Badge className="w-full justify-center font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                          COMPLETED! Reward Claimed
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                  <Trophy className="w-5 h-5" style={{color: '#00ffff'}} />
                </div>
                <span>Elite Leaderboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold
                        ${index === 0 ? 'text-white' : 
                          index === 1 ? 'text-white' : 
                          index === 2 ? 'text-white' : 
                          'bg-muted text-muted-foreground'}`}
                        style={{backgroundColor: index < 3 ? '#00ffff' : undefined}}>
                        {index === 0 ? '👑' : index + 1}
                      </div>
                      <div>
                        <span className="font-bold text-lg">{user.name}</span>
                        {index === 0 && <div className="text-xs font-semibold" style={{color: '#00ffff'}}>CHAMPION</div>}
                      </div>
                    </div>
                    <Badge className="font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                      {user.return} return
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Battle Arena */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                  <Users className="w-5 h-5" style={{color: '#00ffff'}} />
                </div>
                <span>Battle Arena</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Send Battle Invite */}
              <div className="space-y-4">
                <h4 className="font-bold" style={{color: '#00ffff'}}>Challenge a Friend</h4>
                <Input
                  placeholder="Enter friend's email..."
                  value={challengeFriend}
                  onChange={(e) => setChallengeFriend(e.target.value)}
                />
                <Button onClick={sendBattleInvite} className="w-full font-bold">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Battle Invite
                </Button>
              </div>

              {/* Pending Invites */}
              {pendingInvites.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Incoming Challenges</h4>
                  <div className="space-y-2">
                    {pendingInvites.map((battle) => (
                      <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Challenge from {battle.inviter_email}</p>
                            <p className="text-xs text-muted-foreground">Savings Challenge</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleAcceptBattle(battle.id)}
                              style={{backgroundColor: '#00ffff', color: '#000'}}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeclineBattle(battle.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Battles */}
              {activeBattles.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Active Battles</h4>
                  <div className="space-y-2">
                    {activeBattles.map((battle) => (
                      <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              Battle with {battle.inviter_email === user?.email ? battle.invitee_email : battle.inviter_email}
                            </p>
                            <p className="text-xs text-muted-foreground">Savings Challenge - Active</p>
                          </div>
                          <Badge style={{backgroundColor: '#00ff0020', color: '#00ff00'}}>
                            Live
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sent Invites */}
              {sentInvites.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="font-bold mb-3" style={{color: '#00ffff'}}>Sent Challenges</h4>
                  <div className="space-y-2">
                    {sentInvites.filter(battle => battle.status === 'pending').map((battle) => (
                      <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Challenge to {battle.invitee_email}</p>
                            <p className="text-xs text-muted-foreground">Savings Challenge</p>
                          </div>
                          <Badge style={{backgroundColor: '#ffff0020', color: '#ffff00'}}>
                            Pending
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-border/20 pt-6">
                <Button 
                  variant="outline" 
                  onClick={playMemeSound}
                  className="w-full font-bold"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Drop the Beat
                </Button>
              </div>

              {challengeStatus && (
                <div className="text-center p-4 rounded-xl border border-gray-800">
                  <div className="font-bold text-lg" style={{color: '#00ffff'}}>
                    {challengeStatus}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Money Streaks */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Flame className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
              </div>
              <span>Streak Empire</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">🔥</div>
                <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>Day 7 streak</div>
                <div className="text-sm text-muted-foreground">Daily expense tracking</div>
                <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                  +500 XP
                </Badge>
              </div>
              
              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">💰</div>
                <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>5 days</div>
                <div className="text-sm text-muted-foreground">Under budget streak</div>
                <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                  +300 XP
                </Badge>
              </div>
              
              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">📈</div>
                <div className="font-bold text-2xl mb-2" style={{color: '#00ffff'}}>3 weeks</div>
                <div className="text-sm text-muted-foreground">Investment growth</div>
                <Badge className="mt-3 font-bold" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                  +1000 XP
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievement Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                <Star className="w-5 h-5 animate-pulse" style={{color: '#00ffff'}} />
              </div>             
              <span>Recent Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "First Investment", desc: "Made your first SIP investment", time: "2 hours ago", xp: "+200 XP" },
                { title: "Budget Master", desc: "Stayed under budget for a week", time: "1 day ago", xp: "+150 XP" },
                { title: "Crypto Explorer", desc: "Added crypto to your portfolio", time: "3 days ago", xp: "+300 XP" },
                { title: "Social Trader", desc: "Followed 5 investment experts", time: "1 week ago", xp: "+100 XP" }
              ].map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-800">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{backgroundColor: '#00ffff20'}}>
                    <Target className="w-6 h-6" style={{color: '#00ffff'}} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{achievement.time}</span>
                      <Badge className="font-bold text-xs" style={{backgroundColor: '#00ffff20', color: '#00ffff'}}>
                        {achievement.xp}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}