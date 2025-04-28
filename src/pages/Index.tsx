
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1 container py-8 px-4 md:py-12">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-elven-gradient animate-pulse-subtle">
                    Elven Token Forge
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    The simplest way to create and launch ESDT tokens on the MultiversX blockchain. No coding required.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button 
                    className="bg-elven-gradient hover:opacity-90" 
                    size="lg" 
                    onClick={() => navigate('/issue-token')}
                  >
                    Start Forging Your Token
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => navigate('/dashboard')}
                  >
                    View Dashboard
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <Card className="border border-elven-muted/30 shadow-lg hover:shadow-xl transition-shadow mx-auto">
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
                      <li className="flex items-start">
                        <div className="mr-2 h-5 w-5 text-elven">✓</div>
                        <span>Liquidity & token management</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button 
                      className="w-full bg-elven-gradient hover:opacity-90"
                      onClick={() => navigate('/issue-token')}
                    >
                      Issue New Token
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Complete Token Management Solution</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Everything you need to create, launch, and manage your MultiversX ESDT tokens
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Token Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Issue custom ESDT tokens with your chosen name, ticker, supply, and special properties like mintable, burnable, and more.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Provision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Easily create liquidity pools for your tokens, paired with EGLD or USDC, directly from your token dashboard.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Token Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Manage your tokens with features like minting additional supply, burning tokens, and token airdrops.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
