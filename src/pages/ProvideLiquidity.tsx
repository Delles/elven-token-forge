
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiquidityProvisionWizard from '@/components/LiquidityProvisionWizard';
import { useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ProvideLiquidity = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <div className="absolute inset-0 bg-ambient-gradient opacity-60 animate-ambient-light pointer-events-none"></div>
      
      <NavBar />
      
      <main className="flex-1 container py-8 md:py-12 relative z-10">
        <div className="max-w-5xl mx-auto pt-6 md:pt-10">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left column - Visual */}
            <div className="w-full md:w-2/5">
              <div className="aspect-w-1 aspect-h-1">
                <AspectRatio ratio={1/1} className="rounded-3xl overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-accent-glow-cyan to-accent-aurora-green p-1 rounded-3xl shadow-nm-lg">
                    <div className="w-full h-full rounded-3xl flex items-center justify-center bg-gradient-to-br from-base-charcoal/90 to-base-space-blue/80 backdrop-blur-lg p-12">
                      <Coins className="text-accent-aurora-green w-28 h-28 animate-pulse-subtle" strokeWidth={1.5} />
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
            
            {/* Right column - Content */}
            <div className="w-full md:w-3/5 text-center md:text-left">
              <div className="inline-flex items-center justify-center mb-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 shadow-nm-sm">
                <span className="text-xs font-semibold text-accent-aurora-green">EXCHANGE LIQUIDITY</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-glow-cyan via-accent-aurora-green to-accent-amethyst mb-4">
                Add Token Liquidity
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                Make your token tradable by adding initial liquidity to xExchange with our simple step-by-step wizard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => {}}
                  className="btn neo-button px-6 py-3 text-base font-medium bg-gradient-to-r from-accent-glow-cyan to-accent-aurora-green"
                >
                  Connect Wallet to Start
                </button>
                
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="btn neo-button-outline px-6 py-3 text-base font-medium bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft"
                >
                  View My Liquidity
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 md:mt-16 bg-white/60 dark:bg-card/60 backdrop-blur-md border border-white/10 rounded-xl shadow-nm-lg p-6 md:p-8 animate-fade-in">
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-semibold mb-2">Add xExchange Liquidity</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-accent-glow-cyan to-accent-aurora-green rounded-full"></div>
            </div>
            
            <LiquidityProvisionWizard onComplete={() => navigate('/dashboard')} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProvideLiquidity;
