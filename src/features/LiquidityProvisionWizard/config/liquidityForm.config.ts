export type LiquidityDetails = {
    ownToken: string;
    pairingToken: string;
    ownTokenAmount: string;
    pairingTokenAmount: string;
};

export const initialLiquidityDetails: LiquidityDetails = {
    ownToken: "",
    pairingToken: "EGLD",
    ownTokenAmount: "",
    pairingTokenAmount: "",
};

export const mockUserTokens = [
    { name: "My Awesome Token", ticker: "MAT" },
    { name: "Example Token", ticker: "EXT" },
];

export const pairingTokensList = [
    { name: "MultiversX EGLD", ticker: "EGLD" },
    { name: "USD Coin", ticker: "USDC" },
];
