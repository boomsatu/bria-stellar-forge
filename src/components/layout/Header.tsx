import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, Activity } from 'lucide-react';

interface HeaderProps {
  onConnectWallet: () => void;
  walletAddress?: string;
  isConnected: boolean;
}

export const Header = ({ onConnectWallet, walletAddress, isConnected }: HeaderProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full animate-pulse-glow" />
            <h1 className="text-2xl font-bold text-gradient">BRIA</h1>
            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
              PROTOCOL
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className={`transition-colors ${
                isActive('/') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/stake"
              className={`transition-colors ${
                isActive('/stake') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Staking
            </Link>
            <Link 
              to="/referral"
              className={`transition-colors ${
                isActive('/referral') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Referral
            </Link>
            <Link 
              to="/dao"
              className={`transition-colors ${
                isActive('/dao') ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              DAO
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-primary">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </span>
                <Button variant="outline" size="sm" className="glow-primary">
                  <Activity className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onConnectWallet}
                className="bg-gradient-primary text-primary-foreground hover:shadow-neon"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};