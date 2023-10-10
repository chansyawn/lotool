"use client";

import { Popover, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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

  const renderOption = (value: TimestampUnit) => {
    return (
      <RadioGroup.Option value={value} className="inline cursor-pointer">
        {({ checked }) =>
          checked ? (
            <div className="rounded bg-neutral-200 px-1 font-medium">{value}</div>
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
              <Transition as={Fragment} show={unitHovered}>
                <Popover.Panel
                  className="absolute bottom-full whitespace-nowrap rounded px-1 outline-none hover:bg-neutral-100"
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
};

export default TimestampUnitSwitcher;
