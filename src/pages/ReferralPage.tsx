import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Copy, 
  ExternalLink, 
  TrendingUp, 
  DollarSign,
  Network,
  Gift,
  Share2,
  Crown
} from 'lucide-react';

const ReferralPage = () => {
  const referralStats = {
    totalEarnings: '2,450 BRIA',
    totalReferrals: 47,
    directReferrals: 8,
    monthlyEarnings: '320 BRIA',
    referralLink: 'https://bria.protocol/ref/0xABC123DEF456'
  };

  const levelStats = [
    { level: 1, count: 8, earnings: '890 BRIA', percentage: '5.0%' },
    { level: 2, count: 15, earnings: '445 BRIA', percentage: '2.0%' },
    { level: 3, count: 12, earnings: '180 BRIA', percentage: '1.0%' },
    { level: 4, count: 8, earnings: '95 BRIA', percentage: '0.5%' },
    { level: 5, count: 4, earnings: '42 BRIA', percentage: '0.25%' },
    { level: 6, count: 0, earnings: '0 BRIA', percentage: '0.25%' },
    { level: 7, count: 0, earnings: '0 BRIA', percentage: '0.25%' },
    { level: 8, count: 0, earnings: '0 BRIA', percentage: '0.25%' },
    { level: 9, count: 0, earnings: '0 BRIA', percentage: '0.25%' },
    { level: 10, count: 0, earnings: '0 BRIA', percentage: '0.25%' }
  ];

  const recentActivity = [
    { id: 1, user: '0xABC...123', action: 'joined your network', level: 1, reward: '25 BRIA', time: '2h ago' },
    { id: 2, user: '0xDEF...456', action: 'activated Gold machine', level: 2, reward: '15 BRIA', time: '5h ago' },
    { id: 3, user: '0xGHI...789', action: 'staked 5,000 BRIA', level: 1, reward: '50 BRIA', time: '1d ago' },
    { id: 4, user: '0xJKL...012', action: 'claimed rewards', level: 3, reward: '8 BRIA', time: '2d ago' }
  ];

  const networkOverview = {
    machineTurnover: '$45,600',
    stakingTurnover: '2.3M BRIA',
    totalVolume: '$187,400',
    networkGrowth: '+15.2%'
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralStats.referralLink);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Referral Network</h1>
          <p className="text-muted-foreground">Build your network and earn from 10 generations</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-glow card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-primary text-neon">{referralStats.totalEarnings}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Network</p>
                  <p className="text-2xl font-bold text-accent text-neon">{referralStats.totalReferrals}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5 card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Direct Referrals</p>
                  <p className="text-2xl font-bold text-success text-neon">{referralStats.directReferrals}</p>
                </div>
                <Network className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5 card-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Earnings</p>
                  <p className="text-2xl font-bold text-secondary text-neon">{referralStats.monthlyEarnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="levels">Level Breakdown</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="share">Share & Earn</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Network Volume */}
              <Card className="border-primary/20 bg-gradient-glow card-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Network Volume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Machine Turnover</p>
                      <p className="text-xl font-bold text-accent">{networkOverview.machineTurnover}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Staking Turnover</p>
                      <p className="text-xl font-bold text-primary">{networkOverview.stakingTurnover}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Volume</p>
                      <p className="text-xl font-bold text-success">{networkOverview.totalVolume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="text-xl font-bold text-secondary">{networkOverview.networkGrowth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Referral Link */}
              <Card className="border-primary/20 bg-gradient-glow card-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Your Referral Link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input 
                      value={referralStats.referralLink}
                      readOnly
                      className="font-mono text-sm bg-muted/50"
                    />
                    <Button 
                      onClick={copyReferralLink}
                      size="sm"
                      className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Share this link to invite new members to your network and earn from their activities
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Level Breakdown Tab */}
          <TabsContent value="levels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {levelStats.map((level, index) => (
                <Card 
                  key={level.level}
                  className={`border-primary/20 bg-gradient-glow card-glow animate-fade-in-up ${
                    level.count > 0 ? 'border-accent/50 bg-accent/5' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Level {level.level}</CardTitle>
                      {level.level === 1 && <Crown className="w-5 h-5 text-accent" />}
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                      {level.percentage} bonus
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Members</p>
                      <p className="text-xl font-bold text-primary">{level.count}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Earnings</p>
                      <p className="text-lg font-semibold text-success">{level.earnings}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="border-primary/20 bg-gradient-glow card-glow">
              <CardHeader>
                <CardTitle className="text-gradient">Recent Network Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div 
                      key={activity.id}
                      className={`flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border/50 animate-fade-in-up`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            <span className="text-primary font-mono">{activity.user}</span> {activity.action}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">Level {activity.level}</Badge>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-success">+{activity.reward}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Share & Earn Tab */}
          <TabsContent value="share" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-gradient-glow card-glow">
                <CardHeader>
                  <CardTitle className="text-gradient">Share Your Link</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button className="bg-[#4267B2] hover:bg-[#4267B2]/80 text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button className="bg-[#25D366] hover:bg-[#25D366]/80 text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button className="bg-[#0088cc] hover:bg-[#0088cc]/80 text-white">
                      <Share2 className="w-4 h-4 mr-2" />
                      Telegram
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5 card-glow">
                <CardHeader>
                  <CardTitle className="text-accent">Earning Potential</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Machine Sales (L1):</span>
                      <span className="text-success font-semibold">5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Staking Rewards (L1):</span>
                      <span className="text-success font-semibold">3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Max Levels:</span>
                      <span className="text-primary font-semibold">10 Generations</span>
                    </div>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">
                      Build a network of 100 active members and potentially earn $1000+ monthly in referral bonuses!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReferralPage;