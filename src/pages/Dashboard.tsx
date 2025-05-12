import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Circle,
    Plus,
    Copy,
    RefreshCcw,
    ExternalLink,
    Layers,
    Coins,
    Flame,
    Shield,
    UserCheck,
    BarChart,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { toast } from "@/components/ui/sonner";

// Mock data for user's tokens - will eventually come from blockchain
const mockUserTokens = [
    {
        id: "MYTOK-abcdef",
        name: "Example Token",
        ticker: "EXT",
        supply: "1000000",
        decimals: "18",
        createdAt: "2023-08-15",
        balance: "500000",
        properties: ["canMint", "canBurn"],
        hasLiquidityPool: true,
        lpTokens: "1250.45",
        priceChange: 5.23, // Added price change (percent)
        priceDirection: "up", // Added price direction
        marketCap: "520000", // Added market cap
    },
    {
        id: "CMT-123xyz",
        name: "Community Token",
        ticker: "CMT",
        supply: "500000",
        decimals: "18",
        createdAt: "2023-09-20",
        balance: "125000",
        properties: ["canMint", "canBurn", "canPause"],
        hasLiquidityPool: false,
        lpTokens: "0",
        priceChange: -2.41, // Added price change (percent)
        priceDirection: "down", // Added price direction
        marketCap: "185000", // Added market cap
    },
    {
        id: "UTL-987654",
        name: "Utility Token",
        ticker: "UTL",
        supply: "10000000",
        decimals: "6",
        createdAt: "2023-10-05",
        balance: "250000",
        properties: ["canBurn"],
        hasLiquidityPool: true,
        lpTokens: "458.23",
        priceChange: 0.68, // Added price change (percent)
        priceDirection: "up", // Added price direction
        marketCap: "1250000", // Added market cap
    },
];

// All possible token permissions
const allPermissions = [
    { id: "canMint", label: "Minting Allowed" },
    { id: "canBurn", label: "Burning Allowed" },
    { id: "canFreeze", label: "Can Freeze" },
    { id: "canWipe", label: "Can Wipe" },
    { id: "canChangeOwner", label: "Can Transfer Ownership" },
    { id: "canUpgrade", label: "Can Upgrade" },
    { id: "canSetSpecialRoles", label: "Can Set Roles" },
];

const DEBOUNCE_DELAY = 300; // milliseconds

const Dashboard = () => {
    const navigate = useNavigate();
    const { address } = useWalletConnection();
    const [selectedToken, setSelectedToken] = useState(mockUserTokens[0]);
    const [tokens, setTokens] = useState(mockUserTokens);
    const [isLoading, setIsLoading] = useState(false);
    const [tokenSearchQuery, setTokenSearchQuery] = useState(""); // Immediate input value
    const [debouncedTokenSearchQuery, setDebouncedTokenSearchQuery] =
        useState(""); // Debounced value for filtering
    const [activeTab, setActiveTab] = useState("overview"); // New state for tab navigation

    // Effect for debouncing
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTokenSearchQuery(tokenSearchQuery);
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(timerId);
        };
    }, [tokenSearchQuery]);

    // Mock wallet address
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

    const handleIssueNewToken = () => {
        navigate("/issue-token");
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const handleSelectToken = (token) => {
        setSelectedToken(token);
    };

    const handleRefreshData = () => {
        setIsLoading(true);

        // Mock API fetch
        setTimeout(() => {
            // Simulate a fresh fetch of token data
            const updatedTokens = [...mockUserTokens].map((token) => ({
                ...token,
                balance: (
                    parseInt(token.balance) + Math.floor(Math.random() * 1000)
                ).toString(),
                priceChange: parseFloat((Math.random() * 10 - 5).toFixed(2)),
                priceDirection: Math.random() > 0.5 ? "up" : "down",
            }));

            setTokens(updatedTokens);
            // Update selected token with fresh data
            const updatedSelectedToken = updatedTokens.find(
                (t) => t.id === selectedToken.id
            );
            if (updatedSelectedToken) {
                setSelectedToken(updatedSelectedToken);
            }

            setIsLoading(false);
            setTokenSearchQuery(""); // Reset search query
            setDebouncedTokenSearchQuery(""); // Reset debounced search query

            toast.success("Token data refreshed from blockchain");
        }, 1000);
    };

    const filteredTokens = tokens.filter(
        (token) =>
            token.name
                .toLowerCase()
                .includes(debouncedTokenSearchQuery.toLowerCase()) ||
            token.ticker
                .toLowerCase()
                .includes(debouncedTokenSearchQuery.toLowerCase())
    );

    // Get token color based on ticker (for visualization purposes)
    const getTokenColor = (ticker) => {
        switch (ticker) {
            case "EXT":
                return "from-accent-amethyst to-accent-amethyst/60";
            case "CMT":
                return "from-accent-glow-cyan to-accent-glow-cyan/60";
            case "UTL":
                return "from-accent-aurora-green to-accent-aurora-green/60";
            default:
                return "from-accent-amethyst to-accent-glow-cyan";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/95 to-secondary/5">
            {/* Global Header */}
            <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-nm-sm">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-nm-accent-gradient flex items-center justify-center shadow-nm-sm">
                            <Coins className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-lg font-medium">Token Forge</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Badge
                            variant="neo"
                            className="flex items-center gap-1.5"
                        >
                            <span className="w-2 h-2 rounded-full bg-accent-aurora-green animate-pulse"></span>
                            MultiversX Mainnet
                        </Badge>
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-base-off-white/20 dark:bg-base-charcoal/20 border border-border/20 shadow-nm-inner-soft">
                            <span className="text-sm text-foreground/70">
                                {truncatedAddress}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleCopyToClipboard(address)}
                            >
                                <Copy className="h-3.5 w-3.5" />
                                <span className="sr-only">Copy address</span>
                            </Button>
                        </div>
                        <Button
                            onClick={handleIssueNewToken}
                            size="sm"
                            className="text-sm bg-nm-accent-gradient text-white shadow-nm-sm hover:shadow-nm-md transition-all"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Launch New Token
                        </Button>
                        <Button variant="outline" size="sm" className="text-sm">
                            Disconnect
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container py-8 px-4 md:py-12 md:px-6 relative z-10">
                <div className="md:flex md:justify-between md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-glow-cyan to-accent-amethyst mb-2">
                            My Token Dashboard
                        </h1>
                        <p className="text-foreground/70">
                            Manage your ESDT tokens with comprehensive analytics
                            and controls
                        </p>
                    </div>
                    <Button
                        onClick={handleRefreshData}
                        variant="outline"
                        className="mt-4 md:mt-0"
                        disabled={isLoading}
                    >
                        <RefreshCcw
                            className={`h-4 w-4 mr-2 ${
                                isLoading ? "animate-spin" : ""
                            }`}
                        />
                        Refresh Data
                    </Button>
                </div>

                {tokens.length === 0 ? (
                    // Empty State
                    <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-card/80 shadow-nm-md">
                        <CardContent className="py-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-base-off-white/30 dark:bg-base-charcoal/30 flex items-center justify-center shadow-nm-inner-soft">
                                <Coins className="h-8 w-8 text-foreground/50" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">
                                You are not currently managing any tokens
                            </h3>
                            <p className="text-foreground/70 mb-8">
                                Create a new token to get started with Token
                                Forge
                            </p>
                            <div className="flex justify-center">
                                <Button
                                    onClick={handleIssueNewToken}
                                    className="bg-nm-accent-gradient text-white"
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Launch a
                                    New Token
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Token Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {tokens.map((token) => (
                                <Card
                                    key={token.id}
                                    className={`bg-white/80 dark:bg-card/80 shadow-nm-md border-l-4 ${
                                        selectedToken.id === token.id
                                            ? `border-l-${
                                                  token.ticker === "EXT"
                                                      ? "accent-amethyst"
                                                      : token.ticker === "CMT"
                                                      ? "accent-glow-cyan"
                                                      : "accent-aurora-green"
                                              }`
                                            : "border-l-transparent"
                                    } transition-all hover:shadow-nm-lg cursor-pointer`}
                                    onClick={() => handleSelectToken(token)}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${getTokenColor(
                                                        token.ticker
                                                    )} flex items-center justify-center text-white shadow-nm-sm mr-3`}
                                                >
                                                    <span className="text-sm font-bold">
                                                        {token.ticker.charAt(0)}
                                                    </span>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        {token.ticker}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        {token.name}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={
                                                    token.priceDirection ===
                                                    "up"
                                                        ? "aurora"
                                                        : "destructive"
                                                }
                                                className="ml-auto"
                                            >
                                                <span className="flex items-center">
                                                    {token.priceDirection ===
                                                    "up" ? (
                                                        <TrendingUp className="h-3 w-3 mr-1" />
                                                    ) : (
                                                        <TrendingDown className="h-3 w-3 mr-1" />
                                                    )}
                                                    {token.priceChange}%
                                                </span>
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-foreground/70">
                                                    Your Balance:
                                                </span>
                                                <span className="font-medium">
                                                    {Number(
                                                        token.balance
                                                    ).toLocaleString()}{" "}
                                                    {token.ticker}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-foreground/70">
                                                    Market Cap:
                                                </span>
                                                <span className="font-medium">
                                                    $
                                                    {Number(
                                                        token.marketCap
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-foreground/70">
                                                    Liquidity Pool:
                                                </span>
                                                <span className="font-medium">
                                                    {token.hasLiquidityPool
                                                        ? `${token.lpTokens} LP`
                                                        : "No Pool"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Token Detail Tabs */}
                        <div className="mb-6">
                            <div className="flex border-b border-border/40 mb-6">
                                <button
                                    onClick={() => setActiveTab("overview")}
                                    className={`px-4 py-2 font-medium text-sm ${
                                        activeTab === "overview"
                                            ? "text-accent-amethyst border-b-2 border-accent-amethyst"
                                            : "text-foreground/60 hover:text-foreground"
                                    }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab("management")}
                                    className={`px-4 py-2 font-medium text-sm ${
                                        activeTab === "management"
                                            ? "text-accent-amethyst border-b-2 border-accent-amethyst"
                                            : "text-foreground/60 hover:text-foreground"
                                    }`}
                                >
                                    Token Management
                                </button>
                                <button
                                    onClick={() => setActiveTab("analytics")}
                                    className={`px-4 py-2 font-medium text-sm ${
                                        activeTab === "analytics"
                                            ? "text-accent-amethyst border-b-2 border-accent-amethyst"
                                            : "text-foreground/60 hover:text-foreground"
                                    }`}
                                >
                                    Analytics
                                </button>
                                <button
                                    onClick={() => setActiveTab("activity")}
                                    className={`px-4 py-2 font-medium text-sm ${
                                        activeTab === "activity"
                                            ? "text-accent-amethyst border-b-2 border-accent-amethyst"
                                            : "text-foreground/60 hover:text-foreground"
                                    }`}
                                >
                                    Activity
                                </button>
                            </div>

                            {/* Tab Content */}
                            {activeTab === "overview" && (
                                <div className="grid lg:grid-cols-7 gap-6">
                                    {/* Left Column - Information */}
                                    <div className="lg:col-span-4 space-y-6">
                                        {/* Token Information Panel */}
                                        <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md overflow-hidden">
                                            <div
                                                className={`h-1.5 w-full bg-gradient-to-r ${getTokenColor(
                                                    selectedToken.ticker
                                                )}`}
                                            ></div>
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <CardTitle className="text-lg">
                                                            Token Information
                                                        </CardTitle>
                                                        <CardDescription className="text-foreground/70 text-sm">
                                                            Key details about{" "}
                                                            {selectedToken.name}
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${getTokenColor(
                                                                selectedToken.ticker
                                                            )} flex items-center justify-center shadow-nm-sm text-white`}
                                                        >
                                                            <span className="font-bold text-lg">
                                                                {selectedToken.ticker.charAt(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-lg">
                                                                {
                                                                    selectedToken.name
                                                                }
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-sm text-foreground/70">
                                                                <span>
                                                                    {
                                                                        selectedToken.ticker
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between p-3 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                        <span className="text-sm font-medium">
                                                            Token Identifier:
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <code
                                                                className="text-sm bg-base-off-white/20 dark:bg-base-charcoal/30 px-2 py-1 rounded"
                                                                title={
                                                                    selectedToken.id
                                                                }
                                                            >
                                                                {selectedToken
                                                                    .id.length >
                                                                20
                                                                    ? `${selectedToken.id.slice(
                                                                          0,
                                                                          6
                                                                      )}...${selectedToken.id.slice(
                                                                          -4
                                                                      )}`
                                                                    : selectedToken.id}
                                                            </code>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-6 w-6"
                                                                onClick={() =>
                                                                    handleCopyToClipboard(
                                                                        selectedToken.id
                                                                    )
                                                                }
                                                            >
                                                                <Copy className="h-3.5 w-3.5" />
                                                                <span className="sr-only">
                                                                    Copy
                                                                    identifier
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                            <div className="text-sm text-foreground/70 mb-1">
                                                                Total Supply:
                                                            </div>
                                                            <div className="text-xl font-medium">
                                                                {Number(
                                                                    selectedToken.supply
                                                                ).toLocaleString()}{" "}
                                                                {
                                                                    selectedToken.ticker
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                            <div className="text-sm text-foreground/70 mb-1">
                                                                Your Wallet
                                                                Balance:
                                                            </div>
                                                            <div className="text-xl font-medium">
                                                                {Number(
                                                                    selectedToken.balance
                                                                ).toLocaleString()}{" "}
                                                                {
                                                                    selectedToken.ticker
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                            <div className="text-sm text-foreground/70 mb-1">
                                                                Created At:
                                                            </div>
                                                            <div className="text-base font-medium">
                                                                {new Date(
                                                                    selectedToken.createdAt
                                                                ).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                        <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                            <div className="text-sm text-foreground/70 mb-1">
                                                                Decimals:
                                                            </div>
                                                            <div className="text-base font-medium">
                                                                {
                                                                    selectedToken.decimals
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 pt-2">
                                                        <a
                                                            href={`https://explorer.multiversx.com/tokens/${selectedToken.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 border border-border/20 hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 transition-colors"
                                                        >
                                                            <ExternalLink className="h-3.5 w-3.5" />
                                                            View on MultiversX
                                                            Explorer
                                                        </a>
                                                        {selectedToken.hasLiquidityPool ? (
                                                            <a
                                                                href={`https://xexchange.com/tokens/${selectedToken.id}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 border border-border/20 hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 transition-colors"
                                                            >
                                                                <ExternalLink className="h-3.5 w-3.5" />
                                                                View Pool on
                                                                xExchange
                                                            </a>
                                                        ) : (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    navigate(
                                                                        "/provide-liquidity"
                                                                    )
                                                                }
                                                            >
                                                                <Plus className="h-3.5 w-3.5 mr-1.5" />
                                                                Create Liquidity
                                                                Pool
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* User Permissions Panel */}
                                        <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">
                                                    Your Active Permissions for{" "}
                                                    {selectedToken.ticker}
                                                </CardTitle>
                                                <CardDescription className="text-foreground/70 text-sm">
                                                    Special ESDT roles assigned
                                                    to your wallet
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {allPermissions
                                                        .filter((permission) =>
                                                            selectedToken.properties.includes(
                                                                permission.id
                                                            )
                                                        )
                                                        .map((permission) => (
                                                            <Badge
                                                                key={
                                                                    permission.id
                                                                }
                                                                variant="amethyst"
                                                                className="px-3 py-1"
                                                            >
                                                                {
                                                                    permission.label
                                                                }
                                                            </Badge>
                                                        ))}
                                                    {selectedToken.properties
                                                        .length === 0 && (
                                                        <p className="text-sm text-foreground/70">
                                                            You do not hold any
                                                            special roles for
                                                            this token.
                                                        </p>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Right Column - Actions */}
                                    <div className="lg:col-span-3 space-y-6">
                                        {/* Management Actions Panel */}
                                        <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                            <CardHeader className="pb-2">
                                                <CardTitle className="text-lg">
                                                    Management Actions
                                                </CardTitle>
                                                <CardDescription className="text-foreground/70 text-sm">
                                                    Token operations for{" "}
                                                    {selectedToken.ticker}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-6">
                                                    {/* Supply Management */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">
                                                            Supply Management
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Button
                                                                variant="outline"
                                                                className={`justify-start text-left h-auto py-3 ${
                                                                    selectedToken.properties.includes(
                                                                        "canMint"
                                                                    )
                                                                        ? "border-accent-amethyst/30 hover:border-accent-amethyst/60"
                                                                        : "opacity-60 cursor-not-allowed"
                                                                }`}
                                                                disabled={
                                                                    !selectedToken.properties.includes(
                                                                        "canMint"
                                                                    )
                                                                }
                                                                title={
                                                                    !selectedToken.properties.includes(
                                                                        "canMint"
                                                                    )
                                                                        ? "Requires 'Minting Allowed' permission"
                                                                        : ""
                                                                }
                                                            >
                                                                <div className="w-8 h-8 rounded-md bg-accent-amethyst/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                                    <Plus className="h-4 w-4 text-accent-amethyst" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div>
                                                                        Mint
                                                                        Tokens
                                                                    </div>
                                                                    <div className="text-xs text-foreground/60">
                                                                        Create
                                                                        new
                                                                        tokens
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                className={`justify-start text-left h-auto py-3 ${
                                                                    selectedToken.properties.includes(
                                                                        "canBurn"
                                                                    ) &&
                                                                    Number(
                                                                        selectedToken.balance
                                                                    ) > 0
                                                                        ? "border-accent-amethyst/30 hover:border-accent-amethyst/60"
                                                                        : "opacity-60 cursor-not-allowed"
                                                                }`}
                                                                disabled={
                                                                    !selectedToken.properties.includes(
                                                                        "canBurn"
                                                                    ) ||
                                                                    Number(
                                                                        selectedToken.balance
                                                                    ) <= 0
                                                                }
                                                                title={
                                                                    !selectedToken.properties.includes(
                                                                        "canBurn"
                                                                    )
                                                                        ? "Requires 'Burning Allowed' permission."
                                                                        : Number(
                                                                              selectedToken.balance
                                                                          ) <= 0
                                                                        ? "No tokens in your wallet to burn."
                                                                        : ""
                                                                }
                                                            >
                                                                <div className="w-8 h-8 rounded-md bg-accent-glow-cyan/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                                    <Flame className="h-4 w-4 text-accent-glow-cyan" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div>
                                                                        Burn
                                                                        Tokens
                                                                    </div>
                                                                    <div className="text-xs text-foreground/60">
                                                                        Remove
                                                                        from
                                                                        supply
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Liquidity Management */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">
                                                            Liquidity Management
                                                        </h4>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Button
                                                                variant="outline"
                                                                className="justify-start text-left h-auto py-3 border-accent-amethyst/30 hover:border-accent-amethyst/60"
                                                                onClick={() =>
                                                                    navigate(
                                                                        "/provide-liquidity"
                                                                    )
                                                                }
                                                            >
                                                                <div className="w-8 h-8 rounded-md bg-accent-aurora-green/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                                    <Layers className="h-4 w-4 text-accent-aurora-green" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div>
                                                                        Add
                                                                        Liquidity
                                                                    </div>
                                                                    <div className="text-xs text-foreground/60">
                                                                        To
                                                                        xExchange
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                className={`justify-start text-left h-auto py-3 ${
                                                                    Number(
                                                                        selectedToken.lpTokens
                                                                    ) > 0
                                                                        ? "border-accent-amethyst/30 hover:border-accent-amethyst/60"
                                                                        : "opacity-60 cursor-not-allowed"
                                                                }`}
                                                                disabled={
                                                                    Number(
                                                                        selectedToken.lpTokens
                                                                    ) <= 0
                                                                }
                                                                title={
                                                                    Number(
                                                                        selectedToken.lpTokens
                                                                    ) <= 0
                                                                        ? "You do not currently hold LP tokens for this token's pools"
                                                                        : undefined
                                                                }
                                                            >
                                                                <div className="w-8 h-8 rounded-md bg-accent-amethyst/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                                    <Layers className="h-4 w-4 text-accent-amethyst" />
                                                                </div>
                                                                <div className="text-left">
                                                                    <div>
                                                                        Remove
                                                                        Liquidity
                                                                    </div>
                                                                    <div className="text-xs text-foreground/60">
                                                                        From
                                                                        xExchange
                                                                    </div>
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Role & Ownership Management */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">
                                                            Role & Ownership
                                                            Management
                                                        </h4>
                                                        <Button
                                                            variant="outline"
                                                            className={`w-full justify-start text-left h-auto py-3 ${
                                                                selectedToken.properties.includes(
                                                                    "canChangeOwner"
                                                                ) ||
                                                                selectedToken.properties.some(
                                                                    (p) =>
                                                                        [
                                                                            "canMint",
                                                                            "canBurn",
                                                                            "canSetSpecialRoles",
                                                                        ].includes(
                                                                            p
                                                                        )
                                                                )
                                                                    ? "border-accent-amethyst/30 hover:border-accent-amethyst/60"
                                                                    : "opacity-60 cursor-not-allowed"
                                                            }`}
                                                            disabled={
                                                                !(
                                                                    selectedToken.properties.includes(
                                                                        "canChangeOwner"
                                                                    ) ||
                                                                    selectedToken.properties.some(
                                                                        (p) =>
                                                                            [
                                                                                "canMint",
                                                                                "canBurn",
                                                                                "canSetSpecialRoles",
                                                                            ].includes(
                                                                                p
                                                                            )
                                                                    )
                                                                )
                                                            }
                                                            title={
                                                                !(
                                                                    selectedToken.properties.includes(
                                                                        "canChangeOwner"
                                                                    ) ||
                                                                    selectedToken.properties.some(
                                                                        (p) =>
                                                                            [
                                                                                "canMint",
                                                                                "canBurn",
                                                                                "canSetSpecialRoles",
                                                                            ].includes(
                                                                                p
                                                                            )
                                                                    )
                                                                )
                                                                    ? "You do not have the required permissions (e.g., Change Owner, Mint, Burn, Set Roles) to manage token roles."
                                                                    : ""
                                                            }
                                                        >
                                                            <div className="w-8 h-8 rounded-md bg-accent-glow-cyan/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                                <Shield className="h-4 w-4 text-accent-glow-cyan" />
                                                            </div>
                                                            <div className="text-left">
                                                                <div>
                                                                    Manage Token
                                                                    Roles
                                                                </div>
                                                                <div className="text-xs text-foreground/60">
                                                                    Transfer or
                                                                    modify
                                                                    permissions
                                                                </div>
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Token Stats/Recent Activity */}
                                        <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-md bg-accent-amethyst/20 flex items-center justify-center">
                                                        <UserCheck className="h-3.5 w-3.5 text-accent-amethyst" />
                                                    </div>
                                                    <CardTitle className="text-lg">
                                                        Your Recent Activity
                                                    </CardTitle>
                                                </div>
                                                <CardDescription className="text-foreground/70 text-sm">
                                                    Your recent transactions
                                                    involving{" "}
                                                    {selectedToken.ticker}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <a
                                                        href={`https://explorer.multiversx.com/tokens/${selectedToken.id}/tx/MOCK_TX_HASH_1`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft hover:shadow-nm transition-shadow"
                                                    >
                                                        <div className="w-2 h-2 rounded-full bg-accent-amethyst"></div>
                                                        <span className="text-foreground/80">
                                                            Minted 1,000{" "}
                                                            {
                                                                selectedToken.ticker
                                                            }
                                                        </span>
                                                        <span className="text-xs text-foreground/60 ml-auto">
                                                            2h ago
                                                        </span>
                                                    </a>
                                                    <a
                                                        href={`https://explorer.multiversx.com/tokens/${selectedToken.id}/tx/MOCK_TX_HASH_2`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft hover:shadow-nm transition-shadow"
                                                    >
                                                        <div className="w-2 h-2 rounded-full bg-accent-glow-cyan"></div>
                                                        <span className="text-foreground/80">
                                                            Added liquidity with
                                                            500{" "}
                                                            {
                                                                selectedToken.ticker
                                                            }
                                                        </span>
                                                        <span className="text-xs text-foreground/60 ml-auto">
                                                            1d ago
                                                        </span>
                                                    </a>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                            {activeTab === "management" && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-accent-amethyst/20 flex items-center justify-center">
                                                    <Plus className="h-3.5 w-3.5 text-accent-amethyst" />
                                                </div>
                                                <span>
                                                    Token Supply Management
                                                </span>
                                            </CardTitle>
                                            <CardDescription>
                                                Control the circulation of{" "}
                                                {selectedToken.ticker} tokens
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <Button
                                                    variant="outline"
                                                    className={`h-auto py-3 px-4 justify-start ${
                                                        selectedToken.properties.includes(
                                                            "canMint"
                                                        )
                                                            ? ""
                                                            : "opacity-60 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Mint Tokens
                                                        </div>
                                                        <div className="text-xs text-foreground/70">
                                                            Create new tokens
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={`h-auto py-3 px-4 justify-start ${
                                                        selectedToken.properties.includes(
                                                            "canBurn"
                                                        )
                                                            ? ""
                                                            : "opacity-60 cursor-not-allowed"
                                                    }`}
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Burn Tokens
                                                        </div>
                                                        <div className="text-xs text-foreground/70">
                                                            Destroy tokens
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                            <div className="p-3 rounded-lg bg-accent-amethyst/5 text-sm">
                                                Current total supply:{" "}
                                                {Number(
                                                    selectedToken.supply
                                                ).toLocaleString()}{" "}
                                                {selectedToken.ticker}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-accent-glow-cyan/20 flex items-center justify-center">
                                                    <Shield className="h-3.5 w-3.5 text-accent-glow-cyan" />
                                                </div>
                                                <span>Access Control</span>
                                            </CardTitle>
                                            <CardDescription>
                                                Manage roles and permissions for{" "}
                                                {selectedToken.ticker}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-1 gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="justify-start h-auto py-3"
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Assign Special Roles
                                                        </div>
                                                        <div className="text-xs text-foreground/70">
                                                            Grant permissions to
                                                            other addresses
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="justify-start h-auto py-3"
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Transfer Ownership
                                                        </div>
                                                        <div className="text-xs text-foreground/70">
                                                            Change the token
                                                            owner
                                                        </div>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="justify-start h-auto py-3"
                                                >
                                                    <div className="text-left">
                                                        <div className="font-medium">
                                                            Manage Pause State
                                                        </div>
                                                        <div className="text-xs text-foreground/70">
                                                            Freeze or unfreeze
                                                            all transactions
                                                        </div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {activeTab === "analytics" && (
                                <div className="space-y-6">
                                    <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-accent-aurora-green/20 flex items-center justify-center">
                                                    <BarChart className="h-3.5 w-3.5 text-accent-aurora-green" />
                                                </div>
                                                <span>Token Analytics</span>
                                            </CardTitle>
                                            <CardDescription>
                                                Performance metrics for{" "}
                                                {selectedToken.ticker}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/10 text-center mb-4">
                                                <div className="text-sm text-foreground/70 mb-1">
                                                    Chart will be displayed here
                                                </div>
                                                <div className="h-32 flex items-center justify-center">
                                                    <div className="w-full h-24 bg-gradient-to-r from-accent-amethyst/10 via-accent-glow-cyan/10 to-accent-aurora-green/10 rounded-lg"></div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="p-3 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                    <div className="text-xs text-foreground/70 mb-1">
                                                        Market Cap
                                                    </div>
                                                    <div className="text-lg font-medium">
                                                        $
                                                        {Number(
                                                            selectedToken.marketCap
                                                        ).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="p-3 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                    <div className="text-xs text-foreground/70 mb-1">
                                                        Transactions
                                                    </div>
                                                    <div className="text-lg font-medium">
                                                        1,432
                                                    </div>
                                                </div>
                                                <div className="p-3 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                    <div className="text-xs text-foreground/70 mb-1">
                                                        Holders
                                                    </div>
                                                    <div className="text-lg font-medium">
                                                        287
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                        <CardHeader>
                                            <CardTitle>Top Holders</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[50px]">
                                                            Rank
                                                        </TableHead>
                                                        <TableHead>
                                                            Address
                                                        </TableHead>
                                                        <TableHead>
                                                            Balance
                                                        </TableHead>
                                                        <TableHead className="text-right">
                                                            Percentage
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell className="font-medium">
                                                            1
                                                        </TableCell>
                                                        <TableCell>
                                                            erd1...8a5w6u
                                                        </TableCell>
                                                        <TableCell>
                                                            {Number(
                                                                selectedToken.balance
                                                            ).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {(
                                                                (Number(
                                                                    selectedToken.balance
                                                                ) /
                                                                    Number(
                                                                        selectedToken.supply
                                                                    )) *
                                                                100
                                                            ).toFixed(2)}
                                                            %
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium">
                                                            2
                                                        </TableCell>
                                                        <TableCell>
                                                            erd1...x4dk8r
                                                        </TableCell>
                                                        <TableCell>
                                                            250,000
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            25.00%
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell className="font-medium">
                                                            3
                                                        </TableCell>
                                                        <TableCell>
                                                            erd1...z7p2ty
                                                        </TableCell>
                                                        <TableCell>
                                                            125,000
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            12.50%
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>
                            )}

                            {activeTab === "activity" && (
                                <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-accent-amethyst/20 flex items-center justify-center">
                                                <UserCheck className="h-3.5 w-3.5 text-accent-amethyst" />
                                            </div>
                                            <span>Recent Activity</span>
                                        </CardTitle>
                                        <CardDescription>
                                            Recent transactions for{" "}
                                            {selectedToken.ticker}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>
                                                        Amount
                                                    </TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead className="text-right">
                                                        Transaction
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-accent-amethyst/10 text-accent-amethyst border-accent-amethyst/20"
                                                        >
                                                            Mint
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        1,000{" "}
                                                        {selectedToken.ticker}
                                                    </TableCell>
                                                    <TableCell>
                                                        2 hours ago
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <a
                                                            href="#"
                                                            className="text-accent-amethyst hover:underline"
                                                        >
                                                            View
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-accent-glow-cyan/10 text-accent-glow-cyan border-accent-glow-cyan/20"
                                                        >
                                                            Liquidity
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        500{" "}
                                                        {selectedToken.ticker}
                                                    </TableCell>
                                                    <TableCell>
                                                        1 day ago
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <a
                                                            href="#"
                                                            className="text-accent-amethyst hover:underline"
                                                        >
                                                            View
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-accent-aurora-green/10 text-accent-aurora-green border-accent-aurora-green/20"
                                                        >
                                                            Transfer
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        250{" "}
                                                        {selectedToken.ticker}
                                                    </TableCell>
                                                    <TableCell>
                                                        3 days ago
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <a
                                                            href="#"
                                                            className="text-accent-amethyst hover:underline"
                                                        >
                                                            View
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <div className="flex justify-center mt-4">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-sm"
                                            >
                                                View All Transactions
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
