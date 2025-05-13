import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { WizardLayout } from "@/components/WizardLayout"; // Adjusted relative path
import { useLiquidityForm } from "./hooks/useLiquidityForm";
import { useLiquidityWizard } from "./hooks/useLiquidityWizard"; // Using the new hook
import {
    createLiquidityWizardSteps,
    LiquidityStepId,
} from "./config/wizardSteps.config";
import {
    mockUserTokens,
    pairingTokensList,
} from "./config/liquidityForm.config";
import { lpGuidanceContentData } from "./config/liquidityGuidance.config";
import { validateTokenSelection, validateAmounts } from "./utils/validation";
import { Button } from "@/components/ui/button"; // Import Button
import { ArrowLeft, ArrowRight, Loader } from "lucide-react"; // Corrected Loader import

import SelectTokensStep from "./components/SelectTokensStep";
import SetAmountsStep from "./components/SetAmountsStep";
import UnderstandRisksStep from "./components/UnderstandRisksStep";
import DepositTokensStep from "./components/DepositTokensStep";
import ProcessingStep from "./components/ProcessingStep";
import SuccessStep from "./components/SuccessStep";

interface LiquidityProvisionWizardProps {
    onComplete?: () => void;
}

const LiquidityProvisionWizard: React.FC<LiquidityProvisionWizardProps> = ({
    onComplete,
}) => {
    const navigate = useNavigate();
    const {
        liquidityDetails,
        setLiquidityDetails, // Keep for potential direct sets if needed
        risksAccepted,
        setRisksAccepted,
        handleInputChange,
        handleSelectChange,
        calculateInitialPrice,
        expectedLpTokens,
        lpFee,
    } = useLiquidityForm();

    const wizardStepsConfig = createLiquidityWizardSteps();

    const handleNext = (currentStepId?: LiquidityStepId): boolean => {
        if (currentStepId === "selectTokens") {
            if (!validateTokenSelection(liquidityDetails, toast.error)) {
                return false;
            }
            setActiveGuidanceKey("default");
        } else if (currentStepId === "setAmounts") {
            if (!validateAmounts(liquidityDetails, toast.error)) {
                return false;
            }
            setActiveGuidanceKey("impermanentLoss");
        } else if (currentStepId === "risks") {
            if (!risksAccepted) {
                toast.error(
                    "Please acknowledge the risks associated with providing liquidity."
                );
                return false;
            }
            setActiveGuidanceKey("deposits");
        } else if (currentStepId === "deposit") {
            const depositsDone =
                liquidityDetails.pairingToken === "EGLD"
                    ? depositSteps.ownToken
                    : depositSteps.ownToken && depositSteps.pairingToken;
            if (!depositsDone) {
                toast.error(
                    "Please complete all required token deposits before proceeding."
                );
                return false;
            }
            // Transition to processing is handled by proceedToNextStep then handleProceedAsync
        }
        return true;
    };

    const handleBack = (currentStepId?: LiquidityStepId) => {
        if (currentStepId === "setAmounts") setActiveGuidanceKey("default");
        else if (currentStepId === "risks") setActiveGuidanceKey("default");
        else if (currentStepId === "deposit")
            setActiveGuidanceKey("impermanentLoss");
    };

    const handlePerformDeposit = (tokenType: "ownToken" | "pairingToken") => {
        const tokenName =
            tokenType === "ownToken"
                ? liquidityDetails.ownToken
                : liquidityDetails.pairingToken;
        toast.info(`Simulating deposit for ${tokenName}...`);
        // Simulate API call
        setTimeout(() => {
            setDepositSteps((prev) => ({ ...prev, [tokenType]: true }));
            toast.success(`${tokenName} deposit confirmed (mock).`);
        }, 1500);
    };

    const {
        currentStep, // This is actually currentStepId from the new hook
        setCurrentStep,
        currentStepConfig,
        wizardSteps,
        isProcessing,
        setIsProcessing,
        proceedToNextStep,
        goToPreviousStep,
        activeGuidanceKey,
        setActiveGuidanceKey,
        depositSteps,
        setDepositSteps,
    } = useLiquidityWizard({
        steps: wizardStepsConfig,
        onNext: handleNext,
        onBack: handleBack,
        initialActiveGuidanceKey: "default", // Set initial guidance key
        initialDepositSteps: { ownToken: false, pairingToken: false },
    });

    // Async operation for the final step (deposit -> processing -> success)
    const handleProceedAsync = async () => {
        if (currentStepConfig?.id === "deposit") {
            setIsProcessing(true);
            setCurrentStep("processing");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsProcessing(false);
            setCurrentStep("success");
        }
    };

    useEffect(() => {
        if (currentStepConfig?.id === "selectTokens") {
            setActiveGuidanceKey("default");
        }
    }, [currentStepConfig?.id, setActiveGuidanceKey]);

    const currentGuidance =
        lpGuidanceContentData[activeGuidanceKey] ||
        lpGuidanceContentData.default;

    const renderStepContent = () => {
        switch (currentStepConfig?.id) {
            case "selectTokens":
                return (
                    <SelectTokensStep
                        key={currentStepConfig.id}
                        liquidityDetails={liquidityDetails}
                        handleSelectChange={(name, value) => {
                            handleSelectChange(name, value);
                            // Reset guidance on token change in this step if needed, or rely on next validation
                            // setActiveGuidanceKey('default');
                        }}
                        mockUserTokens={mockUserTokens}
                        pairingTokensList={pairingTokensList}
                        currentGuidance={currentGuidance}
                    />
                );
            case "setAmounts":
                return (
                    <SetAmountsStep
                        key={currentStepConfig.id}
                        liquidityDetails={liquidityDetails}
                        handleInputChange={handleInputChange}
                        calculateInitialPrice={calculateInitialPrice}
                        currentGuidance={currentGuidance}
                    />
                );
            case "risks":
                return (
                    <UnderstandRisksStep
                        key={currentStepConfig.id}
                        risksAccepted={risksAccepted}
                        setRisksAccepted={setRisksAccepted}
                        currentGuidance={currentGuidance}
                    />
                );
            case "deposit":
                return (
                    <DepositTokensStep
                        key={currentStepConfig.id}
                        liquidityDetails={liquidityDetails}
                        depositSteps={depositSteps}
                        handleDeposit={handlePerformDeposit} // Use the wizard's deposit handler
                        expectedLpTokens={expectedLpTokens}
                        lpFee={lpFee}
                        calculateInitialPrice={calculateInitialPrice}
                        currentGuidance={currentGuidance}
                    />
                );
            case "processing":
                return <ProcessingStep key={currentStepConfig.id} />;
            case "success":
                return (
                    <SuccessStep
                        key={currentStepConfig.id}
                        liquidityDetails={liquidityDetails}
                        expectedLpTokens={expectedLpTokens}
                        lpFee={lpFee}
                        onComplete={
                            onComplete || (() => navigate("/dashboard"))
                        } // Example fallback
                    />
                );
            default:
                return <div>Unknown Step</div>;
        }
    };

    return (
        <WizardLayout
            steps={wizardSteps}
            title="Provide Liquidity Wizard"
            description="Add liquidity to xExchange for your token."
            currentStepTitle={currentStepConfig?.title || ""}
        >
            <div className="flex-grow flex flex-col">
                {" "}
                {/* Ensure content area takes up space */}
                <div className="flex-grow">{renderStepContent()}</div>
                {/* Render navigation buttons here if not in final steps */}
                {currentStepConfig?.id !== "processing" &&
                    currentStepConfig?.id !== "success" && (
                        <div className="mt-auto border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                            <Button
                                variant="neo-outline"
                                onClick={goToPreviousStep}
                                disabled={
                                    isProcessing ||
                                    currentStepConfig?.id ===
                                        wizardStepsConfig[0].id
                                }
                                className="w-full sm:w-auto"
                            >
                                <ArrowLeft className="mr-1.5" /> Back
                            </Button>
                            <Button
                                onClick={
                                    currentStepConfig?.id === "deposit"
                                        ? handleProceedAsync
                                        : proceedToNextStep
                                }
                                className="neo-button w-full sm:w-auto"
                                disabled={
                                    isProcessing ||
                                    (currentStepConfig?.id === "risks" &&
                                        !risksAccepted) ||
                                    (currentStepConfig?.id === "deposit" &&
                                        !(liquidityDetails.pairingToken ===
                                        "EGLD"
                                            ? depositSteps.ownToken
                                            : depositSteps.ownToken &&
                                              depositSteps.pairingToken))
                                }
                            >
                                {isProcessing && (
                                    <Loader className="animate-spin mr-2 h-4 w-4" />
                                )}
                                {currentStepConfig?.id === "deposit"
                                    ? "Confirm & Add Liquidity"
                                    : "Next Step"}{" "}
                                <ArrowRight className="ml-1.5" />
                            </Button>
                        </div>
                    )}
            </div>
        </WizardLayout>
    );
};

export default LiquidityProvisionWizard;
