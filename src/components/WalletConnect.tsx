// src/components/WalletConnect.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { useWalletConnection } from "@/hooks/useWalletConnection"; // Import the hook

const WalletConnect = () => {
    const { isConnected, address, mockConnect, mockDisconnect } =
        useWalletConnection(); // Use the hook
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleConnect = (type: "extension" | "web" | "maiar" | "ledger") => {
        mockConnect(); // Use hook's connect function
        setIsDialogOpen(false);
        toast.success("Wallet connected successfully!");
        navigate("/dashboard");
    };

    const handleDisconnect = () => {
        mockDisconnect(); // Use hook's disconnect function
        toast.info("Wallet disconnected");
        navigate("/");
    };

    return (
        <>
            {!isConnected ? ( // Use isConnected from the hook
                <Button
                    variant="outline"
                    className="font-medium border-elven hover:border-elven-light hover:text-elven-light"
                    onClick={() => setIsDialogOpen(true)}
                >
                    Connect Wallet
                </Button>
            ) : (
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-elven-muted text-elven rounded-md text-sm">
                        {`${address.substring(0, 6)}...${address.substring(
                            address.length - 4
                        )}`}
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDisconnect}
                    >
                        Disconnect
                    </Button>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Connect your wallet</DialogTitle>
                        <DialogDescription>
                            Choose one of the available wallet providers to
                            continue
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button
                            onClick={() => handleConnect("extension")}
                            className="w-full justify-start"
                        >
                            <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
                            MultiversX Browser Extension
                        </Button>
                        <Button
                            onClick={() => handleConnect("web")}
                            className="w-full justify-start"
                        >
                            <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
                            Web Wallet
                        </Button>
                        <Button
                            onClick={() => handleConnect("maiar")}
                            className="w-full justify-start"
                        >
                            <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
                            XPortal App
                        </Button>
                        <Button
                            onClick={() => handleConnect("ledger")}
                            className="w-full justify-start"
                        >
                            <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
                            Ledger
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default WalletConnect;
