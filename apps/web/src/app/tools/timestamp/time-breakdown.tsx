"use client";

import { type PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import { addDays, getYear, set, addMinutes } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { Button, Badge } from "@lotool/ui";
import { TrashIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { TimezoneSelector } from "./timezone-selector";
import { TimestampBreakdownInput } from "./time-breakdown-input";
import { getTimezoneOffset } from "./utils";
import { TIME_FIELDS, TIME_FORMATTER, type TimeField } from "./constant";

export interface TimeBreakdownProps {
  value: number;
  onChange: (value: number) => void;
  level: TimeField;
  timezone: string;
}

function TimeBreakdown({ value, onChange, level, timezone }: TimeBreakdownProps) {
  const timezoneOffset = getTimezoneOffset(timezone);
  const date = addMinutes(new UTCDate(value), -timezoneOffset);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <>
      {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, get }) => {
        let width = "8ch";
        if (field === "year") {
          const isPositiveYear = getYear(date) >= 0 ? 1 : -1;
          const yearLength = Math.max(4, `${getYear(addDays(value, isPositiveYear))}`.length);
          width = `${6 + yearLength}ch`;
        } else if (field === "milliseconds") {
          width = "9ch";
        }

        return (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={get(date) + (field === "month" ? 1 : 0)}
            width={width}
            onChange={(value: number) => {
              const targetTimestamp = addMinutes(
                set(date, { [field]: value - (field === "month" ? 1 : 0) }),
                timezoneOffset,
              ).valueOf();
              if (!Number.isNaN(targetTimestamp)) {
                onChange(targetTimestamp);
              }
            }}
          />
        );
      })}
      <CopyButton
        mode="multiple"
        options={TIME_FORMATTER.map(({ label, formatter }) => ({
          key: label,
          label: (
            <span>
              {formatter(value, timezone)} <Badge variant="secondary">{label}</Badge>
            </span>
          ),
          data: formatter(value, timezone),
        }))}
        variant="secondary"
      />
    </>
  );
}

type TimeBreakdownWithFixedTimezoneProps = {
  suffix?: React.ReactNode;
} & TimeBreakdownProps;

export function TimeBreakdownWithFixedTimezone({
  timezone,
  suffix,
  ...breakdownProps
}: TimeBreakdownWithFixedTimezoneProps) {
  return (
    <div className="flex gap-x-2">
      <div className="w-40 flex-shrink-0 md:w-64">
        <span className="text-sm">Timezone</span>
        <Button className="w-full justify-start disabled:opacity-100" variant="outline" disabled>
          <span className="truncate">{timezone}</span>
        </Button>
      </div>
      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown timezone={timezone} {...breakdownProps} />
        {suffix}
      </div>
    </div>
  );
}

type TimeBreakdownWithCustomTimezoneProps = {
  timezoneAtom: PrimitiveAtom<string>;
  onRemove: () => void;
} & Omit<TimeBreakdownProps, "timezone">;

export function TimeBreakdownWithCustomTimezone({
  timezoneAtom,
  onRemove,
  ...breakdownProps
}: TimeBreakdownWithCustomTimezoneProps) {
  const [timezone, onTimezoneChange] = useAtom(timezoneAtom);

  return (
    <div className="flex gap-x-2">
      <div className="w-40 flex-shrink-0 md:w-64">
        <span className="text-sm">Timezone</span>
        <TimezoneSelector
          value={timezone}
          onChange={(value) => {
            onTimezoneChange(value);
          }}
        />
      </div>
      <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown timezone={timezone} {...breakdownProps} />
        <Button size="icon" variant="secondary" onClick={onRemove}>
          <TrashIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}
