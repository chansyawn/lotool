"use client";

import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { useState } from "react";

export const supportTimestampPrecisions = ["second", "millisecond"] as const;
export type TimestampPrecision = (typeof supportTimestampPrecisions)[number];

type TimestampPrecisionSwitcherProps = {
  value: boolean;
  onChange: (val: boolean, onlySwitchUnit: boolean) => void;
};

export default function TimestampPrecisionSwitcher({ value, onChange }: TimestampPrecisionSwitcherProps) {
  const [unitHovered, setUnitHovered] = useState(false);

  const handleMouseEnter = () => {
    setUnitHovered(true);
  };

  const handleMouseLeave = () => {
    setUnitHovered(false);
  };

  const getHandleOptionClick = (optionValue: boolean, onlySwitchUnit: boolean) => () => {
    onChange(optionValue, onlySwitchUnit);
    setUnitHovered(false);
  };

  const renderOption = (optionValue: boolean, label: string) => {
    return (
      <RadioGroup.Option value={optionValue} className="inline cursor-pointer">
        {({ checked }) =>
          checked ? (
            <span className="rounded bg-gray-200 px-1 font-medium">{label}</span>
          ) : (
            <Popover className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Popover.Button
                className="rounded px-1 outline-none hover:bg-gray-100"
                onClick={getHandleOptionClick(optionValue, true)}
              >
                {label}
              </Popover.Button>
              <Transition show={unitHovered}>
                <Popover.Panel
                  className="absolute -top-6 rounded px-1 outline-none hover:bg-gray-100"
                  onClick={getHandleOptionClick(optionValue, false)}
                >
                  {label}({optionValue ? "x" : "÷"}1000)
                </Popover.Panel>
              </Transition>
            </Popover>
          )
        }
      </RadioGroup.Option>
    );
  };

  return (
    <RadioGroup value={value}>
      <div className="flex">
        {renderOption(false, "seconds")}
        <span className="px-1">/</span>
        {renderOption(true, "milliseconds")}
      </div>
    </RadioGroup>
  );
}
