
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
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
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for user's tokens
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

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedToken, setSelectedToken] = useState(mockUserTokens[0]);
    const [tokens] = useState(mockUserTokens);
    const [isAddTokenDialogOpen, setIsAddTokenDialogOpen] = useState(false);
    const [tokenIdentifier, setTokenIdentifier] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Mock wallet address
    const walletAddress = "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u";
    const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

    const handleIssueNewToken = () => {
        navigate("/issue-token");
    };

    const handleTokenDetails = (tokenId) => {
        navigate(`/token/${tokenId}`);
    };

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // Could add toast notification here
    };

    const handleSelectToken = (token) => {
        setSelectedToken(token);
    };

    const handleAddTokenSubmit = () => {
        setIsLoading(true);
        setErrorMessage("");
        
        // Mock validation and token fetching
        setTimeout(() => {
            if (tokenIdentifier.includes("invalid")) {
                setErrorMessage("Token not found, or you do not have management permissions with the connected wallet.");
            } else {
                setIsAddTokenDialogOpen(false);
                // Here we would normally add the token to the list and select it
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleRefreshData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            // Here we would normally refresh the token data
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/10">
            {/* Global Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-nm-sm">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-md bg-nm-accent-gradient flex items-center justify-center shadow-nm-sm">
                            <Coins className="h-4 w-4 text-white" />
                        </div>
                        <h2 className="text-lg font-medium">Token Forge</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Badge variant="neo" className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-accent-aurora-green animate-pulse"></span>
                            MultiversX Mainnet
                        </Badge>
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-base-off-white/20 dark:bg-base-charcoal/20 border border-border/20 shadow-nm-inner-soft">
                            <span className="text-sm text-foreground/70">{truncatedAddress}</span>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={() => handleCopyToClipboard(walletAddress)}
                            >
                                <Copy className="h-3.5 w-3.5" />
                                <span className="sr-only">Copy address</span>
                            </Button>
                        </div>
                        <Button variant="outline" size="sm" className="text-sm">
                            Disconnect
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 container py-8 px-4 md:py-12 md:px-6 relative z-10">
                <div className="md:flex md:justify-between md:items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent-glow-cyan to-accent-amethyst mb-1">
                            My Token Forge
                        </h1>
                        <p className="text-foreground/70">
                            Manage your ESDT tokens on the MultiversX blockchain
                        </p>
                    </div>
                </div>

                {tokens.length === 0 ? (
                    // Empty State
                    <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-card/80 shadow-nm-md">
                        <CardContent className="py-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-base-off-white/30 dark:bg-base-charcoal/30 flex items-center justify-center shadow-nm-inner-soft">
                                <Coins className="h-8 w-8 text-foreground/50" />
                            </div>
                            <h3 className="text-xl font-medium mb-2">You are not currently managing any tokens</h3>
                            <p className="text-foreground/70 mb-8">Create a new token or add an existing one to get started</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button onClick={handleIssueNewToken} className="bg-nm-accent-gradient text-white">
                                    <Plus className="h-4 w-4 mr-2" /> Launch a New Token
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => setIsAddTokenDialogOpen(true)}
                                >
                                    Manage an Existing Token
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    // Dashboard View
                    <div className="grid lg:grid-cols-7 gap-6">
                        {/* Left Column - Information */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Token Selection & Context */}
                            <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                <CardHeader className="pb-3">
                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex-1">
                                            <CardTitle className="text-2xl">
                                                <select 
                                                    className="bg-transparent focus:outline-none cursor-pointer [appearance:none] pr-8"
                                                    value={selectedToken.id}
                                                    onChange={(e) => {
                                                        const token = tokens.find(t => t.id === e.target.value);
                                                        if (token) handleSelectToken(token);
                                                    }}
                                                    style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '1rem'}}
                                                >
                                                    {tokens.map(token => (
                                                        <option key={token.id} value={token.id}>
                                                            {token.name} ({token.ticker})
                                                        </option>
                                                    ))}
                                                </select>
                                            </CardTitle>
                                            <CardDescription className="text-foreground/70 mt-1">
                                                Select token to manage
                                            </CardDescription>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="h-auto text-sm"
                                            onClick={() => setIsAddTokenDialogOpen(true)}
                                        >
                                            <Plus className="h-3.5 w-3.5 mr-1" /> Add Existing Token
                                        </Button>
                                    </div>
                                </CardHeader>
                            </Card>

                            {/* Token Information Panel */}
                            <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg">Token Information</CardTitle>
                                            <CardDescription className="text-foreground/70 text-sm">
                                                Key details about {selectedToken.name}
                                            </CardDescription>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            className={`h-8 w-8 ${isLoading ? 'animate-spin' : ''}`}
                                            onClick={handleRefreshData}
                                            disabled={isLoading}
                                        >
                                            <RefreshCcw className="h-4 w-4" />
                                            <span className="sr-only">Refresh token data</span>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-accent-amethyst/10 flex items-center justify-center shadow-nm-inner-soft">
                                                <Circle
                                                    className="h-6 w-6 text-accent-amethyst"
                                                    fill="currentColor"
                                                    fillOpacity={0.2}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-lg">{selectedToken.name}</h3>
                                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                                    <span>{selectedToken.ticker}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                            <span className="text-sm font-medium">Token Identifier:</span>
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm bg-base-off-white/20 dark:bg-base-charcoal/30 px-2 py-1 rounded">
                                                    {selectedToken.id}
                                                </code>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6" 
                                                    onClick={() => handleCopyToClipboard(selectedToken.id)}
                                                >
                                                    <Copy className="h-3.5 w-3.5" />
                                                    <span className="sr-only">Copy identifier</span>
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                <div className="text-sm text-foreground/70 mb-1">Total Supply:</div>
                                                <div className="text-xl font-medium">
                                                    {Number(selectedToken.supply).toLocaleString()} {selectedToken.ticker}
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                                <div className="text-sm text-foreground/70 mb-1">Your Wallet Balance:</div>
                                                <div className="text-xl font-medium">
                                                    {Number(selectedToken.balance).toLocaleString()} {selectedToken.ticker}
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
                                                View on MultiversX Explorer
                                            </a>
                                            {selectedToken.hasLiquidityPool ? (
                                                <a 
                                                    href={`https://xexchange.com/tokens/${selectedToken.id}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 border border-border/20 hover:bg-base-off-white/20 dark:hover:bg-base-charcoal/30 transition-colors"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    View Pool on xExchange
                                                </a>
                                            ) : (
                                                <span 
                                                    className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md bg-base-off-white/10 dark:bg-base-charcoal/20 border border-border/20 text-foreground/50 cursor-not-allowed"
                                                    title="No known liquidity pool on xExchange for this token"
                                                >
                                                    <ExternalLink className="h-3.5 w-3.5" />
                                                    View Pool on xExchange
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* User Permissions Panel */}
                            <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Your Permissions for {selectedToken.ticker}</CardTitle>
                                    <CardDescription className="text-foreground/70 text-sm">
                                        Special ESDT roles assigned to your wallet
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2.5">
                                        {allPermissions.map(permission => {
                                            const hasPermission = selectedToken.properties.includes(permission.id);
                                            return (
                                                <Badge 
                                                    key={permission.id} 
                                                    variant={hasPermission ? "amethyst" : "outline"}
                                                    className={`px-3 py-1 ${!hasPermission && 'opacity-50'}`}
                                                >
                                                    {permission.label}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Actions */}
                        <div className="lg:col-span-3 space-y-6">
                            {/* Management Actions Panel */}
                            <Card className="bg-white/80 dark:bg-card/80 shadow-nm-md">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">Management Actions</CardTitle>
                                    <CardDescription className="text-foreground/70 text-sm">
                                        Token operations for {selectedToken.ticker}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {/* Supply Management */}
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">Supply Management</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button
                                                    variant="outline"
                                                    className={`justify-start text-left h-auto py-3 ${selectedToken.properties.includes("canMint") ? "border-accent-amethyst/30 hover:border-accent-amethyst/60" : "opacity-60 cursor-not-allowed"}`}
                                                    disabled={!selectedToken.properties.includes("canMint")}
                                                    title={!selectedToken.properties.includes("canMint") ? "Requires 'Minting' permission" : undefined}
                                                >
                                                    <div className="w-8 h-8 rounded-md bg-accent-amethyst/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                        <Plus className="h-4 w-4 text-accent-amethyst" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div>Mint Tokens</div>
                                                        <div className="text-xs text-foreground/60">Create new tokens</div>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={`justify-start text-left h-auto py-3 ${selectedToken.properties.includes("canBurn") && Number(selectedToken.balance) > 0 ? "border-accent-amethyst/30 hover:border-accent-amethyst/60" : "opacity-60 cursor-not-allowed"}`}
                                                    disabled={!selectedToken.properties.includes("canBurn") || Number(selectedToken.balance) <= 0}
                                                    title={!selectedToken.properties.includes("canBurn") ? "Requires 'Burning' permission" : Number(selectedToken.balance) <= 0 ? "No tokens to burn" : undefined}
                                                >
                                                    <div className="w-8 h-8 rounded-md bg-accent-glow-cyan/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                        <Flame className="h-4 w-4 text-accent-glow-cyan" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div>Burn Tokens</div>
                                                        <div className="text-xs text-foreground/60">Remove from supply</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Liquidity Management */}
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">Liquidity Management (xExchange)</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <Button
                                                    variant="outline"
                                                    className={`justify-start text-left h-auto py-3 ${selectedToken.hasLiquidityPool ? "border-accent-amethyst/30 hover:border-accent-amethyst/60" : "opacity-60 cursor-not-allowed"}`}
                                                    disabled={!selectedToken.hasLiquidityPool}
                                                    title={!selectedToken.hasLiquidityPool ? "No xExchange pool detected for this token" : undefined}
                                                    onClick={() => navigate("/provide-liquidity")}
                                                >
                                                    <div className="w-8 h-8 rounded-md bg-accent-aurora-green/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                        <Layers className="h-4 w-4 text-accent-aurora-green" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div>Add Liquidity</div>
                                                        <div className="text-xs text-foreground/60">To xExchange</div>
                                                    </div>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className={`justify-start text-left h-auto py-3 ${Number(selectedToken.lpTokens) > 0 ? "border-accent-amethyst/30 hover:border-accent-amethyst/60" : "opacity-60 cursor-not-allowed"}`}
                                                    disabled={Number(selectedToken.lpTokens) <= 0}
                                                    title={Number(selectedToken.lpTokens) <= 0 ? "You do not currently hold LP tokens for this token's pools" : undefined}
                                                >
                                                    <div className="w-8 h-8 rounded-md bg-accent-amethyst/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                        <Layers className="h-4 w-4 text-accent-amethyst" />
                                                    </div>
                                                    <div className="text-left">
                                                        <div>Remove Liquidity</div>
                                                        <div className="text-xs text-foreground/60">From xExchange</div>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Role & Ownership Management */}
                                        <div>
                                            <h4 className="text-sm font-medium text-foreground/70 mb-3 px-1">Role & Ownership Management</h4>
                                            <Button
                                                variant="outline"
                                                className={`w-full justify-start text-left h-auto py-3 ${selectedToken.properties.includes("canChangeOwner") || selectedToken.properties.some(p => ["canMint", "canBurn", "canSetSpecialRoles"].includes(p)) ? "border-accent-amethyst/30 hover:border-accent-amethyst/60" : "opacity-60 cursor-not-allowed"}`}
                                                disabled={!selectedToken.properties.includes("canChangeOwner") && !selectedToken.properties.some(p => ["canMint", "canBurn", "canSetSpecialRoles"].includes(p))}
                                                title={!selectedToken.properties.includes("canChangeOwner") && !selectedToken.properties.some(p => ["canMint", "canBurn", "canSetSpecialRoles"].includes(p)) ? "You do not have permissions to manage or transfer roles" : undefined}
                                            >
                                                <div className="w-8 h-8 rounded-md bg-accent-glow-cyan/10 flex items-center justify-center shadow-nm-sm mr-3">
                                                    <Shield className="h-4 w-4 text-accent-glow-cyan" />
                                                </div>
                                                <div className="text-left">
                                                    <div>Manage Token Roles</div>
                                                    <div className="text-xs text-foreground/60">Transfer or modify permissions</div>
                                                </div>
                                            </Button>
                                        </div>

                                        {/* Launch New Token Button */}
                                        <Button 
                                            onClick={handleIssueNewToken} 
                                            className="w-full bg-nm-accent-gradient text-white py-6 h-auto shadow-nm-sm hover:shadow-nm-md"
                                        >
                                            <Plus className="h-5 w-5 mr-2" />
                                            <span className="text-base">Launch a New Token</span>
                                        </Button>
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
                                        <CardTitle className="text-lg">Recent Activity</CardTitle>
                                    </div>
                                    <CardDescription className="text-foreground/70 text-sm">
                                        Latest transactions for {selectedToken.ticker}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                            <div className="w-2 h-2 rounded-full bg-accent-amethyst"></div>
                                            <span className="text-foreground/80">
                                                Minted 1,000 {selectedToken.ticker}
                                            </span>
                                            <span className="text-xs text-foreground/60 ml-auto">
                                                2h ago
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm p-2.5 rounded-lg bg-base-off-white/10 dark:bg-base-charcoal/20 shadow-nm-inner-soft">
                                            <div className="w-2 h-2 rounded-full bg-accent-glow-cyan"></div>
                                            <span className="text-foreground/80">
                                                Added liquidity with 500 {selectedToken.ticker}
                                            </span>
                                            <span className="text-xs text-foreground/60 ml-auto">
                                                1d ago
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </main>

            {/* Add Existing Token Dialog */}
            <Dialog open={isAddTokenDialogOpen} onOpenChange={setIsAddTokenDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Existing Token</DialogTitle>
                        <DialogDescription>
                            Enter the token identifier to manage an existing token
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="token-id" className="text-sm font-medium">Token Identifier</label>
                            <Input
                                id="token-id"
                                placeholder="e.g. TOKEN-123456"
                                value={tokenIdentifier}
                                onChange={(e) => setTokenIdentifier(e.target.value)}
                                className="shadow-nm-inner-soft bg-base-off-white/10 dark:bg-base-charcoal/20"
                            />
                        </div>
                        {errorMessage && (
                            <div className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
                                {errorMessage}
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I confirm I have permission to manage this token
                            </label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={handleAddTokenSubmit}
                            disabled={!tokenIdentifier || isLoading}
                            className={isLoading ? "opacity-70" : ""}
                        >
                            {isLoading ? "Checking..." : "Add Token"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Dashboard;
