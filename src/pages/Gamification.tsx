import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from '@/integrations/supabase/client';
import { emailService } from '@/lib/emailService';
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  X,
  IndianRupee,
  TrendingUp
} from "lucide-react";
import { useEffect, useState } from "react";

// Enhanced battle service with savings goals
// Enhanced battle service with savings goals
const battleService = {
  async sendBattleInvite(inviterEmail: string, inviteeEmail: string, battleType: string = "savings_challenge", savingsGoal: number = 5000) {
    try {
      const sb = supabase as any;
      const resp = await (sb
        .from('battle_invitations')
        .insert({
          inviter_email: inviterEmail,
          invitee_email: inviteeEmail,
          battle_type: battleType,
          savings_goal: savingsGoal,
          inviter_progress: 0,
          invitee_progress: 0,
          status: 'pending'
        })
        .select()
        .single() as unknown as { data: any; error: any });
      
      const { data, error } = resp;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getUserBattles(userEmail: string) {
    try {
      const sb = supabase as any;
      const resp = await (sb
        .from('battle_invitations')
        .select('*')
        .or(`inviter_email.eq.${userEmail},invitee_email.eq.${userEmail}`)
        .order('created_at', { ascending: false }) as unknown as { data: any; error: any });
      
      const { data, error } = resp;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async acceptBattle(battleId: string) {
    try {
      const sb = supabase as any;
      const resp = await (sb
        .from('battle_invitations')
        .update({ status: 'accepted' })
        .eq('id', battleId)
        .select()
        .single() as unknown as { data: any; error: any });
      
      const { data, error } = resp;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async declineBattle(battleId: string) {
    try {
      const sb = supabase as any;
      const resp = await (sb
        .from('battle_invitations')
        .update({ status: 'declined' })
        .eq('id', battleId)
        .select()
        .single() as unknown as { data: any; error: any });
      
      const { data, error } = resp;
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  },

  async updateBattleProgress(battleId: string, userEmail: string, progress: number) {
    try {
      const sb = supabase as any;
      
      // First, get the battle to determine if user is inviter or invitee
      const { data: battleData, error: fetchError } = await sb
        .from('battle_invitations')
        .select('*')
        .eq('id', battleId)
        .single();

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        return { error: fetchError };
      }

      const isInviter = battleData.inviter_email === userEmail;
      const updateField = isInviter ? 'inviter_progress' : 'invitee_progress';

      console.log('Updating battle:', { battleId, userEmail, progress, updateField, isInviter });

      // Update the progress
      const { data: updateData, error: updateError } = await sb
        .from('battle_invitations')
        .update({ [updateField]: progress })
        .eq('id', battleId);

      if (updateError) {
        console.error('Update error:', updateError);
        return { error: updateError };
      }

      console.log('Update successful');
      return { data: updateData, error: null };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { data: null, error };
    }
  }
};
export default function Gamification() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [challengeFriend, setChallengeFriend] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("5000");
  const [challengeStatus, setChallengeStatus] = useState("");
  const [battles, setBattles] = useState<any[]>([]);
  const [battleSliderIndex, setBattleSliderIndex] = useState(0);
const battlesPerPage = 2; // Show 2 battles at a time

  useEffect(() => {
    fetchLeaderboard();
    if (user?.email) {
      fetchBattles();
    }
  }, [user]);

  const fetchLeaderboard = async () => {
    const rawData = [
      { name: "Aarav", return: "12%" },
      { name: "Zara", return: "15%" },
      { name: "Kabir", return: "9%" },
      { name: "Maya", return: "20%" },
      { name: "Ishaan", return: "7%" }
    ];

    // Sort by percentage return (highest first)
    const sortedData = rawData.sort((a, b) => {
      const aReturn = parseFloat(a.return.replace('%', ''));
      const bReturn = parseFloat(b.return.replace('%', ''));
      return bReturn - aReturn;
    });

    setLeaderboard(sortedData);
  };

  const fetchBattles = async () => {
    if (!user?.email) return;

    try {
      const { data, error } = await battleService.getUserBattles(user.email);
      if (!error && data) {
        console.log('Fetched battles:', data);
        setBattles(data);
      } else if (error) {
        console.error('Error fetching battles:', error);
      }
    } catch (err) {
      console.error('Failed to fetch battles:', err);
    }
  };

  const sendBattleInvite = async () => {
    if (!challengeFriend.trim() || !user?.email || !savingsGoal) return;

    const goalAmount = parseInt(savingsGoal);
    if (isNaN(goalAmount) || goalAmount <= 0) {
      setChallengeStatus("Please enter a valid savings goal amount");
      setTimeout(() => setChallengeStatus(""), 3000);
      return;
    }

    const { data, error } = await battleService.sendBattleInvite(
      user.email,
      challengeFriend.trim(),
      "savings_challenge",
      goalAmount
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

      if (emailResult?.success) {
        setChallengeStatus(`Battle invite sent to ${challengeFriend}! Challenge: First to save ₹${goalAmount.toLocaleString()}`);
      } else {
        setChallengeStatus(`Invite created for ₹${goalAmount.toLocaleString()} savings challenge but email failed to send.`);
      }

      setChallengeFriend("");
      setSavingsGoal("5000");
      fetchBattles();
    }

    setTimeout(() => setChallengeStatus(""), 5000);
  };

  const handleAcceptBattle = async (battleId: string) => {
    const { error } = await battleService.acceptBattle(battleId);
    if (!error) {
      setChallengeStatus("Battle accepted! The savings challenge begins now!");
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

const simulateProgressUpdate = async (battleId: string, amount: number) => {
  if (!user?.email) return;

  console.log('Starting progress update:', { battleId, userEmail: user.email, amount });

  // Immediately update local state for instant UI feedback
  setBattles(prevBattles => 
    prevBattles.map(battle => {
      if (battle.id === battleId) {
        const isInviter = battle.inviter_email === user.email;
        const updatedBattle = {
          ...battle,
          [isInviter ? 'inviter_progress' : 'invitee_progress']: amount
        };
        console.log('Local state updated:', updatedBattle);
        return updatedBattle;
      }
      return battle;
    })
  );

  try {
    const result = await battleService.updateBattleProgress(battleId, user.email, amount);
    console.log('Database update result:', result);
    
    if (!result.error) {
      setChallengeStatus(`Progress updated: ₹${amount.toLocaleString()} saved!`);
      
      // Verify the update by fetching fresh data
      console.log('Fetching fresh data to verify...');
      const { data: freshBattles } = await battleService.getUserBattles(user.email);
      console.log('Fresh battles from DB:', freshBattles);
      
    } else {
      console.error('Database update error:', result.error);
      setChallengeStatus(`Error updating progress: ${result.error.message || 'Unknown error'}`);
      await fetchBattles(); // Revert on error
    }
  } catch (err) {
    console.error('Progress update failed:', err);
    setChallengeStatus('Failed to update progress');
    await fetchBattles(); // Revert on error
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
  // Get sent invites - only show the most recent one
  const sentInvites = battles
    .filter(battle => battle.inviter_email === user?.email && battle.status === 'pending')
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 1); // Only show the most recent one

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
              <span style={{ color: '#00ffff' }}>Level Up Zone</span>
            </h1>
            <p className="text-muted-foreground">Compete, earn, dominate the leaderboard</p>
          </div>
          <div className="flex items-center space-x-3">
            <Flame className="w-6 h-6 animate-pulse" style={{ color: '#00ffff' }} />
            <Badge className="px-4 py-2 font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
              Day 7 streak
            </Badge>
          </div>
        </div>

        {/* Levels Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">
            <span style={{ color: '#00ffff' }}>Your Progress</span>
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
                        <span className="font-bold" style={{ color: '#00ffff' }}>{level.progress}%</span>
                      </div>
                      <Progress value={level.progress} className="h-3" />
                      <div className="text-xs text-muted-foreground">
                        Reward: {level.reward}
                      </div>
                      {level.progress === 100 && (
                        <Badge className="w-full justify-center font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
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
          {/* Leaderboard - Now Sorted */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                  <Trophy className="w-5 h-5" style={{ color: '#00ffff' }} />
                </div>
                <span>Elite Leaderboard</span>
                <Badge className="ml-auto" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
                  <TrendingUp className="w-3 h-3 mr-1" />
                  By Returns
                </Badge>
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
                        style={{ backgroundColor: index < 3 ? '#00ffff' : undefined }}>
                        {index === 0 ? '👑' : index + 1}
                      </div>
                      <div>
                        <span className="font-bold text-lg">{user.name}</span>
                        {index === 0 && <div className="text-xs font-semibold" style={{ color: '#00ffff' }}>CHAMPION</div>}
                      </div>
                    </div>
                    <Badge className="font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
                      {user.return} return
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Battle Arena */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                  <Users className="w-5 h-5" style={{ color: '#00ffff' }} />
                </div>
                <span>Battle Arena</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Send Battle Invite with Savings Goal */}
              <div className="space-y-4">
                <h4 className="font-bold" style={{ color: '#00ffff' }}>Challenge a Friend</h4>
                <Input
                  placeholder="Enter friend's email..."
                  value={challengeFriend}
                  onChange={(e) => setChallengeFriend(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-4 h-4" style={{ color: '#00ffff' }} />
                  <Select value={savingsGoal} onValueChange={setSavingsGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select savings goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1000">₹1,000 - Quick Sprint</SelectItem>
                      <SelectItem value="5000">₹5,000 - Monthly Goal</SelectItem>
                      <SelectItem value="10000">₹10,000 - Serious Saver</SelectItem>
                      <SelectItem value="25000">₹25,000 - Elite Challenge</SelectItem>
                      <SelectItem value="50000">₹50,000 - Ultimate Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={sendBattleInvite} className="w-full font-bold">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Battle Invite (₹{parseInt(savingsGoal).toLocaleString()})
                </Button>
              </div>

              {/* Pending Invites with Goals */}
              {pendingInvites.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="font-bold mb-3" style={{ color: '#00ffff' }}>Incoming Challenges</h4>
                  <div className="space-y-2">
                    {pendingInvites.map((battle) => (
                      <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <p className="font-medium">Challenge from {battle.inviter_email}</p>
                            <p className="text-sm font-bold" style={{ color: '#00ffff' }}>
                              Goal: First to save ₹{battle.savings_goal?.toLocaleString() || '5,000'}
                            </p>
                            <p className="text-xs text-muted-foreground">Savings Challenge</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleAcceptBattle(battle.id)}
                              style={{ backgroundColor: '#00ffff', color: '#000' }}
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

             {/* Active Battles with Progress Bars and Slider */}
{activeBattles.length > 0 && (
  <div className="border-t border-gray-600 pt-4">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-bold" style={{color: '#00ffff'}}>Active Battles</h4>
      {activeBattles.length > battlesPerPage && (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBattleSliderIndex(Math.max(0, battleSliderIndex - 1))}
            disabled={battleSliderIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground">
            {Math.min(battleSliderIndex + 1, activeBattles.length)}-{Math.min(battleSliderIndex + battlesPerPage, activeBattles.length)} of {activeBattles.length}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setBattleSliderIndex(Math.min(Math.max(0, activeBattles.length - battlesPerPage), battleSliderIndex + 1))}
            disabled={battleSliderIndex >= activeBattles.length - battlesPerPage}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
    <div className="space-y-4">
      {activeBattles
        .slice(battleSliderIndex, battleSliderIndex + battlesPerPage)
        .map((battle) => {
          const isInviter = battle.inviter_email === user?.email;
          const opponentEmail = isInviter ? battle.invitee_email : battle.inviter_email;
          const userProgress = isInviter ? (battle.inviter_progress || 0) : (battle.invitee_progress || 0);
          const opponentProgress = isInviter ? (battle.invitee_progress || 0) : (battle.inviter_progress || 0);
          const goal = battle.savings_goal || 5000;
          const userPercentage = Math.min(((userProgress || 0) / goal) * 100, 100);
          const opponentPercentage = Math.min(((opponentProgress || 0) / goal) * 100, 100);

          // Debug logging
          console.log('Battle render data:', {
            battleId: battle.id,
            isInviter,
            userProgress,
            opponentProgress,
            goal,
            userPercentage,
            inviter_progress: battle.inviter_progress,
            invitee_progress: battle.invitee_progress
          });

          return (
            <div key={`${battle.id}-${battle.inviter_progress}-${battle.invitee_progress}`} className="p-4 border border-gray-700 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Battle with {opponentEmail}</p>
                  <p className="text-sm font-bold" style={{color: '#00ffff'}}>
                    Goal: First to save ₹{goal.toLocaleString()}
                  </p>
                </div>
                <Badge style={{backgroundColor: '#00ff0020', color: '#00ff00'}}>
                  Live
                </Badge>
              </div>
              
              {/* Progress Bars */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">You</span>
                    <span className="font-bold" style={{color: '#00ffff'}}>
                      ₹{userProgress.toLocaleString()} ({userPercentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={userPercentage} className="h-3" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{opponentEmail.split('@')[0]}</span>
                    <span className="font-bold text-orange-400">
                      ₹{opponentProgress.toLocaleString()} ({opponentPercentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={opponentPercentage} className="h-3" />
                </div>
              </div>

              {/* Quick Progress Update Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => simulateProgressUpdate(battle.id, (userProgress || 0) + 500)}
                  className="text-xs hover:bg-cyan-500/20"
                  disabled={userPercentage >= 100}
                >
                  +₹500
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => simulateProgressUpdate(battle.id, (userProgress || 0) + 1000)}
                  className="text-xs hover:bg-cyan-500/20"
                  disabled={userPercentage >= 100}
                >
                  +₹1,000
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => simulateProgressUpdate(battle.id, (userProgress || 0) + 2500)}
                  className="text-xs hover:bg-cyan-500/20"
                  disabled={userPercentage >= 100}
                >
                  +₹2,500
                </Button>
              </div>

              {/* Winner Badge */}
              {(userPercentage >= 100 || opponentPercentage >= 100) && (
                <div className="text-center p-2 rounded-lg" style={{backgroundColor: '#00ffff20'}}>
                  <p className="font-bold text-lg" style={{color: '#00ffff'}}>
                    🏆 {userPercentage >= 100 ? 'You Win!' : `${opponentEmail.split('@')[0]} Wins!`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Challenge completed!
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </div>
  </div>
)}

              {/* Sent Invites - Only Latest */}
              {sentInvites.length > 0 && (
                <div className="border-t border-gray-600 pt-4">
                  <h4 className="font-bold mb-3" style={{ color: '#00ffff' }}>Latest Challenge Sent</h4>
                  <div className="space-y-2">
                    {sentInvites.map((battle) => (
                      <div key={battle.id} className="p-3 border border-gray-700 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Challenge to {battle.invitee_email}</p>
                            <p className="text-sm font-bold" style={{ color: '#00ffff' }}>
                              Goal: ₹{battle.savings_goal?.toLocaleString() || '5,000'}
                            </p>
                            <p className="text-xs text-muted-foreground">Savings Challenge</p>
                          </div>
                          <Badge style={{ backgroundColor: '#ffff0020', color: '#ffff00' }}>
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
                  <div className="font-bold text-lg" style={{ color: '#00ffff' }}>
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                <Flame className="w-5 h-5 animate-pulse" style={{ color: '#00ffff' }} />
              </div>
              <span>Streak Empire</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">🔥</div>
                <div className="font-bold text-2xl mb-2" style={{ color: '#00ffff' }}>Day 7 streak</div>
                <div className="text-sm text-muted-foreground">Daily expense tracking</div>
                <Badge className="mt-3 font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
                  +500 XP
                </Badge>
              </div>

              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">💰</div>
                <div className="font-bold text-2xl mb-2" style={{ color: '#00ffff' }}>5 days</div>
                <div className="text-sm text-muted-foreground">Under budget streak</div>
                <Badge className="mt-3 font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
                  +300 XP
                </Badge>
              </div>

              <div className="text-center p-6 rounded-2xl border border-gray-800">
                <div className="text-4xl mb-4 animate-pulse">📈</div>
                <div className="font-bold text-2xl mb-2" style={{ color: '#00ffff' }}>3 weeks</div>
                <div className="text-sm text-muted-foreground">Investment growth</div>
                <Badge className="mt-3 font-bold" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                <Star className="w-5 h-5 animate-pulse" style={{ color: '#00ffff' }} />
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
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#00ffff20' }}>
                    <Target className="w-6 h-6" style={{ color: '#00ffff' }} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{achievement.time}</span>
                      <Badge className="font-bold text-xs" style={{ backgroundColor: '#00ffff20', color: '#00ffff' }}>
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