import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Coins } from "lucide-react";
import { calculateLpFee, calculateExpectedLpTokens } from '../utils/feeCalculations';

type LiquidityDetails = {
  ownToken: string;
  pairingToken: string;
  ownTokenAmount: string;
  pairingTokenAmount: string;
};

const initialLiquidityDetails: LiquidityDetails = {
  ownToken: '',
  pairingToken: 'EGLD',
  ownTokenAmount: '',
  pairingTokenAmount: '',
};

// Mock token list - would come from the user's wallet in a real app
const mockUserTokens = [
  { name: 'My Awesome Token', ticker: 'MAT' },
  { name: 'Example Token', ticker: 'EXT' },
];

const pairingTokens = [
  { name: 'MultiversX EGLD', ticker: 'EGLD' },
  { name: 'USD Coin', ticker: 'USDC' },
];

const LiquidityProvisionWizard = ({ onComplete }: { onComplete?: () => void }) => {
  const [step, setStep] = useState(1);
  const [liquidityDetails, setLiquidityDetails] = useState<LiquidityDetails>(initialLiquidityDetails);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLiquidityDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setLiquidityDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!liquidityDetails.ownToken) {
        toast.error("Please select your token");
        return;
      }
      
      setStep(2);
    } else if (step === 2) {
      if (!liquidityDetails.ownTokenAmount || !liquidityDetails.pairingTokenAmount) {
        toast.error("Please enter both token amounts");
        return;
      }
      
      setStep(3);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleAddLiquidity = () => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Liquidity added successfully!");
      if (onComplete) onComplete();
    }, 2000);
  };
  
  // Calculate initial price based on token amounts
  const calculateInitialPrice = () => {
    const ownAmount = parseFloat(liquidityDetails.ownTokenAmount) || 0;
    const pairingAmount = parseFloat(liquidityDetails.pairingTokenAmount) || 0;
    
    if (ownAmount === 0) return "0";
    
    return (pairingAmount / ownAmount).toFixed(6);
  };
  
  const expectedLpTokens = calculateExpectedLpTokens(
    liquidityDetails.ownTokenAmount,
    liquidityDetails.pairingTokenAmount
  );
  
  const lpFee = calculateLpFee(
    liquidityDetails.ownTokenAmount,
    liquidityDetails.pairingTokenAmount
  );

  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <div className="w-8 h-8 rounded-full bg-elven-gradient flex items-center justify-center text-white font-medium">
          {step}
        </div>
        <h2 className="wizard-title">Add Initial Liquidity</h2>
      </div>
      
      {step === 1 && (
        <div className="wizard-step">
          <p className="wizard-subtitle mb-6">
            Select the token you want to create a liquidity pool for and choose a pairing token.
          </p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Your Token</Label>
              <Select
                value={liquidityDetails.ownToken}
                onValueChange={(value) => handleSelectChange('ownToken', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your token" />
                </SelectTrigger>
                <SelectContent>
                  {mockUserTokens.map((token) => (
                    <SelectItem key={token.ticker} value={token.ticker}>
                      {token.name} ({token.ticker})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Pairing Token</Label>
              <Select
                value={liquidityDetails.pairingToken}
                onValueChange={(value) => handleSelectChange('pairingToken', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select pairing token" />
                </SelectTrigger>
                <SelectContent>
                  {pairingTokens.map((token) => (
                    <SelectItem key={token.ticker} value={token.ticker}>
                      {token.name} ({token.ticker})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This token will be paired with your token in the liquidity pool
              </p>
            </div>
          </div>
          
          <div className="wizard-navigation">
            <Button variant="outline" onClick={() => onComplete && onComplete()}>
              Cancel
            </Button>
            <Button onClick={handleNextStep}>Continue</Button>
          </div>
        </div>
      )}
      
      {step === 2 && (
        <div className="wizard-step">
          <p className="wizard-subtitle mb-6">
            Specify the amount of tokens you want to provide as liquidity.
          </p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ownTokenAmount">
                {liquidityDetails.ownToken} Amount
              </Label>
              <Input
                id="ownTokenAmount"
                name="ownTokenAmount"
                type="number"
                placeholder="0.0"
                value={liquidityDetails.ownTokenAmount}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative bg-background px-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  +
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pairingTokenAmount">
                {liquidityDetails.pairingToken} Amount
              </Label>
              <Input
                id="pairingTokenAmount"
                name="pairingTokenAmount"
                type="number"
                placeholder="0.0"
                value={liquidityDetails.pairingTokenAmount}
                onChange={handleInputChange}
              />
            </div>
            
            <Card className="mt-4">
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Initial Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    1 {liquidityDetails.ownToken} = {calculateInitialPrice()} {liquidityDetails.pairingToken}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="wizard-navigation">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button onClick={handleNextStep}>Review</Button>
          </div>
        </div>
      )}
      
      {step === 3 && (
        <div className="wizard-step">
          <p className="wizard-subtitle mb-6">
            Review your liquidity provision details and confirm the transaction.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Liquidity Provision Summary</CardTitle>
              <CardDescription>
                {liquidityDetails.ownToken}/{liquidityDetails.pairingToken} Pool
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">{liquidityDetails.ownToken} Amount</span>
                <span className="font-medium">
                  {liquidityDetails.ownTokenAmount} {liquidityDetails.ownToken}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">{liquidityDetails.pairingToken} Amount</span>
                <span className="font-medium">
                  {liquidityDetails.pairingTokenAmount} {liquidityDetails.pairingToken}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Initial Price</span>
                <span className="font-medium">
                  1 {liquidityDetails.ownToken} = {calculateInitialPrice()} {liquidityDetails.pairingToken}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b bg-muted/50">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Expected LP Tokens</span>
                </div>
                <span className="font-medium">
                  {expectedLpTokens.toLocaleString()} LP
                </span>
              </div>
              <div className="flex justify-between py-2 border-b text-warning">
                <span className="text-muted-foreground">Platform Fee (0.1% in LP)</span>
                <span className="font-medium">
                  {lpFee.toLocaleString()} LP
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Transaction Fee</span>
                <span className="font-medium">Gas</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                You will receive {(expectedLpTokens - lpFee).toLocaleString()} LP tokens representing your share of the pool. These can be used to withdraw your liquidity later.
              </p>
            </CardFooter>
          </Card>
          
          <div className="wizard-navigation">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button 
              onClick={handleAddLiquidity} 
              disabled={isProcessing}
              className="relative"
            >
              {isProcessing ? 'Processing...' : 'Add Liquidity'}
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm rounded-md">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiquidityProvisionWizard;
