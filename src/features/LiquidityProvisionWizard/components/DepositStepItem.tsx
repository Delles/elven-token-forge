import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface DepositStepItemProps {
    tokenName: string;
    amount: string;
    isDeposited: boolean;
    onDeposit: () => void;
}

const DepositStepItem: React.FC<DepositStepItemProps> = ({
    tokenName,
    amount,
    isDeposited,
    onDeposit,
}) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-3.5 rounded-lg bg-muted/20 border border-border/10 gap-2 sm:gap-3">
        <div>
            <h5 className="font-medium text-sm sm:text-base">
                Deposit {Number(amount).toLocaleString()} {tokenName}
            </h5>
            <p className="text-xs text-muted-foreground">
                Approve and send your {tokenName} to the pool contract.
            </p>
        </div>
        {isDeposited ? (
            <div className="flex items-center text-accent-aurora-green font-medium text-sm shrink-0">
                <CheckCircle className="w-4 h-4 mr-1.5" /> Deposited
            </div>
        ) : (
            <Button
                onClick={onDeposit}
                size="sm"
                variant="outline"
                className="shrink-0 w-full sm:w-auto"
            >
                Deposit {tokenName}
            </Button>
        )}
    </div>
);

export default DepositStepItem;
