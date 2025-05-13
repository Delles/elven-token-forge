import { TokenDetails } from "../config/tokenForm.config";

export const validateBasicInfo = (
    tokenDetails: Pick<TokenDetails, "name" | "ticker" | "supply" | "decimals">,
    onError: (message: string) => void
): boolean => {
    if (!tokenDetails.name.trim()) {
        onError("Token Name is required.");
        return false;
    }
    if (!tokenDetails.ticker.trim()) {
        onError("Token Ticker is required.");
        return false;
    }
    if (
        tokenDetails.ticker.length < 3 ||
        tokenDetails.ticker.length > 10 ||
        !/^[A-Z0-9]+$/.test(tokenDetails.ticker)
    ) {
        onError("Ticker must be 3-10 uppercase letters/numbers.");
        return false;
    }
    if (!tokenDetails.supply || parseFloat(tokenDetails.supply) <= 0) {
        onError("Initial Supply must be a positive number.");
        return false;
    }
    const decimals = parseInt(tokenDetails.decimals);
    if (isNaN(decimals) || decimals < 0 || decimals > 18) {
        onError("Decimals must be between 0 and 18.");
        return false;
    }
    return true;
};
