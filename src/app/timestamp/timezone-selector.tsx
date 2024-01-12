"use client";

import { getTzNameByOffset } from "./utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimezoneSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => idx - 11);

const TimezoneSelector = ({ value, onChange }: TimezoneSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {ALL_UTC_OFFSETS.map((utcOffset) => (
          <SelectItem key={utcOffset} value={getTzNameByOffset(utcOffset)}>
            {getTzNameByOffset(utcOffset)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TimezoneSelector;
