
import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border/20 bg-background/80 backdrop-blur-md relative overflow-hidden">
      {/* Ambient background effect */}
      <div className="absolute inset-0 bg-ambient-gradient opacity-30 animate-ambient-light pointer-events-none"></div>
      
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            © 2025 Elven Token Forge. Built on MultiversX blockchain.
          </p>
          <p className="text-xs text-muted-foreground/70">
            All transactions require wallet signature. We never take custody of your assets.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0 flex items-center gap-1 data-stream">
            Documentation
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0 data-stream">
            Terms of Service
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0 data-stream">
            Privacy Policy
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0 data-stream">
            Contact
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-background/50 hover:bg-accent/20 border border-border/20 shadow-neo-sm transition-all duration-300 hover:shadow-neo">
            <Twitter className="h-4 w-4 text-foreground" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-background/50 hover:bg-accent/20 border border-border/20 shadow-neo-sm transition-all duration-300 hover:shadow-neo">
            <Github className="h-4 w-4 text-foreground" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
