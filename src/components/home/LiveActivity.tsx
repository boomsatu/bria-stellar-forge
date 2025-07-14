import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, TrendingUp } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'machine_activation' | 'stake' | 'claim' | 'referral';
  user: string;
  action: string;
  amount?: string;
  timestamp: string;
  machineType?: string;
}

interface LiveActivityProps {
  activities: ActivityItem[];
}

export const LiveActivity = ({ activities }: LiveActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'machine_activation':
        return Zap;
      case 'stake':
      case 'claim':
        return TrendingUp;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'machine_activation':
        return 'text-accent';
      case 'stake':
        return 'text-primary';
      case 'claim':
        return 'text-success';
      case 'referral':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getMachineTypeColor = (machineType?: string) => {
    switch (machineType) {
      case 'Bronze':
        return 'bg-orange-500/20 text-orange-400';
      case 'Silver':
        return 'bg-gray-400/20 text-gray-300';
      case 'Gold':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Titanium':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <section className="mb-16">
      <Card className="border-primary/20 bg-gradient-glow card-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-gradient">Live Network Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div 
                  key={activity.id}
                  className={`flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${getActivityColor(activity.type)}`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-foreground">
                          User <span className="text-primary font-mono">{activity.user}</span>
                        </span>
                        {activity.machineType && (
                          <Badge className={`text-xs ${getMachineTypeColor(activity.machineType)}`}>
                            {activity.machineType}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.action}
                        {activity.amount && (
                          <span className="text-accent font-semibold ml-1">
                            {activity.amount}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};