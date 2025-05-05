import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Circle, Plus, Sparkles } from "lucide-react";

// Mock data for user's tokens
const mockUserTokens = [
    {
        id: "1",
        name: "Example Token",
        ticker: "EXT",
        supply: "1000000",
        decimals: "18",
        createdAt: "2023-08-15",
        properties: ["canMint", "canBurn"],
    },
    {
        id: "2",
        name: "Community Token",
        ticker: "CMT",
        supply: "500000",
        decimals: "18",
        createdAt: "2023-09-20",
        properties: ["canMint", "canBurn", "canPause"],
    },
    {
        id: "3",
        name: "Utility Token",
        ticker: "UTL",
        supply: "10000000",
        decimals: "6",
        createdAt: "2023-10-05",
        properties: ["canBurn"],
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [tokens] = useState(mockUserTokens);

    const handleIssueNewToken = () => {
        navigate("/issue-token");
    };

    const handleTokenDetails = (tokenId: string) => {
        navigate(`/token/${tokenId}`);
    };

    // Add ripple effect to table rows
    const createRipple = (e: React.MouseEvent<HTMLElement>) => {
        const element = e.currentTarget;

        // Get position relative to the element
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create ripple element
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = "100px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";

        // Add to element and remove after animation
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-base-grey/5 to-base-grey/10">
            <NavBar />

            <main className="flex-1 container py-8 px-4 md:py-12 z-10 relative">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="highlight-badge">Dashboard</span>
                            <h1 className="text-3xl font-bold gradient-text">
                                My Token Forge
                            </h1>
                        </div>
                        <p className="text-foreground/90">
                            Manage your ESDT tokens on the MultiversX blockchain
                        </p>
                    </div>
                    <Button
                        className="mt-4 md:mt-0 neo-button px-6 py-3 h-auto"
                        onClick={handleIssueNewToken}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Issue New Token
                    </Button>
                </div>

                <div className="neo-card mb-8">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-nm-accent-gradient flex items-center justify-center shadow-nm-sm">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <CardTitle className="text-xl">
                                Your Tokens
                            </CardTitle>
                        </div>
                        <CardDescription className="text-foreground/90">
                            All ESDT tokens you've created with Token Forge
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tokens.length > 0 ? (
                            <div className="overflow-x-auto neo-panel p-2 bg-base-off-white/10 dark:bg-base-charcoal/20">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border/10">
                                            <TableHead className="text-foreground/75 font-medium">
                                                Token
                                            </TableHead>
                                            <TableHead className="text-foreground/75 font-medium">
                                                Supply
                                            </TableHead>
                                            <TableHead className="text-foreground/75 font-medium">
                                                Decimals
                                            </TableHead>
                                            <TableHead className="text-foreground/75 font-medium">
                                                Properties
                                            </TableHead>
                                            <TableHead className="text-foreground/75 font-medium">
                                                Created
                                            </TableHead>
                                            <TableHead className="text-right text-foreground/75 font-medium">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tokens.map((token) => (
                                            <TableRow
                                                key={token.id}
                                                className="cursor-pointer ripple-container"
                                                onClick={(e) => {
                                                    createRipple(e);
                                                    handleTokenDetails(
                                                        token.id
                                                    );
                                                }}
                                            >
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-accent-amethyst/10 flex items-center justify-center shadow-nm-inner-soft">
                                                            <Circle
                                                                className="h-4 w-4 text-accent-amethyst"
                                                                fill="currentColor"
                                                                fillOpacity={
                                                                    0.2
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <div>
                                                                {token.name}
                                                            </div>
                                                            <div className="text-xs text-foreground/75">
                                                                {token.ticker}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {Number(
                                                        token.supply
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    {token.decimals}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {token.properties.map(
                                                            (prop) => (
                                                                <span
                                                                    key={prop}
                                                                    className="highlight-badge"
                                                                >
                                                                    {prop.replace(
                                                                        "can",
                                                                        ""
                                                                    )}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {token.createdAt}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="hover:bg-base-grey/10 dark:hover:bg-base-off-white/5"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTokenDetails(
                                                                token.id
                                                            );
                                                        }}
                                                    >
                                                        Manage
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-12 px-4 bg-base-off-white/10 dark:bg-base-charcoal/20 rounded-lg backdrop-blur-sm shadow-nm-inner-soft">
                                <div className="morphing-shape w-16 h-16 mx-auto mb-6"></div>
                                <p className="text-foreground/90 mb-4">
                                    You haven't created any tokens yet
                                </p>
                                <Button
                                    onClick={handleIssueNewToken}
                                    className="neo-button px-6 py-2 h-auto"
                                >
                                    Issue Your First Token
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="neo-card data-stream">
                        <h3 className="text-lg font-medium mb-2 text-foreground">
                            Quick Actions
                        </h3>
                        <p className="text-sm text-foreground/90 mb-4">
                            Access frequently used token operations
                        </p>
                        <div className="flex flex-col gap-2">
                            <Button
                                variant="outline"
                                className="justify-start text-left border-border/50 bg-base-off-white/10 dark:bg-base-charcoal/20 hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 hover:border-border w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Create New
                                Token
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start text-left border-border/50 bg-base-off-white/10 dark:bg-base-charcoal/20 hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 hover:border-border w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" /> Add Liquidity
                            </Button>
                        </div>
                    </div>

                    <div className="neo-card pulse-on-hover">
                        <h3 className="text-lg font-medium mb-2 text-foreground">
                            Recent Activity
                        </h3>
                        <p className="text-sm text-foreground/90 mb-4">
                            Your latest token operations
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm p-2 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                <div className="w-2 h-2 rounded-full bg-accent-amethyst"></div>
                                <span className="text-foreground/90">
                                    Created Example Token
                                </span>
                                <span className="text-xs text-foreground/75 ml-auto">
                                    2h ago
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm p-2 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                <div className="w-2 h-2 rounded-full bg-accent-glow-cyan"></div>
                                <span className="text-foreground/90">
                                    Added liquidity to CMT
                                </span>
                                <span className="text-xs text-foreground/75 ml-auto">
                                    5h ago
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="neo-card">
                        <h3 className="text-lg font-medium mb-2 text-foreground">
                            Token Health
                        </h3>
                        <p className="text-sm text-foreground/90 mb-4">
                            Status overview of your tokens
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-3 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                <div className="text-2xl font-bold text-accent-amethyst">
                                    3
                                </div>
                                <div className="text-xs text-foreground/75">
                                    Active Tokens
                                </div>
                            </div>
                            <div className="text-center p-3 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                <div className="text-2xl font-bold text-accent-glow-cyan">
                                    2
                                </div>
                                <div className="text-xs text-foreground/75">
                                    With Liquidity
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
