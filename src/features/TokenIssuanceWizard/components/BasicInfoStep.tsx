// src/features/TokenIssuanceWizard/components/BasicInfoStep.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { StepHeader } from "./StepHeader";
import { FormDescription } from "./FormDescription";
import { TokenDetails } from "../config/tokenForm.config";

interface BasicInfoStepProps {
    tokenDetails: Pick<TokenDetails, "name" | "ticker" | "supply" | "decimals">;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
    tokenDetails,
    onInputChange,
}) => (
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
                    onChange={onInputChange}
                />
                <FormDescription>
                    The full, human-readable name of your token.
                </FormDescription>
            </FormField>
            <FormField id="ticker" label="Token Ticker *">
                <Input
                    name="ticker"
                    placeholder="E.g., MAP"
                    value={tokenDetails.ticker}
                    onChange={onInputChange}
                    className="uppercase"
                    maxLength={10}
                />
                <FormDescription>
                    A short symbol (3-10 uppercase letters/numbers).
                </FormDescription>
            </FormField>
            <FormField id="supply" label="Initial Supply *">
                <Input
                    name="supply"
                    type="text"
                    inputMode="numeric"
                    placeholder="1000000"
                    value={tokenDetails.supply}
                    onChange={onInputChange}
                />
                <FormDescription>
                    Total number of tokens to be created initially.
                </FormDescription>
            </FormField>
            <FormField id="decimals" label="Number of Decimals *">
                <Input
                    name="decimals"
                    type="text"
                    inputMode="numeric"
                    placeholder="18"
                    value={tokenDetails.decimals}
                    onChange={onInputChange}
                    maxLength={2}
                />
                <FormDescription>
                    Divisibility of your token (0-18, 18 is standard like EGLD).
                </FormDescription>
            </FormField>
        </div>
    </div>
);
