
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TokenIssuanceWizard from '@/components/TokenIssuanceWizard';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const IssueToken = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30 ambient-background">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-elven-gradient flex items-center justify-center shadow-lg">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">Issue New Token</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Create your custom ESDT token on the MultiversX blockchain with just a few steps
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <TokenIssuanceWizard onComplete={() => navigate('/dashboard')} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default IssueToken;
