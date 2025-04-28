
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-elven-gradient animate-pulse-subtle">
                  Forge Your Future in Token Creation
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  The most intuitive platform to create and manage ESDT tokens on the MultiversX blockchain. 
                  No coding required, just pure innovation.
                </p>
              </div>
              <Button 
                className="bg-elven-gradient hover:opacity-90 group"
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-elven-muted/10">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white/50 backdrop-blur-sm border-elven-muted/30">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 bg-elven-gradient flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect Wallet</h3>
                  <p className="text-muted-foreground">
                    Start by connecting your MultiversX wallet to access the token forging features.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-elven-muted/30">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 bg-elven-gradient flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Design Your Token</h3>
                  <p className="text-muted-foreground">
                    Customize your token's properties, supply, and special features through our intuitive interface.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm border-elven-muted/30">
                <CardContent className="pt-6">
                  <div className="rounded-full w-12 h-12 bg-elven-gradient flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Launch & Manage</h3>
                  <p className="text-muted-foreground">
                    Deploy your token and access powerful management tools from your dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive Token Management
              </h2>
              <p className="mt-4 text-muted-foreground md:text-lg">
                Everything you need to create and manage your MultiversX tokens
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border border-elven-muted/30">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
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
    title: "Token Creation",
    description: "Design and issue custom ESDT tokens with your chosen parameters",
  },
  {
    title: "Supply Management",
    description: "Mint additional tokens or burn excess supply as needed",
  },
  {
    title: "Liquidity Tools",
    description: "Easily provide and manage liquidity for your tokens",
  },
  {
    title: "Token Distribution",
    description: "Perform airdrops and manage token distributions efficiently",
  },
  {
    title: "Role Management",
    description: "Assign and manage special roles for your token",
  },
  {
    title: "Transaction History",
    description: "Track all operations related to your token",
  },
  {
    title: "Analytics Dashboard",
    description: "Monitor your token's performance and metrics",
  },
  {
    title: "Security Features",
    description: "Implement freezing and special transfer rules",
  }
];

export default Index;
