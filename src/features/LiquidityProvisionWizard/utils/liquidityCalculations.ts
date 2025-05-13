export const calculateInitialPrice = (
    ownTokenAmountStr: string,
    pairingTokenAmountStr: string
): string => {
    const ownAmount = parseFloat(ownTokenAmountStr) || 0;
    const pairingAmount = parseFloat(pairingTokenAmountStr) || 0;
    if (ownAmount === 0 || pairingAmount === 0) return "0.000000";
    return (pairingAmount / ownAmount).toFixed(6);
};
