import { FileJson, Settings2, Eye, Loader, Star } from "lucide-react";
import { WizardStep as LayoutStepInterface } from "@/components/WizardLayout"; // Corrected import

export const createWizardSteps = (
    currentStep: number
): LayoutStepInterface[] => [
    {
        id: "basicInfo",
        title: "Basic Info",
        icon: FileJson,
        isCompleted: currentStep > 1,
        isCurrent: currentStep === 1,
        isDisabled: false,
    },
    {
        id: "capabilities",
        title: "Capabilities",
        icon: Settings2,
        isCompleted: currentStep > 2,
        isCurrent: currentStep === 2,
        isDisabled: currentStep < 2,
    },
    {
        id: "review",
        title: "Review & Issue",
        icon: Eye,
        isCompleted: currentStep > 3,
        isCurrent: currentStep === 3,
        isDisabled: currentStep < 3,
    },
    {
        id: "processing",
        title: "Processing",
        icon: Loader,
        isCompleted: currentStep > 4,
        isCurrent: currentStep === 4,
        isDisabled: true,
    },
    {
        id: "success",
        title: "Success!",
        icon: Star,
        isCompleted: currentStep === 5,
        isCurrent: currentStep === 5,
        isDisabled: true,
    },
];
