import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StatsOverview } from '@/components/home/StatsOverview';
import { MachineTypes } from '@/components/home/MachineTypes';
import { LiveActivity } from '@/components/home/LiveActivity';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Coins, Users, Globe } from 'lucide-react';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  // Mock data
  const mockStats = {
    marketCap: '$2.5M',
    tokenPrice: '$0.045',
    circulatingSupply: '55M BRIA',
    totalStaked: '12.3M BRIA'
  };

  const mockActivities = [
    {
      id: '1',
      type: 'machine_activation' as const,
      user: '0xAB12...CD34',
      action: 'activated a Titanium Staking Machine',
      amount: '5,000 BRIA',
      timestamp: '2 min ago',
      machineType: 'Titanium'
    },
    {
      id: '2',
      type: 'stake' as const,
      user: '0xEF56...GH78',
      action: 'staked tokens in',
      amount: '1,000 BRIA',
      timestamp: '5 min ago',
      machineType: 'Gold'
    },
    {
      id: '3',
      type: 'claim' as const,
      user: '0xIJ90...KL12',
      action: 'claimed rewards',
      amount: '25 BRIA',
      timestamp: '8 min ago'
    },
    {
      id: '4',
      type: 'referral' as const,
      user: '0xMN34...OP56',
      action: 'earned referral bonus',
      amount: '50 BRIA',
      timestamp: '12 min ago'
    }
  ];

  const mockUserStats = {
    totalStakingRewards: '1,250 BRIA',
    totalReferralBonus: '380 BRIA',
    totalMachineBonus: '150 BRIA',
    directDownlines: 5,
    totalDownlines: 23,
    referralLink: 'https://bria.protocol/ref/0xABC123...'
  };

  const mockMachines = [
    {
      id: '1',
      name: 'Bronze Staker #001',
      type: 'bronze' as const,
      stakedAmount: '800 BRIA',
      capacity: '1,000 BRIA',
      profitRate: '0.5%',
      nextClaim: '12h',
      timeLeft: '4h 23m',
      totalEarned: '45 BRIA',
      isActive: true
    },
    {
      id: '2',
      name: 'Gold Staker #001',
      type: 'gold' as const,
      stakedAmount: '15,000 BRIA',
      capacity: '20,000 BRIA',
      profitRate: '1.2%',
      nextClaim: '12h',
      timeLeft: '8h 15m',
      totalEarned: '890 BRIA',
      isActive: true
    }
  ];

  const handleConnectWallet = () => {
    // Mock wallet connection
    setIsConnected(true);
    setWalletAddress('0xABC123...DEF456');
  };

  const handleSelectMachine = (machineId: string) => {
    console.log('Selected machine:', machineId);
    // Handle machine purchase logic
  };

  const handleStake = (machineId: string) => {
    console.log('Stake in machine:', machineId);
  };

  const handleUnstake = (machineId: string) => {
    console.log('Unstake from machine:', machineId);
  };

  const handleClaim = (machineId: string) => {
    console.log('Claim from machine:', machineId);
  };

  const handleClaimAll = () => {
    console.log('Claim all bonuses');
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <Header 
        onConnectWallet={handleConnectWallet}
        walletAddress={walletAddress}
        isConnected={isConnected}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <section className="text-center py-16 mb-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full animate-pulse-glow flex items-center justify-center">
                    <Shield className="w-10 h-10 text-primary-foreground" />
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 animate-fade-in-up">
                  BRIA PROTOCOL
                </h1>
                
                <p className="text-xl md:text-2xl text-primary mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  The First Staking Protocol Backed by Real-World Assets
                </p>
                
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Revolutionary DeFi platform combining staking machines, RWA integration, 
                  and multi-level referral rewards in a sci-fi ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  {isConnected ? (
                    <Button 
                      onClick={() => setCurrentView('dashboard')}
                      size="lg"
                      className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                    >
                      <Coins className="w-5 h-5 mr-2" />
                      Enter Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleConnectWallet}
                      size="lg"
                      className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
                    >
                      Connect Wallet & Start
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </section>

            {/* Key Features */}
            <section className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center animate-fade-in-up">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-gradient mb-2">RWA Integration</h3>
                  <p className="text-muted-foreground">
                    Backed by real-world assets for sustainable growth and stability
                  </p>
                </div>
                
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Coins className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-gradient mb-2">Staking Machines</h3>
                  <p className="text-muted-foreground">
                    Automated staking with multiple machine tiers and profit rates
                  </p>
                </div>
                
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-gradient mb-2">Multi-Level Referral</h3>
                  <p className="text-muted-foreground">
                    Earn bonuses from 10 generations of your referral network
                  </p>
                </div>
              </div>
            </section>

            {/* Stats Overview */}
            <StatsOverview stats={mockStats} />

            {/* Machine Types */}
            <MachineTypes onSelectMachine={handleSelectMachine} />

            {/* Live Activity */}
            <LiveActivity activities={mockActivities} />
          </>
        ) : (
          <>
            {/* Dashboard Navigation */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
              <Button 
                onClick={() => setCurrentView('home')}
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
              >
                Back to Home
              </Button>
            </div>

            {/* User Dashboard */}
            <UserDashboard 
              machines={mockMachines}
              userStats={mockUserStats}
              onStake={handleStake}
              onUnstake={handleUnstake}
              onClaim={handleClaim}
              onClaimAll={handleClaimAll}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
