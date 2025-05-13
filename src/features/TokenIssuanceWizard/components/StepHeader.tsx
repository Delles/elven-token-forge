import React from "react";

export const StepHeader: React.FC<{ title: string; description: string }> = ({
    title,
    description,
}) => (
    <div className="text-center md:text-left mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-1">
            {title}
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
            {description}
        </p>
    </div>
);
