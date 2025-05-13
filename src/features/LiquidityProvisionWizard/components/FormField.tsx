import React from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
    id: string;
    label: string;
    children: React.ReactNode;
    description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    children,
    description,
}) => (
    <div className="space-y-1 sm:space-y-1.5">
        <Label htmlFor={id} className="font-medium text-sm">
            {label}
        </Label>
        {children}
        {description && (
            <p className="text-xs text-muted-foreground/80 pt-0.5">
                {description}
            </p>
        )}
    </div>
);

export default FormField;
