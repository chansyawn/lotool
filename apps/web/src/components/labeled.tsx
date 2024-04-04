import { Label } from "@lotool/ui";
import React from "react";

interface LabeledProps {
  label: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Labeled({ className, style, label, children }: LabeledProps) {
  return (
    <div className={className} style={style}>
      <Label className="mb-2 ml-0.5 block">{label}</Label>
      {children}
    </div>
  );
}
