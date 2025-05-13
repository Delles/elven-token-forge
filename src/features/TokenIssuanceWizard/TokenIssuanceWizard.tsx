import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { WizardLayout } from "@/components/WizardLayout";
import { useTokenForm } from "./hooks/useTokenForm";
import { useWizard } from "./hooks/useWizard";
import {
    initialTokenDetails,
    recommendedDefaults,
    TokenDetails,
} from "./config/tokenForm.config";
import { createWizardSteps } from "./config/wizardSteps.config";
import { validateBasicInfo } from "./utils/validation";
import { BasicInfoStep } from "./components/BasicInfoStep";
import { CapabilitiesStep } from "./components/CapabilitiesStep";
import { ReviewStep } from "./components/ReviewStep";
import { ProcessingStep } from "./components/ProcessingStep";
import { SuccessStep } from "./components/SuccessStep";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";

const WIZARD_MAX_STEPS = 5;

// Define feeConfig outside the component as it's static
const staticFeeConfig = {
    totalNetworkFee: 5,
    platformFee: 0.1,
    estimatedGasFee: 0.0005,
};

const TokenIssuanceWizard = ({ onComplete }: { onComplete?: () => void }) => {
    const navigate = useNavigate();
    const {
        tokenDetails,
        useDefaults,
        handleInputChange,
        handleSwitchChange,
        handleUseDefaultsChange,
    } = useTokenForm(initialTokenDetails, recommendedDefaults);

    const { currentStep, setCurrentStep, nextStep, prevStep, wizardSteps } =
        useWizard(1, WIZARD_MAX_STEPS, createWizardSteps);

    const [isProcessing, setIsProcessing] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [activeGuidanceKey, setActiveGuidanceKey] =
        useState<string>("default");

    const issueTokenOnChain = async (details: TokenDetails) => {
        console.log("Issuing token with details:", details);
        // Simulate API call
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const handleProceed = useCallback(async () => {
        if (currentStep === 1) {
            if (
                !validateBasicInfo(tokenDetails, (message) =>
                    toast.error(message)
                )
            ) {
                return;
            }
            setActiveGuidanceKey("default");
            nextStep();
        } else if (currentStep === 2) {
            setActiveGuidanceKey("default");
            nextStep();
        } else if (currentStep === 3) {
            if (!termsAccepted) {
                toast.error(
                    "Please acknowledge the permanent nature of token capabilities."
                );
                return;
            }
            setIsProcessing(true);
            setCurrentStep(4);
            try {
                await issueTokenOnChain(tokenDetails);
                setIsProcessing(false);
                setCurrentStep(5);
            } catch (error) {
                setIsProcessing(false);
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Token issuance failed."
                );
                setCurrentStep(3);
            }
        }
    }, [
        currentStep,
        tokenDetails,
        termsAccepted,
        nextStep,
        setCurrentStep,
        setActiveGuidanceKey,
    ]);

    const handleGoBack = useCallback(() => {
        if (currentStep > 1 && currentStep < 4) {
            setActiveGuidanceKey("default");
            prevStep();
        }
    }, [currentStep, prevStep, setActiveGuidanceKey]);

    return (
        <WizardLayout
            steps={wizardSteps}
            title="Token Forge Wizard"
            description="Create your ESDT Token on MultiversX."
            currentStepTitle={wizardSteps.find((s) => s.isCurrent)?.title || ""}
        >
            <div className="flex-grow flex flex-col">
                <div className="flex-grow">
                    {(() => {
                        switch (currentStep) {
                            case 1:
                                return (
                                    <BasicInfoStep
                                        key={currentStep}
                                        tokenDetails={tokenDetails}
                                        onInputChange={handleInputChange}
                                    />
                                );
                            case 2:
                                return (
                                    <CapabilitiesStep
                                        key={currentStep}
                                        tokenDetails={tokenDetails}
                                        onSwitchChange={handleSwitchChange}
                                        useDefaults={useDefaults}
                                        onUseDefaultsChange={
                                            handleUseDefaultsChange
                                        }
                                        activeGuidanceKey={activeGuidanceKey}
                                        onGuidanceKeyChange={
                                            setActiveGuidanceKey
                                        }
                                    />
                                );
                            case 3:
                                return (
                                    <ReviewStep
                                        key={currentStep}
                                        tokenDetails={tokenDetails}
                                        termsAccepted={termsAccepted}
                                        onTermsAcceptedChange={setTermsAccepted}
                                        fees={staticFeeConfig}
                                    />
                                );
                            case 4:
                                return <ProcessingStep key={currentStep} />;
                            case 5:
                                return (
                                    <SuccessStep
                                        key={currentStep}
                                        tokenDetails={tokenDetails}
                                        onComplete={onComplete}
                                        onNavigate={navigate}
                                    />
                                );
                            default:
                                return null;
                        }
                    })()}
                </div>
                {currentStep < 4 && (
                    <div className="mt-auto border-t border-border/10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                        <Button
                            variant="neo-outline"
                            onClick={handleGoBack}
                            disabled={currentStep === 1 || isProcessing}
                            className="w-full sm:w-auto"
                        >
                            <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                        </Button>
                        <Button
                            onClick={handleProceed}
                            className="neo-button w-full sm:w-auto"
                            disabled={
                                (currentStep === 3 && !termsAccepted) ||
                                isProcessing
                            }
                        >
                            {isProcessing && currentStep === 3 ? (
                                <Loader className="animate-spin mr-2 h-4 w-4" />
                            ) : null}
                            {currentStep === 3
                                ? "Confirm & Issue Token"
                                : "Next Step"}
                            {!isProcessing || currentStep !== 3 ? (
                                <ArrowRight className="ml-1.5 h-4 w-4" />
                            ) : null}
                        </Button>
                    </div>
                )}
            </div>
        </WizardLayout>
    );
};

export default TokenIssuanceWizard;
