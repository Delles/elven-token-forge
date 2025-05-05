
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Wallet, WandSparkles, Signature, Plus, Coins, Droplets, ArrowsUpFromLine, ShieldCheck, Rocket, Users2, Palette, Code } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background to-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  MultiversX Tokens, <span className="bg-clip-text text-transparent bg-elven-gradient">Made Simple & Secure</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl">
                  Effortlessly create your ESDT token, provide xExchange liquidity, manage supply, and control roles – all through intuitive wizards. No coding required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-elven-gradient hover:opacity-90 group"
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Connect Wallet & Create Token
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const howItWorks = document.getElementById('how-it-works');
                    howItWorks?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get Your Token Live in Minutes</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Follow our simple process to create, deploy and manage your tokens on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <Card className="border border-elven-muted/30 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold">
                  1
                </div>
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/30 flex items-center justify-center mb-4">
                      <Wallet className="text-elven h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Connect Securely</h3>
                    <p className="text-muted-foreground">
                      Link your preferred MultiversX wallet (Maiar App, Web Wallet, Ledger, Extension) in seconds.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border border-elven-muted/30 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold">
                  2
                </div>
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/30 flex items-center justify-center mb-4">
                      <WandSparkles className="text-elven h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Follow the Wizard</h3>
                    <p className="text-muted-foreground">
                      Step-by-step guidance walks you through token creation, liquidity provision, or management tasks.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border border-elven-muted/30 relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold">
                  3
                </div>
                <CardContent className="pt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/30 flex items-center justify-center mb-4">
                      <Signature className="text-elven h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Sign & Deploy</h3>
                    <p className="text-muted-foreground">
                      Confirm the transaction securely in your wallet to execute your action on the MultiversX blockchain.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Your Complete MultiversX Token Toolkit</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Everything you need to create and manage tokens on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-elven-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1 bg-elven-muted/30 p-2 rounded-md">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Security is Paramount</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Your tokens deserve the highest level of protection
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1 bg-elven-gradient p-2 rounded-full flex items-center justify-center">
                      <ShieldCheck className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{point.title}</h3>
                      <p className="text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Built for MultiversX Innovators</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Empowering different types of users to succeed on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="bg-white/50 backdrop-blur-sm border border-elven-muted/30">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="rounded-full w-16 h-16 bg-elven-muted/30 flex items-center justify-center mb-4">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-elven-muted/30 to-secondary/50">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Launch and Manage Your Token on MultiversX?
              </h2>
              <p className="text-muted-foreground text-lg">
                Get started in minutes with our simple, secure platform.
              </p>
              <Button 
                className="bg-elven-gradient hover:opacity-90 group mt-4"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Connect Wallet & Create Token
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const features = [
  {
    title: "No-Code ESDT Issuance",
    description: "Launch your custom Fungible ESDT token via our guided wizard. Define name, ticker, initial supply, and properties easily.",
    icon: <Plus className="h-6 w-6 text-elven" />
  },
  {
    title: "Easy xExchange Liquidity",
    description: "Provide initial liquidity or add/remove liquidity from your existing xExchange pool using a simplified, step-by-step process.",
    icon: <Droplets className="h-6 w-6 text-elven" />
  },
  {
    title: "Mint & Burn On Demand",
    description: "Adjust your token's total supply by minting new tokens or burning existing ones (requires appropriate canMint/canBurn roles).",
    icon: <ArrowsUpFromLine className="h-6 w-6 text-elven" />
  },
  {
    title: "Manage Token Capabilities",
    description: "Clearly view and securely transfer critical ESDT roles (canMint, canFreeze, canChangeOwner, etc.) directly from your wallet.",
    icon: <ShieldCheck className="h-6 w-6 text-elven" />
  },
  {
    title: "Centralized Management Hub",
    description: "Oversee all your created/managed tokens, view key stats, and access all management tools from one convenient place.",
    icon: <Coins className="h-6 w-6 text-elven" />
  },
  {
    title: "Your Keys, Your Tokens",
    description: "Built on the principle of user control. All actions require your wallet signature. The platform never takes custody of your assets.",
    icon: <ShieldCheck className="h-6 w-6 text-elven" />
  }
];

const securityPoints = [
  {
    title: "Non-Custodial by Design",
    description: "You always retain full control of your funds and token administrative roles directly in your own wallet."
  },
  {
    title: "User-Signed Transactions",
    description: "Every single on-chain action requires your explicit approval and signature via your connected MultiversX wallet."
  },
  {
    title: "Built on Audited Contracts",
    description: "Leverages the security of MultiversX core protocols and audited platform-specific smart contracts."
  },
  {
    title: "Transparent Operations",
    description: "All token creations, transfers, and management actions are public and verifiable on the MultiversX Explorer."
  }
];

const useCases = [
  {
    title: "Project Founders",
    description: "Launch your project's token and seed initial xExchange liquidity swiftly to bootstrap your ecosystem.",
    icon: <Rocket className="h-8 w-8 text-elven" />
  },
  {
    title: "Community Leaders",
    description: "Issue and manage tokens to engage your audience, distribute rewards, or govern community decisions.",
    icon: <Users2 className="h-8 w-8 text-elven" />
  },
  {
    title: "Creators & Brands",
    description: "Easily create fan tokens, loyalty points, or branded digital assets on the MultiversX network.",
    icon: <Palette className="h-8 w-8 text-elven" />
  },
  {
    title: "Developers",
    description: "Rapidly deploy, manage, and experiment with ESDT tokens without writing or deploying boilerplate smart contracts.",
    icon: <Code className="h-8 w-8 text-elven" />
  }
];

export default Index;
