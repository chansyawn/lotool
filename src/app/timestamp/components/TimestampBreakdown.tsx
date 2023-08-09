"use client";

import { useState } from "react";
import TimestampBreakdownInput from "./TimestampBreakdownInput";
import dayjs from "@/utils/dayjs";
import { UnitTypeLong } from "dayjs";
import TimezoneSelector from "./TimezoneSelector";

type TimestampBreakdownProps = {
  value: number;
  onChange: (val: number) => void;
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
  { label: "MilliSec", field: "millisecond", width: "4.25rem" },
];

export default function TimestampBreakdown({
  value,
  onChange,
  utcOffset,
  remark,
  millisecond = false,
}: TimestampBreakdownProps) {
  const [offset, setOffset] = useState(0);
  const date = dayjs.utc(value * (millisecond ? 1 : 1000)).utcOffset(utcOffset ?? offset);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {TIME_FIELDS.filter(({ field }) => !(!millisecond && field === "millisecond")).map(({ label, field, width }) => (
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
      <TimezoneSelector value={offset} onChange={setOffset} remark={remark} utcOffset={utcOffset} />
    </div>
  );
}
