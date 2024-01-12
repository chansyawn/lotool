"use client";

import { TimestampUnit } from "./persist";

type TimestampUnitSwitcherProps = {
  value: TimestampUnit;
  onChange: (value: TimestampUnit) => void;
};

const TimestampUnitSwitcher = ({ value, onChange }: TimestampUnitSwitcherProps) => {
  const renderOption = (timestampUnit: TimestampUnit) => {
    return value === timestampUnit ? (
      <div className="rounded bg-secondary px-1 font-medium">{timestampUnit}</div>
    ) : (
      <button
        className="rounded px-1 outline-none hover:bg-secondary"
        onClick={() => onChange(timestampUnit)}
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
};

export default TimestampUnitSwitcher;
