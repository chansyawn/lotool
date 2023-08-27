"use client";

import { useState } from "react";
import { UnitTypeLong } from "dayjs";
import TimestampBreakdownInput from "./TimestampBreakdownInput";
import TimezoneSelector from "./TimezoneSelector";
import dayjs from "@/utils/dayjs";

type TimestampBreakdownProps = {
  value: number;
  onChange: (val: number) => void;
  level: UnitTypeLong;
  utcOffset?: number;
  remark?: string;
  millisecond?: boolean;
};

const TIME_FIELDS: { label: string; field: UnitTypeLong; width: string }[] = [
  { label: "Year", field: "year", width: "4.75rem" },
  { label: "Month", field: "month", width: "3.75rem" },
  { label: "Day", field: "date", width: "3.75rem" },
  { label: "Hour", field: "hour", width: "3.75rem" },
  { label: "Minute", field: "minute", width: "3.75rem" },
  { label: "Second", field: "second", width: "3.75rem" },
  { label: "MilliSecond", field: "millisecond", width: "4.25rem" },
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
  const date = dayjs.utc(value * (millisecond ? 1 : 1000)).utcOffset(utcOffset ?? offset);
  const fieldIdx = TIME_FIELDS.findIndex(({ field }) => field === level);

  return (
    <div className="flex gap-x-2">
      <TimezoneSelector value={offset} onChange={setOffset} remark={remark} utcOffset={utcOffset} />
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {TIME_FIELDS.slice(0, fieldIdx + 1).map(({ label, field, width }) => (
          <TimestampBreakdownInput
            key={field}
            label={label}
            value={date[field]() + (field === "month" ? 1 : 0)}
            width={width}
            onChange={(val: number) =>
              onChange(date[field](val - (field === "month" ? 1 : 0)).valueOf() / (millisecond ? 1 : 1000))
            }
          />
        ))}
      </div>
    </div>
  );
}
