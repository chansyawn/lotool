"use client";

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
} from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
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

const TimestampBreakdown = ({ value, onChange, level, timezone }: TimestampBreakdownProps) => {
  const date = utcToZonedTime(value, timezone);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-1">
      {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, get }) => {
        let width = "7ch";
        if (field === "year") {
          const isPositiveYear = getYear(date) >= 0 ? 1 : -1;
          const yearLength = Math.max(4, ("" + getYear(addDays(value, isPositiveYear))).length);
          width = `${5 + yearLength}ch`;
        } else if (field === "milliseconds") {
          width = "7ch";
        }

        return (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={get(date) + (field === "month" ? 1 : 0)}
            width={width}
            onChange={(val: number) => {
              const targetTimestamp = zonedTimeToUtc(
                set(date, { [field]: val - (field === "month" ? 1 : 0) }),
                timezone,
              ).valueOf();
              if (!isNaN(targetTimestamp)) {
                onChange(targetTimestamp);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default TimestampBreakdown;
