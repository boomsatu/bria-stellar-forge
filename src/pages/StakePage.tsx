import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Shield, 
  Crown, 
  Diamond, 
  Plus,
  Minus,
  Clock,
  TrendingUp,
  Activity,
  Coins,
  Settings
} from 'lucide-react';

const StakePage = () => {
  const machines = [
    {
      id: '1',
      name: 'Bronze Staker #001',
      type: 'bronze',
      stakedAmount: 800,
      capacity: 1000,
      profitRate: 0.5,
      nextClaim: '4h 23m',
      totalEarned: 45,
      isActive: true
    },
    {
      id: '2',
      name: 'Gold Staker #001', 
      type: 'gold',
      stakedAmount: 15000,
      capacity: 20000,
      profitRate: 1.2,
      nextClaim: '8h 15m',
      totalEarned: 890,
      isActive: true
    }
  ];

  const availableMachines = [
    { type: 'bronze', name: 'Bronze Staker', price: 100, capacity: 1000, rate: 0.5, lifetime: 90 },
    { type: 'silver', name: 'Silver Staker', price: 500, capacity: 5000, rate: 0.8, lifetime: 120 },
    { type: 'gold', name: 'Gold Staker', price: 2000, capacity: 20000, rate: 1.2, lifetime: 180 },
    { type: 'titanium', name: 'Titanium Staker', price: 10000, capacity: 100000, rate: 2.0, lifetime: 365 }
  ];

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
      case 'bronze': return { border: 'border-orange-500/50', bg: 'bg-orange-500/10', text: 'text-orange-400' };
      case 'silver': return { border: 'border-gray-400/50', bg: 'bg-gray-400/10', text: 'text-gray-300' };
      case 'gold': return { border: 'border-yellow-500/50', bg: 'bg-yellow-500/10', text: 'text-yellow-400' };
      case 'titanium': return { border: 'border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-400' };
      default: return { border: 'border-primary/50', bg: 'bg-primary/10', text: 'text-primary' };
    }
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Staking Machines</h1>
          <p className="text-muted-foreground">Manage your staking machines and earn passive rewards</p>
        </div>

        <Tabs defaultValue="my-machines" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="my-machines">My Machines</TabsTrigger>
            <TabsTrigger value="buy-machines">Buy Machines</TabsTrigger>
          </TabsList>

          {/* My Machines Tab */}
          <TabsContent value="my-machines" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {machines.map((machine) => {
                const Icon = getMachineIcon(machine.type);
                const colors = getMachineColors(machine.type);
                const progress = (machine.stakedAmount / machine.capacity) * 100;

                return (
                  <Card key={machine.id} className={`${colors.border} ${colors.bg} card-glow`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                          <CardTitle className="text-lg">{machine.name}</CardTitle>
                        </div>
                        {machine.isActive && (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                            <span className="text-xs text-success">Active</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Staking Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Staked</span>
                          <span className={colors.text}>{machine.stakedAmount.toLocaleString()} / {machine.capacity.toLocaleString()} BRIA</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Profit Rate</span>
                          <div className="text-success font-semibold">{machine.profitRate}%</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Earned</span>
                          <div className="text-accent font-semibold">{machine.totalEarned} BRIA</div>
                        </div>
                      </div>

                      {/* Next Claim */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Next Claim</span>
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-primary font-semibold">{machine.nextClaim}</div>
                      </div>

                      {/* Stake/Unstake Input */}
                      <div className="space-y-3">
                        <Label className="text-sm">Amount to Stake/Unstake</Label>
                        <div className="flex space-x-2">
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="bg-muted/50 border-primary/20"
                          />
                          <Button size="sm" variant="outline" className="px-3">
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="px-3">
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm"
                          className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                        >
                          Stake
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-gradient-secondary text-secondary-foreground hover:shadow-accent"
                        >
                          Claim
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Buy Machines Tab */}
          <TabsContent value="buy-machines" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {availableMachines.map((machine, index) => {
                const Icon = getMachineIcon(machine.type);
                const colors = getMachineColors(machine.type);

                return (
                  <Card 
                    key={machine.type}
                    className={`${colors.border} ${colors.bg} card-glow hover:shadow-neon transition-all duration-300 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                        <CardTitle className="text-xl">{machine.name}</CardTitle>
                      </div>
                      <div className="text-3xl font-bold text-neon text-primary">
                        ${machine.price.toLocaleString()}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="text-accent">{machine.capacity.toLocaleString()} BRIA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Profit Rate:</span>
                          <span className="text-success">{machine.rate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Lifetime:</span>
                          <span className="text-foreground">{machine.lifetime} days</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-primary text-primary-foreground hover:shadow-neon"
                      >
                        Purchase Machine
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StakePage;