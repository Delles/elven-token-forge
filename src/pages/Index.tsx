
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import TokenIssuanceWizard from '@/components/TokenIssuanceWizard';
import LiquidityProvisionWizard from '@/components/LiquidityProvisionWizard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ActiveView = 'home' | 'issueToken' | 'provideLiquidity';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('home');
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12">
        {activeView === 'home' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-elven-gradient animate-pulse-subtle">
                Elven Token Forge
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                The simplest way to create and launch ESDT tokens on the MultiversX blockchain
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="border border-elven-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">Create New Token</CardTitle>
                  <CardDescription>
                    Launch your own ESDT token on MultiversX
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Custom token name & ticker</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Set initial supply & decimals</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Configure special properties</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>One-click token issuance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full bg-elven-gradient hover:opacity-90"
                    onClick={() => setActiveView('issueToken')}
                  >
                    Issue New Token
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border border-elven-muted/30 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">Add Liquidity</CardTitle>
                  <CardDescription>
                    Create a liquidity pool for your token
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Pair with EGLD or USDC</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Set initial token price</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Easy-to-use interface</span>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 h-5 w-5 text-elven">✓</div>
                      <span>Receive LP tokens</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full bg-elven-gradient hover:opacity-90"
                    onClick={() => setActiveView('provideLiquidity')}
                  >
                    Add Liquidity
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <Tabs defaultValue="token" className="max-w-3xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="token">Token Creation</TabsTrigger>
                  <TabsTrigger value="liquidity">Liquidity Provision</TabsTrigger>
                </TabsList>
                <TabsContent value="token" className="p-6 text-left">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <p className="font-medium">Connect your MultiversX wallet</p>
                        <p className="text-muted-foreground text-sm">Secure connection via Web Wallet, Maiar App, or hardware wallet</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <p className="font-medium">Enter token details</p>
                        <p className="text-muted-foreground text-sm">Define name, ticker, supply, decimals, and special properties</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <p className="font-medium">Review and confirm</p>
                        <p className="text-muted-foreground text-sm">Check all details and issuance fees (~5 EGLD + gas)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">4</div>
                      <div>
                        <p className="font-medium">Sign the transaction</p>
                        <p className="text-muted-foreground text-sm">Approve with your wallet and receive your newly minted token</p>
                      </div>
                    </li>
                  </ol>
                </TabsContent>
                <TabsContent value="liquidity" className="p-6 text-left">
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">1</div>
                      <div>
                        <p className="font-medium">Select your tokens</p>
                        <p className="text-muted-foreground text-sm">Choose your token and the pairing token (EGLD or USDC)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">2</div>
                      <div>
                        <p className="font-medium">Specify amounts</p>
                        <p className="text-muted-foreground text-sm">Enter the amounts of your token and the pairing token</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">3</div>
                      <div>
                        <p className="font-medium">Review pool details</p>
                        <p className="text-muted-foreground text-sm">Check the initial price and other pool parameters</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 h-6 w-6 rounded-full bg-elven-light flex items-center justify-center text-white font-bold">4</div>
                      <div>
                        <p className="font-medium">Add liquidity</p>
                        <p className="text-muted-foreground text-sm">Sign the transaction and receive your LP tokens</p>
                      </div>
                    </li>
                  </ol>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
        
        {activeView === 'issueToken' && (
          <TokenIssuanceWizard onComplete={() => setActiveView('home')} />
        )}
        
        {activeView === 'provideLiquidity' && (
          <LiquidityProvisionWizard onComplete={() => setActiveView('home')} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
