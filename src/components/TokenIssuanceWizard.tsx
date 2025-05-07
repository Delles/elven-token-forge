import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
    Sparkles,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    ClipboardCopy,
    Info,
    Loader,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { calculateTokenIssuanceFee } from "../utils/feeCalculations";

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
    name: "",
    ticker: "",
    supply: "",
    decimals: "18",
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canMint: true,
    canBurn: true,
    canChangeOwner: true,
    canUpgrade: true,
};

const TokenIssuanceWizard = ({ onComplete }: { onComplete?: () => void }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [tokenDetails, setTokenDetails] =
        useState<TokenDetails>(initialTokenDetails);
    const [isProcessing, setIsProcessing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTooltip, setShowTooltip] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTokenDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string, checked: boolean) => {
        setTokenDetails((prev) => ({ ...prev, [name]: checked }));
    };

    const handleNextStep = () => {
        if (step === 1) {
            if (
                !tokenDetails.name ||
                !tokenDetails.ticker ||
                !tokenDetails.supply
            ) {
                toast.error("Please fill in all required fields");
                return;
            }

            if (
                tokenDetails.ticker.length < 3 ||
                tokenDetails.ticker.length > 10
            ) {
                toast.error("Ticker must be between 3-10 characters");
                return;
            }

            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleTokenIssue = () => {
        if (!termsAccepted) {
            toast.error(
                "Please acknowledge that you understand the permanent nature of some token properties"
            );
            return;
        }

        setIsProcessing(true);

        // Simulate blockchain transaction
        setTimeout(() => {
            setIsProcessing(false);
            setStep(5); // Skip to success step
        }, 2000);
    };

    const platformFee = calculateTokenIssuanceFee(tokenDetails.supply);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

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
                {[1, 2, 3, 4, 5].map((stepNumber) => (
                    <div
                        key={stepNumber}
                        className={`relative flex items-center ${
                            stepNumber < 5 ? "flex-1" : ""
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

                        {stepNumber < 5 && (
                            <div
                                className={`h-0.5 flex-1 mx-1 transition-all duration-300 ${
                                    step > stepNumber
                                        ? "bg-gradient-to-r from-primary to-accent-glow-cyan shadow-nm-sm"
                                        : "bg-white/10"
                                }`}
                            ></div>
                        )}

                        {stepNumber === step && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary whitespace-nowrap">
                                {stepNumber === 1 && "Basic Information"}
                                {stepNumber === 2 && "Token Features"}
                                {stepNumber === 3 && "Review & Costs"}
                                {stepNumber === 4 && "Processing"}
                                {stepNumber === 5 && "Success!"}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: Define Basic Information */}
            {step === 1 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Basic Information
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        Let's start with the basics for your new token. This
                        information will be publicly visible on the blockchain.
                    </p>

                    <div className="space-y-5">
                        <div className="group relative">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="name" className="font-medium">
                                    Token Name *
                                </Label>
                                <button
                                    className="text-muted-foreground/70 hover:text-primary"
                                    onMouseEnter={() => setShowTooltip("name")}
                                    onMouseLeave={() => setShowTooltip("")}
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            {renderTooltip(
                                "The full name of your token (e.g., 'Bitcoin'). This will be visible on explorers and wallets."
                            )}
                            <Input
                                id="name"
                                name="name"
                                placeholder="My Awesome Project Token"
                                value={tokenDetails.name}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>

                        <div className="group relative">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="ticker" className="font-medium">
                                    Token Ticker (Symbol) *
                                </Label>
                                <button
                                    className="text-muted-foreground/70 hover:text-primary"
                                    onMouseEnter={() =>
                                        setShowTooltip("ticker")
                                    }
                                    onMouseLeave={() => setShowTooltip("")}
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            {renderTooltip(
                                "A short symbol for your token (e.g., 'BTC'). Must be unique on the MultiversX network if you intend to register it globally."
                            )}
                            <Input
                                id="ticker"
                                name="ticker"
                                placeholder="MAPT"
                                value={tokenDetails.ticker}
                                onChange={handleInputChange}
                                className="uppercase mt-1"
                                maxLength={10}
                            />
                            <p className="text-xs text-muted-foreground mt-1.5">
                                3-10 characters, uppercase letters and numbers
                                only
                            </p>
                        </div>

                        <div className="group relative">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="supply" className="font-medium">
                                    Initial Supply *
                                </Label>
                                <button
                                    className="text-muted-foreground/70 hover:text-primary"
                                    onMouseEnter={() =>
                                        setShowTooltip("supply")
                                    }
                                    onMouseLeave={() => setShowTooltip("")}
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            {renderTooltip(
                                "The total number of tokens that will exist when it's first created."
                            )}
                            <Input
                                id="supply"
                                name="supply"
                                type="number"
                                placeholder="1000000"
                                value={tokenDetails.supply}
                                onChange={handleInputChange}
                                className="mt-1"
                            />
                        </div>

                        <div className="group relative">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="decimals"
                                    className="font-medium"
                                >
                                    Number of Decimals
                                </Label>
                                <button
                                    className="text-muted-foreground/70 hover:text-primary"
                                    onMouseEnter={() =>
                                        setShowTooltip("decimals")
                                    }
                                    onMouseLeave={() => setShowTooltip("")}
                                >
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            {renderTooltip(
                                "How divisible your token will be. 18 is standard, like EGLD. E.g., with 18 decimals, 1 token can be represented as 1.000...0 (18 zeros)."
                            )}
                            <Input
                                id="decimals"
                                name="decimals"
                                type="number"
                                placeholder="18"
                                value={tokenDetails.decimals}
                                onChange={handleInputChange}
                                className="mt-1"
                                min="0"
                                max="18"
                            />
                            <p className="text-xs text-muted-foreground mt-1.5">
                                Standard is 18 (like EGLD), set to 0 for no
                                decimal places
                            </p>
                        </div>
                    </div>

                    <div className="wizard-navigation">
                        <Button
                            variant="outline"
                            onClick={() => onComplete && onComplete()}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleNextStep} className="group">
                            <span>Next: Token Capabilities</span>
                            <ArrowRight className="ms-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 2: Set Token Capabilities */}
            {step === 2 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Token Features & Permissions
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        Define the special capabilities of your token. These
                        determine what actions can be performed.{" "}
                        <span className="text-warning-600 font-medium">
                            Important:
                        </span>{" "}
                        Once set, these capabilities cannot be changed for this
                        token identifier.
                    </p>

                    <Card className="mb-6 border border-accent/10">
                        <CardContent className="p-4">
                            <label className="inline-flex items-center p-2 px-4 rounded-lg cursor-pointer bg-accent/5 hover:bg-accent/10 transition-colors w-full">
                                <Checkbox
                                    id="useDefaults"
                                    checked={true}
                                    className="mr-2"
                                />
                                <span className="font-medium">
                                    Use Recommended Defaults
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                    (Minting, Burning, Ownership Transfer,
                                    Upgrades)
                                </span>
                            </label>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Supply Management
                            </h4>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canMint"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow New Tokens to be Minted Later?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, new tokens can be
                                            created after the initial launch,
                                            increasing the total supply.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canMint"
                                        checked={tokenDetails.canMint}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canMint",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canBurn"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow Tokens to be Burned
                                            (Destroyed)?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, tokens can be
                                            permanently destroyed, reducing the
                                            token's total supply.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canBurn"
                                        checked={tokenDetails.canBurn}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canBurn",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Account & Token Control
                            </h4>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canFreeze"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow Token Freezing in Accounts?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, an address with the
                                            'freeze' role can prevent a specific
                                            account from sending or receiving
                                            this token.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canFreeze"
                                        checked={tokenDetails.canFreeze}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canFreeze",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div
                                className={`bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5 ${
                                    !tokenDetails.canFreeze ? "opacity-50" : ""
                                }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canWipe"
                                            className={`font-medium ${
                                                !tokenDetails.canFreeze
                                                    ? "cursor-not-allowed"
                                                    : "cursor-pointer"
                                            }`}
                                        >
                                            Allow Wiping Tokens from Frozen
                                            Accounts?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, an address with the
                                            'wipe' role can destroy tokens from
                                            an account that is currently frozen
                                            for this token.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canWipe"
                                        checked={
                                            tokenDetails.canWipe &&
                                            tokenDetails.canFreeze
                                        }
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canWipe",
                                                checked
                                            )
                                        }
                                        disabled={!tokenDetails.canFreeze}
                                    />
                                </div>
                            </div>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canPause"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow Pausing All Token
                                            Transactions?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, an address with the
                                            'pause' role can halt all
                                            transactions of this token across
                                            the network.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canPause"
                                        checked={tokenDetails.canPause}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canPause",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Ownership & Upgradability
                            </h4>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canChangeOwner"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow Transfer of Token Ownership?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, the current owner can
                                            transfer token ownership to another
                                            address.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canChangeOwner"
                                        checked={tokenDetails.canChangeOwner}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canChangeOwner",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="bg-card/70 shadow-nm-sm rounded-lg p-4 border border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor="canUpgrade"
                                            className="font-medium cursor-pointer"
                                        >
                                            Allow Token Contract Upgrades?
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            If enabled, the token owner can
                                            upgrade the token's properties or
                                            logic by deploying a new smart
                                            contract.
                                        </p>
                                    </div>
                                    <Switch
                                        id="canUpgrade"
                                        checked={tokenDetails.canUpgrade}
                                        onCheckedChange={(checked) =>
                                            handleSwitchChange(
                                                "canUpgrade",
                                                checked
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wizard-navigation">
                        <Button variant="outline" onClick={handlePreviousStep}>
                            <ArrowLeft className="mr-1" />
                            <span>Back</span>
                        </Button>
                        <Button onClick={handleNextStep} className="group">
                            <span>Next: Review & Costs</span>
                            <ArrowRight className="ms-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 3: Review & Costs */}
            {step === 3 && (
                <div className="wizard-step animate-fade-in">
                    <h3 className="text-xl font-semibold mb-2">
                        Review Your Token Details
                    </h3>
                    <p className="wizard-subtitle mb-6">
                        Please carefully review all your token's details and the
                        associated costs before proceeding. Some of these
                        properties are permanent once the token is issued.
                    </p>

                    <div className="grid gap-6">
                        <Card className="overflow-hidden">
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Token Name
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {tokenDetails.name || "—"}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Token Ticker
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {tokenDetails.ticker || "—"}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Initial Supply
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {Number(
                                            tokenDetails.supply
                                        ).toLocaleString() || "—"}{" "}
                                        {tokenDetails.ticker}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Decimals
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {tokenDetails.decimals || "18"}
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-white/5">
                                <div className="p-4 grid grid-cols-3 items-start">
                                    <div className="text-sm text-muted-foreground">
                                        Capabilities
                                    </div>
                                    <div className="col-span-2 flex flex-wrap gap-2">
                                        {tokenDetails.canMint && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Mintable
                                            </span>
                                        )}
                                        {tokenDetails.canBurn && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Burnable
                                            </span>
                                        )}
                                        {tokenDetails.canFreeze && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Freezable
                                            </span>
                                        )}
                                        {tokenDetails.canWipe && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Wipable
                                            </span>
                                        )}
                                        {tokenDetails.canPause && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Pausable
                                            </span>
                                        )}
                                        {tokenDetails.canChangeOwner && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Transferable Ownership
                                            </span>
                                        )}
                                        {tokenDetails.canUpgrade && (
                                            <span className="px-2 py-0.5 bg-accent/10 rounded-full text-xs font-medium">
                                                Upgradable
                                            </span>
                                        )}

                                        {!tokenDetails.canMint &&
                                            !tokenDetails.canBurn &&
                                            !tokenDetails.canFreeze &&
                                            !tokenDetails.canWipe &&
                                            !tokenDetails.canPause &&
                                            !tokenDetails.canChangeOwner &&
                                            !tokenDetails.canUpgrade && (
                                                <span className="text-muted-foreground">
                                                    No special capabilities
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Network Issuance Fee
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        5 EGLD
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Platform Fee (0.01%)
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        {platformFee.toLocaleString()}{" "}
                                        {tokenDetails.ticker}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Estimated Gas Fee
                                    </div>
                                    <div className="col-span-2 font-medium">
                                        ~0.0005 EGLD
                                    </div>
                                </div>
                            </div>
                            <div className="bg-accent/5 border-t border-white/10">
                                <div className="p-4 grid grid-cols-3 items-center">
                                    <div className="text-sm font-medium">
                                        Total Estimated Cost
                                    </div>
                                    <div className="col-span-2 font-medium text-primary">
                                        ~5.0005 EGLD
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="flex items-start space-x-3 p-4 bg-warning-50/10 border border-warning-500/20 rounded-lg">
                            <Checkbox
                                id="acceptTerms"
                                checked={termsAccepted}
                                onCheckedChange={(checked) =>
                                    setTermsAccepted(!!checked)
                                }
                            />
                            <Label
                                htmlFor="acceptTerms"
                                className="text-sm cursor-pointer"
                            >
                                I understand that the Token Ticker and the
                                selected Capabilities (e.g., minting, freezing)
                                are set permanently during issuance and cannot
                                be changed later for this token identifier.
                            </Label>
                        </div>
                    </div>

                    <div className="wizard-navigation">
                        <Button variant="outline" onClick={handlePreviousStep}>
                            <ArrowLeft className="mr-1" />
                            <span>Back</span>
                        </Button>
                        <Button
                            onClick={handleTokenIssue}
                            disabled={!termsAccepted}
                            className="relative group"
                        >
                            <span>Issue Token</span>
                            <Sparkles className="ms-1.5 w-4 h-4 group-hover:text-yellow-200 transition-colors" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Step 4: Processing */}
            {step === 4 && (
                <div className="wizard-step animate-fade-in flex flex-col items-center justify-center min-h-[25rem]">
                    <Loader className="animate-spin mb-4 text-primary h-10 w-10" />
                    <h3 className="text-xl font-semibold mb-2">
                        Issuing Your Token
                    </h3>
                    <p className="text-center text-muted-foreground mb-4">
                        Please confirm the transaction in your connected wallet
                        to issue your token.
                    </p>
                </div>
            )}

            {/* Step 5: Success */}
            {step === 5 && (
                <div className="wizard-step animate-fade-in">
                    <div className="flex flex-col items-center justify-center mb-8">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-glow-cyan to-accent-aurora-green flex items-center justify-center mb-4 shadow-nm-md">
                            <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-1">
                            Congratulations!
                        </h3>
                        <p className="text-lg text-center">
                            Your token,{" "}
                            <span className="font-medium">
                                {tokenDetails.name} ({tokenDetails.ticker})
                            </span>
                            , has been successfully issued on the MultiversX
                            network!
                        </p>
                    </div>

                    <Card className="mb-6 overflow-hidden">
                        <div className="border-b border-white/5">
                            <div className="p-4 grid grid-cols-3 gap-2 items-center">
                                <div className="text-sm text-muted-foreground">
                                    Token Identifier
                                </div>
                                <div className="col-span-2 flex items-center">
                                    <code className="bg-muted/30 px-2 py-1 rounded text-sm font-mono mr-2">
                                        {tokenDetails.ticker}-abcd12
                                    </code>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8"
                                        onClick={() =>
                                            copyToClipboard(
                                                `${tokenDetails.ticker}-abcd12`
                                            )
                                        }
                                    >
                                        <ClipboardCopy className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm">
                                <strong>Your Initial Roles:</strong> As the
                                creator, you have initially been assigned all
                                enabled special roles (e.g., Minting, Burning,
                                etc.). You can manage and transfer these roles
                                from the Token Dashboard.
                            </p>
                        </div>
                    </Card>

                    <div className="flex flex-col space-y-3">
                        <Button
                            onClick={() => onComplete && onComplete()}
                            className="justify-center py-6"
                        >
                            Go to My Token Dashboard
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() =>
                                navigate && navigate("/provide-liquidity")
                            }
                            className="justify-center"
                        >
                            Add Initial Liquidity on xExchange
                        </Button>

                        <Button variant="ghost" className="justify-center">
                            View Token on MultiversX Explorer
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TokenIssuanceWizard;
