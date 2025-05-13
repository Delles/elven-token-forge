import { LiquidityDetails } from "../config/liquidityForm.config";

export const validateTokenSelection = (
    details: Pick<LiquidityDetails, "ownToken" | "pairingToken">,
    onError: (message: string) => void
): boolean => {
    if (!details.ownToken) {
        onError("Please select your token.");
        return false;
    }
    if (!details.pairingToken) {
        onError("Please select the token to pair with.");
        return false;
    }
    return true;
};

export const validateAmounts = (
    details: Pick<
        LiquidityDetails,
        "ownToken" | "pairingToken" | "ownTokenAmount" | "pairingTokenAmount"
    >,
    onError: (message: string) => void
): boolean => {
    if (!details.ownTokenAmount || parseFloat(details.ownTokenAmount) <= 0) {
        onError(
            `Please enter a valid amount for ${
                details.ownToken || "your token"
            }.`
        );
        return false;
    }
    if (
        !details.pairingTokenAmount ||
        parseFloat(details.pairingTokenAmount) <= 0
    ) {
        onError(
            `Please enter a valid amount for ${
                details.pairingToken || "pairing token"
            }.`
        );
        return false;
    }
    return true;
};
