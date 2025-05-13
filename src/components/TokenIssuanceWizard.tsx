// src/components/TokenIssuanceWizard.tsx
import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Info,
    Loader,
    FileJson,
    Settings2,
    Eye,
    Star,
    Lock,
    HelpCircle,
    PackageCheck,
    LayoutDashboard,
    Droplets,
    Zap,
    ShieldQuestion,
    Coins,
    FileText,
    Users,
    Code2,
    CircleDollarSign,
    Palette,
    BarChartHorizontalBig,
} from "lucide-react";
import {
    WizardLayout,
    WizardStep as LayoutStepInterface,
} from "@/components/WizardLayout";
import { calculateTokenIssuanceFee } from "../utils/feeCalculations";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TokenDetails = {
    name: string;
    ticker: string;
    supply: string;
    decimals: string;
    canMint: boolean;
    canBurn: boolean;
    canFreeze: boolean;
    canWipe: boolean;
    canPause: boolean;
    canChangeOwner: boolean;
    canUpgrade: boolean;
    canAddSpecialRoles: boolean;
};

const initialTokenDetails: TokenDetails = {
    name: "",
    ticker: "",
    supply: "1000000",
    decimals: "18",
    canMint: true,
    canBurn: true,
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canChangeOwner: true,
    canUpgrade: true,
    canAddSpecialRoles: true,
};

const recommendedDefaults: Partial<TokenDetails> = {
    canMint: true,
    canBurn: true,
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canChangeOwner: true,
    canUpgrade: true,
    canAddSpecialRoles: true,
};

interface CapabilityCardProps {
    id: keyof TokenDetails;
    title: string;
    description: string;
    icon: React.ElementType;
    isPermanent?: boolean;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    onHover: () => void;
    onLeave: () => void;
    disabled?: boolean;
    dependencyMet?: boolean;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({
    id,
    title,
    description,
    icon: Icon,
    isPermanent,
    checked,
    onCheckedChange,
    onHover,
    onLeave,
    disabled,
    dependencyMet = true,
}) => (
    <div
        className={cn(
            "neo-panel p-3 sm:p-4 rounded-lg transition-all duration-200 hover:shadow-nm-lg relative",
            checked && dependencyMet
                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                : "border-border/20",
            disabled || !dependencyMet
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={() =>
            !(disabled || !dependencyMet) && onCheckedChange(!checked)
        }
    >
        <div className="flex items-start space-x-3">
            <div
                className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center flex-shrink-0 shadow-inner",
                    checked && dependencyMet
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/50 text-muted-foreground"
                )}
            >
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor={id}
                        className={cn(
                            "font-semibold text-sm",
                            disabled || !dependencyMet
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        )}
                    >
                        {title}
                    </Label>
                    <Switch
                        id={id}
                        checked={checked && dependencyMet}
                        onCheckedChange={onCheckedChange}
                        disabled={disabled || !dependencyMet}
                        className="ml-auto"
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
                {isPermanent && (
                    <Badge
                        variant="outline"
                        className="mt-2 text-xs py-0.5 px-1.5 border-destructive/30 text-destructive/80"
                    >
                        <Lock className="w-2.5 h-2.5 mr-1" /> Permanent
                    </Badge>
                )}
                {!dependencyMet && (
                    <Badge
                        variant="destructive"
                        className="mt-2 text-xs py-0.5 px-1.5"
                    >
                        Requires 'Can Freeze'
                    </Badge>
                )}
            </div>
        </div>
    </div>
);

const capabilitiesConfig = [
    {
        group: "Supply Management",
        items: [
            {
                id: "canMint" as keyof TokenDetails,
                title: "Allow Minting",
                description: "Create new tokens after initial supply.",
                icon: Coins,
                isPermanent: true,
            },
            {
                id: "canBurn" as keyof TokenDetails,
                title: "Allow Burning",
                description: "Permanently destroy tokens from supply.",
                icon: FileText,
                isPermanent: true,
            },
        ],
    },
    {
        group: "Account & Token Control",
        items: [
            {
                id: "canFreeze" as keyof TokenDetails,
                title: "Allow Freezing",
                description: "Prevent specific accounts from transacting.",
                icon: Users,
                isPermanent: true,
            },
            {
                id: "canWipe" as keyof TokenDetails,
                title: "Allow Wiping",
                description: "Destroy tokens from a frozen account.",
                icon: Code2,
                isPermanent: true,
                dependsOn: "canFreeze",
            },
            {
                id: "canPause" as keyof TokenDetails,
                title: "Allow Pausing",
                description: "Halt all token transactions network-wide.",
                icon: CircleDollarSign,
                isPermanent: true,
            },
        ],
    },
    {
        group: "Ownership & Upgradability",
        items: [
            {
                id: "canChangeOwner" as keyof TokenDetails,
                title: "Allow Ownership Transfer",
                description: "Transfer token management rights.",
                icon: Palette,
                isPermanent: true,
            },
            {
                id: "canUpgrade" as keyof TokenDetails,
                title: "Allow Contract Upgrade",
                description: "Upgrade token's smart contract logic.",
                icon: Zap,
                isPermanent: true,
            },
            {
                id: "canAddSpecialRoles" as keyof TokenDetails,
                title: "Allow Role Assignment",
                description: "Assign special roles (e.g., minter, freezer).",
                icon: ShieldQuestion,
                isPermanent: true,
            },
        ],
    },
];

const guidanceContentData: Record<
    string,
    {
        title: string;
        details: string;
        pros?: string[];
        cons?: string[];
        warning?: string;
    }
> = {
    default: {
        title: "Understanding Token Capabilities",
        details:
            "Token capabilities define the special actions that can be performed with your token. These are set on the blockchain when your token is issued. Some are permanent and cannot be changed later.",
        warning:
            "Choose wisely, as permanent capabilities define your token's fundamental nature.",
    },
    canMint: {
        title: "Capability: Allow Minting",
        details:
            "Enables the creation of new tokens after the initial supply is set. This increases the total supply of your token.",
        pros: [
            "Allows for inflation to fund development or rewards.",
            "Can be used for staking rewards or vesting schedules.",
        ],
        cons: [
            "Can dilute existing token holders if not managed carefully.",
            "Requires trust in the minting authority.",
        ],
        warning:
            "This capability is permanent. If disabled, you can never mint more tokens.",
    },
    canBurn: {
        title: "Capability: Allow Burning",
        details:
            "Enables the permanent destruction of tokens, reducing the total supply. This can be done by any holder (if not restricted) or by an address with a special burn role.",
        pros: [
            "Can create deflationary pressure, potentially increasing token value.",
            "Useful for buy-back-and-burn mechanisms.",
        ],
        warning:
            "This capability is permanent. If disabled, tokens can never be programmatically burned by the issuer.",
    },
    canFreeze: {
        title: "Capability: Allow Freezing",
        details:
            "Allows an authorized address (holding the 'freeze' role) to prevent a specific account from sending or receiving this token.",
        pros: [
            "Useful for regulatory compliance.",
            "Can help mitigate theft in specific scenarios.",
        ],
        cons: [
            "Centralizes control, requires trust.",
            "Can be perceived negatively if misused.",
        ],
        warning: "This capability is permanent.",
    },
    canWipe: {
        title: "Capability: Allow Wiping",
        details:
            "Allows an authorized address (holding the 'wipe' role) to destroy tokens from an account that is currently frozen for this token.",
        pros: [
            "Can be used in severe cases like proven theft or legal requirements.",
        ],
        cons: [
            "Very centralized and powerful; can be seen as confiscation.",
            "High potential for misuse.",
        ],
        warning:
            "This capability is permanent and requires 'Allow Freezing' to be enabled. Use with extreme caution.",
    },
    canPause: {
        title: "Capability: Allow Pausing",
        details:
            "Allows an authorized address (holding the 'pause' role) to temporarily halt all transactions of this token across the entire network.",
        pros: [
            "Critical for security during contract upgrades or emergencies.",
        ],
        cons: ["Centralizes control; users cannot transact when paused."],
        warning: "This capability is permanent.",
    },
    canChangeOwner: {
        title: "Capability: Allow Ownership Transfer",
        details:
            "Allows the current token owner (the address that manages the token's roles and properties) to transfer these administrative rights to a new address.",
        pros: [
            "Essential for decentralization (e.g., to a DAO).",
            "Allows for project handovers.",
        ],
        warning: "This capability is permanent.",
    },
    canUpgrade: {
        title: "Capability: Allow Contract Upgrade",
        details:
            "Allows the token owner to upgrade the token's underlying smart contract logic by deploying a new version.",
        pros: ["Enables bug fixes and new features post-launch."],
        cons: [
            "Requires significant trust in the owner, as contract logic can be changed completely.",
        ],
        warning:
            "This capability is permanent and carries significant trust implications.",
    },
    canAddSpecialRoles: {
        title: "Capability: Allow Role Assignment",
        details:
            "Determines if special roles (like minter, freezer, pauser) can be assigned or revoked for this token after issuance.",
        pros: ["Flexible role management for DAOs or multi-sig controllers."],
        cons: ["Complexity in managing roles if not handled carefully."],
        warning:
            "This capability is permanent. Disabling it limits future flexibility in role delegation.",
    },
};

const TokenIssuanceWizard = ({ onComplete }: { onComplete?: () => void }) => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [tokenDetails, setTokenDetails] =
        useState<TokenDetails>(initialTokenDetails);
    const [isProcessing, setIsProcessing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [useDefaults, setUseDefaults] = useState(true);
    const [activeGuidanceKey, setActiveGuidanceKey] =
        useState<string>("default");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === "ticker")
            processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        if (name === "supply" || name === "decimals")
            processedValue = value.replace(/[^0-9]/g, "");

        setTokenDetails((prev) => ({ ...prev, [name]: processedValue }));
    };

    const handleSwitchChange = (name: keyof TokenDetails, checked: boolean) => {
        setTokenDetails((prev) => {
            const newState = { ...prev, [name]: checked };
            if (name === "canFreeze" && !checked) newState.canWipe = false;
            return newState;
        });
    };

    const handleUseDefaultsChange = (checked: boolean) => {
        setUseDefaults(checked);
        if (checked) {
            setTokenDetails((prev) => ({
                ...prev,
                ...recommendedDefaults,
                canWipe:
                    recommendedDefaults.canFreeze === false
                        ? false
                        : recommendedDefaults.canWipe ?? false,
            }));
        }
    };

    const totalNetworkFee = 5; // Fixed ESDT issuance fee
    const platformFee = 0.1; // Example platform fee in EGLD
    const estimatedGasFee = 0.0005;

    const wizardSteps: LayoutStepInterface[] = useMemo(
        () => [
            {
                id: "basicInfo",
                title: "Basic Info",
                icon: FileJson,
                isCompleted: currentStep > 1,
                isCurrent: currentStep === 1,
                isDisabled: false,
            },
            {
                id: "capabilities",
                title: "Capabilities",
                icon: Settings2,
                isCompleted: currentStep > 2,
                isCurrent: currentStep === 2,
                isDisabled: currentStep < 2,
            },
            {
                id: "review",
                title: "Review & Issue",
                icon: Eye,
                isCompleted: currentStep > 3,
                isCurrent: currentStep === 3,
                isDisabled: currentStep < 3,
            },
            {
                id: "processing",
                title: "Processing",
                icon: Loader,
                isCompleted: currentStep > 4,
                isCurrent: currentStep === 4,
                isDisabled: true,
            }, // Disabled navigation
            {
                id: "success",
                title: "Success!",
                icon: Star,
                isCompleted: currentStep === 5,
                isCurrent: currentStep === 5,
                isDisabled: true,
            }, // Disabled navigation
        ],
        [currentStep]
    );

    const handleNextStep = useCallback(() => {
        if (currentStep === 1) {
            if (!tokenDetails.name) {
                toast.error("Token Name is required.");
                return;
            }
            if (!tokenDetails.ticker) {
                toast.error("Token Ticker is required.");
                return;
            }
            if (
                tokenDetails.ticker.length < 3 ||
                tokenDetails.ticker.length > 10 ||
                !/^[A-Z0-9]+$/.test(tokenDetails.ticker)
            ) {
                toast.error("Ticker must be 3-10 uppercase letters/numbers.");
                return;
            }
            if (!tokenDetails.supply || parseFloat(tokenDetails.supply) <= 0) {
                toast.error("Initial Supply must be a positive number.");
                return;
            }
            if (
                !tokenDetails.decimals ||
                parseInt(tokenDetails.decimals) < 0 ||
                parseInt(tokenDetails.decimals) > 18
            ) {
                toast.error("Decimals must be between 0 and 18.");
                return;
            }
            setCurrentStep(2);
            setActiveGuidanceKey("default");
        } else if (currentStep === 2) {
            setCurrentStep(3);
            setActiveGuidanceKey("default");
        } else if (currentStep === 3) {
            if (!termsAccepted) {
                toast.error(
                    "Please acknowledge the permanent nature of token capabilities."
                );
                return;
            }
            setCurrentStep(4);
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(5);
            }, 2000);
        }
    }, [currentStep, tokenDetails, termsAccepted]);

    const handlePreviousStep = useCallback(() => {
        if (currentStep > 1 && currentStep < 4) {
            // Can't go back from processing or success
            setCurrentStep(currentStep - 1);
            setActiveGuidanceKey("default");
        }
    }, [currentStep]);

    const currentGuidance =
        guidanceContentData[activeGuidanceKey] || guidanceContentData.default;

    return (
        <WizardLayout
            steps={wizardSteps}
            title="Token Forge Wizard"
            description="Create your ESDT Token on MultiversX."
            currentStepTitle={wizardSteps.find((s) => s.isCurrent)?.title || ""}
        >
            <div className="flex-grow flex flex-col">
                {" "}
                {/* Ensure content area takes up space */}
                {/* Step Content */}
                <div className="flex-grow">
                    {currentStep === 1 && (
                        <div className="animate-scale-fade-in space-y-6">
                            <StepHeader
                                title="Token Foundation"
                                description="Define the core identity of your new token."
                            />
                            <div className="space-y-4 sm:space-y-5 neo-panel p-4 sm:p-6">
                                <FormField id="name" label="Token Name *">
                                    <Input
                                        name="name"
                                        placeholder="E.g., My Awesome Project"
                                        value={tokenDetails.name}
                                        onChange={handleInputChange}
                                    />
                                    <FormDescription>
                                        The full, human-readable name of your
                                        token.
                                    </FormDescription>
                                </FormField>
                                <FormField id="ticker" label="Token Ticker *">
                                    <Input
                                        name="ticker"
                                        placeholder="E.g., MAP"
                                        value={tokenDetails.ticker}
                                        onChange={handleInputChange}
                                        className="uppercase"
                                        maxLength={10}
                                    />
                                    <FormDescription>
                                        A short symbol (3-10 uppercase
                                        letters/numbers).
                                    </FormDescription>
                                </FormField>
                                <FormField id="supply" label="Initial Supply *">
                                    <Input
                                        name="supply"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="1000000"
                                        value={tokenDetails.supply}
                                        onChange={handleInputChange}
                                    />
                                    <FormDescription>
                                        Total number of tokens to be created
                                        initially.
                                    </FormDescription>
                                </FormField>
                                <FormField
                                    id="decimals"
                                    label="Number of Decimals *"
                                >
                                    <Input
                                        name="decimals"
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="18"
                                        value={tokenDetails.decimals}
                                        onChange={handleInputChange}
                                        maxLength={2}
                                    />
                                    <FormDescription>
                                        Divisibility of your token (0-18, 18 is
                                        standard like EGLD).
                                    </FormDescription>
                                </FormField>
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="animate-scale-fade-in">
                            <StepHeader
                                title="Token Capabilities"
                                description="Define special actions your token can perform. Some choices are permanent."
                            />
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="lg:w-3/5 space-y-4">
                                    <div className="neo-panel p-3 sm:p-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="useDefaults"
                                                checked={useDefaults}
                                                onCheckedChange={
                                                    handleUseDefaultsChange
                                                }
                                            />
                                            <Label
                                                htmlFor="useDefaults"
                                                className="text-sm font-medium cursor-pointer"
                                            >
                                                Use Recommended Defaults
                                            </Label>
                                            <span title="Enables common features like minting, burning, and ownership transfer.">
                                                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                            </span>
                                        </div>
                                    </div>
                                    {!useDefaults &&
                                        capabilitiesConfig.map((group) => (
                                            <div
                                                key={group.group}
                                                className="space-y-3"
                                            >
                                                <h4 className="text-sm font-semibold text-muted-foreground px-1">
                                                    {group.group}
                                                </h4>
                                                {group.items.map((cap) => (
                                                    <CapabilityCard
                                                        key={cap.id}
                                                        id={cap.id}
                                                        title={cap.title}
                                                        description={
                                                            cap.description
                                                        }
                                                        icon={cap.icon}
                                                        isPermanent={
                                                            cap.isPermanent
                                                        }
                                                        checked={
                                                            !!tokenDetails[
                                                                cap.id
                                                            ]
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) =>
                                                            handleSwitchChange(
                                                                cap.id,
                                                                checked
                                                            )
                                                        }
                                                        onHover={() =>
                                                            setActiveGuidanceKey(
                                                                cap.id
                                                            )
                                                        }
                                                        onLeave={() =>
                                                            setActiveGuidanceKey(
                                                                "default"
                                                            )
                                                        }
                                                        disabled={
                                                            cap.id ===
                                                                "canWipe" &&
                                                            !tokenDetails.canFreeze
                                                        }
                                                        dependencyMet={
                                                            !(
                                                                cap.id ===
                                                                    "canWipe" &&
                                                                !tokenDetails.canFreeze
                                                            )
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    {useDefaults && (
                                        <p className="text-sm text-muted-foreground p-4 neo-panel rounded-md">
                                            Recommended defaults are active.
                                            Uncheck to customize.
                                        </p>
                                    )}
                                </div>
                                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                                    {" "}
                                    {/* Sticky for guidance panel on large screens */}
                                    <GuidancePanel content={currentGuidance} />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="animate-scale-fade-in space-y-6">
                            <StepHeader
                                title="Review & Confirm"
                                description="Carefully check your token's details and costs. Some properties are permanent."
                            />
                            <Card className="neo-panel overflow-hidden">
                                <CardHeader className="bg-muted/10 py-3 px-4 sm:py-4 sm:px-6">
                                    <CardTitle className="text-base sm:text-lg">
                                        {tokenDetails.name} (
                                        {tokenDetails.ticker})
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">
                                        Summary of your new ESDT token.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border/10">
                                        <ReviewItem
                                            label="Token Name"
                                            value={tokenDetails.name}
                                        />
                                        <ReviewItem
                                            label="Token Ticker"
                                            value={tokenDetails.ticker}
                                        />
                                        <ReviewItem
                                            label="Initial Supply"
                                            value={`${Number(
                                                tokenDetails.supply
                                            ).toLocaleString()} ${
                                                tokenDetails.ticker
                                            }`}
                                        />
                                        <ReviewItem
                                            label="Decimals"
                                            value={tokenDetails.decimals}
                                        />
                                        <ReviewItem label="Capabilities">
                                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                                {Object.entries(tokenDetails)
                                                    .filter(
                                                        ([key, value]) =>
                                                            key.startsWith(
                                                                "can"
                                                            ) && value === true
                                                    )
                                                    .map(([key]) => {
                                                        const capConfig =
                                                            capabilitiesConfig
                                                                .flatMap(
                                                                    (g) =>
                                                                        g.items
                                                                )
                                                                .find(
                                                                    (c) =>
                                                                        c.id ===
                                                                        key
                                                                );
                                                        return (
                                                            <Badge
                                                                key={key}
                                                                variant="neo"
                                                                className="text-xs"
                                                            >
                                                                {capConfig?.title ||
                                                                    key}
                                                            </Badge>
                                                        );
                                                    })}
                                                {Object.values(tokenDetails)
                                                    .slice(4)
                                                    .every(
                                                        (v) => v === false
                                                    ) && (
                                                    <span className="text-xs text-muted-foreground">
                                                        No special capabilities
                                                        enabled.
                                                    </span>
                                                )}
                                            </div>
                                        </ReviewItem>
                                        <ReviewItem
                                            label="Network Issuance Fee"
                                            value={`${totalNetworkFee} EGLD`}
                                            highlight
                                        />
                                        <ReviewItem
                                            label="Platform Fee (TokenForge)"
                                            value={`${platformFee} EGLD`}
                                            highlight
                                        />
                                        <ReviewItem
                                            label="Estimated Gas Fee"
                                            value={`~${estimatedGasFee} EGLD`}
                                        />
                                        <ReviewItem
                                            label="Total Estimated Cost"
                                            value={`~${(
                                                totalNetworkFee +
                                                platformFee +
                                                estimatedGasFee
                                            ).toFixed(4)} EGLD`}
                                            primary
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                            <div className="neo-panel p-4 bg-warning-500/5 border border-warning-500/20">
                                <div className="flex items-start space-x-3">
                                    <Checkbox
                                        id="acceptTerms"
                                        checked={termsAccepted}
                                        onCheckedChange={(checked) =>
                                            setTermsAccepted(!!checked)
                                        }
                                        className="mt-1"
                                    />
                                    <Label
                                        htmlFor="acceptTerms"
                                        className="text-sm text-warning-700 dark:text-warning-400 cursor-pointer"
                                    >
                                        I understand that the Token Ticker and
                                        selected Capabilities are set
                                        permanently during issuance and cannot
                                        be changed later for this token
                                        identifier on the MultiversX blockchain.
                                    </Label>
                                </div>
                            </div>
                        </div>
                    )}

                    {(currentStep === 4 || currentStep === 5) && (
                        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
                            {isProcessing && currentStep === 4 && (
                                <>
                                    <Loader className="animate-spin mb-6 text-primary h-12 w-12 sm:h-16 sm:w-16" />
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                                        Issuing Your Token...
                                    </h3>
                                    <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                                        Please confirm the transaction in your
                                        wallet. This may take a few moments.
                                    </p>
                                </>
                            )}
                            {!isProcessing && currentStep === 5 && (
                                <>
                                    <div className="p-3 sm:p-4 bg-gradient-to-br from-accent-aurora-green to-accent-glow-cyan rounded-full mb-6 inline-block shadow-nm-lg">
                                        <PackageCheck className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-semibold mb-2 gradient-text">
                                        Congratulations! Token Issued!
                                    </h3>
                                    <p className="text-muted-foreground max-w-lg mb-6 text-sm sm:text-base">
                                        Your token,{" "}
                                        <span className="font-semibold text-foreground">
                                            {tokenDetails.name} (
                                            {tokenDetails.ticker})
                                        </span>
                                        , has been successfully created.
                                    </p>
                                    <Card className="neo-panel p-3 sm:p-4 mb-6 text-left max-w-md w-full">
                                        <div className="text-xs sm:text-sm text-muted-foreground">
                                            Token Identifier:
                                        </div>
                                        <div className="font-mono text-xs sm:text-sm bg-muted/50 px-2 py-1 rounded my-1 break-all">{`${tokenDetails.ticker.toUpperCase()}-mockhash`}</div>
                                        <p className="text-xs text-muted-foreground">
                                            This is your unique token ID on the
                                            MultiversX network.
                                        </p>
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
                                                navigate("/provide-liquidity")
                                            }
                                        >
                                            <Droplets className="mr-2 h-4 w-4" />{" "}
                                            Add Liquidity
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {/* Navigation Buttons - Placed at the bottom of the flex column */}
                {currentStep < 4 && (
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
                                (currentStep === 3 && !termsAccepted) ||
                                isProcessing
                            }
                        >
                            {currentStep === 3
                                ? "Confirm & Issue Token"
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

const ReviewItem: React.FC<{
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

const GuidancePanel: React.FC<{
    content: typeof guidanceContentData.default;
}> = ({ content }) => (
    <div className="neo-panel p-4 sm:p-6 rounded-lg shadow-nm-lg bg-card/80">
        <div className="flex items-center mb-2 sm:mb-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 flex-shrink-0" />
            <h4 className="text-md sm:text-lg font-semibold">
                {content.title}
            </h4>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            {content.details}
        </p>
        {content.pros && (
            <ul className="space-y-1 mb-2 sm:mb-3">
                {content.pros.map((pro) => (
                    <li key={pro} className="text-xs flex items-start">
                        <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-accent-aurora-green flex-shrink-0" />{" "}
                        {pro}
                    </li>
                ))}
            </ul>
        )}
        {content.cons && (
            <ul className="space-y-1 mb-2 sm:mb-3">
                {content.cons.map((con) => (
                    <li key={con} className="text-xs flex items-start">
                        <Info className="w-3 h-3 mr-1.5 mt-0.5 text-destructive flex-shrink-0" />{" "}
                        {con}
                    </li>
                ))}
            </ul>
        )}
        {content.warning && (
            <div className="p-2 sm:p-2.5 bg-warning-500/10 border border-warning-500/20 rounded-md text-xs text-warning-700 dark:text-warning-400 flex items-start">
                <Lock className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                {content.warning}
            </div>
        )}
    </div>
);

export default TokenIssuanceWizard;
