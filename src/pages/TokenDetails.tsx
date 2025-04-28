
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
        <NavBar />
        <main className="flex-1 container py-8 px-4 md:py-12 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Token Not Found</CardTitle>
              <CardDescription>
                The token you're looking for doesn't exist or you don't have permission to view it.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate('/dashboard')}>Return to Dashboard</Button>
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12">
        <div className="flex items-center mb-8 gap-2 text-sm">
          <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <span>/</span>
          <span className="text-muted-foreground">{token.name} ({token.ticker})</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <Circle className="h-10 w-10 text-elven" fill="currentColor" fillOpacity={0.2} />
            <div>
              <h1 className="text-3xl font-bold">{token.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="font-mono">{token.ticker}</span>
                <span>•</span>
                <span>{Number(token.supply).toLocaleString()} Tokens</span>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Token Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{token.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Ticker</span>
                  <span className="font-medium">{token.ticker}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span className="font-medium">{Number(token.supply).toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Decimals</span>
                  <span className="font-medium">{token.decimals}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Created On</span>
                  <span className="font-medium">{token.createdAt}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Properties</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {token.properties.map((prop) => (
                      <span key={prop} className="px-2 py-0.5 bg-accent/20 text-xs rounded">
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-2xl font-bold mb-4">Token Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {token.properties.includes('canMint') && (
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Mint Tokens
                </CardTitle>
                <CardDescription>Create additional tokens to increase supply</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" onClick={() => handleAction('mint')}>Mint Tokens</Button>
              </CardFooter>
            </Card>
          )}
          
          {token.properties.includes('canBurn') && (
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Minus className="h-5 w-5" />
                  Burn Tokens
                </CardTitle>
                <CardDescription>Destroy tokens to reduce supply</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => handleAction('burn')}>Burn Tokens</Button>
              </CardFooter>
            </Card>
          )}
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Airdrop Tokens
              </CardTitle>
              <CardDescription>Send tokens to multiple addresses at once</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" variant="outline" onClick={() => handleAction('airdrop')}>Airdrop</Button>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Add Liquidity
              </CardTitle>
              <CardDescription>Create or add to a liquidity pool for your token</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full bg-elven-gradient hover:opacity-90"
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
