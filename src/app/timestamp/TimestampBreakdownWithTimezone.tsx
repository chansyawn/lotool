"use client";

import { PrimitiveAtom, useAtom } from "jotai";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import TimestampBreakdown, { TimestampBreakdownProps } from "./TimestampBreakdown";
import TimezoneSelector from "./TimezoneSelector";

type TimestampBreakdownWithFixedTimezoneProps = {
  remark: string;
} & TimestampBreakdownProps;

export function TimestampBreakdownWithFixedTimezone({
  remark,
  timezone,
  ...breakdownProps
}: TimestampBreakdownWithFixedTimezoneProps) {
  return (
    <div className="flex gap-x-2">
      <div className="w-24">
        <span className="text-sm">Timezone</span>
        <div className="flex items-center p-1">
          {timezone}
          <span className="ml-1 text-xs">{remark && `${remark}`}</span>
        </div>
      </div>
      <TimestampBreakdown timezone={timezone} {...breakdownProps} />
    </div>
  );
}

type TimestampBreakdownWithCustomTimezoneProps = {
  timezoneAtom: PrimitiveAtom<string>;
  onRemove: () => void;
} & Omit<TimestampBreakdownProps, "timezone">;

export function TimestampBreakdownWithCustomTimezone({
  timezoneAtom,
  onRemove,
  ...breakdownProps
}: TimestampBreakdownWithCustomTimezoneProps) {
  const [timezone, onTimezoneChange] = useAtom(timezoneAtom);
  const [hover, setHover] = useState(false);

  return (
    <div
      className="flex gap-x-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-24">
        <span className="text-sm">Timezone</span>
        <TimezoneSelector value={timezone} onChange={(val) => onTimezoneChange(val)} />
      </div>
      <TimestampBreakdown timezone={timezone} {...breakdownProps} />
      <Transition
        show={hover}
        className="mb-2 self-end"
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <MinusCircleIcon className="h-5 w-5 cursor-pointer text-red-400" onClick={onRemove} />
      </Transition>
    </div>
  );
}
