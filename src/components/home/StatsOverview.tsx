import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, DollarSign, Coins, Users } from 'lucide-react';

interface StatsData {
  marketCap: string;
  tokenPrice: string;
  circulatingSupply: string;
  totalStaked: string;
}

interface StatsOverviewProps {
  stats: StatsData;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const statItems = [
    {
      title: 'Market Cap',
      value: stats.marketCap,
      icon: TrendingUp,
      color: 'text-primary',
      glow: 'glow-primary'
    },
    {
      title: 'BRIA Price',
      value: stats.tokenPrice,
      icon: DollarSign,
      color: 'text-success',
      glow: 'glow-accent'
    },
    {
      title: 'Circulating Supply',
      value: stats.circulatingSupply,
      icon: Coins,
      color: 'text-accent',
      glow: 'pulse-glow'
    },
    {
      title: 'Total Staked',
      value: stats.totalStaked,
      icon: Users,
      color: 'text-secondary',
      glow: 'animate-float'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statItems.map((item, index) => (
        <Card 
          key={item.title} 
          className={`card-glow border-primary/20 bg-gradient-glow ${item.glow} animate-fade-in-up`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${item.color} text-neon`}>
              {item.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};