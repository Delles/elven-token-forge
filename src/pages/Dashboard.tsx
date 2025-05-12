
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  RefreshCcw, 
  Wallet, 
  BarChart3, 
  Settings, 
  Clock, 
  Gift, 
  Star 
} from 'lucide-react';
import { useWalletConnection } from '@/hooks/useWalletConnection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';

type Token = {
  id: string;
  name: string;
  ticker: string;
  supply: string;
  decimals: string;
  createdAt: string;
  balance: string;
  properties: string[];
  hasLiquidityPool: boolean;
  lpTokens: string;
  priceChange: number;
  priceDirection: string;
  marketCap: string;
};

const Dashboard = () => {
  const { address } = useWalletConnection();
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock token data with more tokens for testing the carousel
  const [tokens, setTokens] = useState<Token[]>([
    {
      id: "TOKEN-123456",
      name: "Example Token",
      ticker: "EXT",
      supply: "1,000,000",
      decimals: "18",
      createdAt: "2023-05-10",
      balance: "500,000",
      properties: ["Mintable", "Burnable", "Pausable"],
      hasLiquidityPool: true,
      lpTokens: "25,000",
      priceChange: 5.32,
      priceDirection: "up",
      marketCap: "$750,000"
    },
    {
      id: "TOKEN-789012",
      name: "Governance Token",
      ticker: "GOV",
      supply: "500,000",
      decimals: "18",
      createdAt: "2023-06-15",
      balance: "250,000",
      properties: ["Governance", "Staking", "Voting"],
      hasLiquidityPool: true,
      lpTokens: "15,000",
      priceChange: -2.14,
      priceDirection: "down",
      marketCap: "$350,000"
    },
    {
      id: "TOKEN-345678",
      name: "Utility Token",
      ticker: "UTL",
      supply: "2,000,000",
      decimals: "6",
      createdAt: "2023-04-20",
      balance: "1,200,000",
      properties: ["Utility", "Fee Reduction"],
      hasLiquidityPool: false,
      lpTokens: "0",
      priceChange: 1.75,
      priceDirection: "up",
      marketCap: "$400,000"
    },
    {
      id: "TOKEN-901234",
      name: "Reward Token",
      ticker: "RWD",
      supply: "10,000,000",
      decimals: "9",
      createdAt: "2023-07-05",
      balance: "8,500,000",
      properties: ["Rewards", "Staking", "Burnable"],
      hasLiquidityPool: true,
      lpTokens: "50,000",
      priceChange: 12.3,
      priceDirection: "up",
      marketCap: "$1,200,000"
    }
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Handle token selection
  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
  };

  // Format price change with + or - sign
  const formatPriceChange = (priceChange: number, direction: string) => {
    return `${direction === 'up' ? '+' : ''}${priceChange}%`;
  };

  const handleAirdrop = () => {
    alert("Airdrop feature clicked - this will navigate to airdrop interface in the future");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your tokens and liquidity pools
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0 gap-2">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleRefresh}>
              <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <div className="flex items-center rounded-lg bg-muted p-3">
              <Wallet className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium truncate max-w-[150px]">
                {address}
              </span>
            </div>
          </div>
        </div>
        
        {/* Token Selection Carousel */}
        <div className="relative w-full py-6">
          <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {tokens.map((token) => (
                <CarouselItem key={token.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card 
                    className={`cursor-pointer transition-all duration-200 h-full ${
                      selectedToken?.id === token.id 
                        ? 'ring-2 ring-primary shadow-lg bg-secondary/10' 
                        : 'hover:bg-secondary/5'
                    }`}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                            ${selectedToken?.id === token.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {token.ticker.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{token.ticker}</CardTitle>
                            <CardDescription className="text-xs truncate max-w-[100px] sm:max-w-full">
                              {token.name}
                            </CardDescription>
                          </div>
                        </div>
                        {selectedToken?.id === token.id && (
                          <div className="rounded-full bg-primary/20 p-1">
                            <Star className="h-4 w-4 text-primary" fill="currentColor" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Balance</span>
                        <span className="font-medium">{token.balance} {token.ticker}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Market Cap</span>
                        <span className="font-medium">{token.marketCap}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <div className="flex justify-between items-center w-full">
                        <Badge 
                          variant={token.hasLiquidityPool ? "outline" : "secondary"}
                          className="text-xs"
                        >
                          {token.hasLiquidityPool ? 'LP Active' : 'No Liquidity'}
                        </Badge>
                        <Badge 
                          variant={token.priceDirection === "up" ? "secondary" : "outline"}
                          className={`text-xs ${
                            token.priceDirection === "up" 
                              ? 'text-emerald-500' 
                              : 'text-rose-500'
                          }`}
                        >
                          {formatPriceChange(token.priceChange, token.priceDirection)}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        {selectedToken ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Name</span>
                        <span className="font-medium">{selectedToken.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ticker</span>
                        <span className="font-medium">{selectedToken.ticker}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Supply</span>
                        <span className="font-medium">{selectedToken.supply} {selectedToken.ticker}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Decimals</span>
                        <span className="font-medium">{selectedToken.decimals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Creation Date</span>
                        <span className="font-medium">{selectedToken.createdAt}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedToken.properties.map((property, index) => (
                        <Badge key={index} variant="secondary">
                          {property}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-between" size="sm" variant="outline">
                      Send Tokens <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button className="w-full justify-between" size="sm" variant="outline">
                      Add Liquidity <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button 
                      className="w-full justify-between" 
                      size="sm" 
                      variant="outline"
                      onClick={handleAirdrop}
                    >
                      Airdrop <Gift className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="management">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Token Management</CardTitle>
                    <CardDescription>Manage your token properties and supply</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full justify-between" variant="outline">
                        Mint Tokens <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="outline">
                        Burn Tokens <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button className="w-full justify-between" variant="outline">
                        Transfer Ownership <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="w-full justify-between" 
                        variant="outline"
                        onClick={handleAirdrop}
                      >
                        Airdrop Tokens <Gift className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Liquidity Management</CardTitle>
                    <CardDescription>Manage your token's liquidity pool</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedToken.hasLiquidityPool ? (
                        <>
                          <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-sm text-muted-foreground">LP Tokens</span>
                            <span className="font-medium">{selectedToken.lpTokens}</span>
                          </div>
                          <Button className="w-full justify-between" variant="outline">
                            Add Liquidity <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button className="w-full justify-between" variant="outline">
                            Remove Liquidity <ArrowRight className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <div className="text-center text-muted-foreground text-sm mb-4">
                            No liquidity pool available for this token.
                          </div>
                          <Button className="w-full">Create Liquidity Pool</Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Token Analytics</CardTitle>
                      <CardDescription>Performance metrics and statistics</CardDescription>
                    </div>
                    <BarChart3 className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-muted-foreground">
                      Analytics charts will appear here in future updates
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="grid grid-cols-1 gap-6 mt-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Token transactions and events</CardDescription>
                    </div>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-10 text-muted-foreground">
                      Transaction history will appear here in future updates
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Settings className="h-10 w-10 text-muted-foreground mb-4 animate-pulse" />
              <h3 className="text-xl font-medium">Select a token to view details</h3>
              <p className="text-muted-foreground mt-2 text-center">
                Click on one of your tokens above to view and manage it
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
