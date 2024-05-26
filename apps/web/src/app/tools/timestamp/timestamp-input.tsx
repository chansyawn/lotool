import { useState } from "react";
import { Input, Tooltip, TooltipContent, TooltipTrigger } from "@lotool/ui";
import { PasteButton } from "@/components/paste-button";
import { TimestampGranularitySwitcher } from "./timestamp-granularity-switcher";
import { MAX_TIMESTAMP } from "./constant";
import {
  type TimestampGranularity,
  TIMESTAMP_GRANULARITY_VALUE_LENGTH,
} from "./timestamp-granularity";

interface TimestampInputProps {
  timestamp: number;
  onTimestampChange: (timestamp: number) => void;
  granularity: TimestampGranularity;
  onGranularityChange: (granularity: TimestampGranularity) => void;
}

export function TimestampInput({
  timestamp,
  onTimestampChange,
  granularity,
  onGranularityChange,
}: TimestampInputProps) {
  const granularityValueLength = TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity];
  const [granularityValue, setGranularityValue] = useState(() =>
    "0".repeat(granularityValueLength),
  );

  const handleValueChange = (value: string, valueLength: number) => {
    if (!/^-?[0-9]+$/.exec(value)) return;

    const timestampValue =
      valueLength === 0 ? Number(value) : Number(String(value).slice(0, -valueLength));
    const granularityValue = valueLength === 0 ? "" : String(value).slice(-valueLength);

    setGranularityValue(granularityValue);
    onTimestampChange(timestampValue);
  };

  const handleGranularityChange = (value: TimestampGranularity) => {
    onGranularityChange(value);
    handleValueChange(`${timestamp}${granularityValue}`, TIMESTAMP_GRANULARITY_VALUE_LENGTH[value]);
  };

  const isReachMaxTimestamp = Math.abs(timestamp) === MAX_TIMESTAMP;

  return (
    <div className="mt-1">
      <div className="mb-2 flex items-center gap-2">
        <div className="relative">
          <Input
            inputMode="numeric"
            style={{ width: `calc(${14 + granularityValueLength}ch + 2rem)` }}
            className="h-10 bg-transparent text-xl"
            value={`${timestamp}${granularityValue}`}
            onChange={(e) => {
              handleValueChange(e.target.value, granularityValueLength);
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 -z-[1] flex h-10 select-none items-center border border-transparent px-3 text-xl text-transparent">
            {timestamp}
            <span className="bg-secondary">{granularityValue}</span>
          </div>
        </div>
        <PasteButton
          variant="outline"
          onPaste={(value) => {
            handleValueChange(value, granularityValueLength);
          }}
        />
      </div>
      {isReachMaxTimestamp ? (
        <div className="text-destructive mb-1 px-1 text-xs">
          Reach the maximum supported timestamp.
          <Tooltip>
            <TooltipTrigger className="ml-1 underline">Why is {MAX_TIMESTAMP}?</TooltipTrigger>
            <TooltipContent>
              <p>Max timestamp in ECMAScript Date is milliseconds of ±100,000,000 days,</p>
              <p>
                minus two day for timezone convert correctly there.{" "}
                <a
                  className="ml-1 cursor-pointer underline"
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760"
                  rel="noopener"
                >
                  Read more
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      ) : null}
      <TimestampGranularitySwitcher value={granularity} onChange={handleGranularityChange} />
    </div>
  );
}
