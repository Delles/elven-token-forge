import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PackageCheck, LayoutDashboard, Droplets } from "lucide-react";
import { TokenDetails } from "../config/tokenForm.config";
import { NavigateFunction } from "react-router-dom"; // For typing navigate

interface SuccessStepProps {
    tokenDetails: TokenDetails;
    onComplete?: () => void;
    onNavigate: NavigateFunction; // Using NavigateFunction type from react-router-dom
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
    tokenDetails,
    onComplete,
    onNavigate,
}) => (
    <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center animate-scale-fade-in">
        <div className="p-3 sm:p-4 bg-gradient-to-br from-accent-aurora-green to-accent-glow-cyan rounded-full mb-6 inline-block shadow-nm-lg">
            <PackageCheck className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-semibold mb-2 gradient-text">
            Congratulations! Token Issued!
        </h3>
        <p className="text-muted-foreground max-w-lg mb-6 text-sm sm:text-base">
            Your token,{" "}
            <span className="font-semibold text-foreground">
                {tokenDetails.name} ({tokenDetails.ticker})
            </span>
            , has been successfully created.
        </p>
        <Card className="neo-panel p-3 sm:p-4 mb-6 text-left max-w-md w-full">
            <div className="text-xs sm:text-sm text-muted-foreground">
                Token Identifier:
            </div>
            <div className="font-mono text-xs sm:text-sm bg-muted/50 px-2 py-1 rounded my-1 break-all">
                {`${tokenDetails.ticker.toUpperCase()}-mockhash`}
            </div>
            <p className="text-xs text-muted-foreground">
                This is your unique token ID on the MultiversX network.
            </p>
        </Card>
        <div className="flex flex-col sm:flex-row gap-3">
            <Button
                size="lg"
                onClick={() => onComplete && onComplete()}
                className="neo-button"
            >
                <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
            </Button>
            <Button
                size="lg"
                variant="neo-outline"
                onClick={() => onNavigate("/provide-liquidity")}
            >
                <Droplets className="mr-2 h-4 w-4" /> Add Liquidity
            </Button>
        </div>
    </div>
);
