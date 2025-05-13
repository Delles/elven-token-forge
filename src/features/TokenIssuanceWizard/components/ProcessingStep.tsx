import React from "react";
import { Loader } from "lucide-react";

export const ProcessingStep: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
        <Loader className="animate-spin mb-6 text-primary h-12 w-12 sm:h-16 sm:w-16" />
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
            Issuing Your Token...
        </h3>
        <p className="text-muted-foreground max-w-md text-sm sm:text-base">
            Please confirm the transaction in your wallet. This may take a few
            moments.
        </p>
    </div>
);
