import React from "react";
import { cn } from "@/lib/utils";

interface ReviewItemStaticProps {
    label: string;
    value?: string | React.ReactNode;
    children?: React.ReactNode;
    highlight?: boolean;
    primary?: boolean;
}

const ReviewItemStatic: React.FC<ReviewItemStaticProps> = ({
    label,
    value,
    children,
    highlight,
    primary,
}) => (
    <div
        className={cn(
            "p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-4 items-start text-sm",
            highlight && "bg-accent/5",
            primary && "bg-primary/5"
        )}
    >
        <div className="text-muted-foreground col-span-1">{label}</div>
        <div
            className={cn(
                "col-span-2 font-medium text-foreground break-words",
                primary && "text-primary font-semibold"
            )}
        >
            {value}
            {children}
        </div>
    </div>
);

export default ReviewItemStatic;
