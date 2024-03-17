"use client";

import { type TimestampUnit } from "./persist";

interface TimestampUnitSwitcherProps {
  value: TimestampUnit;
  onChange: (value: TimestampUnit) => void;
}

export function TimestampUnitSwitcher({ value, onChange }: TimestampUnitSwitcherProps) {
  const renderOption = (timestampUnit: TimestampUnit) => {
    return value === timestampUnit ? (
      <div className="bg-secondary rounded px-1 font-medium">{timestampUnit}</div>
    ) : (
      <button
        type="button"
        className="hover:bg-secondary rounded px-1 outline-none"
        onClick={() => {
          onChange(timestampUnit);
        }}
      >
        {timestampUnit}
      </button>
    );
  };

  return (
    <div className="flex">
      {renderOption("seconds")}
      <span className="px-1">/</span>
      {renderOption("milliseconds")}
    </div>
  );
}
