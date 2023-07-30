"use client";

import { useState } from "react";
import TimestampBreakdownInput from "./TimestampBreakdownInput";
import dayjs from "@/utils/dayjs";
import { UnitTypeLong } from "dayjs";
import Select from "@/components/Select";

type TimestampBreakdownProps = {
  value: number;
  onChange: (val: number) => void;
  fixedOffset?: number;
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
  { label: "Millisecond", field: "millisecond" },
];

const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => idx - 11);

export default function TimestampBreakdown({
  value,
  onChange,
  fixedOffset,
  remark,
  millisecond = false,
}: TimestampBreakdownProps) {
  const [offset, setOffset] = useState(0);
  const date = dayjs.utc(value * (millisecond ? 1 : 1000)).utcOffset(fixedOffset ?? offset);

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
      <div>
        <div>Offset</div>
        {fixedOffset !== undefined ? (
          <div className="p-1">
            {`UTC${fixedOffset >= 0 ? "+" : ""}${fixedOffset}`} {remark && `(${remark})`}
          </div>
        ) : (
          <Select
            className="w-22"
            value={offset}
            onChange={(val) => setOffset(val)}
            options={ALL_UTC_OFFSETS.map((utcOffset) => ({
              label: `UTC${utcOffset >= 0 ? "+" : ""}${utcOffset}`,
              value: utcOffset,
            }))}
          />
        )}
      </div>
    </div>
  );
}
