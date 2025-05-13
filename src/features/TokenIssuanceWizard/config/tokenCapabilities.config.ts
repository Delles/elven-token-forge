import {
    Coins,
    FileText,
    Users,
    Code2,
    CircleDollarSign,
    Palette,
    Zap,
    ShieldQuestion,
} from "lucide-react";
import { TokenDetails } from "./tokenForm.config";

export const capabilitiesConfig = [
    {
        group: "Supply Management",
        items: [
            {
                id: "canMint" as keyof TokenDetails,
                title: "Allow Minting",
                description: "Create new tokens after initial supply.",
                icon: Coins,
                isPermanent: true,
            },
            {
                id: "canBurn" as keyof TokenDetails,
                title: "Allow Burning",
                description: "Permanently destroy tokens from supply.",
                icon: FileText,
                isPermanent: true,
            },
        ],
    },
    {
        group: "Account & Token Control",
        items: [
            {
                id: "canFreeze" as keyof TokenDetails,
                title: "Allow Freezing",
                description: "Prevent specific accounts from transacting.",
                icon: Users,
                isPermanent: true,
            },
            {
                id: "canWipe" as keyof TokenDetails,
                title: "Allow Wiping",
                description: "Destroy tokens from a frozen account.",
                icon: Code2,
                isPermanent: true,
                dependsOn: "canFreeze",
            },
            {
                id: "canPause" as keyof TokenDetails,
                title: "Allow Pausing",
                description: "Halt all token transactions network-wide.",
                icon: CircleDollarSign,
                isPermanent: true,
            },
        ],
    },
    {
        group: "Ownership & Upgradability",
        items: [
            {
                id: "canChangeOwner" as keyof TokenDetails,
                title: "Allow Ownership Transfer",
                description: "Transfer token management rights.",
                icon: Palette,
                isPermanent: true,
            },
            {
                id: "canUpgrade" as keyof TokenDetails,
                title: "Allow Contract Upgrade",
                description: "Upgrade token's smart contract logic.",
                icon: Zap,
                isPermanent: true,
            },
            {
                id: "canAddSpecialRoles" as keyof TokenDetails,
                title: "Allow Role Assignment",
                description: "Assign special roles (e.g., minter, freezer).",
                icon: ShieldQuestion,
                isPermanent: true,
            },
        ],
    },
];

export const guidanceContentData: Record<
    string,
    {
        title: string;
        details: string;
        pros?: string[];
        cons?: string[];
        warning?: string;
    }
> = {
    default: {
        title: "Understanding Token Capabilities",
        details:
            "Token capabilities define the special actions that can be performed with your token. These are set on the blockchain when your token is issued. Some are permanent and cannot be changed later.",
        warning:
            "Choose wisely, as permanent capabilities define your token's fundamental nature.",
    },
    canMint: {
        title: "Capability: Allow Minting",
        details:
            "Enables the creation of new tokens after the initial supply is set. This increases the total supply of your token.",
        pros: [
            "Allows for inflation to fund development or rewards.",
            "Can be used for staking rewards or vesting schedules.",
        ],
        cons: [
            "Can dilute existing token holders if not managed carefully.",
            "Requires trust in the minting authority.",
        ],
        warning:
            "This capability is permanent. If disabled, you can never mint more tokens.",
    },
    canBurn: {
        title: "Capability: Allow Burning",
        details:
            "Enables the permanent destruction of tokens, reducing the total supply. This can be done by any holder (if not restricted) or by an address with a special burn role.",
        pros: [
            "Can create deflationary pressure, potentially increasing token value.",
            "Useful for buy-back-and-burn mechanisms.",
        ],
        warning:
            "This capability is permanent. If disabled, tokens can never be programmatically burned by the issuer.",
    },
    canFreeze: {
        title: "Capability: Allow Freezing",
        details:
            "Allows an authorized address (holding the 'freeze' role) to prevent a specific account from sending or receiving this token.",
        pros: [
            "Useful for regulatory compliance.",
            "Can help mitigate theft in specific scenarios.",
        ],
        cons: [
            "Centralizes control, requires trust.",
            "Can be perceived negatively if misused.",
        ],
        warning: "This capability is permanent.",
    },
    canWipe: {
        title: "Capability: Allow Wiping",
        details:
            "Allows an authorized address (holding the 'wipe' role) to destroy tokens from an account that is currently frozen for this token.",
        pros: [
            "Can be used in severe cases like proven theft or legal requirements.",
        ],
        cons: [
            "Very centralized and powerful; can be seen as confiscation.",
            "High potential for misuse.",
        ],
        warning:
            "This capability is permanent and requires 'Allow Freezing' to be enabled. Use with extreme caution.",
    },
    canPause: {
        title: "Capability: Allow Pausing",
        details:
            "Allows an authorized address (holding the 'pause' role) to temporarily halt all transactions of this token across the entire network.",
        pros: [
            "Critical for security during contract upgrades or emergencies.",
        ],
        cons: ["Centralizes control; users cannot transact when paused."],
        warning: "This capability is permanent.",
    },
    canChangeOwner: {
        title: "Capability: Allow Ownership Transfer",
        details:
            "Allows the current token owner (the address that manages the token's roles and properties) to transfer these administrative rights to a new address.",
        pros: [
            "Essential for decentralization (e.g., to a DAO).",
            "Allows for project handovers.",
        ],
        warning: "This capability is permanent.",
    },
    canUpgrade: {
        title: "Capability: Allow Contract Upgrade",
        details:
            "Allows the token owner to upgrade the token's underlying smart contract logic by deploying a new version.",
        pros: ["Enables bug fixes and new features post-launch."],
        cons: [
            "Requires significant trust in the owner, as contract logic can be changed completely.",
        ],
        warning:
            "This capability is permanent and carries significant trust implications.",
    },
    canAddSpecialRoles: {
        title: "Capability: Allow Role Assignment",
        details:
            "Determines if special roles (like minter, freezer, pauser) can be assigned or revoked for this token after issuance.",
        pros: ["Flexible role management for DAOs or multi-sig controllers."],
        cons: ["Complexity in managing roles if not handled carefully."],
        warning:
            "This capability is permanent. Disabling it limits future flexibility in role delegation.",
    },
};
