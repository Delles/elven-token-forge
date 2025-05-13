import React from "react";

interface FormDescriptionProps {
    children: React.ReactNode;
}

const FormDescription: React.FC<FormDescriptionProps> = ({ children }) => (
    <p className="text-xs text-muted-foreground/80 pt-1">{children}</p>
);

export default FormDescription;
