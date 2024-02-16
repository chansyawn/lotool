"use client";

import CopyButton from "./copy-button";
import cn from "@/utils/cn";

type OutputAreaProps = {
  title: string;
  style?: React.CSSProperties;
  className?: string;
  value: string;
};

const OutputArea = ({ title, style, className, value }: OutputAreaProps) => {
  return (
    <div className={cn("flex flex-col overflow-hidden", className)} style={style}>
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="mr-auto text-lg font-medium">{title}</div>
        <CopyButton data={value} variant="ghost" />
      </div>
      <div className="flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground shadow-sm">
        {value}
      </div>
    </div>
  );
};

export default OutputArea;
