import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Coins,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Info,
    Loader,
    Plus,
    ExternalLink,
} from "lucide-react";
import {
    calculateLpFee,
    calculateExpectedLpTokens,
} from "../utils/feeCalculations";
import { useNavigate } from "react-router-dom";

type LiquidityDetails = {
    ownToken: string;
    pairingToken: string;
    ownTokenAmount: string;
    pairingTokenAmount: string;
};

const initialLiquidityDetails: LiquidityDetails = {
    ownToken: "",
    pairingToken: "EGLD",
    ownTokenAmount: "",
    pairingTokenAmount: "",
};

// Mock token list - would come from the user's wallet in a real app
const mockUserTokens = [
    { name: "My Awesome Token", ticker: "MAT" },
    { name: "Example Token", ticker: "EXT" },
];

const pairingTokens = [
    { name: "MultiversX EGLD", ticker: "EGLD" },
    { name: "USD Coin", ticker: "USDC" },
];

const LiquidityProvisionWizard = ({
    onComplete,
}: {
    onComplete?: () => void;
}) => {
    const [step, setStep] = useState(1);
    const [liquidityDetails, setLiquidityDetails] = useState<LiquidityDetails>(
        initialLiquidityDetails
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [risksAccepted, setRisksAccepted] = useState(false);
    const [depositSteps, setDepositSteps] = useState({
        ownToken: false,
        pairingToken: false,
    });
    const [showTooltip, setShowTooltip] = useState("");

    const navigate = useNavigate();

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
            if (
                !liquidityDetails.ownTokenAmount ||
                !liquidityDetails.pairingTokenAmount
            ) {
                toast.error("Please enter both token amounts");
                return;
            }

            setStep(3);
        } else if (step === 3) {
            if (!risksAccepted) {
                toast.error(
                    "Please acknowledge the risks associated with providing liquidity"
                );
                return;
            }

            setStep(4);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleDeposit = (tokenType) => {
        const updatedSteps = { ...depositSteps };
        updatedSteps[tokenType] = true;
        setDepositSteps(updatedSteps);

        toast.success(
            `${
                tokenType === "ownToken"
                    ? liquidityDetails.ownToken
                    : liquidityDetails.pairingToken
            } deposited successfully`
        );
    };

    const handleAddLiquidity = () => {
        setIsProcessing(true);

        // Simulate blockchain transaction
        setTimeout(() => {
            setIsProcessing(false);
            setStep(6); // Skip to success
        }, 2000);
    };

    // Calculate initial price based on token amounts
    const calculateInitialPrice = () => {
        const ownAmount = parseFloat(liquidityDetails.ownTokenAmount) || 0;
        const pairingAmount =
            parseFloat(liquidityDetails.pairingTokenAmount) || 0;

        if (ownAmount === 0) return "0";

        return (pairingAmount / ownAmount).toFixed(6);
    };

    const areDepositsComplete = () => {
        if (liquidityDetails.pairingToken === "EGLD") {
            // For EGLD pairing, we only need the own token deposit
            return depositSteps.ownToken;
        }
        // For other tokens, we need both deposits
        return depositSteps.ownToken && depositSteps.pairingToken;
    };

    const expectedLpTokens = calculateExpectedLpTokens(
        liquidityDetails.ownTokenAmount,
        liquidityDetails.pairingTokenAmount
    );

    const lpFee = calculateLpFee(
        liquidityDetails.ownTokenAmount,
        liquidityDetails.pairingTokenAmount
    );

    const renderTooltip = (text: string) => {
        if (showTooltip === text) {
            return (
                <div className="absolute left-0 -top-20 z-50 p-3 bg-card/90 backdrop-blur-md border border-white/10 rounded-lg shadow-nm-lg max-w-xs text-xs">
                    {text}
                    <div className="absolute -bottom-2 left-5 w-4 h-4 bg-card/90 rotate-45 border-r border-b border-white/10"></div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="wizard-container min-h-[25rem] relative">
            {/* Progress indicators */}
            <div className="wizard-steps flex items-center justify-center mb-8">
                {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
                    <div
                        key={stepNumber}
                        className={`relative flex items-center ${
                            stepNumber < 6 ? "flex-1" : ""
                        }`}
                    >
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                step >= stepNumber
                                    ? "bg-nm-accent-gradient text-white shadow-nm-md"
                                    : "bg-white/20 text-muted-foreground/50 shadow-nm-inner-soft"
                            }`}
                        >
                            {step > stepNumber ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <span>{stepNumber}</span>
                            )}
                        </div>

                        {stepNumber < 6 && (
                            <div
                                className={`h-0.5 flex-1 mx-1 transition-all duration-300 ${
                                    step > stepNumber
                                        ? "bg-gradient-to-r from-accent-aurora-green to-accent-glow-cyan shadow-nm-sm"
                                        : "bg-white/10"
                                }`}
                            ></div>
                        )}

                        {stepNumber === step && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary whitespace-nowrap">
                                {stepNumber === 1 && "Select Tokens"}
                                {stepNumber === 2 && "Set Amounts"}
                                {stepNumber === 3 && "Understand Risks"}
                                {stepNumber === 4 && "Deposit Tokens"}
                                {stepNumber === 5 && "Processing"}
                                {stepNumber === 6 && "Success!"}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Choose Pairing Token */}
            {step === 1 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Select Tokens for Liquidity Pool
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        You're about to create a new liquidity pool on
                        xExchange. This will make your token tradable.
                    </p>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="ownToken" className="font-medium">
                                Your Token
                            </Label>
                            <Select
                                value={liquidityDetails.ownToken}
                                onValueChange={(value) =>
                                    handleSelectChange("ownToken", value)
                                }
                            >
                                <SelectTrigger id="ownToken" className="w-full">
                                    <SelectValue placeholder="Select your token" />
                                </SelectTrigger>
                                <SelectContent className="bg-white/90 dark:bg-card/90 backdrop-blur-md">
                                    {mockUserTokens.map((token) => (
                                        <SelectItem
                                            key={token.ticker}
                                            value={token.ticker}
                                        >
                                            {token.name} ({token.ticker})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {liquidityDetails.ownToken && (
                                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                    <span className="font-medium mr-1">
                                        Your balance:
                                    </span>
                                    1,000,000 {liquidityDetails.ownToken}
                                </div>
                            )}
                        </div>

                        <div className="relative flex items-center justify-center my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative bg-background px-3">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    +
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="pairingToken"
                                className="font-medium"
                            >
                                Pair With
                            </Label>
                            <Select
                                value={liquidityDetails.pairingToken}
                                onValueChange={(value) =>
                                    handleSelectChange("pairingToken", value)
                                }
                            >
                                <SelectTrigger
                                    id="pairingToken"
                                    className="w-full"
                                >
                                    <SelectValue placeholder="Select pairing token" />
                                </SelectTrigger>
                                <SelectContent className="bg-white/90 dark:bg-card/90 backdrop-blur-md">
                                    {pairingTokens.map((token) => (
                                        <SelectItem
                                            key={token.ticker}
                                            value={token.ticker}
                                        >
                                            {token.name} ({token.ticker})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="text-xs text-muted-foreground mt-1 flex items-center">
                                <span className="font-medium mr-1">
                                    Your balance:
                                </span>
                                {liquidityDetails.pairingToken === "EGLD"
                                    ? "10.5"
                                    : "5,000"}{" "}
                                {liquidityDetails.pairingToken}
                            </div>
                        </div>

                        {liquidityDetails.ownToken &&
                            liquidityDetails.pairingToken && (
                                <Card className="mt-4 bg-gradient-to-br from-white/70 to-white/30 dark:from-card/70 dark:to-card/30 border-white/20">
                                    <CardContent className="p-4 text-center">
                                        <p className="font-medium">
                                            You are creating a new trading pair:
                                        </p>
                                        <p className="text-lg font-bold">
                                            {liquidityDetails.ownToken} /{" "}
                                            {liquidityDetails.pairingToken}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                    </div>

                    <div className="wizard-navigation">
                        <Button
                            variant="outline"
                            onClick={() => onComplete && onComplete()}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleNextStep} className="group">
                            <span>Next: Set Amounts & Price</span>
                            <ArrowRight className="ms-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Set Initial Amounts & Price */}
            {step === 2 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Define Pool Amounts & Starting Price
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        Specify the initial amounts of each token you wish to
                        contribute to the pool. The ratio of these amounts will
                        determine the starting price of your token on xExchange.
                    </p>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="ownTokenAmount"
                                    className="font-medium"
                                >
                                    Amount of {liquidityDetails.ownToken} to
                                    Pool
                                </Label>
                                <button
                                    className="text-xs text-primary font-medium hover:text-primary/80"
                                    onClick={() =>
                                        setLiquidityDetails((prev) => ({
                                            ...prev,
                                            ownTokenAmount: "1000000",
                                        }))
                                    }
                                >
                                    Max
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="ownTokenAmount"
                                    name="ownTokenAmount"
                                    type="number"
                                    placeholder="0.0"
                                    value={liquidityDetails.ownTokenAmount}
                                    onChange={handleInputChange}
                                    className="pr-16"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-muted-foreground">
                                        {liquidityDetails.ownToken}
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                ~$10,000.00
                            </div>
                        </div>

                        <div className="relative flex items-center justify-center my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative bg-background px-3">
                                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                    +
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pairingTokenAmount"
                                    className="font-medium"
                                >
                                    Amount of {liquidityDetails.pairingToken} to
                                    Pool
                                </Label>
                                <button
                                    className="text-xs text-primary font-medium hover:text-primary/80"
                                    onClick={() =>
                                        setLiquidityDetails((prev) => ({
                                            ...prev,
                                            pairingTokenAmount:
                                                liquidityDetails.pairingToken ===
                                                "EGLD"
                                                    ? "5"
                                                    : "2500",
                                        }))
                                    }
                                >
                                    Max
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="pairingTokenAmount"
                                    name="pairingTokenAmount"
                                    type="number"
                                    placeholder="0.0"
                                    value={liquidityDetails.pairingTokenAmount}
                                    onChange={handleInputChange}
                                    className="pr-16"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-sm text-muted-foreground">
                                        {liquidityDetails.pairingToken}
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                ~$10,000.00
                            </div>
                        </div>

                        <Card className="mt-6 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-4 bg-gradient-to-r from-accent/5 to-primary/5 border-b border-white/10">
                                    <h4 className="font-medium mb-1">
                                        Initial Price Preview
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        Based on your provided amounts
                                    </p>
                                </div>
                                <div className="p-5 text-center">
                                    <p className="text-2xl font-bold mb-2">
                                        1 {liquidityDetails.ownToken} ={" "}
                                        {calculateInitialPrice()}{" "}
                                        {liquidityDetails.pairingToken}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {liquidityDetails.pairingToken ===
                                            "EGLD" &&
                                            `~$${(
                                                parseFloat(
                                                    calculateInitialPrice()
                                                ) * 2000
                                            ).toFixed(2)} USD`}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="wizard-navigation">
                        <Button variant="outline" onClick={handlePreviousStep}>
                            <ArrowLeft className="mr-1" />
                            <span>Back</span>
                        </Button>
                        <Button onClick={handleNextStep} className="group">
                            <span>Next: Understand Risks</span>
                            <ArrowRight className="ms-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Understand Liquidity Provision & Risks */}
            {step === 3 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Liquidity Pools & LP Tokens Explained
                    </h3>
                    <p className="wizard-subtitle mb-4">
                        Please read this important information about providing
                        liquidity.
                    </p>

                    <Card className="mb-6">
                        <CardContent className="p-5 space-y-4">
                            <div>
                                <h4 className="font-medium mb-2 text-primary">
                                    What you are doing:
                                </h4>
                                <p className="text-sm">
                                    By depositing your tokens, you're creating a
                                    new liquidity pool. This allows others to
                                    trade your token against{" "}
                                    {liquidityDetails.pairingToken} on
                                    xExchange.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 text-primary">
                                    What you receive:
                                </h4>
                                <p className="text-sm">
                                    In return for providing liquidity, you'll
                                    receive LP (Liquidity Provider) Tokens.
                                    These LP tokens represent your 100% share of
                                    this new pool (since you're the first). They
                                    can typically earn trading fees generated by
                                    the pool and can be redeemed later to get
                                    your underlying tokens back (though amounts
                                    may vary).
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 text-warning-600">
                                    Key Risks (Impermanent Loss):
                                </h4>
                                <p className="text-sm">
                                    Providing liquidity involves risks. The
                                    value of your deposited tokens can change
                                    relative to holding them separately, a
                                    concept known as Impermanent Loss. This
                                    means you might withdraw a different ratio
                                    of tokens than you deposited, potentially
                                    resulting in a lower overall USD value
                                    compared to just holding the original
                                    tokens. This risk is higher with volatile
                                    tokens.
                                </p>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto flex items-center text-xs mt-2 text-primary"
                                >
                                    <span>
                                        Learn more about Impermanent Loss
                                    </span>
                                    <ExternalLink className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5 mb-6">
                        <div className="flex items-center space-x-3">
                            <div>
                                <Coins className="h-10 w-10 text-accent-glow-cyan" />
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    Estimated LP Tokens:
                                </h4>
                                <p className="text-2xl font-bold">
                                    {expectedLpTokens.toLocaleString()} LP
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-warning-50/10 border border-warning-500/20 rounded-lg">
                        <Checkbox
                            id="acceptRisks"
                            checked={risksAccepted}
                            onCheckedChange={(checked) =>
                                setRisksAccepted(!!checked)
                            }
                        />
                        <Label
                            htmlFor="acceptRisks"
                            className="text-sm cursor-pointer"
                        >
                            I acknowledge that I have read and understood the
                            risks of providing liquidity, including the
                            potential for Impermanent Loss.
                        </Label>
                    </div>

                    <div className="wizard-navigation">
                        <Button variant="outline" onClick={handlePreviousStep}>
                            <ArrowLeft className="mr-1" />
                            <span>Back</span>
                        </Button>
                        <Button
                            onClick={handleNextStep}
                            disabled={!risksAccepted}
                            className="group"
                        >
                            <span>Next: Deposit Tokens</span>
                            <ArrowRight className="ms-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 4: Deposit Tokens & Review */}
            {step === 4 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Prepare Your Tokens for Pooling
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        To create the pool, you first need to deposit your
                        specified token amounts into the xExchange smart
                        contract. These actions require separate wallet
                        confirmations.
                    </p>

                    <div className="space-y-4 mb-6">
                        <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm mr-3">
                                        1
                                    </div>
                                    <div>
                                        <h4 className="font-medium">
                                            Deposit{" "}
                                            {liquidityDetails.ownTokenAmount}{" "}
                                            {liquidityDetails.ownToken}
                                        </h4>
                                    </div>
                                </div>

                                {depositSteps.ownToken ? (
                                    <div className="text-accent-aurora-green font-medium flex items-center">
                                        <CheckCircle className="mr-1 h-4 w-4" />
                                        <span>Deposited</span>
                                    </div>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handleDeposit("ownToken")
                                        }
                                        size="sm"
                                    >
                                        Deposit {liquidityDetails.ownToken}
                                    </Button>
                                )}
                            </div>
                        </div>

                        {liquidityDetails.pairingToken !== "EGLD" && (
                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm mr-3">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium">
                                                Deposit{" "}
                                                {
                                                    liquidityDetails.pairingTokenAmount
                                                }{" "}
                                                {liquidityDetails.pairingToken}
                                            </h4>
                                        </div>
                                    </div>

                                    {depositSteps.pairingToken ? (
                                        <div className="text-accent-aurora-green font-medium flex items-center">
                                            <CheckCircle className="mr-1 h-4 w-4" />
                                            <span>Deposited</span>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                handleDeposit("pairingToken")
                                            }
                                            size="sm"
                                        >
                                            Deposit{" "}
                                            {liquidityDetails.pairingToken}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <Card className="mb-6">
                        <CardContent className="p-0">
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Creating Pool
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {liquidityDetails.ownToken} /{" "}
                                        {liquidityDetails.pairingToken}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-start">
                                    <div className="text-sm text-muted-foreground">
                                        You are Depositing
                                    </div>
                                    <div className="col-span-2 space-y-1">
                                        <div className="font-medium">
                                            {liquidityDetails.ownTokenAmount}{" "}
                                            {liquidityDetails.ownToken}
                                        </div>
                                        <div className="font-medium">
                                            {
                                                liquidityDetails.pairingTokenAmount
                                            }{" "}
                                            {liquidityDetails.pairingToken}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Initial Price
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        1 {liquidityDetails.ownToken} ={" "}
                                        {calculateInitialPrice()}{" "}
                                        {liquidityDetails.pairingToken}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Estimated LP Tokens
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {expectedLpTokens.toLocaleString()} LP
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Platform Fee
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {lpFee.toLocaleString()} LP (0.1%)
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5 border-t border-white/10">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Estimated Gas
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        ~0.0015 EGLD
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="wizard-navigation">
                        <Button variant="outline" onClick={handlePreviousStep}>
                            <ArrowLeft className="mr-1" />
                            <span>Back</span>
                        </Button>
                        <Button
                            onClick={handleAddLiquidity}
                            disabled={!areDepositsComplete()}
                            className="group"
                        >
                            <span>Create Pool & Add Liquidity</span>
                            <Plus className="ms-1 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 5: Processing */}
            {step === 5 && (
                <div className="wizard-step animate-fade-in flex flex-col items-center justify-center min-h-[25rem]">
                    <Loader className="animate-spin mb-4 text-primary h-10 w-10" />
                    <h3 className="text-xl font-semibold mb-2">
                        Creating Liquidity Pool
                    </h3>
                    <p className="text-center text-muted-foreground mb-4">
                        Please confirm the transaction in your connected wallet
                        to create the pool and add liquidity.
                    </p>
                    <p className="text-sm text-center max-w-sm">
                        This transaction will finalize the creation of your
                        liquidity pool on xExchange.
                        {liquidityDetails.pairingToken === "EGLD" &&
                            " Your EGLD will be sent with this transaction."}
                    </p>
                </div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
                <div className="wizard-step animate-fade-in">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-aurora-green to-accent-glow-cyan flex items-center justify-center mb-4 shadow-nm-md">
                            <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-1">
                            Success!
                        </h3>
                        <p className="text-lg text-center">
                            Your{" "}
                            <span className="font-medium">
                                {liquidityDetails.ownToken} /{" "}
                                {liquidityDetails.pairingToken}
                            </span>{" "}
                            liquidity pool has been successfully created and
                            funded on xExchange. Your token is now tradable!
                        </p>
                    </div>

                    <Card className="mb-6 overflow-hidden">
                        <div className="border-b border-white/5">
                            <div className="p-4 grid grid-cols-3 items-center">
                                <div className="text-sm text-muted-foreground">
                                    LP Tokens Received
                                </div>
                                <div className="col-span-2 font-medium">
                                    {(
                                        expectedLpTokens - lpFee
                                    ).toLocaleString()}{" "}
                                    LP
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-white/5">
                            <div className="p-4 grid grid-cols-3 items-center">
                                <div className="text-sm text-muted-foreground">
                                    LP Token Identifier
                                </div>
                                <div className="col-span-2 font-medium">
                                    <code className="bg-muted/30 px-2 py-1 rounded text-sm font-mono">
                                        EGLDMAT-abcd12
                                    </code>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground">
                                These LP tokens represent your share of the
                                liquidity pool. You can use them to withdraw
                                your liquidity in the future.
                            </p>
                        </div>
                    </Card>

                    <div className="flex flex-col space-y-3">
                        <Button
                            variant="default"
                            className="justify-center py-6"
                        >
                            View Pool on xExchange
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => onComplete && onComplete()}
                            className="justify-center"
                        >
                            Go to My Token Dashboard
                        </Button>

                        <Button variant="ghost" className="justify-center">
                            Manage Liquidity on xExchange
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiquidityProvisionWizard;
