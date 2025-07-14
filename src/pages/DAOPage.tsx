import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Coins,
  TrendingUp,
  FileText,
  Building,
  AlertTriangle,
  Settings,
  Plus
} from 'lucide-react';

const DAOPage = () => {
  const daoStats = {
    totalProposals: 24,
    activeProposals: 3,
    totalVoters: 1247,
    treasuryBalance: '2.8M BRIA',
    quorum: '4%'
  };

  const proposals = [
    {
      id: 1,
      title: 'Real Estate Investment - Downtown Plaza',
      description: 'Invest $500K in commercial real estate to generate rental income for the DAO treasury.',
      category: 'RWA_INVESTMENT',
      status: 'active',
      votesFor: 12500,
      votesAgainst: 3200,
      totalVotes: 15700,
      quorumReached: true,
      timeLeft: '2 days 14h',
      requestedFunding: '$500,000',
      proposer: '0xABC...123'
    },
    {
      id: 2,
      title: 'Increase Bronze Machine Capacity',
      description: 'Proposal to increase Bronze staking machine capacity from 1,000 to 1,500 BRIA tokens.',
      category: 'TOKENOMICS',
      status: 'active',
      votesFor: 8900,
      votesAgainst: 6100,
      totalVotes: 15000,
      quorumReached: true,
      timeLeft: '5 days 8h',
      requestedFunding: 'N/A',
      proposer: '0xDEF...456'
    },
    {
      id: 3,
      title: 'Emergency Protocol Upgrade',
      description: 'Critical security update to fix potential vulnerability in staking contracts.',
      category: 'EMERGENCY',
      status: 'active',
      votesFor: 18200,
      votesAgainst: 1100,
      totalVotes: 19300,
      quorumReached: true,
      timeLeft: '12h 30m',
      requestedFunding: 'N/A',
      proposer: '0xGHI...789'
    }
  ];

  const completedProposals = [
    {
      id: 4,
      title: 'Launch Gold Staking Machines',
      status: 'passed',
      result: 'Implemented',
      votesFor: 21000,
      votesAgainst: 4500
    },
    {
      id: 5,
      title: 'Reduce Transaction Fees',
      status: 'rejected',
      result: 'Not Implemented',
      votesFor: 8500,
      votesAgainst: 15200
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'RWA_INVESTMENT': return Building;
      case 'TOKENOMICS': return Coins;
      case 'TECHNICAL_UPGRADE': return Settings;
      case 'EMERGENCY': return AlertTriangle;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'RWA_INVESTMENT': return 'text-accent border-accent/50 bg-accent/10';
      case 'TOKENOMICS': return 'text-primary border-primary/50 bg-primary/10';
      case 'TECHNICAL_UPGRADE': return 'text-secondary border-secondary/50 bg-secondary/10';
      case 'EMERGENCY': return 'text-destructive border-destructive/50 bg-destructive/10';
      default: return 'text-muted-foreground border-muted/50 bg-muted/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-primary bg-primary/20';
      case 'passed': return 'text-success bg-success/20';
      case 'rejected': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">BRIA DAO</h1>
          <p className="text-muted-foreground">Decentralized governance for protocol evolution and RWA investments</p>
        </div>

        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <Card className="border-primary/20 bg-gradient-glow card-glow">
            <CardContent className="p-6 text-center">
              <Vote className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary text-neon">{daoStats.totalProposals}</p>
              <p className="text-sm text-muted-foreground">Total Proposals</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 card-glow">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent text-neon">{daoStats.activeProposals}</p>
              <p className="text-sm text-muted-foreground">Active Votes</p>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5 card-glow">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success text-neon">{daoStats.totalVoters}</p>
              <p className="text-sm text-muted-foreground">Total Voters</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5 card-glow">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary text-neon">{daoStats.treasuryBalance}</p>
              <p className="text-sm text-muted-foreground">Treasury</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 card-glow">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary text-neon">{daoStats.quorum}</p>
              <p className="text-sm text-muted-foreground">Quorum</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="active">Active Proposals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="create">Create Proposal</TabsTrigger>
            </TabsList>
            
            <Button className="bg-gradient-primary text-primary-foreground hover:shadow-neon">
              <Plus className="w-4 h-4 mr-2" />
              New Proposal
            </Button>
          </div>

          {/* Active Proposals */}
          <TabsContent value="active" className="space-y-6">
            {proposals.map((proposal, index) => {
              const CategoryIcon = getCategoryIcon(proposal.category);
              const categoryColor = getCategoryColor(proposal.category);
              const statusColor = getStatusColor(proposal.status);
              const votePercentage = (proposal.votesFor / proposal.totalVotes) * 100;

              return (
                <Card 
                  key={proposal.id}
                  className={`border-primary/20 bg-gradient-glow card-glow animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${categoryColor}`}>
                          <CategoryIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Proposed by {proposal.proposer}</span>
                            <span>•</span>
                            <span>Funding: {proposal.requestedFunding}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={statusColor}>
                          {proposal.status.toUpperCase()}
                        </Badge>
                        <div className="text-right text-sm">
                          <p className="text-muted-foreground">Time left</p>
                          <p className="font-semibold text-primary">{proposal.timeLeft}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Voting Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-success">For: {proposal.votesFor.toLocaleString()} ({votePercentage.toFixed(1)}%)</span>
                        <span className="text-destructive">Against: {proposal.votesAgainst.toLocaleString()} ({(100-votePercentage).toFixed(1)}%)</span>
                      </div>
                      <Progress value={votePercentage} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Total votes: {proposal.totalVotes.toLocaleString()}</span>
                        <span className={proposal.quorumReached ? 'text-success' : 'text-destructive'}>
                          Quorum {proposal.quorumReached ? 'reached' : 'not reached'}
                        </span>
                      </div>
                    </div>

                    {/* Vote Buttons */}
                    <div className="flex space-x-3">
                      <Button 
                        className="flex-1 bg-success/20 text-success border-success/50 hover:bg-success/30"
                        variant="outline"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Vote For
                      </Button>
                      <Button 
                        className="flex-1 bg-destructive/20 text-destructive border-destructive/50 hover:bg-destructive/30"
                        variant="outline"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Completed Proposals */}
          <TabsContent value="completed" className="space-y-6">
            {completedProposals.map((proposal, index) => (
              <Card 
                key={proposal.id}
                className={`border-primary/20 bg-gradient-glow card-glow animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-success">For: {proposal.votesFor.toLocaleString()}</span>
                        <span className="text-destructive">Against: {proposal.votesAgainst.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.toUpperCase()}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-2">{proposal.result}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Create Proposal */}
          <TabsContent value="create" className="space-y-6">
            <Card className="border-primary/20 bg-gradient-glow card-glow">
              <CardHeader>
                <CardTitle className="text-gradient">Create New Proposal</CardTitle>
                <p className="text-muted-foreground">Submit a proposal for community voting</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Proposal Title</label>
                    <input 
                      className="w-full p-3 bg-muted/50 border border-primary/20 rounded-lg focus:border-primary"
                      placeholder="Enter proposal title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select className="w-full p-3 bg-muted/50 border border-primary/20 rounded-lg focus:border-primary">
                      <option>RWA Investment</option>
                      <option>Tokenomics</option>
                      <option>Technical Upgrade</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea 
                    className="min-h-[120px] bg-muted/50 border-primary/20"
                    placeholder="Describe your proposal in detail..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Requested Funding (USD)</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-muted/50 border border-primary/20 rounded-lg focus:border-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Voting Period (Days)</label>
                    <input 
                      type="number"
                      className="w-full p-3 bg-muted/50 border border-primary/20 rounded-lg focus:border-primary"
                      placeholder="7"
                      defaultValue="7"
                    />
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Proposal Requirements:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Minimum 1,000 BRIA tokens to create proposal</li>
                    <li>• 4% quorum required for proposal to pass</li>
                    <li>• Voting period: 7 days (default)</li>
                    <li>• Emergency proposals: 3 days (admin only)</li>
                  </ul>
                </div>

                <Button 
                  className="w-full bg-gradient-primary text-primary-foreground hover:shadow-neon"
                  size="lg"
                >
                  Submit Proposal (Cost: 1,000 BRIA)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DAOPage;