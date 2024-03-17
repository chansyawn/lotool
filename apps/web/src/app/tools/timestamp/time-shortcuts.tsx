"use client";

import { addDays, addHours, startOfDay } from "date-fns";
import { Button } from "@lotool/ui";

interface TimeShortcutsProps {
  timestamp: number;
  onClick: (value: number) => void;
}

const SHORTCUTS: { name: string; getValue: (timestamp: number) => number }[] = [
  { name: "x1000", getValue: (timestamp) => timestamp * 1000 },
  { name: "÷1000", getValue: (timestamp) => timestamp / 1000 },
  { name: "Now", getValue: () => new Date().valueOf() },
  { name: "Today", getValue: () => startOfDay(new Date()).valueOf() },
  {
    name: "Yesterday",
    getValue: () => addDays(startOfDay(new Date()), -1).valueOf(),
  },
  {
    name: "Tomorrow",
    getValue: () => addDays(startOfDay(new Date()), 1).valueOf(),
  },
  { name: "00:00", getValue: (timestamp) => startOfDay(timestamp).valueOf() },
  {
    name: "6:00",
    getValue: (timestamp) => addHours(startOfDay(timestamp), 6).valueOf(),
  },
  {
    name: "12:00",
    getValue: (timestamp) => addHours(startOfDay(timestamp), 12).valueOf(),
  },
  {
    name: "18:00",
    getValue: (timestamp) => addHours(startOfDay(timestamp), 18).valueOf(),
  },
];

export function TimeShortcuts({ timestamp, onClick }: TimeShortcutsProps) {
  return (
    <div className="flex select-none flex-wrap gap-2">
      {SHORTCUTS.map(({ name, getValue }) => (
        <Button
          className="h-auto px-2 py-1"
          size="sm"
          variant="secondary"
          key={name}
          onClick={() => {
            onClick(getValue(timestamp));
          }}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}
