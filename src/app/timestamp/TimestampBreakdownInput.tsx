"use client";

import { ChangeEventHandler } from "react";
import Input from "@/components/Input";

type TimestampBreakdownInputProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
  width: string;
};

export default function TimestampBreakdownInput({ label, value, onChange, width }: TimestampBreakdownInputProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(+e.target.value);
  };

  return (
    <div>
      <span className="text-sm">{label}</span>
      <Input type="number" style={{ width }} className="block" value={value} onChange={handleInputChange} />
    </div>
  );
}
