
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiquidityProvisionWizard from '@/components/LiquidityProvisionWizard';
import { useNavigate } from 'react-router-dom';

const ProvideLiquidity = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30 ambient-background">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 gradient-text text-center">Provide Liquidity</h1>
        <p className="text-center text-muted-foreground mb-8">Add token liquidity to xExchange and enable trading</p>
        
        <div className="max-w-4xl mx-auto">
          <LiquidityProvisionWizard onComplete={() => navigate('/dashboard')} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProvideLiquidity;
