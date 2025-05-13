import React from "react";
import { HelpCircle, AlertTriangle } from "lucide-react";
import { lpGuidanceContentData } from "../config/liquidityGuidance.config"; // Adjust path as needed

interface GuidancePanelLPProps {
    content: typeof lpGuidanceContentData.default;
}

const GuidancePanelLP: React.FC<GuidancePanelLPProps> = ({ content }) => (
    <div className="neo-panel p-4 sm:p-6 rounded-lg shadow-nm-lg bg-card/80">
        <div className="flex items-center mb-2 sm:mb-3">
            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 flex-shrink-0" />
            <h4 className="text-md sm:text-lg font-semibold">
                {content.title}
            </h4>
        </div>
        <div className="text-xs sm:text-sm text-muted-foreground space-y-1 sm:space-y-2 mb-2 sm:mb-3">
            {content.details}
        </div>
        {content.analogy && (
            <div className="text-xs sm:text-sm text-muted-foreground">
                {content.analogy}
            </div>
        )}
        {content.warning && (
            <div className="mt-2 sm:mt-3 p-2 sm:p-2.5 bg-warning-500/10 border border-warning-500/20 rounded-md text-xs text-warning-700 dark:text-warning-400 flex items-start">
                <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 mt-0.5 flex-shrink-0 text-warning-500" />
                {content.warning}
            </div>
        )}
    </div>
);

export default GuidancePanelLP;
