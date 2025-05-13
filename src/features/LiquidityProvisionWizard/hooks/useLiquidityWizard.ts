import { useState, useMemo, useCallback } from "react";
import {
    LiquidityWizardStep,
    LiquidityStepId,
} from "../config/wizardSteps.config";

interface UseLiquidityWizardProps {
    steps: LiquidityWizardStep[];
    onNext?: (currentStepId?: LiquidityStepId) => boolean; // Return true to proceed, false to stop
    onBack?: (currentStepId?: LiquidityStepId) => void;
    initialActiveGuidanceKey?: string;
    initialDepositSteps?: { ownToken: boolean; pairingToken: boolean };
}

export const useLiquidityWizard = ({
    steps,
    onNext,
    onBack,
    initialActiveGuidanceKey = "default",
    initialDepositSteps = { ownToken: false, pairingToken: false },
}: UseLiquidityWizardProps) => {
    const [currentIndex, setCurrentIndex] = useState(0); // Zero-based index
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeGuidanceKey, setActiveGuidanceKey] = useState<string>(
        initialActiveGuidanceKey
    );
    const [depositSteps, setDepositSteps] = useState(initialDepositSteps);

    const currentStepConfig = useMemo(
        () => steps[currentIndex],
        [steps, currentIndex]
    );
    const currentStepId = useMemo(
        () => currentStepConfig?.id,
        [currentStepConfig]
    );

    const wizardSteps = useMemo(() => {
        return steps.map((step, index) => ({
            ...step,
            isCurrent: index === currentIndex,
            isCompleted: index < currentIndex,
            // isDisabled can be part of the static config, or dynamically set here if needed
        }));
    }, [steps, currentIndex]);

    const proceedToNextStep = useCallback(() => {
        if (onNext && typeof onNext === "function") {
            if (!onNext(currentStepId)) {
                return; // Validation or condition failed in onNext callback
            }
        }
        if (currentIndex < steps.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    }, [currentIndex, steps.length, onNext, currentStepId]);

    const goToPreviousStep = useCallback(() => {
        if (onBack && typeof onBack === "function") {
            onBack(currentStepId);
        }
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }, [currentIndex, onBack, currentStepId]);

    const setCurrentStep = useCallback(
        (stepId: LiquidityStepId) => {
            const stepIndex = steps.findIndex((s) => s.id === stepId);
            if (stepIndex !== -1) {
                setCurrentIndex(stepIndex);
            } else {
                console.warn(`Wizard step with id "${stepId}" not found.`);
            }
        },
        [steps]
    );

    return {
        currentStep: currentStepId, // Exporting the ID of the current step for convenience
        setCurrentStep, // Function to go to a specific step by ID
        currentStepConfig, // The full config object for the current step
        wizardSteps, // The array of all step configs, updated with current/completed status
        isProcessing,
        setIsProcessing,
        proceedToNextStep,
        goToPreviousStep,
        activeGuidanceKey,
        setActiveGuidanceKey,
        depositSteps,
        setDepositSteps,
        // currentIndex, // Optionally export if direct index manipulation is needed
    };
};
