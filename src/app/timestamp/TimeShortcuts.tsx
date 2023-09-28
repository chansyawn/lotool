"use client";

import clsx from "clsx";
import { addDays, addHours, startOfDay } from "date-fns";

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

export default function TimeShortcuts({ timestamp, onClick }: TimeShortcutsProps) {
  return (
    <div className="mt-2 flex select-none flex-wrap gap-2">
      {SHORTCUTS.map(({ name, getValue }) => (
        <span
          key={name}
          className={clsx(
            "cursor-pointer rounded border px-1 hover:bg-neutral-100",
            name !== "Now" && timestamp === getValue(timestamp) && "bg-neutral-100",
          )}
          onClick={() => onClick(getValue(timestamp))}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
