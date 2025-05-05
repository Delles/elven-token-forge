
import React from 'react';
import { cn } from '@/lib/utils';
import WalletConnect from './WalletConnect';
import { useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Button } from './ui/button';

const NavBar = ({ className }: { className?: string }) => {
  const navigate = useNavigate();

  return (
    <div className={cn("w-full py-4 px-6 flex justify-between items-center border-b border-border/40", className)}>
      <div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-elven-gradient">
          Elven Token Forge
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Features</NavigationMenuTrigger>
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
                variant="link" 
                className="text-foreground" 
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button 
                variant="link" 
                className="text-foreground"
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
