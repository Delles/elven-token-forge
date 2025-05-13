import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import StepHeader from "./StepHeader";
import GuidancePanelLP from "./GuidancePanelLP";
import { lpGuidanceContentData } from "../config/liquidityGuidance.config";

interface UnderstandRisksStepProps {
    risksAccepted: boolean;
    setRisksAccepted: (accepted: boolean) => void;
    currentGuidance: typeof lpGuidanceContentData.default;
}

const UnderstandRisksStep: React.FC<UnderstandRisksStepProps> = ({
    risksAccepted,
    setRisksAccepted,
    currentGuidance,
}) => {
    return (
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
                                <strong>LP Tokens:</strong> You'll receive LP
                                tokens representing your pool share.
                            </li>
                            <li>
                                <strong>Trading Fees:</strong> You earn a
                                portion of trading fees from this pair.
                            </li>
                            <li>
                                <strong>Impermanent Loss:</strong> The main
                                risk. Read the explanation in the panel.
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
                                I acknowledge that I have read and understood
                                the risks of providing liquidity, especially
                                Impermanent Loss.
                            </Label>
                        </div>
                    </div>
                </div>
                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                    <GuidancePanelLP content={currentGuidance} />
                </div>
            </div>
        </div>
    );
};

export default UnderstandRisksStep;
