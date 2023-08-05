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

const TIME_FIELDS: { label: string; field: UnitTypeLong }[] = [
  { label: "Year", field: "year" },
  { label: "Month", field: "month" },
  { label: "Day", field: "date" },
  { label: "Hour", field: "hour" },
  { label: "Minute", field: "minute" },
  { label: "Second", field: "second" },
  { label: "MilliSec", field: "millisecond" },
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
      {TIME_FIELDS.filter(({ field }) => !(!millisecond && field === "millisecond")).map(({ label, field }) => (
        <TimestampBreakdownInput
          key={field}
          label={label}
          value={date[field]() + (field === "month" ? 1 : 0)}
          onChange={(val: number) =>
            onChange(date[field](val - (field === "month" ? 1 : 0)).valueOf() / (millisecond ? 1 : 1000))
          }
        />
      ))}
      <TimezoneSelector value={offset} onChange={setOffset} remark={remark} utcOffset={utcOffset} />
    </div>
  );
}
