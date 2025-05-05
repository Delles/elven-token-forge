
import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="py-6 px-4 border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-sm text-muted-foreground">
            © 2025 Elven Token Forge. Built on MultiversX blockchain.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground p-0">
            Documentation
          </Button>
          <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground p-0">
            Terms of Service
          </Button>
          <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground p-0">
            Privacy Policy
          </Button>
          <Button variant="link" className="text-sm text-muted-foreground hover:text-foreground p-0">
            Contact
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
              <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
              <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
              <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
            </svg>
            <span className="sr-only">Discord</span>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
