
import React from 'react';
import { cn } from '@/lib/utils';
import WalletConnect from './WalletConnect';
import { useNavigate } from 'react-router-dom';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

const NavBar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "sticky top-0 z-40 w-full py-4 px-6 flex justify-between items-center border-b border-border/40 bg-background/80 backdrop-blur-lg", 
      className
    )}>
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate('/')}
      >
        <div className="h-9 w-9 rounded-xl bg-elven-gradient flex items-center justify-center shadow-lg">
          <Sparkles className="text-white h-5 w-5" />
        </div>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-elven-gradient group-hover:opacity-90 transition-opacity">
          Elven Token Forge
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-sm font-medium hover:bg-accent/40">Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    {
                      title: "Token Creation",
                      description: "Launch your custom ESDT token with ease",
                    },
                    {
                      title: "Liquidity Provision",
                      description: "Add liquidity for your tokens on xExchange",
                    },
                    {
                      title: "Token Management",
                      description: "Manage supply, roles and permissions",
                    },
                    {
                      title: "Analytics Dashboard",
                      description: "Track performance metrics for your tokens",
                    },
                  ].map((feature) => (
                    <li key={feature.title}>
                      <NavigationMenuLink asChild>
                        <a
                          href="#"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{feature.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {feature.description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="text-sm font-medium px-4" 
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="ghost" 
                className="text-sm font-medium px-4"
              >
                Docs
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center gap-4">
        <WalletConnect />
      </div>
    </div>
  );
};

export default NavBar;
