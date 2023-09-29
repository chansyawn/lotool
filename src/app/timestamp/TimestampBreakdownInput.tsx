"use client";

import InputNumber from "@/components/InputNumber";

type TimestampBreakdownInputProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
  width: string;
};

export default function TimestampBreakdownInput({
  label,
  value,
  onChange,
  width,
}: TimestampBreakdownInputProps) {
  return (
    <div>
      <span className="text-sm">{label}</span>
      <InputNumber style={{ width }} className="block" value={value} onChange={onChange} />
    </div>
  );
}
