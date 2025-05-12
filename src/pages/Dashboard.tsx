
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/index";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import TokenCard from "@/components/TokenCard";

// Dummy token data
const tokens = [
  { symbol: "EGLD", name: "MultiversX", balance: "12.5 EGLD" },
  { symbol: "USDC", name: "USD Coin", balance: "500 USDC" },
  { symbol: "MEX", name: "Maiar Exchange", balance: "1,250 MEX" },
  { symbol: "HTM", name: "Hatom Protocol", balance: "750 HTM" }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  const quickActions = [
    { name: "Transfer", onClick: () => console.log("Transfer") },
    { name: "Stake", onClick: () => console.log("Stake") },
    { name: "Swap", onClick: () => console.log("Swap") },
    { name: "Airdrop", onClick: () => console.log("Airdrop") }
  ];

  const managementActions = [
    { name: "Mint", onClick: () => console.log("Mint") },
    { name: "Burn", onClick: () => console.log("Burn") },
    { name: "Pause", onClick: () => console.log("Pause") },
    { name: "Freeze", onClick: () => console.log("Freeze") },
    { name: "Airdrop", onClick: () => console.log("Airdrop") }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Tokens</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {tokens.map((token, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <TokenCard 
                    token={token}
                    isSelected={token.symbol === selectedToken.symbol}
                    onClick={() => setSelectedToken(token)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-1" />
            <CarouselNext className="mr-1" />
          </Carousel>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Selected Token: {selectedToken.symbol}</h2>
        <p className="text-gray-600 mb-4">{selectedToken.name} - Balance: {selectedToken.balance}</p>
        
        <Button onClick={() => navigate("/issue-token")} className="mr-2">
          Issue New Token
        </Button>
        <Button onClick={() => navigate("/provide-liquidity")} variant="outline">
          Provide Liquidity
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="management">Token Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button key={index} variant="outline" onClick={action.onClick} className="w-full">
                    {action.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Token Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Symbol:</span>
                  <span className="font-medium">{selectedToken.symbol}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span className="font-medium">{selectedToken.name}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Balance:</span>
                  <span className="font-medium">{selectedToken.balance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="management">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Management Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {managementActions.map((action, index) => (
                  <Button key={index} variant="outline" onClick={action.onClick} className="w-full">
                    {action.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Token Analytics</h3>
              <p className="text-gray-600">
                Detailed analytics for {selectedToken.symbol} token will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
              <p className="text-gray-600">
                Recent transactions and activities related to {selectedToken.symbol} token will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
