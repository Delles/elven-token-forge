import React from "react";
import { HelpCircle, CheckCircle, Info, Lock } from "lucide-react";

// Reuse the structure from guidanceContentData for the prop type
interface GuidancePanelProps {
    content: {
        title: string;
        details: string;
        pros?: string[];
        cons?: string[];
        warning?: string;
    };
}

export const GuidancePanel: React.FC<GuidancePanelProps> = ({ content }) => (
    <div className="neo-panel p-4 sm:p-6 rounded-lg shadow-nm-lg bg-card/80">
        <div className="flex items-center mb-2 sm:mb-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 flex-shrink-0" />
            <h4 className="text-md sm:text-lg font-semibold">
                {content.title}
            </h4>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
            {content.details}
        </p>
        {content.pros && (
            <ul className="space-y-1 mb-2 sm:mb-3">
                {content.pros.map((pro) => (
                    <li key={pro} className="text-xs flex items-start">
                        <CheckCircle className="w-3 h-3 mr-1.5 mt-0.5 text-accent-aurora-green flex-shrink-0" />{" "}
                        {pro}
                    </li>
                ))}
            </ul>
        )}
        {content.cons && (
            <ul className="space-y-1 mb-2 sm:mb-3">
                {content.cons.map((con) => (
                    <li key={con} className="text-xs flex items-start">
                        <Info className="w-3 h-3 mr-1.5 mt-0.5 text-destructive flex-shrink-0" />{" "}
                        {con}
                    </li>
                ))}
            </ul>
        )}
        {content.warning && (
            <div className="p-2 sm:p-2.5 bg-warning-500/10 border border-warning-500/20 rounded-md text-xs text-warning-700 dark:text-warning-400 flex items-start">
                <Lock className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                {content.warning}
            </div>
        )}
    </div>
);
