import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import StepHeader from "./StepHeader";
import FormField from "./FormField";
import GuidancePanelLP from "./GuidancePanelLP";
import { LiquidityDetails } from "../config/liquidityForm.config";
import { lpGuidanceContentData } from "../config/liquidityGuidance.config";

interface SetAmountsStepProps {
    liquidityDetails: LiquidityDetails;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    calculateInitialPrice: () => string;
    currentGuidance: typeof lpGuidanceContentData.default;
}

const SetAmountsStep: React.FC<SetAmountsStepProps> = ({
    liquidityDetails,
    handleInputChange,
    calculateInitialPrice,
    currentGuidance,
}) => {
    return (
        <div className="animate-scale-fade-in">
            <StepHeader
                title="Define Pool Contribution"
                description="Enter the amounts for each token. This ratio sets the initial price."
            />
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-3/5 space-y-4 sm:space-y-5 neo-panel p-4 sm:p-6">
                    <FormField
                        id="ownTokenAmount"
                        label={`Amount of ${
                            liquidityDetails.ownToken || "Token"
                        } *`}
                    >
                        <Input
                            name="ownTokenAmount"
                            type="text"
                            inputMode="decimal"
                            placeholder="0.0"
                            value={liquidityDetails.ownTokenAmount}
                            onChange={handleInputChange}
                        />
                    </FormField>
                    <FormField
                        id="pairingTokenAmount"
                        label={`Amount of ${
                            liquidityDetails.pairingToken || "Pair"
                        } *`}
                    >
                        <Input
                            name="pairingTokenAmount"
                            type="text"
                            inputMode="decimal"
                            placeholder="0.0"
                            value={liquidityDetails.pairingTokenAmount}
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
                                1 {liquidityDetails.ownToken || "TOKEN"} ={" "}
                                {calculateInitialPrice()}{" "}
                                {liquidityDetails.pairingToken || "PAIR"}
                            </p>
                            <p className="text-xs text-muted-foreground text-center mt-1">
                                Based on your entered amounts.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                    <GuidancePanelLP content={currentGuidance} />
                </div>
            </div>
        </div>
    );
};

export default SetAmountsStep;
