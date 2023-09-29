"use client";

import {
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  set,
} from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import TimestampBreakdownInput from "./TimestampBreakdownInput";

export type TimeField =
  | "year"
  | "month"
  | "date"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export type TimestampBreakdownProps = {
  value: number;
  onChange: (val: number) => void;
  level: TimeField;
  timezone: string;
};

const TIME_FIELDS: {
  label: string;
  field: TimeField;
  width: string;
  get: (value: Date | number) => number;
}[] = [
  { label: "Year", field: "year", width: "4.75rem", get: getYear },
  { label: "Month", field: "month", width: "3.75rem", get: getMonth },
  { label: "Day", field: "date", width: "3.75rem", get: getDate },
  { label: "Hour", field: "hours", width: "3.75rem", get: getHours },
  { label: "Minute", field: "minutes", width: "3.75rem", get: getMinutes },
  { label: "Second", field: "seconds", width: "3.75rem", get: getSeconds },
  { label: "Millisecond", field: "milliseconds", width: "4.25rem", get: getMilliseconds },
];

export default function TimestampBreakdown({
  value,
  onChange,
  level,
  timezone,
}: TimestampBreakdownProps) {
  const date = utcToZonedTime(value, timezone);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, width, get }) => {
        return (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={get(date) + (field === "month" ? 1 : 0)}
            width={width}
            onChange={(val: number) => {
              onChange(set(date, { [field]: val - (field === "month" ? 1 : 0) }).valueOf());
            }}
          />
        );
      })}
    </div>
  );
}
