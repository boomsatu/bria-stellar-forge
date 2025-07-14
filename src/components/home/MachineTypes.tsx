import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Shield, Crown, Diamond } from 'lucide-react';

interface MachineType {
  id: string;
  name: string;
  price: string;
  profitRate: string;
  lifetime: string;
  capacity: string;
  icon: React.ElementType;
  tier: 'bronze' | 'silver' | 'gold' | 'titanium';
  features: string[];
}

interface MachineTypesProps {
  onSelectMachine: (machineId: string) => void;
}

export const MachineTypes = ({ onSelectMachine }: MachineTypesProps) => {
  const machines: MachineType[] = [
    {
      id: 'bronze',
      name: 'Bronze Staker',
      price: '$100',
      profitRate: '0.5%',
      lifetime: '90 days',
      capacity: '1,000 BRIA',
      icon: Zap,
      tier: 'bronze',
      features: ['Basic Staking', 'Level 1 Rewards', 'Standard Support']
    },
    {
      id: 'silver',
      name: 'Silver Staker',
      price: '$500',
      profitRate: '0.8%',
      lifetime: '120 days',
      capacity: '5,000 BRIA',
      icon: Shield,
      tier: 'silver',
      features: ['Enhanced Staking', 'Level 1-3 Rewards', 'Priority Support']
    },
    {
      id: 'gold',
      name: 'Gold Staker',
      price: '$2,000',
      profitRate: '1.2%',
      lifetime: '180 days',
      capacity: '20,000 BRIA',
      icon: Crown,
      tier: 'gold',
      features: ['Premium Staking', 'Level 1-7 Rewards', 'VIP Support']
    },
    {
      id: 'titanium',
      name: 'Titanium Staker',
      price: '$10,000',
      profitRate: '2.0%',
      lifetime: '365 days',
      capacity: '100,000 BRIA',
      icon: Diamond,
      tier: 'titanium',
      features: ['Elite Staking', 'Level 1-10 Rewards', 'Diamond Support']
    }
  ];

  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'border-orange-500/50 bg-orange-500/5';
      case 'silver':
        return 'border-gray-400/50 bg-gray-400/5';
      case 'gold':
        return 'border-yellow-500/50 bg-yellow-500/5';
      case 'titanium':
        return 'border-purple-500/50 bg-purple-500/5';
      default:
        return 'border-primary/50 bg-primary/5';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'bronze':
        return 'bg-orange-500/20 text-orange-400';
      case 'silver':
        return 'bg-gray-400/20 text-gray-300';
      case 'gold':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'titanium':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Staking Machines
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose your staking machine and start earning rewards every 12 hours
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {machines.map((machine, index) => (
          <Card 
            key={machine.id}
            className={`${getTierColors(machine.tier)} card-glow hover:shadow-neon transition-all duration-300 animate-fade-in-up relative overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Tier Badge */}
            <div className="absolute top-4 right-4">
              <Badge className={`${getTierBadgeColor(machine.tier)} font-semibold uppercase`}>
                {machine.tier}
              </Badge>
            </div>

            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-primary`}>
                  <machine.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl text-gradient">
                  {machine.name}
                </CardTitle>
              </div>
              <div className="text-3xl font-bold text-primary text-neon">
                {machine.price}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Profit Rate:</span>
                  <span className="text-success font-semibold">{machine.profitRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lifetime:</span>
                  <span className="text-foreground">{machine.lifetime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="text-accent">{machine.capacity}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-muted-foreground">Features:</h4>
                <ul className="space-y-1">
                  {machine.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-center">
                      <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => onSelectMachine(machine.id)}
                className="w-full bg-gradient-primary text-primary-foreground hover:shadow-neon"
              >
                Activate Machine
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};