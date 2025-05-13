import { useState, useCallback } from "react";
import { TokenDetails } from "../config/tokenForm.config";

export const useTokenForm = (
    initialDetails: TokenDetails,
    recommendedDefaults: Partial<TokenDetails>
) => {
    const [tokenDetails, setTokenDetails] =
        useState<TokenDetails>(initialDetails);
    const [useDefaults, setUseDefaults] = useState(true);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            let processedValue = value;
            if (name === "ticker") {
                processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
            }
            if (name === "supply" || name === "decimals") {
                processedValue = value.replace(/[^0-9]/g, "");
            }
            setTokenDetails((prev) => ({ ...prev, [name]: processedValue }));
        },
        []
    );

    const handleSwitchChange = useCallback(
        (name: keyof TokenDetails, checked: boolean) => {
            setTokenDetails((prev) => {
                const newState = { ...prev, [name]: checked };
                if (name === "canFreeze" && !checked) {
                    newState.canWipe = false;
                }
                return newState;
            });
        },
        []
    );

    const handleUseDefaultsChange = useCallback(
        (checked: boolean) => {
            setUseDefaults(checked);
            if (checked) {
                setTokenDetails((prev) => ({
                    ...prev,
                    ...recommendedDefaults,
                    canWipe:
                        recommendedDefaults.canFreeze === false
                            ? false
                            : recommendedDefaults.canWipe ?? false,
                }));
            }
        },
        [recommendedDefaults]
    );

    return {
        tokenDetails,
        setTokenDetails,
        useDefaults,
        handleInputChange,
        handleSwitchChange,
        handleUseDefaultsChange,
    };
};
