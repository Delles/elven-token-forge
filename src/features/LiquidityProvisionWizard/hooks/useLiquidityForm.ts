import { useState, useCallback, useMemo } from "react";
import {
    initialLiquidityDetails,
    LiquidityDetails,
} from "../config/liquidityForm.config";
import {
    calculateExpectedLpTokens,
    calculateLpFee,
} from "../../../utils/feeCalculations"; // Assuming feeCalculations.ts is in src/utils/

export const useLiquidityForm = () => {
    const [liquidityDetails, setLiquidityDetails] = useState<LiquidityDetails>(
        initialLiquidityDetails
    );
    const [risksAccepted, setRisksAccepted] = useState(false);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            // Allow only numbers and one dot for decimal inputs
            const processedValue = value.replace(/[^0-9.]/g, "");
            if (
                (name === "ownTokenAmount" || name === "pairingTokenAmount") &&
                processedValue.split(".").length > 2
            ) {
                // Prevent multiple dots
                return;
            }
            setLiquidityDetails((prev) => ({
                ...prev,
                [name]: processedValue,
            }));
        },
        []
    );

    const handleSelectChange = useCallback((name: string, value: string) => {
        setLiquidityDetails((prev) => ({ ...prev, [name]: value }));
    }, []);

    const calculateInitialPrice = useCallback(() => {
        const ownAmount = parseFloat(liquidityDetails.ownTokenAmount) || 0;
        const pairingAmount =
            parseFloat(liquidityDetails.pairingTokenAmount) || 0;
        if (ownAmount === 0 || pairingAmount === 0) return "0.000000";
        return (pairingAmount / ownAmount).toFixed(6);
    }, [liquidityDetails.ownTokenAmount, liquidityDetails.pairingTokenAmount]);

    const { expectedLpTokens, lpFee } = useMemo(() => {
        const ownAmountValid =
            liquidityDetails.ownTokenAmount &&
            !isNaN(parseFloat(liquidityDetails.ownTokenAmount));
        const pairingAmountValid =
            liquidityDetails.pairingTokenAmount &&
            !isNaN(parseFloat(liquidityDetails.pairingTokenAmount));

        const tokens =
            ownAmountValid && pairingAmountValid
                ? calculateExpectedLpTokens(
                      liquidityDetails.ownTokenAmount,
                      liquidityDetails.pairingTokenAmount
                  )
                : 0;
        const fee =
            ownAmountValid && pairingAmountValid
                ? calculateLpFee(
                      liquidityDetails.ownTokenAmount,
                      liquidityDetails.pairingTokenAmount
                  )
                : 0;
        return { expectedLpTokens: tokens, lpFee: fee };
    }, [liquidityDetails.ownTokenAmount, liquidityDetails.pairingTokenAmount]);

    return {
        liquidityDetails,
        setLiquidityDetails,
        risksAccepted,
        setRisksAccepted,
        handleInputChange,
        handleSelectChange,
        calculateInitialPrice,
        expectedLpTokens,
        lpFee,
    };
};
