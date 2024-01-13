"use client";

import { PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import { MinusCircledIcon } from "@radix-ui/react-icons";
import {
  addDays,
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  set,
  addMinutes,
} from "date-fns";
import { UTCDate } from "@date-fns/utc";
import TimezoneSelector from "./timezone-selector";
import TimeBreakdownInput from "./time-breakdown-input";
import { getOffset } from "./utils";
import { Button } from "@/components/ui/button";

export type TimeField =
  | "year"
  | "month"
  | "date"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export type TimeBreakdownProps = {
  value: number;
  onChange: (value: number) => void;
  level: TimeField;
  timezone: string;
};

const TIME_FIELDS: {
  label: string;
  field: TimeField;
  get: (value: Date | number) => number;
}[] = [
  { label: "Year", field: "year", get: getYear },
  { label: "Month", field: "month", get: getMonth },
  { label: "Day", field: "date", get: getDate },
  { label: "Hour", field: "hours", get: getHours },
  { label: "Minute", field: "minutes", get: getMinutes },
  { label: "Second", field: "seconds", get: getSeconds },
  { label: "Millisecond", field: "milliseconds", get: getMilliseconds },
];

const TimeBreakdown = ({ value, onChange, level, timezone }: TimeBreakdownProps) => {
  const timezoneOffset = getOffset(timezone ?? "UTC");
  const date = addMinutes(new UTCDate(value), timezoneOffset);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, get }) => {
        let width = "8ch";
        if (field === "year") {
          const isPositiveYear = getYear(date) >= 0 ? 1 : -1;
          const yearLength = Math.max(4, ("" + getYear(addDays(value, isPositiveYear))).length);
          width = `${6 + yearLength}ch`;
        } else if (field === "milliseconds") {
          width = "8ch";
        }

        return (
          <TimeBreakdownInput
            key={field}
            label={label}
            value={get(date) + (field === "month" ? 1 : 0)}
            width={width}
            onChange={(value: number) => {
              const targetTimestamp = addMinutes(
                set(date, { [field]: value - (field === "month" ? 1 : 0) }),
                -timezoneOffset,
              ).valueOf();
              if (!Number.isNaN(targetTimestamp)) {
                onChange(targetTimestamp);
              }
            }}
          />
        );
      })}
    </div>
  );
};

type TimeBreakdownWithFixedTimezoneProps = {
  remark?: string;
  suffix?: React.ReactNode;
} & TimeBreakdownProps;

export const TimeBreakdownWithFixedTimezone = ({
  remark,
  timezone,
  suffix,
  ...breakdownProps
}: TimeBreakdownWithFixedTimezoneProps) => {
  return (
    <div className="flex gap-x-2">
      <div className="w-40 flex-shrink-0 xl:w-64">
        <span className="text-sm">Timezone</span>
        <Button className="w-full justify-start" variant="outline" disabled>
          <span className="truncate">
            {timezone}
            <span className="ml-1 text-xs">{remark && `${remark}`}</span>
          </span>
        </Button>
      </div>
      <TimeBreakdown timezone={timezone} {...breakdownProps} />
      {suffix}
    </div>
  );
};

type TimeBreakdownWithCustomTimezoneProps = {
  timezoneAtom: PrimitiveAtom<string>;
  onRemove: () => void;
} & Omit<TimeBreakdownProps, "timezone">;

export const TimeBreakdownWithCustomTimezone = ({
  timezoneAtom,
  onRemove,
  ...breakdownProps
}: TimeBreakdownWithCustomTimezoneProps) => {
  const [timezone, onTimezoneChange] = useAtom(timezoneAtom);

  return (
    <div className="flex gap-x-2">
      <div className="w-40 flex-shrink-0 xl:w-64">
        <span className="text-sm">Timezone</span>
        <TimezoneSelector value={timezone} onChange={(value) => onTimezoneChange(value)} />
      </div>
      <TimeBreakdown timezone={timezone} {...breakdownProps} />
      <MinusCircledIcon
        className="mb-2.5 h-4 w-4 flex-shrink-0 cursor-pointer self-end"
        onClick={onRemove}
      />
    </div>
  );
};
