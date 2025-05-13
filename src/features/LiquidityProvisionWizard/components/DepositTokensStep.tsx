import React from "react";
import { Info } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import StepHeader from "./StepHeader";
import DepositStepItem from "./DepositStepItem";
import ReviewItemStatic from "./ReviewItemStatic";
import GuidancePanelLP from "./GuidancePanelLP";
import { LiquidityDetails } from "../config/liquidityForm.config";
import { lpGuidanceContentData } from "../config/liquidityGuidance.config";

interface DepositTokensStepProps {
    liquidityDetails: LiquidityDetails;
    depositSteps: { ownToken: boolean; pairingToken: boolean };
    handleDeposit: (tokenType: "ownToken" | "pairingToken") => void;
    expectedLpTokens: number;
    lpFee: number;
    calculateInitialPrice: () => string;
    currentGuidance: typeof lpGuidanceContentData.default;
}

const DepositTokensStep: React.FC<DepositTokensStepProps> = ({
    liquidityDetails,
    depositSteps,
    handleDeposit,
    expectedLpTokens,
    lpFee,
    calculateInitialPrice,
    currentGuidance,
}) => {
    return (
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
                        onDeposit={() => handleDeposit("ownToken")}
                    />
                    {liquidityDetails.pairingToken !== "EGLD" && (
                        <DepositStepItem
                            tokenName={liquidityDetails.pairingToken}
                            amount={liquidityDetails.pairingTokenAmount}
                            isDeposited={depositSteps.pairingToken}
                            onDeposit={() => handleDeposit("pairingToken")}
                        />
                    )}
                    {liquidityDetails.pairingToken === "EGLD" && (
                        <div className="p-3 bg-primary/5 rounded-md text-sm text-primary flex items-start">
                            <Info className="inline w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                            EGLD will be sent with the final "Add Liquidity"
                            transaction, no separate deposit needed.
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
                    <GuidancePanelLP content={currentGuidance} />
                </div>
            </div>
        </div>
    );
};

export default DepositTokensStep;
