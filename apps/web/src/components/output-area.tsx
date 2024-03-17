"use client";

import React from "react";
import { cn } from "@lotool/theme/utils";
import { CopyButton } from "./copy-button";

interface OutputAreaProps {
  title: string;
  style?: React.CSSProperties;
  className?: string;
  value: string;
}

export function OutputArea({ title, style, className, value }: OutputAreaProps) {
  return (
    <div className={cn("flex flex-col overflow-hidden", className)} style={style}>
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="mr-auto text-lg font-medium">{title}</div>
        <CopyButton data={value} variant="ghost" />
      </div>
      <div className="bg-muted text-muted-foreground flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border px-3 py-2 text-sm shadow-sm">
        {value}
      </div>
    </div>
  );
}
