import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Coins } from "lucide-react";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { toast } from "@/components/ui/sonner";

// Define the expected type for the wallet connection hook
interface WalletConnectionState {
    isConnected: boolean;
    address: string | null; // Address can be null if not connected
    mockConnect: () => void;
    mockDisconnect: () => void;
}

const AppHeader = () => {
    const navigate = useNavigate();
    const { address, isConnected, mockConnect, mockDisconnect } =
        useWalletConnection() as WalletConnectionState;

    const truncatedAddress =
        isConnected && address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not Connected";

    const handleCopyToClipboard = (text: string | null) => {
        if (!isConnected || !text) {
            toast.error("Wallet not connected or address unavailable.");
            return;
        }
        navigator.clipboard.writeText(text);
        toast.success("Address copied to clipboard!");
    };

    const handleDisconnect = () => {
        if (mockDisconnect) {
            mockDisconnect();
            // Optional: toast.info("Disconnected"); // Consider if toast is needed here or handled by redirection/ProtectedRoute
        } else {
            toast.error("Disconnect function not available.");
        }
    };

    const handleConnect = () => {
        if (mockConnect) {
            mockConnect();
            // Optional: toast.success("Connecting..."); // Feedback that action is initiated
        } else {
            toast.error("Connect function not available.");
            // navigate('/connect-wallet'); // Or trigger a connection modal
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-background/90 backdrop-blur-lg border-b border-border/40 shadow-nm-sm">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div
                        className="w-8 h-8 rounded-full bg-nm-accent-gradient flex items-center justify-center shadow-nm-sm cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <Coins className="h-4 w-4 text-white" />
                    </div>
                    <h2
                        className="text-lg font-medium cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Token Forge
                    </h2>
                </div>
                <div className="flex items-center space-x-4">
                    <Badge variant="neo" className="flex items-center gap-1.5">
                        <span
                            className={`w-2 h-2 rounded-full ${
                                isConnected
                                    ? "bg-accent-aurora-green animate-pulse"
                                    : "bg-destructive"
                            } `}
                        ></span>
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
                            disabled={!isConnected || !address}
                        >
                            <Copy className="h-3.5 w-3.5" />
                            <span className="sr-only">Copy address</span>
                        </Button>
                    </div>
                    {isConnected && address ? (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            onClick={handleDisconnect}
                        >
                            Disconnect
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            onClick={handleConnect}
                        >
                            Connect Wallet
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
