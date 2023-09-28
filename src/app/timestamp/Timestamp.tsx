"use client";

import { ChangeEventHandler, useState } from "react";
import { useAtom } from "jotai";
import { PlusIcon } from "@heroicons/react/24/solid";
import RealTime from "./RealTime";
import TimestampUnitSwitcher from "./TimestampUnitSwitcher";
import { RelativeTime } from "./RelativeTime";
import TimeShortcuts from "./TimeShortcuts";
import { TimestampUnit, timezoneAtomsAtom, unitAtom } from "./memo";
import { fixTimestamp, getTzNameByOffset } from "./utils";
import {
  TimestampBreakdownWithCustomTimezone,
  TimestampBreakdownWithFixedTimezone,
} from "./TimestampBreakdownWithTimezone";
import Input from "@/components/Input";

const TimeUnitRatio: Record<TimestampUnit, number> = { seconds: 1000, milliseconds: 1 };

export default function Timestamp() {
  const [unit, setUnit] = useAtom(unitAtom);
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const unitRatio = TimeUnitRatio[unit];

  const [timestamp, setTimestamp] = useState(fixTimestamp(new Date().valueOf(), unitRatio));
  const [localUtcOffset] = useState(getTzNameByOffset(-new Date().getTimezoneOffset() / 60));
  const timestampDisplay = timestamp / unitRatio;

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.target.value;
    setTimestamp(value * unitRatio);
  };

  const handleMillisecondModeChange = (value: TimestampUnit, switchAndKeepValue: boolean) => {
    setUnit(value);
    const targetRatio = TimeUnitRatio[value];
    if (switchAndKeepValue) {
      setTimestamp((prev) => (prev * targetRatio) / unitRatio);
    } else {
      setTimestamp(fixTimestamp(timestamp, targetRatio));
    }
  };

  const handleShortcutClick = (value: number) => {
    setTimestamp(fixTimestamp(value, unitRatio));
  };

  return (
    <>
      <section className="mt-4">
        <RealTime />
      </section>
      <section className="mt-2">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Input type="number" className="w-48 px-2 text-xl" value={timestampDisplay} onChange={handleInput} />
          <TimestampUnitSwitcher value={unit} onChange={handleMillisecondModeChange} />
        </div>
        <RelativeTime timestamp={timestamp} />
        <TimeShortcuts timestamp={timestamp} onClick={handleShortcutClick} />
      </section>
      <section className="flex flex-col gap-y-1">
        <TimestampBreakdownWithFixedTimezone
          value={timestamp}
          level={unit}
          onChange={setTimestamp}
          timezone={localUtcOffset}
          remark="(your)"
        />
        <TimestampBreakdownWithFixedTimezone
          value={timestamp}
          level="hours"
          onChange={setTimestamp}
          timezone={getTzNameByOffset(0)}
          remark="(UTC)"
        />
        {timezoneAtoms.map((atom, idx) => (
          <TimestampBreakdownWithCustomTimezone
            key={idx}
            value={timestamp}
            level="hours"
            onChange={setTimestamp}
            timezoneAtom={atom}
            onRemove={() => dispatchTimezones({ type: "remove", atom })}
          />
        ))}
        <button
          className="mt-2 flex items-center gap-1 self-start rounded border border-dashed px-2 py-1 hover:bg-neutral-100"
          onClick={() => dispatchTimezones({ type: "insert", value: getTzNameByOffset(0) })}
        >
          <PlusIcon className="inline h-4 w-4" /> Add Custom Timezone
        </button>
      </section>
    </>
  );
}
