"use client";

import { Input } from "@lotool/ui";
import { Labeled } from "@/components/labeled";

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
    <Labeled label={label}>
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
    </Labeled>
  );
}
