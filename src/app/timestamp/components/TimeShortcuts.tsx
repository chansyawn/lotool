import clsx from "clsx";
import { addDays, startOfDay, startOfMonth, startOfYear, subDays } from "date-fns";

type TimeShortcutsProps = {
  timestamp: number;
  onClick: (value: number) => void;
};

const SHORTCUTS: { name: string; getValue: (timestamp: number) => number }[] = [
  { name: "00:00", getValue: (timestamp) => startOfDay(timestamp).valueOf() },
  { name: "Today", getValue: () => startOfDay(new Date()).valueOf() },
  { name: "Yesterday", getValue: () => addDays(startOfDay(new Date()), -1).valueOf() },
  { name: "Tomorrow", getValue: () => addDays(startOfDay(new Date()), 1).valueOf() },
];

export default function TimeShortcuts({ timestamp, onClick }: TimeShortcutsProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {SHORTCUTS.map(({ name, getValue }) => (
        <span
          key={name}
          className={clsx(
            "cursor-pointer rounded border px-1 hover:bg-neutral-100",
            timestamp === getValue(timestamp) && "bg-neutral-100",
          )}
          onClick={() => onClick(getValue(timestamp))}
        >
          {name}
        </span>
      ))}
    </div>
  );
}
