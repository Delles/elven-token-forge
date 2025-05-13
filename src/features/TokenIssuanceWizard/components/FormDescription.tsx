import React from "react";

export const FormDescription: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => <p className="text-xs text-muted-foreground/80 pt-1">{children}</p>;
