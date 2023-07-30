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
      {label}
      <Input type="number" className="block w-20" value={value} onChange={handleInputChange} />
    </div>
  );
}
