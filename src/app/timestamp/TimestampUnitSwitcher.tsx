"use client";

import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { useState } from "react";
import { TimestampUnit } from "./memo";

export const supportTimestampPrecisions = ["second", "millisecond"] as const;
export type TimestampPrecision = (typeof supportTimestampPrecisions)[number];

type TimestampUnitSwitcherProps = {
  value: TimestampUnit;
  onChange: (value: TimestampUnit, switchAndKeepInput: boolean) => void;
};

export default function TimestampUnitSwitcher({ value, onChange }: TimestampUnitSwitcherProps) {
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

  const renderOption = (value: TimestampUnit) => {
    return (
      <RadioGroup.Option value={value} className="inline cursor-pointer">
        {({ checked }) =>
          checked ? (
            <span className="rounded bg-neutral-200 px-1 font-medium">{value}</span>
          ) : (
            <Popover
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Popover.Button
                className="rounded px-1 outline-none hover:bg-neutral-100"
                onClick={getHandleOptionClick(value, false)}
              >
                {value}
              </Popover.Button>
              <Transition show={unitHovered}>
                <Popover.Panel
                  className="absolute -top-6 whitespace-nowrap rounded px-1 outline-none hover:bg-neutral-100"
                  onClick={getHandleOptionClick(value, true)}
                >
                  switch and keep input
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
        {renderOption("seconds")}
        <span className="px-1">/</span>
        {renderOption("milliseconds")}
      </div>
    </RadioGroup>
  );
}
