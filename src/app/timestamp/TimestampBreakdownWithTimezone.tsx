"use client";

import { PrimitiveAtom, useAtom } from "jotai";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import TimestampBreakdown, { TimestampBreakdownProps } from "./TimestampBreakdown";
import TimezoneSelector from "./TimezoneSelector";

type TimestampBreakdownWithFixedTimezoneProps = {
  remark: string;
  suffix?: React.ReactNode;
} & TimestampBreakdownProps;

export function TimestampBreakdownWithFixedTimezone({
  remark,
  timezone,
  suffix,
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
      {suffix}
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

  return (
    <div className="flex gap-x-2">
      <div className="w-24">
        <span className="text-sm">Timezone</span>
        <TimezoneSelector value={timezone} onChange={(val) => onTimezoneChange(val)} />
      </div>
      <TimestampBreakdown timezone={timezone} {...breakdownProps} />
      <MinusCircleIcon
        className="mb-2 h-5 w-5 cursor-pointer self-end text-neutral hover:text-neutral-300"
        onClick={onRemove}
      />
    </div>
  );
}
