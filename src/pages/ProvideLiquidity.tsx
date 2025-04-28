
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import LiquidityProvisionWizard from '@/components/LiquidityProvisionWizard';
import { useNavigate } from 'react-router-dom';

const ProvideLiquidity = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12">
        <LiquidityProvisionWizard onComplete={() => navigate('/dashboard')} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProvideLiquidity;
