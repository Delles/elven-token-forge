import {
    Package,
    Settings2,
    ShieldAlert,
    Coins,
    Loader,
    Star,
    LucideIcon,
} from "lucide-react";
import { WizardStep as LayoutStepInterface } from "../../../components/WizardLayout";

export type LiquidityStepId =
    | "selectTokens"
    | "setAmounts"
    | "risks"
    | "deposit"
    | "processing"
    | "success";

export interface LiquidityWizardStep extends LayoutStepInterface {
    id: LiquidityStepId;
    title: string;
    icon: LucideIcon;
    isCompleted: boolean;
    isCurrent: boolean;
    isDisabled: boolean;
}

export const createLiquidityWizardSteps = (): LiquidityWizardStep[] => [
    {
        id: "selectTokens",
        title: "Select Tokens",
        icon: Package,
        isCompleted: false,
        isCurrent: false,
        isDisabled: false,
    },
    {
        id: "setAmounts",
        title: "Set Amounts",
        icon: Settings2,
        isCompleted: false,
        isCurrent: false,
        isDisabled: true,
    },
    {
        id: "risks",
        title: "Understand Risks",
        icon: ShieldAlert,
        isCompleted: false,
        isCurrent: false,
        isDisabled: true,
    },
    {
        id: "deposit",
        title: "Deposit Tokens",
        icon: Coins,
        isCompleted: false,
        isCurrent: false,
        isDisabled: true,
    },
    {
        id: "processing",
        title: "Processing",
        icon: Loader,
        isCompleted: false,
        isCurrent: false,
        isDisabled: true,
    },
    {
        id: "success",
        title: "Success!",
        icon: Star,
        isCompleted: false,
        isCurrent: false,
        isDisabled: true,
    },
];
