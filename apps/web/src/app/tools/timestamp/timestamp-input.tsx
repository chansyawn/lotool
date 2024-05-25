import { useState } from "react";
import { Input } from "@lotool/ui";
import { PasteButton } from "@/components/paste-button";
import { type TimestampGranularity } from "./persist";
import {
  TIMESTAMP_GRANULARITY_VALUE_LENGTH,
  TimestampGranularitySwitcher,
} from "./timestamp-granularity-switcher";

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
  const [granularityValue, setGranularityValue] = useState(() => {
    const valueLength = TIMESTAMP_GRANULARITY_VALUE_LENGTH[granularity];
    return "0".repeat(valueLength);
  });

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

  return (
    <div>
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
      <TimestampGranularitySwitcher value={granularity} onChange={handleGranularityChange} />
    </div>
  );
}
