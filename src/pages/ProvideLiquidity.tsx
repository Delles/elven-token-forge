
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiquidityProvisionWizard from '@/components/LiquidityProvisionWizard';
import { useNavigate } from 'react-router-dom';
import { Coins } from 'lucide-react';

const ProvideLiquidity = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <div className="absolute inset-0 bg-ambient-gradient opacity-60 animate-ambient-light pointer-events-none"></div>
      
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12 relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-glow-cyan to-accent-aurora-green flex items-center justify-center shadow-nm-md">
              <Coins className="text-white h-6 w-6" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-glow-cyan via-accent-aurora-green to-accent-amethyst">
              Provide Liquidity
            </h1>
          </div>
          <p className="text-muted-foreground/90 max-w-xl mx-auto backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 shadow-nm-sm inline-block">
            Add token liquidity to xExchange and enable trading
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white/60 dark:bg-card/60 backdrop-blur-md border border-white/10 rounded-xl shadow-nm-lg p-6 md:p-8 animate-fade-in" style={{animationDelay: "200ms"}}>
          <LiquidityProvisionWizard onComplete={() => navigate('/dashboard')} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProvideLiquidity;
