
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Wallet, 
  WandSparkles, 
  Signature, 
  Plus, 
  Droplets, 
  ArrowsUpFromLine, 
  ShieldCheck, 
  Coins, 
  Rocket, 
  Users2, 
  Palette, 
  Code, 
  CheckCircle,
  Lock
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [rippleElements, setRippleElements] = useState<Array<{left: number, top: number, id: number}>>([]);
  const [rippleCount, setRippleCount] = useState(0);
  
  // Function to create ripple effect
  const createRipple = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate position relative to the button
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    
    // Add new ripple
    const newRipple = {
      left,
      top,
      id: rippleCount
    };
    
    setRippleElements([...rippleElements, newRipple]);
    setRippleCount(rippleCount + 1);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRippleElements(current => current.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden ambient-background">
          <div className="absolute inset-0 bg-gradient-to-br from-background to-secondary/50 z-0"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 z-0"></div>
          
          {/* Decorative Neo-Material elements */}
          <div className="absolute top-1/3 right-[15%] w-72 h-72 morphing-shape opacity-10"></div>
          <div className="absolute bottom-1/3 left-[10%] w-80 h-80 rounded-full bg-elven-accent opacity-5 blur-3xl animate-pulse-subtle" style={{animationDelay: '1.5s'}}></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-10 text-center">
              <div className="space-y-6 max-w-4xl">
                <div className="inline-block mb-6">
                  <div className="inline-flex items-center rounded-full border border-border/30 bg-white/80 dark:bg-secondary/30 backdrop-blur-md px-3 py-1 text-sm font-medium text-muted-foreground shadow-neo-sm">
                    <span className="flex h-2 w-2 rounded-full bg-elven-accent mr-2 animate-pulse"></span>
                    Built on MultiversX Blockchain
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  MultiversX Tokens, <span className="bg-clip-text text-transparent bg-elven-gradient font-bold">Made Simple & Secure</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground text-lg md:text-xl">
                  Effortlessly create your ESDT token, provide xExchange liquidity, manage supply, and control roles – all through intuitive wizards. No coding required.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button 
                  className="neo-button px-6 py-2.5 text-base rounded-lg shadow-neo group relative overflow-hidden"
                  size="lg"
                  onClick={(e) => {
                    createRipple(e);
                    navigate('/dashboard');
                  }}
                >
                  {/* Ripple container and effects */}
                  {rippleElements.map(ripple => (
                    <span 
                      key={ripple.id} 
                      className="ripple" 
                      style={{ left: ripple.left, top: ripple.top }}
                    />
                  ))}
                  
                  <span className="relative flex items-center z-10">
                    Connect Wallet & Create Token
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-border/30 bg-white/50 dark:bg-background/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-background/70 rounded-lg shadow-neo-sm hover:shadow-neo transition-all duration-300"
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
        <section id="how-it-works" className="py-20 relative ambient-background">
          <div className="absolute inset-0 bg-muted/20 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="section-title">Get Your Token Live in Minutes</h2>
              <p className="section-subtitle">
                Follow our simple process to create, deploy and manage your tokens on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="feature-card interactive-hover">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold shadow-neo">
                  1
                </div>
                <div className="pt-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-6 shadow-neo-inner group-hover:shadow-neo-sm transition-all duration-300">
                      <Wallet className="text-elven h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Connect Securely</h3>
                    <p className="text-muted-foreground">
                      Link your preferred MultiversX wallet (Maiar App, Web Wallet, Ledger, Extension) in seconds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="feature-card interactive-hover">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold shadow-neo">
                  2
                </div>
                <div className="pt-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-6 shadow-neo-inner group-hover:shadow-neo-sm transition-all duration-300">
                      <WandSparkles className="text-elven h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Follow the Wizard</h3>
                    <p className="text-muted-foreground">
                      Step-by-step guidance walks you through token creation, liquidity provision, or management tasks.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="feature-card interactive-hover">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-elven-gradient flex items-center justify-center text-white font-bold shadow-neo">
                  3
                </div>
                <div className="pt-4">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-6 shadow-neo-inner group-hover:shadow-neo-sm transition-all duration-300">
                      <Signature className="text-elven h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">Sign & Deploy</h3>
                    <p className="text-muted-foreground">
                      Confirm the transaction securely in your wallet to execute your action on the MultiversX blockchain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/20 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="section-title">Your Complete MultiversX Token Toolkit</h2>
              <p className="section-subtitle">
                Everything you need to create and manage tokens on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div key={index} className="feature-card data-stream">
                  <div className="flex items-start space-x-5">
                    <div className="feature-icon shadow-neo-inner glow-effect">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-elven transition-colors">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 relative ambient-background">
          <div className="absolute inset-0 bg-muted/20 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto neo-panel p-8">
              <div className="text-center mb-10">
                <div className="w-16 h-16 mx-auto rounded-full bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-4 shadow-neo-inner">
                  <Lock className="text-elven h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Security is Paramount</h2>
                <p className="mt-4 text-muted-foreground md:text-lg">
                  Your tokens deserve the highest level of protection
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                {securityPoints.map((point, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="mt-1 bg-elven-gradient p-2 rounded-full flex items-center justify-center shadow-neo-sm">
                      <CheckCircle className="text-white h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{point.title}</h3>
                      <p className="text-muted-foreground text-sm">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-background relative">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-muted/20 z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="section-title">Built for MultiversX Innovators</h2>
              <p className="section-subtitle">
                Empowering different types of users to succeed on the MultiversX blockchain
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="neo-card border-border/20 hover:border-elven-muted/30 glow-effect interactive-hover">
                  <div className="flex flex-col items-center text-center">
                    <div className="rounded-full w-16 h-16 bg-elven-muted/20 dark:bg-elven-muted/10 flex items-center justify-center mb-5 group-hover:bg-elven-muted/30 dark:group-hover:bg-elven-muted/20 shadow-neo-inner group-hover:shadow-neo-sm transition-all duration-300">
                      {useCase.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-28 relative overflow-hidden ambient-background">
          <div className="absolute inset-0 bg-gradient-to-br from-elven-muted/10 to-secondary/30 z-0"></div>
          
          {/* Decorative Neo-Material elements */}
          <div className="absolute top-1/3 right-[15%] w-72 h-72 morphing-shape opacity-10"></div>
          <div className="absolute bottom-1/3 left-[10%] w-80 h-80 rounded-full bg-elven-accent opacity-5 blur-3xl animate-pulse-subtle" style={{animationDelay: '1.5s'}}></div>
          
          <div className="container px-4 md:px-6 text-center relative z-10">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Launch and Manage Your Token on MultiversX?
              </h2>
              <p className="text-muted-foreground text-lg">
                Get started in minutes with our simple, secure platform.
              </p>
              <Button 
                className="neo-button px-6 py-2.5 text-base rounded-lg shadow-neo relative overflow-hidden group"
                size="lg"
                onClick={(e) => {
                  createRipple(e);
                  navigate('/dashboard');
                }}
              >
                {/* Ripple container and effects */}
                {rippleElements.map(ripple => (
                  <span 
                    key={ripple.id} 
                    className="ripple" 
                    style={{ left: ripple.left, top: ripple.top }}
                  />
                ))}
                
                <span className="relative flex items-center z-10">
                  Connect Wallet & Create Token
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
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
