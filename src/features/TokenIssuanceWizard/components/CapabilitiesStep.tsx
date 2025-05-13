import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { CapabilityCard } from "./CapabilityCard";
import { GuidancePanel } from "./GuidancePanel";
import { TokenDetails } from "../config/tokenForm.config";
import {
    capabilitiesConfig,
    guidanceContentData,
} from "../config/tokenCapabilities.config";

interface CapabilitiesStepProps {
    tokenDetails: TokenDetails;
    onSwitchChange: (name: keyof TokenDetails, checked: boolean) => void;
    useDefaults: boolean;
    onUseDefaultsChange: (checked: boolean) => void;
    activeGuidanceKey: string;
    onGuidanceKeyChange: (key: string) => void;
}

export const CapabilitiesStep: React.FC<CapabilitiesStepProps> = ({
    tokenDetails,
    onSwitchChange,
    useDefaults,
    onUseDefaultsChange,
    activeGuidanceKey,
    onGuidanceKeyChange,
}) => {
    const currentGuidance =
        guidanceContentData[activeGuidanceKey] || guidanceContentData.default;

    return (
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
                                onCheckedChange={onUseDefaultsChange}
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
                            <div key={group.group} className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground px-1">
                                    {group.group}
                                </h4>
                                {group.items.map((cap) => (
                                    <CapabilityCard
                                        key={cap.id}
                                        id={cap.id}
                                        title={cap.title}
                                        description={cap.description}
                                        icon={cap.icon}
                                        isPermanent={cap.isPermanent}
                                        checked={!!tokenDetails[cap.id]}
                                        onCheckedChange={(checked) =>
                                            onSwitchChange(cap.id, checked)
                                        }
                                        onHover={() =>
                                            onGuidanceKeyChange(cap.id)
                                        }
                                        onLeave={() =>
                                            onGuidanceKeyChange("default")
                                        }
                                        disabled={
                                            cap.id === "canWipe" &&
                                            !tokenDetails.canFreeze
                                        }
                                        dependencyMet={
                                            !(
                                                cap.id === "canWipe" &&
                                                !tokenDetails.canFreeze
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        ))}
                    {useDefaults && (
                        <p className="text-sm text-muted-foreground p-4 neo-panel rounded-md">
                            Recommended defaults are active. Uncheck to
                            customize.
                        </p>
                    )}
                </div>
                <div className="lg:w-2/5 lg:sticky lg:top-24 h-fit">
                    <GuidancePanel content={currentGuidance} />
                </div>
            </div>
        </div>
    );
};
