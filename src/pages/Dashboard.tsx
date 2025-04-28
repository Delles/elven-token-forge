
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Circle, Plus } from 'lucide-react';

// Mock data for user's tokens
const mockUserTokens = [
  {
    id: '1',
    name: 'Example Token',
    ticker: 'EXT',
    supply: '1000000',
    decimals: '18',
    createdAt: '2023-08-15',
    properties: ['canMint', 'canBurn'],
  },
  {
    id: '2',
    name: 'Community Token',
    ticker: 'CMT',
    supply: '500000',
    decimals: '18',
    createdAt: '2023-09-20',
    properties: ['canMint', 'canBurn', 'canPause'],
  },
  {
    id: '3',
    name: 'Utility Token',
    ticker: 'UTL',
    supply: '10000000',
    decimals: '6',
    createdAt: '2023-10-05',
    properties: ['canBurn'],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [tokens] = useState(mockUserTokens);

  const handleIssueNewToken = () => {
    navigate('/issue-token');
  };

  const handleTokenDetails = (tokenId: string) => {
    navigate(`/token/${tokenId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Token Forge</h1>
            <p className="text-muted-foreground">Manage your ESDT tokens on the MultiversX blockchain</p>
          </div>
          <Button 
            className="mt-4 md:mt-0 bg-elven-gradient hover:opacity-90 gap-2"
            onClick={handleIssueNewToken}
          >
            <Plus className="h-4 w-4" />
            Issue New Token
          </Button>
        </div>
        
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Your Tokens</CardTitle>
            <CardDescription>
              All ESDT tokens you've created with Elven Token Forge
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tokens.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Supply</TableHead>
                      <TableHead>Decimals</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokens.map((token) => (
                      <TableRow key={token.id} className="cursor-pointer hover:bg-muted/60" onClick={() => handleTokenDetails(token.id)}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Circle className="h-4 w-4 text-elven" fill="currentColor" fillOpacity={0.2} />
                            <div>
                              <div>{token.name}</div>
                              <div className="text-xs text-muted-foreground">{token.ticker}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{Number(token.supply).toLocaleString()}</TableCell>
                        <TableCell>{token.decimals}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            {token.properties.map((prop) => (
                              <span key={prop} className="px-1 py-0.5 bg-accent/20 text-xs rounded">
                                {prop.replace('can', '')}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{token.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            handleTokenDetails(token.id);
                          }}>
                            Manage
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't created any tokens yet</p>
                <Button onClick={handleIssueNewToken}>Issue Your First Token</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
