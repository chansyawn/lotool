"use client";

import { addDays, addHours, startOfDay } from "date-fns";
import Button from "@/components/Button";

type TimeShortcutsProps = {
  timestamp: number;
  onClick: (value: number) => void;
};

const SHORTCUTS: { name: string; getValue: (timestamp: number) => number }[] = [
  { name: "Now", getValue: () => new Date().valueOf() },
  { name: "Today", getValue: () => startOfDay(new Date()).valueOf() },
  { name: "Yesterday", getValue: () => addDays(startOfDay(new Date()), -1).valueOf() },
  { name: "Tomorrow", getValue: () => addDays(startOfDay(new Date()), 1).valueOf() },
  { name: "00:00", getValue: (timestamp) => startOfDay(timestamp).valueOf() },
  { name: "6:00", getValue: (timestamp) => addHours(startOfDay(timestamp), 6).valueOf() },
  { name: "12:00", getValue: (timestamp) => addHours(startOfDay(timestamp), 12).valueOf() },
  { name: "18:00", getValue: (timestamp) => addHours(startOfDay(timestamp), 18).valueOf() },
];

const TimeShortcuts = ({ timestamp, onClick }: TimeShortcutsProps) => {
  return (
    <div className="mt-2 flex select-none flex-wrap gap-2">
      {SHORTCUTS.map(({ name, getValue }) => (
        <Button size="sm" key={name} onClick={() => onClick(getValue(timestamp))}>
          {name}
        </Button>
      ))}
    </div>
  );
};

export default TimeShortcuts;
