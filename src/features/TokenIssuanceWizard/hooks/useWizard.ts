import { useState, useMemo, useCallback } from "react";
import { WizardStep as LayoutStepInterface } from "@/components/WizardLayout";

type CreateWizardStepsFn = (currentStep: number) => LayoutStepInterface[];

export const useWizard = (
    initialStep: number,
    maxSteps: number,
    createStepsFn: CreateWizardStepsFn
) => {
    const [currentStep, setCurrentStep] = useState(initialStep);

    const wizardSteps = useMemo(
        () => createStepsFn(currentStep),
        [currentStep, createStepsFn]
    );

    const nextStep = useCallback(() => {
        setCurrentStep((s) => Math.min(s + 1, maxSteps));
    }, [maxSteps]);

    const prevStep = useCallback(() => {
        setCurrentStep((s) => Math.max(s - 1, 1));
    }, []);

    const goToStep = useCallback(
        (step: number) => {
            if (step >= 1 && step <= maxSteps) {
                setCurrentStep(step);
            }
        },
        [maxSteps]
    );

    return {
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        goToStep,
        wizardSteps,
    };
};
