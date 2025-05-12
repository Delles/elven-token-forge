
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";

// This is a simple mock component that simulates wallet connection
const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(true); // Default to connected for development
  const [address] = useState('erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const connectWallet = (type: 'extension' | 'web' | 'maiar' | 'ledger') => {
    setIsConnected(true);
    setIsDialogOpen(false);
    toast.success("Wallet connected successfully!");
    navigate('/dashboard');  // Redirect to dashboard after connection
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
    toast.info("Wallet disconnected");
    navigate('/');  // Redirect to home after disconnecting
  };
  
  return (
    <>
      {!isConnected ? (
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
            {`${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
          </div>
          <Button variant="ghost" size="sm" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Choose one of the available wallet providers to continue
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => connectWallet('extension')} className="w-full justify-start">
              <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
              MultiversX Browser Extension
            </Button>
            <Button onClick={() => connectWallet('web')} className="w-full justify-start">
              <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
              Web Wallet
            </Button>
            <Button onClick={() => connectWallet('maiar')} className="w-full justify-start">
              <div className="w-6 h-6 mr-2 bg-elven-light rounded-full" />
              Maiar App
            </Button>
            <Button onClick={() => connectWallet('ledger')} className="w-full justify-start">
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
