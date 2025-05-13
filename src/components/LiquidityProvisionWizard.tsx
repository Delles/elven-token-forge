// src/components/LiquidityProvisionWizard.tsx
import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
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
    HelpCircle,
    PackageCheck,
    Settings2,
    Eye,
    Star,
    ShieldAlert,
    GitCompareArrows,
    TrendingUp,
    TrendingDown,
    Package,
    AlertTriangle,
    BarChartHorizontalBig,
    LayoutDashboard,
} from "lucide-react";
import {
    WizardLayout,
    WizardStep as LayoutStepInterface,
} from "./WizardLayout";
import {
    calculateLpFee,
    calculateExpectedLpTokens,
} from "../utils/feeCalculations";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
const mockUserTokens = [
    { name: "My Awesome Token", ticker: "MAT" },
    { name: "Example Token", ticker: "EXT" },
];
const pairingTokensList = [
    { name: "MultiversX EGLD", ticker: "EGLD" },
    { name: "USD Coin", ticker: "USDC" },
]; // Renamed to avoid conflict

const lpGuidanceContentData: Record<
    string,
    {
        title: string;
        details: React.ReactNode;
        warning?: string;
        analogy?: React.ReactNode;
    }
> = {
    // Renamed
    default: {
        title: "Understanding Liquidity Provision",
        details:
            "When you provide liquidity, you deposit a pair of tokens into a pool. In return, you receive LP (Liquidity Provider) tokens representing your share of that pool. You earn trading fees, but be aware of Impermanent Loss.",
    },
    impermanentLoss: {
        title: "Impermanent Loss (IL) Explained",
        details: (
            <>
                <p className="mb-1 sm:mb-2">
                    Impermanent Loss occurs when the price of your deposited
                    assets changes compared to when you deposited them. The
                    bigger the divergence in price between the two assets, the
                    higher the IL.
                </p>
                <p className="mb-1 sm:mb-2">
                    <strong>
                        It's 'impermanent' because if prices return to their
                        original ratio, the loss disappears.
                    </strong>{" "}
                    However, if you withdraw when prices are different, the loss
                    becomes permanent.
                </p>
                <p>
                    You earn trading fees, which can offset IL. The key is
                    whether fees earned &gt; IL incurred.
                </p>
            </>
        ),
        analogy: (
            <div className="mt-2 sm:mt-3 border-t border-border/10 pt-2 sm:pt-3">
                <h5 className="text-xs font-semibold mb-1 text-foreground/80">
                    Simple Analogy: A Balanced Scale
                </h5>
                <div className="flex items-center justify-around p-1.5 sm:p-2 bg-muted/30 rounded-md">
                    <div className="text-center px-1">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-aurora-green mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-xs">Token A Value Up</p>
                    </div>
                    <GitCompareArrows className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-1 sm:mx-2" />
                    <div className="text-center px-1">
                        <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-destructive mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-xs">Token B Value Down</p>
                    </div>
                </div>
                <p className="text-xs mt-1 sm:mt-1.5 text-muted-foreground">
                    Imagine your LP tokens give you a share of a scale. If Token
                    A's price rises, the pool sells some A for B to keep value
                    balanced. You end up with less of the appreciated token (A)
                    and more of the depreciated one (B) than if you just held
                    them.
                </p>
            </div>
        ),
        warning:
            "IL is a complex risk in DeFi. Research thoroughly before providing liquidity, especially with volatile assets.",
    },
    deposits: {
        title: "Token Deposit Process",
        details:
            "For non-EGLD tokens, you'll first need to approve the xExchange smart contract to spend your tokens, then deposit them. EGLD is sent directly with the final 'Add Liquidity' transaction. Each approval and deposit might require a separate wallet confirmation.",
    },
};

const LiquidityProvisionWizard = ({
    onComplete,
}: {
    onComplete?: () => void;
}) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [liquidityDetails, setLiquidityDetails] = useState<LiquidityDetails>(
        initialLiquidityDetails
    );
    const [isProcessing, setIsProcessing] = useState(false);
    const [risksAccepted, setRisksAccepted] = useState(false);
    const [depositSteps, setDepositSteps] = useState({
        ownToken: false,
        pairingToken: false,
    });
    const [activeGuidanceKey, setActiveGuidanceKey] =
        useState<string>("default");

    const wizardSteps: LayoutStepInterface[] = useMemo(
        () => [
            {
                id: "selectTokens",
                title: "Select Tokens",
                icon: Package,
                isCompleted: currentStep > 1,
                isCurrent: currentStep === 1,
                isDisabled: false,
            },
            {
                id: "setAmounts",
                title: "Set Amounts",
                icon: Settings2,
                isCompleted: currentStep > 2,
                isCurrent: currentStep === 2,
                isDisabled: currentStep < 2,
            },
            {
                id: "risks",
                title: "Understand Risks",
                icon: ShieldAlert,
                isCompleted: currentStep > 3,
                isCurrent: currentStep === 3,
                isDisabled: currentStep < 3,
            },
            {
                id: "deposit",
                title: "Deposit Tokens",
                icon: Coins,
                isCompleted: currentStep > 4,
                isCurrent: currentStep === 4,
                isDisabled: currentStep < 4,
            },
            {
                id: "processing",
                title: "Processing",
                icon: Loader,
                isCompleted: currentStep > 5,
                isCurrent: currentStep === 5,
                isDisabled: true,
            },
            {
                id: "success",
                title: "Success!",
                icon: Star,
                isCompleted: currentStep === 6,
                isCurrent: currentStep === 6,
                isDisabled: true,
            },
        ],
        [currentStep]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const processedValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers and dot
        setLiquidityDetails((prev) => ({ ...prev, [name]: processedValue }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setLiquidityDetails((prev) => ({ ...prev, [name]: value }));
        setActiveGuidanceKey("default");
    };

    const calculateInitialPrice = useCallback(() => {
        const ownAmount = parseFloat(liquidityDetails.ownTokenAmount) || 0;
        const pairingAmount =
            parseFloat(liquidityDetails.pairingTokenAmount) || 0;
        if (ownAmount === 0 || pairingAmount === 0) return "0.000000";
        return (pairingAmount / ownAmount).toFixed(6);
    }, [liquidityDetails.ownTokenAmount, liquidityDetails.pairingTokenAmount]);

    const { expectedLpTokens, lpFee } = useMemo(() => {
        const tokens = calculateExpectedLpTokens(
            liquidityDetails.ownTokenAmount,
            liquidityDetails.pairingTokenAmount
        );
        const fee = calculateLpFee(
            liquidityDetails.ownTokenAmount,
            liquidityDetails.pairingTokenAmount
        );
        return { expectedLpTokens: tokens, lpFee: fee };
    }, [liquidityDetails.ownTokenAmount, liquidityDetails.pairingTokenAmount]);

    const handleNextStep = useCallback(() => {
        if (currentStep === 1) {
            if (!liquidityDetails.ownToken) {
                toast.error("Please select your token.");
                return;
            }
            if (!liquidityDetails.pairingToken) {
                toast.error("Please select the token to pair with.");
                return;
            }
            setCurrentStep(2);
            setActiveGuidanceKey("default");
        } else if (currentStep === 2) {
            if (
                !liquidityDetails.ownTokenAmount ||
                parseFloat(liquidityDetails.ownTokenAmount) <= 0
            ) {
                toast.error(
                    `Please enter a valid amount for ${liquidityDetails.ownToken}.`
                );
                return;
            }
            if (
                !liquidityDetails.pairingTokenAmount ||
                parseFloat(liquidityDetails.pairingTokenAmount) <= 0
            ) {
                toast.error(
                    `Please enter a valid amount for ${liquidityDetails.pairingToken}.`
                );
                return;
            }
            setCurrentStep(3);
            setActiveGuidanceKey("impermanentLoss");
        } else if (currentStep === 3) {
            if (!risksAccepted) {
                toast.error(
                    "Please acknowledge the risks associated with providing liquidity."
                );
                return;
            }
            setCurrentStep(4);
            setActiveGuidanceKey("deposits");
        } else if (currentStep === 4) {
            const depositsDone =
                liquidityDetails.pairingToken === "EGLD"
                    ? depositSteps.ownToken
                    : depositSteps.ownToken && depositSteps.pairingToken;
            if (!depositsDone) {
                toast.error(
                    "Please complete all required token deposits before proceeding."
                );
                return;
            }
            setCurrentStep(5);
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(6);
            }, 2000);
        }
    }, [currentStep, liquidityDetails, risksAccepted, depositSteps]);

    const handlePreviousStep = useCallback(() => {
        if (currentStep > 1 && currentStep < 5) {
            setCurrentStep(currentStep - 1);
            if (currentStep - 1 === 3) setActiveGuidanceKey("impermanentLoss");
            else if (currentStep - 1 === 4) setActiveGuidanceKey("deposits");
            else setActiveGuidanceKey("default");
        }
    }, [currentStep]);

    const handleDeposit = useCallback(
        (tokenType: "ownToken" | "pairingToken") => {
            const tokenName =
                tokenType === "ownToken"
                    ? liquidityDetails.ownToken
                    : liquidityDetails.pairingToken;
            toast.info(`Simulating deposit for ${tokenName}...`);
            setTimeout(() => {
                setDepositSteps((prev) => ({ ...prev, [tokenType]: true }));
                toast.success(`${tokenName} deposit confirmed (mock).`);
            }, 1500);
        },
        [liquidityDetails.ownToken, liquidityDetails.pairingToken]
    );

    const currentGuidance =
        lpGuidanceContentData[activeGuidanceKey] ||
        lpGuidanceContentData.default;

    return (
        <WizardLayout
            steps={wizardSteps}
            title="Provide Liquidity Wizard"
            description="Add liquidity to xExchange for your token."
            currentStepTitle={wizardSteps.find((s) => s.isCurrent)?.title || ""}
        >
            <div className="flex-grow flex flex-col">
                {" "}
                {/* Ensure content area takes up space */}
                <div className="flex-grow">
                    {currentStep === 1 && (
                        <div className="animate-scale-fade-in">
                            <StepHeader
                                title="Choose Your Liquidity Pair"
                                description="Select your token and the asset you want to pair it with."
                            />
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-3/5 space-y-4 sm:space-y-5 neo-panel p-4 sm:p-6">
                                    <FormField
                                        id="ownToken"
                                        label="Your Token *"
                                    >
                                        <Select
                                            value={liquidityDetails.ownToken}
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "ownToken",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your token" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {mockUserTokens.map((t) => (
                                                    <SelectItem
                                                        key={t.ticker}
                                                        value={t.ticker}
                                                    >
                                                        {t.name} ({t.ticker})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            The token you created or manage.
                                        </FormDescription>
                                    </FormField>
                                    <FormField
                                        id="pairingToken"
                                        label="Pair With *"
                                    >
                                        <Select
                                            value={
                                                liquidityDetails.pairingToken
                                            }
                                            onValueChange={(value) =>
                                                handleSelectChange(
                                                    "pairingToken",
                                                    value
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select pairing token" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {pairingTokensList.map((t) => (
                                                    <SelectItem
                                                        key={t.ticker}
                                                        value={t.ticker}
                                                    >
                                                        {t.name} ({t.ticker})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Typically EGLD or a stablecoin like
                                            USDC.
                                        </FormDescription>
                                    </FormField>
                                    {liquidityDetails.ownToken &&
                                        liquidityDetails.pairingToken && (
                                            <Card className="bg-primary/5 border-primary/20 mt-4">
                                                <CardContent className="p-3 sm:p-4 text-center">
                                                    <p className="font-medium text-primary text-sm sm:text-base">
                                                        Creating Pair:
                                                    </p>
                                                    <p className="text-md sm:text-lg font-bold text-foreground">
                                                        {
                                                            liquidityDetails.ownToken
                                                        }{" "}
                                                        /{" "}
                                                        {
                                                            liquidityDetails.pairingToken
                                                        }
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        )}
                                </div>
                                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                                    <GuidancePanelLP
                                        content={currentGuidance}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-scale-fade-in">
                            <StepHeader
                                title="Define Pool Contribution"
                                description="Enter the amounts for each token. This ratio sets the initial price."
                            />
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-3/5 space-y-4 sm:space-y-5 neo-panel p-4 sm:p-6">
                                    <FormField
                                        id="ownTokenAmount"
                                        label={`Amount of ${liquidityDetails.ownToken} *`}
                                    >
                                        <Input
                                            name="ownTokenAmount"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0.0"
                                            value={
                                                liquidityDetails.ownTokenAmount
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </FormField>
                                    <FormField
                                        id="pairingTokenAmount"
                                        label={`Amount of ${liquidityDetails.pairingToken} *`}
                                    >
                                        <Input
                                            name="pairingTokenAmount"
                                            type="text"
                                            inputMode="decimal"
                                            placeholder="0.0"
                                            value={
                                                liquidityDetails.pairingTokenAmount
                                            }
                                            onChange={handleInputChange}
                                        />
                                    </FormField>
                                    <Card className="bg-primary/5 border-primary/20 mt-4">
                                        <CardHeader className="pb-1 sm:pb-2 pt-3 px-3 sm:pt-4 sm:px-4">
                                            <CardTitle className="text-sm sm:text-base text-primary">
                                                Initial Price Preview
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3 sm:p-4">
                                            <p className="text-lg sm:text-xl font-bold text-foreground text-center">
                                                1{" "}
                                                {liquidityDetails.ownToken ||
                                                    "TOKEN"}{" "}
                                                = {calculateInitialPrice()}{" "}
                                                {liquidityDetails.pairingToken ||
                                                    "PAIR"}
                                            </p>
                                            <p className="text-xs text-muted-foreground text-center mt-1">
                                                Based on your entered amounts.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                                    <GuidancePanelLP
                                        content={currentGuidance}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-scale-fade-in">
                            <StepHeader
                                title="Understand Liquidity Risks"
                                description="Providing liquidity has benefits and risks. Please read carefully."
                            />
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-3/5 space-y-6">
                                    <div className="neo-panel p-4 sm:p-6">
                                        <h4 className="font-semibold text-md sm:text-lg mb-2 text-primary">
                                            Key Concepts:
                                        </h4>
                                        <ul className="space-y-2 sm:space-y-3 text-sm">
                                            <li>
                                                <strong>LP Tokens:</strong>{" "}
                                                You'll receive LP tokens
                                                representing your pool share.
                                            </li>
                                            <li>
                                                <strong>Trading Fees:</strong>{" "}
                                                You earn a portion of trading
                                                fees from this pair.
                                            </li>
                                            <li>
                                                <strong>
                                                    Impermanent Loss:
                                                </strong>{" "}
                                                The main risk. Read the
                                                explanation in the panel.
                                            </li>
                                        </ul>
                                        <Button
                                            variant="link"
                                            className="p-0 h-auto text-sm mt-3 text-primary hover:text-primary/80"
                                            onClick={() =>
                                                window.open(
                                                    "https://docs.xexchange.com/getting-started/understanding-impermanent-loss",
                                                    "_blank"
                                                )
                                            }
                                        >
                                            Learn more on xExchange Docs{" "}
                                            <ExternalLink className="w-3 h-3 ml-1" />
                                        </Button>
                                    </div>
                                    <div className="neo-panel p-4 bg-warning-500/5 border border-warning-500/20">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="acceptRisks"
                                                checked={risksAccepted}
                                                onCheckedChange={(checked) =>
                                                    setRisksAccepted(!!checked)
                                                }
                                                className="mt-1"
                                            />
                                            <Label
                                                htmlFor="acceptRisks"
                                                className="text-sm text-warning-700 dark:text-warning-400 cursor-pointer"
                                            >
                                                I acknowledge that I have read
                                                and understood the risks of
                                                providing liquidity, especially
                                                Impermanent Loss.
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                                    <GuidancePanelLP
                                        content={currentGuidance}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div className="animate-scale-fade-in">
                            <StepHeader
                                title="Deposit Your Tokens"
                                description="Approve and deposit tokens into the pool. Each may require a wallet transaction."
                            />
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-3/5 space-y-4">
                                    <DepositStepItem
                                        tokenName={liquidityDetails.ownToken}
                                        amount={liquidityDetails.ownTokenAmount}
                                        isDeposited={depositSteps.ownToken}
                                        onDeposit={() =>
                                            handleDeposit("ownToken")
                                        }
                                    />
                                    {liquidityDetails.pairingToken !==
                                        "EGLD" && (
                                        <DepositStepItem
                                            tokenName={
                                                liquidityDetails.pairingToken
                                            }
                                            amount={
                                                liquidityDetails.pairingTokenAmount
                                            }
                                            isDeposited={
                                                depositSteps.pairingToken
                                            }
                                            onDeposit={() =>
                                                handleDeposit("pairingToken")
                                            }
                                        />
                                    )}
                                    {liquidityDetails.pairingToken ===
                                        "EGLD" && (
                                        <div className="p-3 bg-primary/5 rounded-md text-sm text-primary flex items-start">
                                            <Info className="inline w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                            EGLD will be sent with the final
                                            "Add Liquidity" transaction, no
                                            separate deposit needed.
                                        </div>
                                    )}
                                    <Card className="neo-panel overflow-hidden mt-6">
                                        <CardHeader className="bg-muted/10 py-3 px-4 sm:py-4 sm:px-6">
                                            <CardTitle className="text-base sm:text-lg">
                                                Transaction Summary
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="divide-y divide-border/10">
                                                <ReviewItemStatic
                                                    label="Creating Pool"
                                                    value={`${liquidityDetails.ownToken} / ${liquidityDetails.pairingToken}`}
                                                />
                                                <ReviewItemStatic
                                                    label="Depositing"
                                                    value={`${Number(
                                                        liquidityDetails.ownTokenAmount
                                                    ).toLocaleString()} ${
                                                        liquidityDetails.ownToken
                                                    } + ${Number(
                                                        liquidityDetails.pairingTokenAmount
                                                    ).toLocaleString()} ${
                                                        liquidityDetails.pairingToken
                                                    }`}
                                                />
                                                <ReviewItemStatic
                                                    label="Initial Price"
                                                    value={`1 ${
                                                        liquidityDetails.ownToken
                                                    } = ${calculateInitialPrice()} ${
                                                        liquidityDetails.pairingToken
                                                    }`}
                                                />
                                                <ReviewItemStatic
                                                    label="Est. LP Tokens Received"
                                                    value={`${(
                                                        expectedLpTokens - lpFee
                                                    ).toLocaleString()} LP`}
                                                />
                                                <ReviewItemStatic
                                                    label="Platform Fee"
                                                    value={`${lpFee.toLocaleString()} LP (0.1%)`}
                                                    highlight
                                                />
                                                <ReviewItemStatic
                                                    label="Est. Gas Fee"
                                                    value="~0.0015 EGLD"
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                                    <GuidancePanelLP
                                        content={currentGuidance}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {(currentStep === 5 || currentStep === 6) && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
                            {isProcessing && currentStep === 5 && (
                                <>
                                    <Loader className="animate-spin mb-6 text-primary h-12 w-12 sm:h-16 sm:w-16" />
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                        Adding Liquidity...
                                    </h3>
                                    <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                                        Please confirm the final transaction in
                                        your wallet.
                                    </p>
                                </>
                            )}
                            {!isProcessing && currentStep === 6 && (
                                <>
                                    <div className="p-3 sm:p-4 bg-gradient-to-br from-accent-aurora-green to-accent-glow-cyan rounded-full mb-6 inline-block shadow-nm-lg">
                                        <PackageCheck className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2 gradient-text">
                                        Liquidity Added Successfully!
                                    </h3>
                                    <p className="text-muted-foreground max-w-lg mb-6 text-sm sm:text-base">
                                        Your liquidity for{" "}
                                        <span className="font-semibold text-foreground">
                                            {liquidityDetails.ownToken} /{" "}
                                            {liquidityDetails.pairingToken}
                                        </span>{" "}
                                        has been added.
                                    </p>
                                    <Card className="neo-panel p-3 sm:p-4 mb-6 text-left max-w-md w-full">
                                        <ReviewItemStatic
                                            label="LP Tokens Received"
                                            value={`${(
                                                expectedLpTokens - lpFee
                                            ).toLocaleString()} LP`}
                                        />
                                        <ReviewItemStatic
                                            label="LP Token ID (Mock)"
                                            value={`${
                                                liquidityDetails.ownToken
                                            }-${liquidityDetails.pairingToken
                                                .substring(0, 4)
                                                .toLowerCase()}-lp`}
                                        />
                                    </Card>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Button
                                            size="lg"
                                            onClick={() =>
                                                onComplete && onComplete()
                                            }
                                            className="neo-button"
                                        >
                                            <LayoutDashboard className="mr-2 h-4 w-4" />{" "}
                                            Go to Dashboard
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="neo-outline"
                                            onClick={() =>
                                                window.open(
                                                    `https://xexchange.com/pool/example-pool-id`,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            View Pool on xExchange{" "}
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {currentStep < 5 && (
                    <div className="mt-auto border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <Button
                            variant="neo-outline"
                            onClick={handlePreviousStep}
                            disabled={currentStep === 1}
                            className="w-full sm:w-auto"
                        >
                            <ArrowLeft className="mr-1.5" /> Back
                        </Button>
                        <Button
                            onClick={handleNextStep}
                            className="neo-button w-full sm:w-auto"
                            disabled={
                                (currentStep === 3 && !risksAccepted) ||
                                (currentStep === 4 &&
                                    !(liquidityDetails.pairingToken === "EGLD"
                                        ? depositSteps.ownToken
                                        : depositSteps.ownToken &&
                                          depositSteps.pairingToken)) ||
                                isProcessing
                            }
                        >
                            {currentStep === 4
                                ? "Confirm & Add Liquidity"
                                : "Next Step"}{" "}
                            <ArrowRight className="ml-1.5" />
                        </Button>
                    </div>
                )}
            </div>
        </WizardLayout>
    );
};

// Helper components (can be moved to a shared file if used elsewhere)
const StepHeader: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="text-center md:text-left mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
            {title}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
            {description}
        </p>
    </div>
);

const FormField: React.FC<{
    id: string;
    label: string;
    children: React.ReactNode;
    description?: string;
}> = ({ id, label, children, description }) => (
    <div className="space-y-1 sm:space-y-1.5">
        <Label htmlFor={id} className="font-medium text-sm">
            {label}
        </Label>
        {children}
        {description && (
            <p className="text-xs text-muted-foreground/80 pt-0.5">
                {description}
            </p>
        )}
    </div>
);

const FormDescription: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <p className="text-xs text-muted-foreground/80 pt-1">{children}</p>;

const GuidancePanelLP: React.FC<{
    content: typeof lpGuidanceContentData.default;
}> = (
    { content } // Renamed
) => (
    <div className="neo-panel p-4 sm:p-6 rounded-lg shadow-nm-lg bg-card/80">
        <div className="flex items-center mb-2 sm:mb-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 flex-shrink-0" />
            <h4 className="text-md sm:text-lg font-semibold">
                {content.title}
            </h4>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2 mb-2 sm:mb-3">
            {content.details}
        </div>
        {content.analogy && (
            <div className="text-xs sm:text-sm text-muted-foreground">
                {content.analogy}
            </div>
        )}
        {content.warning && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-2.5 bg-warning-500/10 border border-warning-500/20 rounded-md text-xs text-warning-700 dark:text-warning-400 flex items-start">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 mt-0.5 flex-shrink-0 text-warning-500" />
                {content.warning}
            </div>
        )}
    </div>
);

const DepositStepItem: React.FC<{
    tokenName: string;
    amount: string;
    isDeposited: boolean;
    onDeposit: () => void;
}> = ({ tokenName, amount, isDeposited, onDeposit }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-lg bg-muted/20 border border-border/10 gap-2 sm:gap-3">
        <div>
            <h5 className="font-medium text-sm sm:text-base">
                Deposit {Number(amount).toLocaleString()} {tokenName}
            </h5>
            <p className="text-xs text-muted-foreground">
                Approve and send your {tokenName} to the pool contract.
            </p>
        </div>
        {isDeposited ? (
            <div className="flex items-center text-accent-aurora-green font-medium text-sm shrink-0">
                <CheckCircle className="w-4 h-4 mr-1.5" /> Deposited
            </div>
        ) : (
            <Button
                onClick={onDeposit}
                size="sm"
                variant="outline"
                className="shrink-0 w-full sm:w-auto"
            >
                Deposit {tokenName}
            </Button>
        )}
    </div>
);

const ReviewItemStatic: React.FC<{
    label: string;
    value?: string | React.ReactNode;
    children?: React.ReactNode;
    highlight?: boolean;
    primary?: boolean;
}> = ({ label, value, children, highlight, primary }) => (
    <div
        className={cn(
            "p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-4 items-start text-sm",
            highlight && "bg-accent/5",
            primary && "bg-primary/5"
        )}
    >
        <div className="text-muted-foreground col-span-1">{label}</div>
        <div
            className={cn(
                "col-span-2 font-medium text-foreground break-words",
                primary && "text-primary font-semibold"
            )}
        >
            {value}
            {children}
        </div>
    </div>
);

export default LiquidityProvisionWizard;
