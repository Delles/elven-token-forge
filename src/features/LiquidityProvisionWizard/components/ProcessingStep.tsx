import React from "react";
import { Loader } from "lucide-react";

// This component is part of a larger structure where currentStep === 5 and isProcessing === true
// For now, it directly renders the processing UI.
// It could be made more generic with props for title/message if needed.

const ProcessingStep: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
            <Loader className="animate-spin mb-6 text-primary h-12 w-12 sm:h-16 sm:w-16" />
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Adding Liquidity...
            </h3>
            <p className="text-muted-foreground max-w-md text-sm sm:text-base">
                Please confirm the final transaction in your wallet.
            </p>
        </div>
    );
};

export default ProcessingStep;
