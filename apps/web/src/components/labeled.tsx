import { cn } from "@lotool/theme/utils";
import { Label } from "@lotool/ui";
import React from "react";

interface LabeledProps {
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: "vertical" | "horizontal";
}

export function Labeled({
  className,
  style,
  label,
  children,
  direction = "vertical",
}: LabeledProps) {
  return (
    <Label
      className={cn(
        className,
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row items-center",
      )}
      style={style}
    >
      <div className={cn(direction === "vertical" ? "mb-1.5 ml-0.5" : "mr-1.5")}>{label}</div>
      {children}
    </Label>
  );
}
