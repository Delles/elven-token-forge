import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ReviewItemStatic from "./ReviewItemStatic";
import { LiquidityDetails } from "../config/liquidityForm.config";
import { PackageCheck, LayoutDashboard, ExternalLink } from "lucide-react";

interface SuccessStepProps {
    liquidityDetails: LiquidityDetails;
    expectedLpTokens: number;
    lpFee: number;
    onComplete?: () => void; // onComplete from the main wizard
}

const SuccessStep: React.FC<SuccessStepProps> = ({
    liquidityDetails,
    expectedLpTokens,
    lpFee,
    onComplete,
}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
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
                    value={`${(expectedLpTokens - lpFee).toLocaleString()} LP`}
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
                    onClick={() => onComplete && onComplete()}
                    className="neo-button"
                >
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
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
        </div>
    );
};

export default SuccessStep;
