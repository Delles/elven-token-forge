export type TokenDetails = {
    name: string;
    ticker: string;
    supply: string;
    decimals: string;
    canMint: boolean;
    canBurn: boolean;
    canFreeze: boolean;
    canWipe: boolean;
    canPause: boolean;
    canChangeOwner: boolean;
    canUpgrade: boolean;
    canAddSpecialRoles: boolean;
};

export const initialTokenDetails: TokenDetails = {
    name: "",
    ticker: "",
    supply: "1000000",
    decimals: "18",
    canMint: true,
    canBurn: true,
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canChangeOwner: true,
    canUpgrade: true,
    canAddSpecialRoles: true,
};

export const recommendedDefaults: Partial<TokenDetails> = {
    canMint: true,
    canBurn: true,
    canFreeze: false,
    canWipe: false,
    canPause: false,
    canChangeOwner: true,
    canUpgrade: true,
    canAddSpecialRoles: true,
};
