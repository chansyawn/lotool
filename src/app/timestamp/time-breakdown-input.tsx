"use client";

import { Input } from "@/components/ui/input";

type TimestampBreakdownInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  width: string;
};

const TimestampBreakdownInput = ({
  label,
  value,
  onChange,
  width,
}: TimestampBreakdownInputProps) => {
  return (
    <div>
      <span className="text-sm">{label}</span>
      <Input
        type="number"
        style={{ width }}
        className="block"
        value={value}
        onChange={(e) => {
          if (!e.target.valueAsNumber) {
            return;
          }
          onChange(e.target.valueAsNumber);
        }}
      />
    </div>
  );
};

export default TimestampBreakdownInput;
