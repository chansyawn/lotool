"use client";

import { useState } from "react";
import { TimestampUnit } from "./memo";

type TimestampUnitSwitcherProps = {
  value: TimestampUnit;
  onChange: (value: TimestampUnit, switchAndKeepInput: boolean) => void;
};

const TimestampUnitSwitcher = ({ value, onChange }: TimestampUnitSwitcherProps) => {
  const [unitHovered, setUnitHovered] = useState(false);

  const handleMouseEnter = () => {
    setUnitHovered(true);
  };

  const handleMouseLeave = () => {
    setUnitHovered(false);
  };

  const getHandleOptionClick = (value: TimestampUnit, switchAndKeepValue: boolean) => () => {
    onChange(value, switchAndKeepValue);
    setUnitHovered(false);
  };

  const renderOption = (timestamp: TimestampUnit) => {
    return value === timestamp ? (
      <div className="rounded bg-neutral-bg-active px-1 font-medium">{timestamp}</div>
    ) : (
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <button
          className="rounded px-1 outline-none hover:bg-neutral-bg-hover"
          onClick={getHandleOptionClick(timestamp, false)}
        >
          {timestamp}
        </button>
        {unitHovered && (
          <div className="absolute bottom-full pb-0.5">
            <div
              className="cursor-pointer whitespace-nowrap rounded px-1 outline-none hover:bg-neutral-bg-hover"
              onClick={getHandleOptionClick(timestamp, true)}
            >
              switch and keep input
            </div>
          </div>
        )}
      </div>
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
