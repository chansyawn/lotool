"use client";

import { cn } from "@lotool/theme/utils";
import { TooltipContent, Tooltip, TooltipTrigger } from "@lotool/ui";
import { TIMESTAMP_GRANULARITY_VALUE_LENGTH, TimestampGranularity } from "./timestamp-granularity";

interface TimestampGranularitySwitcherProps {
  value: TimestampGranularity;
  onChange: (value: TimestampGranularity) => void;
}

export function TimestampGranularitySwitcher({
  value,
  onChange,
}: TimestampGranularitySwitcherProps) {
  const renderOption = (timestampUnit: TimestampGranularity) => {
    const granularityValueLength = TIMESTAMP_GRANULARITY_VALUE_LENGTH[timestampUnit];

    return (
      <Tooltip key={timestampUnit}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={cn(
              "hover:text-primary flex h-6 items-center justify-center rounded-full px-2 text-center text-sm transition-colors",
              value === timestampUnit
                ? "bg-muted text-primary font-medium"
                : "text-muted-foreground",
            )}
            onClick={() => {
              onChange(timestampUnit);
            }}
          >
            {timestampUnit}
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          1 {granularityValueLength === 0 ? "" : `/ 1${"0".repeat(granularityValueLength)}`} seconds
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="flex flex-wrap">{Object.values(TimestampGranularity).map(renderOption)}</div>
  );
}
