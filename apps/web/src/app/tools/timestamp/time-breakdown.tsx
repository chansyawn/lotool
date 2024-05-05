"use client";

import { type PrimitiveAtom, useAtom } from "jotai";
import React from "react";
import { addDays, getYear, set, addMinutes } from "date-fns";
import { UTCDate } from "@date-fns/utc";
import { Button, Badge } from "@lotool/ui";
import { EarthIcon, MinusCircleIcon } from "lucide-react";
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

export function TimeBreakdownWithFixedTimezone({
  timezone,
  ...breakdownProps
}: TimeBreakdownProps) {
  return (
    <div>
      <div className="flex gap-2">
        <Button
          className="w-fit justify-start disabled:opacity-100"
          variant="secondary"
          size="sm"
          disabled
        >
          <EarthIcon className="mr-1 size-4" />
          <span className="truncate">{timezone}</span>
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown timezone={timezone} {...breakdownProps} />
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
    <div>
      <div className="flex gap-2">
        <TimezoneSelector
          value={timezone}
          onChange={(value) => {
            onTimezoneChange(value);
          }}
        />
        <Button variant="ghost" size="icon" className="size-9" onClick={onRemove}>
          <MinusCircleIcon className="size-4" />
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown timezone={timezone} {...breakdownProps} />
      </div>
    </div>
  );
}
