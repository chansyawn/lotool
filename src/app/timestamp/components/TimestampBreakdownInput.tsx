"use client";

import Input from "@/components/Input";
import { ChangeEventHandler } from "react";

type TimestampBreakdownInputProps = {
  label: string;
  value: number;
  onChange: (val: number) => void;
};

export default function TimestampBreakdownInput({ label, value, onChange }: TimestampBreakdownInputProps) {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(+e.target.value);
  };

  return (
    <div>
      <span className="text-sm">{label}</span>
      <Input type="number" className="block w-[4.5rem]" value={value} onChange={handleInputChange} />
    </div>
  );
}
