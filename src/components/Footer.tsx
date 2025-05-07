
import React from "react";
import { Button } from "./ui/button";
import { ExternalLink, Github, Twitter } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="py-6 px-4 border-t border-white/5 bg-background/70 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient background effect */}
            <div className="absolute inset-0 bg-ambient-gradient opacity-20 animate-ambient-light pointer-events-none"></div>

            <div className="container flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-sm font-medium text-foreground/90 mb-1">
                        © {currentYear} Token Forge. Built on MultiversX blockchain.
                    </p>
                    <p className="text-xs text-foreground/75">
                        All transactions require wallet signature. We never take
                        custody of your assets.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:gap-x-8">
                    <Button
                        variant="link"
                        className="text-sm font-medium text-foreground/90 hover:text-foreground p-0 flex items-center gap-1 data-stream"
                    >
                        Documentation
                        <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button
                        variant="link"
                        className="text-sm font-medium text-foreground/90 hover:text-foreground p-0 data-stream"
                    >
                        Terms of Service
                    </Button>
                    <Button
                        variant="link"
                        className="text-sm font-medium text-foreground/90 hover:text-foreground p-0 data-stream"
                    >
                        Privacy Policy
                    </Button>
                    <Button
                        variant="link"
                        className="text-sm font-medium text-foreground/90 hover:text-foreground p-0 data-stream"
                    >
                        Support
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-8 h-8 bg-base-charcoal/20 hover:bg-accent-glow-cyan/10 border border-white/5 shadow-nm-sm hover:shadow-nm-md transition-all duration-300"
                    >
                        <Twitter className="h-4 w-4 text-foreground/90 hover:text-foreground" />
                        <span className="sr-only">Twitter</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-8 h-8 bg-base-charcoal/20 hover:bg-accent-glow-cyan/10 border border-white/5 shadow-nm-sm hover:shadow-nm-md transition-all duration-300"
                    >
                        <Github className="h-4 w-4 text-foreground/90 hover:text-foreground" />
                        <span className="sr-only">GitHub</span>
                    </Button>
                </div>
            </div>
            
            <div className="container mt-4 flex justify-center">
                <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground/50">Built on</span>
                    <a href="https://multiversx.com" target="_blank" rel="noopener noreferrer" 
                       className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                        MultiversX.com
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
