"use client";

import { useState } from "react";
import { getDate, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getYear, set } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import TimestampBreakdownInput from "./TimestampBreakdownInput";
import TimezoneSelector from "./TimezoneSelector";

export type TimeField = "year" | "month" | "date" | "hours" | "minutes" | "seconds" | "milliseconds";

type TimestampBreakdownProps = {
  value: number;
  onChange: (val: number) => void;
  level: TimeField;
  utcOffset?: number;
  remark?: string;
  millisecond?: boolean;
};

const TIME_FIELDS: { label: string; field: TimeField; width: string; get: (value: Date | number) => number }[] = [
  { label: "Year", field: "year", width: "4.75rem", get: getYear },
  { label: "Month", field: "month", width: "3.75rem", get: getMonth },
  { label: "Day", field: "date", width: "3.75rem", get: getDate },
  { label: "Hour", field: "hours", width: "3.75rem", get: getHours },
  { label: "Minute", field: "minutes", width: "3.75rem", get: getMinutes },
  { label: "Second", field: "seconds", width: "3.75rem", get: getSeconds },
  { label: "MilliSecond", field: "milliseconds", width: "4.25rem", get: getMilliseconds },
];

export default function TimestampBreakdown({
  value,
  onChange,
  level,
  utcOffset,
  remark,
  millisecond,
}: TimestampBreakdownProps) {
  const [offset, setOffset] = useState(0);
  const realOffset = utcOffset ?? offset;
  const timezoneName = `${realOffset >= 0 ? "+" : "-"}${("" + Math.abs(realOffset)).padStart(2, "0")}:00`;

  const date = utcToZonedTime(value * (millisecond ? 1 : 1000), timezoneName);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <div className="flex gap-x-2">
      <div className="w-24">
        <span className="text-sm">Timezone</span>
        {utcOffset !== undefined ? (
          <div className="flex items-center p-1">
            {`UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`}
            <span className="ml-1 text-xs">{remark && `${remark}`}</span>
          </div>
        ) : (
          <TimezoneSelector value={offset} onChange={setOffset} />
        )}
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, width, get }) => {
          return (
            <TimestampBreakdownInput
              key={field}
              label={label}
              value={get(date) + (field === "month" ? 1 : 0)}
              width={width}
              onChange={(val: number) => {
                onChange(
                  set(date, { [field]: val - (field === "month" ? 1 : 0) }).valueOf() / (millisecond ? 1 : 1000),
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
