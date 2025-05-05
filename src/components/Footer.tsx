
import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            © 2025 Elven Token Forge. Built on MultiversX blockchain.
          </p>
          <p className="text-xs text-muted-foreground/70">
            All transactions require wallet signature. We never take custody of your assets.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0 flex items-center gap-1">
            Documentation
            <ExternalLink className="h-3 w-3" />
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0">
            Terms of Service
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0">
            Privacy Policy
          </Button>
          <Button variant="link" className="text-sm font-medium text-muted-foreground hover:text-foreground p-0">
            Contact
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-background/50 hover:bg-accent/50 border border-border/40 shadow-sm">
            <Twitter className="h-4 w-4 text-foreground" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 bg-background/50 hover:bg-accent/50 border border-border/40 shadow-sm">
            <Github className="h-4 w-4 text-foreground" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
