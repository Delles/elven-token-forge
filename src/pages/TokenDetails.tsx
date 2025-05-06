
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Send, Plus, Minus, Circle } from 'lucide-react';

// Mock data for tokens
const mockTokensData = {
  '1': {
    id: '1',
    name: 'Example Token',
    ticker: 'EXT',
    supply: '1000000',
    decimals: '18',
    createdAt: '2023-08-15',
    properties: ['canMint', 'canBurn', 'canChangeOwner', 'canUpgrade'],
  },
  '2': {
    id: '2',
    name: 'Community Token',
    ticker: 'CMT',
    supply: '500000',
    decimals: '18',
    createdAt: '2023-09-20',
    properties: ['canMint', 'canBurn', 'canPause', 'canChangeOwner', 'canUpgrade'],
  },
  '3': {
    id: '3',
    name: 'Utility Token',
    ticker: 'UTL',
    supply: '10000000',
    decimals: '6',
    createdAt: '2023-10-05',
    properties: ['canBurn', 'canChangeOwner', 'canUpgrade'],
  },
};

const TokenDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Get token data from mock data
  const token = mockTokensData[id as keyof typeof mockTokensData];
  
  if (!token) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
        <div className="absolute inset-0 bg-ambient-gradient opacity-60 animate-ambient-light pointer-events-none"></div>
        <NavBar />
        <main className="flex-1 container py-8 px-4 md:py-12 flex items-center justify-center relative z-10">
          <Card className="w-full max-w-md backdrop-blur-md border border-white/10">
            <CardHeader className="text-center">
              <CardTitle>Token Not Found</CardTitle>
              <CardDescription>
                The token you're looking for doesn't exist or you don't have permission to view it.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-gradient-to-r from-primary to-accent-amethyst hover:brightness-110"
              >
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAction = (action: string) => {
    // For now, just show a console message
    console.log(`Action triggered: ${action} for token ${token.name}`);
    // In a real app, we would navigate to the specific action page or open a modal
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/30">
      <div className="absolute inset-0 bg-ambient-gradient opacity-60 animate-ambient-light pointer-events-none"></div>
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12 relative z-10">
        <div className="flex items-center mb-6 gap-2 text-sm animate-fade-in">
          <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <span>/</span>
          <span className="text-muted-foreground">{token.name} ({token.ticker})</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in" style={{animationDelay: "100ms"}}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent/60 flex items-center justify-center shadow-nm-sm">
              <Circle className="h-8 w-8 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-glow-cyan to-accent-amethyst">
                {token.name}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="neo" className="font-mono">{token.ticker}</Badge>
                <span>•</span>
                <span>{Number(token.supply).toLocaleString()} Tokens</span>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="mb-8 neo-card backdrop-blur-sm animate-fade-in" style={{animationDelay: "200ms"}}>
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{token.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Ticker</span>
                  <span className="font-medium">{token.ticker}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">{Number(token.supply).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Decimals</span>
                  <span className="font-medium">{token.decimals}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Created On</span>
                  <span className="font-medium">{token.createdAt}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-muted-foreground">Properties</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {token.properties.map((prop) => (
                      <span key={prop} className="px-2 py-0.5 bg-accent/10 backdrop-blur-sm text-xs rounded-full border border-accent/20">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold mb-4 animate-fade-in" style={{animationDelay: "300ms"}}>Token Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in" style={{animationDelay: "400ms"}}>
          {token.properties.includes('canMint') && (
            <Card className="neo-card group backdrop-blur-sm hover:shadow-nm-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  <span>Mint Tokens</span>
                </CardTitle>
                <CardDescription>Create additional tokens to increase supply</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-primary/80 to-primary hover:brightness-110" 
                  onClick={() => handleAction('mint')}
                >
                  Mint Tokens
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {token.properties.includes('canBurn') && (
            <Card className="neo-card group backdrop-blur-sm hover:shadow-nm-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <Minus className="h-5 w-5 text-destructive" />
                  </div>
                  <span>Burn Tokens</span>
                </CardTitle>
                <CardDescription>Destroy tokens to reduce supply</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={() => handleAction('burn')}
                >
                  Burn Tokens
                </Button>
              </CardFooter>
            </Card>
          )}
          
          <Card className="neo-card group backdrop-blur-sm hover:shadow-nm-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Send className="h-5 w-5 text-accent" />
                </div>
                <span>Airdrop Tokens</span>
              </CardTitle>
              <CardDescription>Send tokens to multiple addresses at once</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline" 
                onClick={() => handleAction('airdrop')}
              >
                Airdrop
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="neo-card group backdrop-blur-sm hover:shadow-nm-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent-amethyst/10 flex items-center justify-center group-hover:bg-accent-amethyst/20 transition-colors">
                  <ArrowRight className="h-5 w-5 text-accent-amethyst" />
                </div>
                <span>Add Liquidity</span>
              </CardTitle>
              <CardDescription>Create or add to a liquidity pool for your token</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full bg-gradient-to-r from-accent-amethyst to-accent hover:brightness-110"
                onClick={() => navigate('/provide-liquidity')}
              >
                Add Liquidity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TokenDetails;
