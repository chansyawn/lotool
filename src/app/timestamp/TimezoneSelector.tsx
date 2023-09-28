"use client";

import { getTzNameByOffset } from "./utils";
import Select from "@/components/Select";

type TimezoneSelectorProps = {
  value: string;
  onChange: (val: string) => void;
};

const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => idx - 11);

export default function TimezoneSelector({ value, onChange }: TimezoneSelectorProps) {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={ALL_UTC_OFFSETS.map((utcOffset) => ({
        label: getTzNameByOffset(utcOffset),
        value: getTzNameByOffset(utcOffset),
      }))}
    />
  );
}
