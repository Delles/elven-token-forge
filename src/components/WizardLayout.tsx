// src/components/WizardLayout.tsx
import React from "react";
import { LucideIcon, CheckCircle } from "lucide-react"; // Assuming Dot is not used here based on final design
import { cn } from "@/lib/utils";

export interface WizardStep {
    id: string;
    title: string;
    icon: LucideIcon;
    isCompleted: boolean;
    isCurrent: boolean;
    isDisabled: boolean;
}

interface WizardLayoutProps {
    steps: WizardStep[];
    children: React.ReactNode;
    title: string;
    description: string;
    currentStepTitle: string;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
    steps,
    children,
    title,
    description,
    currentStepTitle,
}) => {
    return (
        <div className="flex flex-col md:flex-row gap-x-8 gap-y-6 min-h-[600px] bg-card/50 dark:bg-card/30 p-4 sm:p-6 rounded-xl shadow-nm-lg border border-white/10 backdrop-blur-md">
            {/* Desktop Sidebar Progress */}
            <aside className="hidden md:block md:w-1/4 lg:w-1/5 border-r border-white/10 pr-6 py-4">
                <h2 className="text-lg font-semibold mb-1 text-primary">
                    {title}
                </h2>
                <p className="text-xs text-muted-foreground mb-6">
                    {description}
                </p>
                <nav>
                    <ul>
                        {steps.map((step, index) => (
                            <li key={step.id} className="mb-0.5">
                                {" "}
                                {/* Reduced margin for tighter packing */}
                                <button
                                    className={cn(
                                        "flex items-center w-full text-left px-3 py-2 rounded-md transition-all duration-200 group",
                                        step.isCurrent
                                            ? "bg-primary/10 text-primary shadow-sm font-semibold"
                                            : step.isCompleted
                                            ? "text-muted-foreground hover:bg-muted/50"
                                            : "text-muted-foreground/70 opacity-70 cursor-not-allowed"
                                    )}
                                    disabled={
                                        step.isDisabled &&
                                        !step.isCurrent &&
                                        !step.isCompleted
                                    }
                                >
                                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3">
                                        {step.isCompleted && !step.isCurrent ? (
                                            <CheckCircle className="w-5 h-5 text-accent-aurora-green" />
                                        ) : (
                                            <step.icon
                                                className={cn(
                                                    "w-5 h-5",
                                                    step.isCurrent
                                                        ? "text-primary"
                                                        : "text-muted-foreground/80 group-hover:text-foreground"
                                                )}
                                            />
                                        )}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-sm",
                                            step.isCurrent
                                                ? "font-semibold"
                                                : step.isCompleted
                                                ? "font-normal"
                                                : "font-normal"
                                        )}
                                    >
                                        {step.title}
                                    </span>
                                </button>
                                {index < steps.length - 1 && (
                                    <div className="ml-[22px] h-3 border-l-2 border-border/20 border-dashed group-hover:border-border/40 transition-colors"></div>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Mobile Top Bar Progress */}
            <div className="md:hidden border-b border-white/10 pb-4 mb-4">
                <h2 className="text-xl font-semibold mb-1 text-primary text-center">
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                    Step: {currentStepTitle}
                </p>
                <div className="flex justify-center items-center space-x-1 sm:space-x-2">
                    {steps.map((step) => (
                        <div
                            key={`mobile-${step.id}`}
                            className={cn(
                                "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all",
                                step.isCurrent
                                    ? "bg-primary border-primary text-primary-foreground scale-110 shadow-md"
                                    : step.isCompleted
                                    ? "bg-accent-aurora-green/20 border-accent-aurora-green text-accent-aurora-green"
                                    : "bg-muted/30 border-muted text-muted-foreground/50"
                            )}
                            title={step.title}
                        >
                            {step.isCompleted && !step.isCurrent ? (
                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            ) : (
                                <step.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 md:pl-6 md:py-4 flex flex-col">
                {children}
            </main>
        </div>
    );
};
