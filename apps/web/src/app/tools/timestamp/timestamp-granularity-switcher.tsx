"use client";

import { cn } from "@lotool/theme/utils";
import { TimestampGranularity } from "./timestamp-granularity";

interface TimestampGranularitySwitcherProps {
  value: TimestampGranularity;
  onChange: (value: TimestampGranularity) => void;
}

export function TimestampGranularitySwitcher({
  value,
  onChange,
}: TimestampGranularitySwitcherProps) {
  const renderOption = (timestampUnit: TimestampGranularity) => {
    return (
      <button
        key={timestampUnit}
        type="button"
        className={cn(
          "hover:text-primary flex h-6 items-center justify-center rounded-full px-2 text-center text-sm transition-colors",
          value === timestampUnit ? "bg-muted text-primary font-medium" : "text-muted-foreground",
        )}
        onClick={() => {
          onChange(timestampUnit);
        }}
      >
        {timestampUnit}
      </button>
    );
  };

  return (
    <div className="mb-2 flex flex-wrap">
      {Object.values(TimestampGranularity).map(renderOption)}
    </div>
  );
}
