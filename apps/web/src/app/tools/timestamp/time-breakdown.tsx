"use client";

import { type PrimitiveAtom, useAtom } from "jotai";
import React, { useDeferredValue } from "react";
import { Button } from "@lotool/ui";
import { EarthIcon, MinusCircleIcon } from "lucide-react";
import { TimezoneSelector } from "./timezone-selector";
import { TimestampBreakdownInput } from "./time-breakdown-input";
import { getTimezoneOffset, toSecondTimestamp } from "./utils";
import { TIME_FIELDS } from "./constant";
import { TimestampCopyButton } from "./timestamp-copy-button";

export interface TimeBreakdownProps {
  value: number;
  onChange: (value: number) => void;
  timezone: string;
}

function TimeBreakdown({ value, onChange, timezone }: TimeBreakdownProps) {
  const timestamp = value * 1000;
  const realOffset = -new Date(timestamp).getTimezoneOffset() + getTimezoneOffset(timezone, value);

  const date = new Date(timestamp - realOffset * 6e4);
  const deferredValue = useDeferredValue(value);

  return (
    <>
      {TIME_FIELDS.map(({ label, field, get, set }) => {
        let width = "8ch";
        if (field === "year") {
          const isPositiveYear = date.getFullYear() < 0 ? 1 : 0;
          const yearLength = Math.max(4, String(date.getFullYear()).length);
          width = `calc(3rem + ${yearLength + isPositiveYear}ch)`;
        }

        return (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={get(date)}
            width={width}
            onChange={(value: number) => {
              const targetTimestamp = toSecondTimestamp(
                new Date(set(date, value) + realOffset * 6e4).valueOf(),
              );
              if (!Number.isNaN(targetTimestamp)) {
                onChange(targetTimestamp);
              }
            }}
          />
        );
      })}
      <TimestampCopyButton timestamp={deferredValue} timezone={timezone} />
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
  value,
  ...breakdownProps
}: TimeBreakdownWithCustomTimezoneProps) {
  const [timezone, onTimezoneChange] = useAtom(timezoneAtom);
  const deferredTimestamp = useDeferredValue(value);

  return (
    <div>
      <div className="flex gap-2">
        <TimezoneSelector
          value={timezone}
          onChange={onTimezoneChange}
          timestamp={deferredTimestamp}
        />
        <Button variant="secondary" size="icon" className="size-9" onClick={onRemove}>
          <MinusCircleIcon className="text-destructive size-4" />
        </Button>
      </div>
      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
        <TimeBreakdown value={value} timezone={timezone} {...breakdownProps} />
      </div>
    </div>
  );
}
