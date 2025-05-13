import React from "react"; // For JSX in content
import { TrendingUp, TrendingDown, GitCompareArrows } from "lucide-react"; // Import icons used in guidance

export const lpGuidanceContentData: Record<
    string,
    {
        title: string;
        details: React.ReactNode;
        warning?: string;
        analogy?: React.ReactNode;
    }
> = {
    default: {
        title: "Understanding Liquidity Provision",
        details:
            "When you provide liquidity, you deposit a pair of tokens into a pool. In return, you receive LP (Liquidity Provider) tokens representing your share of that pool. You earn trading fees, but be aware of Impermanent Loss.",
    },
    impermanentLoss: {
        title: "Impermanent Loss (IL) Explained",
        details: (
            <>
                <p className="mb-1 sm:mb-2">
                    Impermanent Loss occurs when the price of your deposited
                    assets changes compared to when you deposited them. The
                    bigger the divergence in price between the two assets, the
                    higher the IL.
                </p>
                <p className="mb-1 sm:mb-2">
                    <strong>
                        It's 'impermanent' because if prices return to their
                        original ratio, the loss disappears.
                    </strong>{" "}
                    However, if you withdraw when prices are different, the loss
                    becomes permanent.
                </p>
                <p>
                    You earn trading fees, which can offset IL. The key is
                    whether fees earned &gt; IL incurred.
                </p>
            </>
        ),
        analogy: (
            <div className="mt-2 sm:mt-3 border-t border-border/10 pt-2 sm:pt-3">
                <h5 className="text-xs font-semibold mb-1 text-foreground/80">
                    Simple Analogy: A Balanced Scale
                </h5>
                <div className="flex items-center justify-around p-1.5 sm:p-2 bg-muted/30 rounded-md">
                    <div className="text-center px-1">
                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-aurora-green mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-xs">Token A Value Up</p>
                    </div>
                    <GitCompareArrows className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground mx-1 sm:mx-2" />
                    <div className="text-center px-1">
                        <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-destructive mx-auto mb-0.5 sm:mb-1" />
                        <p className="text-xs">Token B Value Down</p>
                    </div>
                </div>
                <p className="text-xs mt-1 sm:mt-1.5 text-muted-foreground">
                    Imagine your LP tokens give you a share of a scale. If Token
                    A's price rises, the pool sells some A for B to keep value
                    balanced. You end up with less of the appreciated token (A)
                    and more of the depreciated one (B) than if you just held
                    them.
                </p>
            </div>
        ),
        warning:
            "IL is a complex risk in DeFi. Research thoroughly before providing liquidity, especially with volatile assets.",
    },
    deposits: {
        title: "Token Deposit Process",
        details:
            "For non-EGLD tokens, you'll first need to approve the xExchange smart contract to spend your tokens, then deposit them. EGLD is sent directly with the final 'Add Liquidity' transaction. Each approval and deposit might require a separate wallet confirmation.",
    },
};
