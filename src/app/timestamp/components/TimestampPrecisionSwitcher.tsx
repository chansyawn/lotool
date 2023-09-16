"use client";

import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { useState } from "react";

export const supportTimestampPrecisions = ["second", "millisecond"] as const;
export type TimestampPrecision = (typeof supportTimestampPrecisions)[number];

type TimestampPrecisionSwitcherProps = {
  value: boolean;
  onChange: (isMillisecondMode: boolean, switchAndKeepValue: boolean) => void;
};

export default function TimestampPrecisionSwitcher({ value, onChange }: TimestampPrecisionSwitcherProps) {
  const [unitHovered, setUnitHovered] = useState(false);

  const handleMouseEnter = () => {
    setUnitHovered(true);
  };

  const handleMouseLeave = () => {
    setUnitHovered(false);
  };

  const getHandleOptionClick = (optionValue: boolean, switchAndKeepValue: boolean) => () => {
    onChange(optionValue, switchAndKeepValue);
    setUnitHovered(false);
  };

  const renderOption = (optionValue: boolean, label: string) => {
    return (
      <RadioGroup.Option value={optionValue} className="inline cursor-pointer">
        {({ checked }) =>
          checked ? (
            <span className="rounded bg-neutral-200 px-1 font-medium">{label}</span>
          ) : (
            <Popover className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Popover.Button
                className="rounded px-1 outline-none hover:bg-neutral-100"
                onClick={getHandleOptionClick(optionValue, false)}
              >
                {label}
              </Popover.Button>
              <Transition show={unitHovered}>
                <Popover.Panel
                  className="absolute -top-6 whitespace-nowrap rounded px-1 outline-none hover:bg-neutral-100"
                  onClick={getHandleOptionClick(optionValue, true)}
                >
                  {label}(switch and keep value)
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
