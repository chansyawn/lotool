"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
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
import InputNumber from "@/components/InputNumber";

const TimeUnitRatio: Record<TimestampUnit, number> = { seconds: 1000, milliseconds: 1 };

export default function Timestamp() {
  const [unit, setUnit] = useAtom(unitAtom);
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const unitRatio = TimeUnitRatio[unit];

  const [timestamp, setTimestamp] = useState(fixTimestamp(new Date().valueOf(), unitRatio));
  const [localUtcOffset] = useState(getTzNameByOffset(-new Date().getTimezoneOffset() / 60));
  const timestampDisplay = timestamp / unitRatio;

  const handleInput = (value: number) => {
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
          <InputNumber
            className="w-48 px-2 text-xl"
            value={timestampDisplay}
            onChange={handleInput}
          />
          <TimestampUnitSwitcher value={unit} onChange={handleMillisecondModeChange} />
        </div>
        <RelativeTime timestamp={timestamp} />
      </section>
      <section className="flex flex-col gap-y-1">
        <TimeShortcuts timestamp={timestamp} onClick={handleShortcutClick} />
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
          suffix={
            <PlusCircleIcon
              className="mb-2 h-5 w-5 cursor-pointer self-end text-primary hover:text-primary-300"
              onClick={() => dispatchTimezones({ type: "insert", value: getTzNameByOffset(0) })}
            />
          }
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
      </section>
    </>
  );
}
