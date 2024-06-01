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
    <div className="relative">
      <Input
        type="number"
        style={{ width }}
        className="bg-transparent"
        value={value}
        onChange={(e) => {
          if (isNaN(e.target.valueAsNumber)) {
            return;
          }
          onChange(e.target.valueAsNumber);
        }}
      />
      <div className="absolute inset-y-0 right-4 -z-10 flex items-center text-xs leading-none opacity-40">
        {label}
      </div>
    </div>
  );
}
