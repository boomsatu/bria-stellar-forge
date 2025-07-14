import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Shield, 
  Crown, 
  Diamond, 
  TrendingUp, 
  Clock, 
  Coins,
  Users,
  Gift,
  ExternalLink
} from 'lucide-react';

interface StakingMachine {
  id: string;
  name: string;
  type: 'bronze' | 'silver' | 'gold' | 'titanium';
  stakedAmount: string;
  capacity: string;
  profitRate: string;
  nextClaim: string;
  timeLeft: string;
  totalEarned: string;
  isActive: boolean;
}

interface UserStats {
  totalStakingRewards: string;
  totalReferralBonus: string;
  totalMachineBonus: string;
  directDownlines: number;
  totalDownlines: number;
  referralLink: string;
}

interface UserDashboardProps {
  machines: StakingMachine[];
  userStats: UserStats;
  onStake: (machineId: string) => void;
  onUnstake: (machineId: string) => void;
  onClaim: (machineId: string) => void;
  onClaimAll: () => void;
}

export const UserDashboard = ({ 
  machines, 
  userStats, 
  onStake, 
  onUnstake, 
  onClaim, 
  onClaimAll 
}: UserDashboardProps) => {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);

  const getMachineIcon = (type: string) => {
    switch (type) {
      case 'bronze': return Zap;
      case 'silver': return Shield;
      case 'gold': return Crown;
      case 'titanium': return Diamond;
      default: return Zap;
    }
  };

  const getMachineColors = (type: string) => {
    switch (type) {
      case 'bronze':
        return {
          border: 'border-orange-500/50',
          bg: 'bg-orange-500/5',
          text: 'text-orange-400',
          badge: 'bg-orange-500/20 text-orange-400'
        };
      case 'silver':
        return {
          border: 'border-gray-400/50',
          bg: 'bg-gray-400/5',
          text: 'text-gray-300',
          badge: 'bg-gray-400/20 text-gray-300'
        };
      case 'gold':
        return {
          border: 'border-yellow-500/50',
          bg: 'bg-yellow-500/5',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/20 text-yellow-400'
        };
      case 'titanium':
        return {
          border: 'border-purple-500/50',
          bg: 'bg-purple-500/5',
          text: 'text-purple-400',
          badge: 'bg-purple-500/20 text-purple-400'
        };
      default:
        return {
          border: 'border-primary/50',
          bg: 'bg-primary/5',
          text: 'text-primary',
          badge: 'bg-primary/20 text-primary'
        };
    }
  };

  const calculateStakingProgress = (staked: string, capacity: string) => {
    const stakedNum = parseFloat(staked.replace(/[^0-9.]/g, ''));
    const capacityNum = parseFloat(capacity.replace(/[^0-9.]/g, ''));
    return (stakedNum / capacityNum) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-success/20 bg-success/5 card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Staking Rewards
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success text-neon">
              {userStats.totalStakingRewards}
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-accent/5 card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Referral Bonus
            </CardTitle>
            <Users className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent text-neon">
              {userStats.totalReferralBonus}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5 card-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Machine Bonus
            </CardTitle>
            <Gift className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary text-neon">
              {userStats.totalMachineBonus}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claim All Button */}
      <div className="flex justify-center">
        <Button 
          onClick={onClaimAll}
          size="lg"
          className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
        >
          <Gift className="w-5 h-5 mr-2" />
          Claim All Bonuses
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="machines" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="machines" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            My Staking Machines
          </TabsTrigger>
          <TabsTrigger value="referral" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Referral Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="machines" className="space-y-6">
          {machines.length === 0 ? (
            <Card className="border-primary/20 bg-gradient-glow card-glow">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Zap className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No Staking Machines
                </h3>
                <p className="text-muted-foreground text-center mb-6">
                  You haven't activated any staking machines yet. Get started by purchasing your first machine!
                </p>
                <Button className="bg-gradient-primary text-primary-foreground hover:shadow-neon">
                  Browse Machines
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {machines.map((machine) => {
                const Icon = getMachineIcon(machine.type);
                const colors = getMachineColors(machine.type);
                const progress = calculateStakingProgress(machine.stakedAmount, machine.capacity);

                return (
                  <Card 
                    key={machine.id}
                    className={`${colors.border} ${colors.bg} card-glow hover:shadow-neon transition-all duration-300`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                          <CardTitle className="text-lg">{machine.name}</CardTitle>
                        </div>
                        <Badge className={`${colors.badge} uppercase text-xs`}>
                          {machine.type}
                        </Badge>
                      </div>
                      {machine.isActive && (
                        <div className="flex items-center space-x-2 text-success">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                          <span className="text-xs">Active</span>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Staking Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Staked</span>
                          <span className={colors.text}>{machine.stakedAmount} / {machine.capacity}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Profit Rate</span>
                          <div className="text-success font-semibold">{machine.profitRate}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Earned</span>
                          <div className="text-accent font-semibold">{machine.totalEarned}</div>
                        </div>
                      </div>

                      {/* Next Claim Countdown */}
                      {machine.isActive && (
                        <div className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Next Claim</span>
                            <Clock className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-primary font-semibold">{machine.timeLeft}</div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={() => onStake(machine.id)}
                          variant="outline"
                          size="sm"
                          className="border-primary/50 hover:bg-primary/10"
                        >
                          <Coins className="w-4 h-4 mr-1" />
                          Stake
                        </Button>
                        {machine.isActive ? (
                          <Button 
                            onClick={() => onClaim(machine.id)}
                            size="sm"
                            className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                          >
                            <Gift className="w-4 h-4 mr-1" />
                            Claim
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => onUnstake(machine.id)}
                            variant="outline"
                            size="sm"
                            className="border-destructive/50 text-destructive hover:bg-destructive/10"
                          >
                            Unstake
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="referral" className="space-y-6">
          {/* Referral Link */}
          <Card className="border-primary/20 bg-gradient-glow card-glow">
            <CardHeader>
              <CardTitle className="text-gradient">Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted/50 rounded-lg p-3 font-mono text-sm">
                  {userStats.referralLink}
                </div>
                <Button 
                  size="sm"
                  className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Network Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-accent/20 bg-accent/5 card-glow">
              <CardHeader>
                <CardTitle className="text-accent">Direct Downlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent text-neon">
                  {userStats.directDownlines}
                </div>
                <p className="text-sm text-muted-foreground">Level 1 members</p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5 card-glow">
              <CardHeader>
                <CardTitle className="text-secondary">Total Network</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-secondary text-neon">
                  {userStats.totalDownlines}
                </div>
                <p className="text-sm text-muted-foreground">10 generations</p>
              </CardContent>
            </Card>
          </div>

          {/* Level Breakdown (placeholder) */}
          <Card className="border-primary/20 bg-gradient-glow card-glow">
            <CardHeader>
              <CardTitle className="text-gradient">Network Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Array.from({ length: 10 }, (_, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {Math.max(0, userStats.directDownlines - i * 2)}
                    </div>
                    <div className="text-xs text-muted-foreground">Level {i + 1}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};