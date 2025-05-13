import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import StepHeader from "./StepHeader";
import FormField from "./FormField";
import FormDescription from "./FormDescription";
import GuidancePanelLP from "./GuidancePanelLP";
import { LiquidityDetails } from "../config/liquidityForm.config";
import { lpGuidanceContentData } from "../config/liquidityGuidance.config";

// Define TokenOption here as it's not in the config
interface TokenOption {
    name: string;
    ticker: string;
}

interface SelectTokensStepProps {
    liquidityDetails: LiquidityDetails;
    handleSelectChange: (name: string, value: string) => void;
    mockUserTokens: TokenOption[];
    pairingTokensList: TokenOption[];
    currentGuidance: typeof lpGuidanceContentData.default;
}

const SelectTokensStep: React.FC<SelectTokensStepProps> = ({
    liquidityDetails,
    handleSelectChange,
    mockUserTokens,
    pairingTokensList,
    currentGuidance,
}) => {
    return (
        <div className="animate-scale-fade-in">
            <StepHeader
                title="Choose Your Liquidity Pair"
                description="Select your token and the asset you want to pair it with."
            />
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-3/5 space-y-4 sm:space-y-5 neo-panel p-4 sm:p-6">
                    <FormField id="ownToken" label="Your Token *">
                        <Select
                            value={liquidityDetails.ownToken}
                            onValueChange={(value) =>
                                handleSelectChange("ownToken", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select your token" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockUserTokens.map((t) => (
                                    <SelectItem key={t.ticker} value={t.ticker}>
                                        {t.name} ({t.ticker})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            The token you created or manage.
                        </FormDescription>
                    </FormField>
                    <FormField id="pairingToken" label="Pair With *">
                        <Select
                            value={liquidityDetails.pairingToken}
                            onValueChange={(value) =>
                                handleSelectChange("pairingToken", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select pairing token" />
                            </SelectTrigger>
                            <SelectContent>
                                {pairingTokensList.map((t) => (
                                    <SelectItem key={t.ticker} value={t.ticker}>
                                        {t.name} ({t.ticker})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormDescription>
                            Typically EGLD or a stablecoin like USDC.
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
                                        {liquidityDetails.ownToken} /{" "}
                                        {liquidityDetails.pairingToken}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                </div>
                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                    <GuidancePanelLP content={currentGuidance} />
                </div>
            </div>
        </div>
    );
};

export default SelectTokensStep;
