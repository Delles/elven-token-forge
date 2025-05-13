import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { TokenDetails } from "../config/tokenForm.config";

interface CapabilityCardProps {
    id: keyof TokenDetails;
    title: string;
    description: string;
    icon: React.ElementType;
    isPermanent?: boolean;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    onHover: () => void;
    onLeave: () => void;
    disabled?: boolean;
    dependencyMet?: boolean;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({
    id,
    title,
    description,
    icon: Icon,
    isPermanent,
    checked,
    onCheckedChange,
    onHover,
    onLeave,
    disabled,
    dependencyMet = true,
}) => (
    <div
        className={cn(
            "neo-panel p-3 sm:p-4 rounded-lg transition-all duration-200 hover:shadow-nm-lg relative",
            checked && dependencyMet
                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                : "border-border/20",
            disabled || !dependencyMet
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={() =>
            !(disabled || !dependencyMet) && onCheckedChange(!checked)
        }
    >
        <div className="flex items-start space-x-3">
            <div
                className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center flex-shrink-0 shadow-inner",
                    checked && dependencyMet
                        ? "bg-primary/10 text-primary"
                        : "bg-muted/50 text-muted-foreground"
                )}
            >
                <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <Label
                        htmlFor={id as string} // Cast id to string for htmlFor
                        className={cn(
                            "font-semibold text-sm",
                            disabled || !dependencyMet
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        )}
                    >
                        {title}
                    </Label>
                    <Switch
                        id={id as string} // Cast id to string for Switch id
                        checked={checked && dependencyMet}
                        onCheckedChange={onCheckedChange}
                        disabled={disabled || !dependencyMet}
                        className="ml-auto"
                    />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
                {isPermanent && (
                    <Badge
                        variant="outline"
                        className="mt-2 text-xs py-0.5 px-1.5 border-destructive/30 text-destructive/80"
                    >
                        <Lock className="w-2.5 h-2.5 mr-1" /> Permanent
                    </Badge>
                )}
                {!dependencyMet && (
                    <Badge
                        variant="destructive"
                        className="mt-2 text-xs py-0.5 px-1.5"
                    >
                        Requires 'Can Freeze'
                    </Badge>
                )}
            </div>
        </div>
    </div>
);
