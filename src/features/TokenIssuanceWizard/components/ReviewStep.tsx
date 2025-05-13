import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { StepHeader } from "./StepHeader";
import { ReviewItem } from "./ReviewItem";
import { TokenDetails } from "../config/tokenForm.config";
import { capabilitiesConfig } from "../config/tokenCapabilities.config";

interface FeeConfig {
    totalNetworkFee: number;
    platformFee: number;
    estimatedGasFee: number;
}

interface ReviewStepProps {
    tokenDetails: TokenDetails;
    termsAccepted: boolean;
    onTermsAcceptedChange: (accepted: boolean) => void;
    fees: FeeConfig;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
    tokenDetails,
    termsAccepted,
    onTermsAcceptedChange,
    fees,
}) => {
    // Find the capability titles for display
    const enabledCapabilities = Object.entries(tokenDetails)
        .filter(([key, value]) => key.startsWith("can") && value === true)
        .map(([key]) => {
            const capConfig = capabilitiesConfig
                .flatMap((g) => g.items)
                .find((c) => c.id === key);
            return capConfig?.title || key; // Fallback to key if title not found
        });

    const totalCost =
        fees.totalNetworkFee + fees.platformFee + fees.estimatedGasFee;

    return (
        <div className="animate-scale-fade-in space-y-6">
            <StepHeader
                title="Review & Confirm"
                description="Carefully check your token\'s details and costs. Some properties are permanent."
            />
            <Card className="neo-panel overflow-hidden">
                <CardHeader className="bg-muted/10 py-3 px-4 sm:py-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">
                        {tokenDetails.name} ({tokenDetails.ticker})
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
                            ).toLocaleString()} ${tokenDetails.ticker}`}
                        />
                        <ReviewItem
                            label="Decimals"
                            value={tokenDetails.decimals}
                        />
                        <ReviewItem label="Capabilities">
                            <div className="flex flex-wrap gap-1 sm:gap-1.5">
                                {enabledCapabilities.length > 0 ? (
                                    enabledCapabilities.map((title) => (
                                        <Badge
                                            key={title}
                                            variant="neo"
                                            className="text-xs"
                                        >
                                            {title}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-xs text-muted-foreground">
                                        No special capabilities enabled.
                                    </span>
                                )}
                            </div>
                        </ReviewItem>
                        <ReviewItem
                            label="Network Issuance Fee"
                            value={`${fees.totalNetworkFee} EGLD`}
                            highlight
                        />
                        <ReviewItem
                            label="Platform Fee (TokenForge)"
                            value={`${fees.platformFee} EGLD`}
                            highlight
                        />
                        <ReviewItem
                            label="Estimated Gas Fee"
                            value={`~${fees.estimatedGasFee} EGLD`}
                        />
                        <ReviewItem
                            label="Total Estimated Cost"
                            value={`~${totalCost.toFixed(4)} EGLD`}
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
                            onTermsAcceptedChange(!!checked)
                        }
                        className="mt-1"
                    />
                    <Label
                        htmlFor="acceptTerms"
                        className="text-sm text-warning-700 dark:text-warning-400 cursor-pointer"
                    >
                        I understand that the Token Ticker and selected
                        Capabilities are set permanently during issuance and
                        cannot be changed later for this token identifier on the
                        MultiversX blockchain.
                    </Label>
                </div>
            </div>
        </div>
    );
};
