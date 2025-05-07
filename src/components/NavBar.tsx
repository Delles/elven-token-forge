
import React from "react";
import { cn } from "@/lib/utils";
import WalletConnect from "./WalletConnect";
import { useNavigate, useLocation } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

const NavBar = ({ className }: { className?: string }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    // Function to scroll to section (only on homepage)
    const scrollToSection = (sectionId: string) => {
        if (isHome) {
            const section = document.getElementById(sectionId);
            section?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${sectionId}`);
        }
    };

    return (
        <div
            className={cn(
                "sticky top-0 z-40 w-full py-3 px-6 flex justify-between items-center border-b border-white/5 dark:border-white/5 bg-background/70 backdrop-blur-xl",
                className
            )}
        >
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigate("/")}
            >
                <div className="h-9 w-9 rounded-lg bg-nm-accent-gradient flex items-center justify-center shadow-nm-sm">
                    <Sparkles className="text-white h-5 w-5" />
                </div>
                <div className="text-xl font-bold bg-clip-text text-transparent bg-nm-accent-gradient group-hover:opacity-90 transition-opacity">
                    Token Forge
                </div>
                <div className="text-xs text-muted-foreground hidden md:block">on MultiversX</div>
            </div>

            <div className="hidden md:flex items-center gap-1">
                {isHome ? (
                    // Home page navigation - internal links
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                            onClick={() => scrollToSection("how-it-works")}
                        >
                            How It Works
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                            onClick={() => scrollToSection("features")}
                        >
                            Features
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                            onClick={() => scrollToSection("security")}
                        >
                            Security
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                            onClick={() => scrollToSection("use-cases")}
                        >
                            Use Cases
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                        >
                            Docs
                        </Button>
                    </div>
                ) : (
                    // Navigation for other pages
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-sm font-medium hover:bg-base-grey/10 dark:hover:bg-base-off-white/5 rounded-md">
                                    Features
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {[
                                            {
                                                title: "Token Creation",
                                                description:
                                                    "Launch your custom ESDT token with ease",
                                            },
                                            {
                                                title: "Liquidity Provision",
                                                description:
                                                    "Add liquidity for your tokens on xExchange",
                                            },
                                            {
                                                title: "Token Management",
                                                description:
                                                    "Manage supply, roles and permissions",
                                            },
                                            {
                                                title: "Analytics Dashboard",
                                                description:
                                                    "Track performance metrics for your tokens",
                                            },
                                        ].map((feature) => (
                                            <li key={feature.title}>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        href="#"
                                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-base-grey/10 dark:hover:bg-base-off-white/5 hover:text-foreground"
                                                    >
                                                        <div className="text-sm font-medium leading-none text-foreground">
                                                            {feature.title}
                                                        </div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-foreground/80">
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
                                    className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                                    onClick={() => navigate("/dashboard")}
                                >
                                    Dashboard
                                </Button>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button
                                    variant="ghost"
                                    className="text-sm font-medium px-4 hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                                >
                                    Docs
                                </Button>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
            </div>

            <div className="flex items-center gap-4">
                <Button
                    variant="neo"
                    className="hidden md:flex"
                    onClick={() => navigate("/dashboard")}
                >
                    Launch App
                </Button>
                <WalletConnect />
            </div>
        </div>
    );
};

export default NavBar;
