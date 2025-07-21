import { Github, Twitter, Send, Users, MessageCircle } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Send, href: "#", label: "Telegram" },
    { icon: Users, href: "#", label: "Discord" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: MessageCircle, href: "#", label: "Medium" },
  ];

  return (
    <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">BRIA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The First Staking Protocol Backed by Real-World Assets. 
              Building the future of decentralized finance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Platform</h4>
            <div className="space-y-2">
              <a href="/stake" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Staking Machines
              </a>
              <a href="/referral" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Referral Program
              </a>
              <a href="/dao" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                DAO Governance
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Whitepaper
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Tokenomics
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Security Audit
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Community</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:glow-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-xs">
              Join our community for updates and support
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 BRIA Protocol. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};