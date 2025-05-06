
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-nm-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border/20 backdrop-blur-sm",
        neo: "border-accent/20 bg-white/30 dark:bg-base-grey/20 backdrop-blur-md text-foreground/90 shadow-nm-inner-soft hover:shadow-nm-sm transition-shadow",
        amethyst: "border-accent-amethyst/30 bg-accent-amethyst/10 backdrop-blur-md text-accent-amethyst shadow-nm-inner-soft",
        aurora: "border-accent-aurora-green/30 bg-accent-aurora-green/10 backdrop-blur-md text-accent-aurora-green shadow-nm-inner-soft",
        glow: "border-accent-glow-cyan/30 bg-accent-glow-cyan/10 backdrop-blur-md text-accent-glow-cyan shadow-nm-inner-soft",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
