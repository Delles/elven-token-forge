
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
        outline:
          "border border-input/30 bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:text-accent-foreground shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neo: "relative overflow-hidden bg-nm-accent-gradient text-white hover:brightness-110 active:brightness-95 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
        "neo-outline": "relative overflow-hidden border border-white/10 bg-background/30 backdrop-blur-md text-foreground hover:bg-white/10 shadow-nm-sm hover:shadow-nm-md active:shadow-nm-inner-soft",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
