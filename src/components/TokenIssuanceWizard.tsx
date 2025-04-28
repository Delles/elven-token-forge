import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { calculateTokenIssuanceFee } from '../utils/feeCalculations';

type TokenDetails = {
  name: string;
  ticker: string;
  supply: string;
  decimals: string;
  canFreeze: boolean;
  canWipe: boolean;
  canPause: boolean;
  canMint: boolean;
  canBurn: boolean;
  canChangeOwner: boolean;
  canUpgrade: boolean;
};

const initialTokenDetails: TokenDetails = {
  name: '',
  ticker: '',
  supply: '',
  decimals: '18',
  canFreeze: false,
  canWipe: false,
  canPause: false,
  canMint: true,
  canBurn: true,
  canChangeOwner: true,
  canUpgrade: true,
};

const TokenIssuanceWizard = ({ onComplete }: { onComplete?: () => void }) => {
  const [step, setStep] = useState(1);
  const [tokenDetails, setTokenDetails] = useState<TokenDetails>(initialTokenDetails);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTokenDetails((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setTokenDetails((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!tokenDetails.name || !tokenDetails.ticker || !tokenDetails.supply) {
        toast.error("Please fill in all required fields");
        return;
      }
      
      if (tokenDetails.ticker.length < 3 || tokenDetails.ticker.length > 10) {
        toast.error("Ticker must be between 3-10 characters");
        return;
      }
      
      setStep(2);
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleTokenIssue = () => {
    setIsProcessing(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Token issued successfully!");
      if (onComplete) onComplete();
    }, 2000);
  };
  
  const platformFee = calculateTokenIssuanceFee(tokenDetails.supply);
  
  return (
    <div className="wizard-container">
      <div className="wizard-header">
        <div className="w-8 h-8 rounded-full bg-elven-gradient flex items-center justify-center text-white font-medium">
          {step}
        </div>
        <h2 className="wizard-title">Issue New ESDT Token</h2>
      </div>
      
      {step === 1 && (
        <div className="wizard-step">
          <p className="wizard-subtitle mb-6">
            Define the parameters for your new token. Once issued, some properties cannot be changed.
          </p>
          
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Token Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="My Awesome Token"
                value={tokenDetails.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="ticker">Token Ticker (Symbol) *</Label>
              <Input
                id="ticker"
                name="ticker"
                placeholder="MAT"
                value={tokenDetails.ticker}
                onChange={handleInputChange}
                className="uppercase"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">
                3-10 characters, uppercase letters and numbers only
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="supply">Initial Supply *</Label>
              <Input
                id="supply"
                name="supply"
                type="number"
                placeholder="1000000"
                value={tokenDetails.supply}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="decimals">Decimals</Label>
              <Input
                id="decimals"
                name="decimals"
                type="number"
                placeholder="18"
                value={tokenDetails.decimals}
                onChange={handleInputChange}
                min="0"
                max="18"
              />
              <p className="text-xs text-muted-foreground">
                Standard is 18 (like EGLD), set to 0 for no decimal places
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="basic" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Properties</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="py-4">
              <p className="text-sm text-muted-foreground">
                Using default token properties. For more control, check the Advanced tab.
              </p>
            </TabsContent>
            <TabsContent value="advanced" className="py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canMint">Can Mint</Label>
                    <p className="text-xs text-muted-foreground">Allows creating additional tokens later</p>
                  </div>
                  <Switch
                    id="canMint"
                    checked={tokenDetails.canMint}
                    onCheckedChange={(checked) => handleSwitchChange('canMint', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canBurn">Can Burn</Label>
                    <p className="text-xs text-muted-foreground">Allows destroying tokens</p>
                  </div>
                  <Switch
                    id="canBurn"
                    checked={tokenDetails.canBurn}
                    onCheckedChange={(checked) => handleSwitchChange('canBurn', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canPause">Can Pause</Label>
                    <p className="text-xs text-muted-foreground">Allows pausing all token transfers</p>
                  </div>
                  <Switch
                    id="canPause"
                    checked={tokenDetails.canPause}
                    onCheckedChange={(checked) => handleSwitchChange('canPause', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canFreeze">Can Freeze</Label>
                    <p className="text-xs text-muted-foreground">Allows freezing tokens for specific addresses</p>
                  </div>
                  <Switch
                    id="canFreeze"
                    checked={tokenDetails.canFreeze}
                    onCheckedChange={(checked) => handleSwitchChange('canFreeze', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canWipe">Can Wipe</Label>
                    <p className="text-xs text-muted-foreground">Allows wiping tokens from frozen addresses</p>
                  </div>
                  <Switch
                    id="canWipe"
                    checked={tokenDetails.canWipe}
                    onCheckedChange={(checked) => handleSwitchChange('canWipe', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canChangeOwner">Can Change Owner</Label>
                    <p className="text-xs text-muted-foreground">Allows transferring token ownership</p>
                  </div>
                  <Switch
                    id="canChangeOwner"
                    checked={tokenDetails.canChangeOwner}
                    onCheckedChange={(checked) => handleSwitchChange('canChangeOwner', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="canUpgrade">Can Upgrade</Label>
                    <p className="text-xs text-muted-foreground">Allows upgrading token properties</p>
                  </div>
                  <Switch
                    id="canUpgrade"
                    checked={tokenDetails.canUpgrade}
                    onCheckedChange={(checked) => handleSwitchChange('canUpgrade', checked)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
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
            Review your token details and confirm issuance. You will need to sign a transaction.
          </p>
          
          <Card>
            <CardHeader>
              <CardTitle>Token Preview</CardTitle>
              <CardDescription>
                {tokenDetails.name} ({tokenDetails.ticker})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Initial Supply</span>
                <span className="font-medium">
                  {Number(tokenDetails.supply).toLocaleString()} {tokenDetails.ticker}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Decimals</span>
                <span className="font-medium">
                  {tokenDetails.decimals}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Properties</span>
                <span className="text-xs space-x-2">
                  {tokenDetails.canMint && <span className="px-2 py-1 bg-accent/10 rounded">Mintable</span>}
                  {tokenDetails.canBurn && <span className="px-2 py-1 bg-accent/10 rounded">Burnable</span>}
                  {tokenDetails.canPause && <span className="px-2 py-1 bg-accent/10 rounded">Pausable</span>}
                  {tokenDetails.canFreeze && <span className="px-2 py-1 bg-accent/10 rounded">Freezable</span>}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Platform Fee (0.01%)</span>
                <span className="font-medium">
                  {platformFee.toLocaleString()} {tokenDetails.ticker}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">EGLD Issuance Fee</span>
                <span className="font-medium">~5 EGLD + Gas</span>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Once issued, token properties such as the ticker and decimals CANNOT be changed.
              </p>
            </CardFooter>
          </Card>
          
          <div className="wizard-navigation">
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
            <Button 
              onClick={handleTokenIssue} 
              disabled={isProcessing}
              className="relative"
            >
              {isProcessing ? 'Processing...' : 'Issue Token'}
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

export default TokenIssuanceWizard;
