"use client";

import { Input } from "@lotool/ui";

interface TimestampBreakdownInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  width: string;
}

export function TimestampBreakdownInput({
  label,
  value,
  onChange,
  width,
}: TimestampBreakdownInputProps) {
  return (
    <div>
      <span className="text-sm">{label}</span>
      <Input
        type="number"
        style={{ width }}
        className="block"
        value={value}
        onChange={(e) => {
          if (isNaN(e.target.valueAsNumber)) {
            return;
          }
          onChange(e.target.valueAsNumber);
        }}
      />
    </div>
  );
}
