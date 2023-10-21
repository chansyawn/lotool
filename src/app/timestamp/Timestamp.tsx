"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import RealTime from "./RealTime";
import TimestampUnitSwitcher from "./TimestampUnitSwitcher";
import RelativeTime from "./RelativeTime";
import TimeShortcuts from "./TimeShortcuts";
import { TimestampUnit, timezoneAtomsAtom, unitAtom } from "./memo";
import { fixTimestamp, getTzNameByOffset } from "./utils";
import {
  TimestampBreakdownWithCustomTimezone,
  TimestampBreakdownWithFixedTimezone,
} from "./TimestampBreakdownWithTimezone";
import InputNumber from "@/components/InputNumber";

// Max timestamp in ECMAScript Date is milliseconds of ±100,000,000 days,
// minus two day for timezone convert correctly there.
// https://stackoverflow.com/questions/12666127/what-range-of-dates-are-permitted-in-javascript
// https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760
const MAX_TIMESTAMP = 1000 * 60 * 60 * 24 * (100000000 - 2);

const TimeUnitConfig: Record<TimestampUnit, { ratio: number; width: string }> = {
  seconds: { ratio: 1000, width: "17ch" },
  milliseconds: { ratio: 1, width: "20ch" },
};

const Timestamp = () => {
  const [unit, setUnit] = useAtom(unitAtom);
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const unitRatio = TimeUnitConfig[unit].ratio;

  const [timestamp, setTimestamp] = useState(fixTimestamp(new Date().valueOf(), unitRatio));
  const [localUtcOffset] = useState(getTzNameByOffset(-new Date().getTimezoneOffset() / 60));
  const timestampDisplay = timestamp / unitRatio;

  const handleTimestampChange = (value: number) => {
    if (value > MAX_TIMESTAMP) {
      setTimestamp(MAX_TIMESTAMP);
      return;
    }
    if (value < -MAX_TIMESTAMP) {
      setTimestamp(-MAX_TIMESTAMP);
      return;
    }
    setTimestamp(value);
  };

  const handleInput = (value: number) => {
    handleTimestampChange(value * unitRatio);
  };

  const handleMillisecondModeChange = (value: TimestampUnit, switchAndKeepValue: boolean) => {
    setUnit(value);
    const targetRatio = TimeUnitConfig[value].ratio;
    if (switchAndKeepValue) {
      handleTimestampChange((timestamp * targetRatio) / unitRatio);
    } else {
      handleTimestampChange(fixTimestamp(timestamp, targetRatio));
    }
  };

  const handleShortcutClick = (value: number) => {
    handleTimestampChange(fixTimestamp(value, unitRatio));
  };

  return (
    <>
      <section className="mt-4">
        <RealTime />
      </section>
      <section className="mt-2">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <InputNumber
            className={"px-2 text-xl"}
            style={{ width: TimeUnitConfig[unit].width }}
            value={timestampDisplay}
            onChange={handleInput}
            min={-MAX_TIMESTAMP / unitRatio}
            max={MAX_TIMESTAMP / unitRatio}
          />
          <TimestampUnitSwitcher value={unit} onChange={handleMillisecondModeChange} />
        </div>
        {Math.abs(timestamp) === MAX_TIMESTAMP && (
          <div className="text-sm text-error-text">
            <p>Reach the max timestamp in ECMAScript Date (milliseconds of ±100,000,000 days)</p>
            <p>
              minus two day for timezone convert correctly there.
              <a
                className="ml-1 cursor-pointer hover:underline"
                target="_blank"
                href="https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760"
              >
                Read More
              </a>
            </p>
          </div>
        )}
        <RelativeTime timestamp={timestamp} />
      </section>
      <section className="flex flex-col gap-y-1">
        <TimeShortcuts timestamp={timestamp} onClick={handleShortcutClick} />
        <TimestampBreakdownWithFixedTimezone
          value={timestamp}
          level={unit}
          onChange={handleTimestampChange}
          timezone={localUtcOffset}
          remark="(your)"
        />
        <TimestampBreakdownWithFixedTimezone
          value={timestamp}
          level="minutes"
          onChange={handleTimestampChange}
          timezone={getTzNameByOffset(0)}
          remark="(UTC)"
          suffix={
            <PlusCircleIcon
              className="mb-2 h-5 w-5 flex-shrink-0 cursor-pointer self-end text-success-solid hover:text-success-solid-hover"
              onClick={() => dispatchTimezones({ type: "insert", value: getTzNameByOffset(0) })}
            />
          }
        />
        {timezoneAtoms.map((atom, idx) => (
          <TimestampBreakdownWithCustomTimezone
            key={idx}
            value={timestamp}
            level="minutes"
            onChange={handleTimestampChange}
            timezoneAtom={atom}
            onRemove={() => dispatchTimezones({ type: "remove", atom })}
          />
        ))}
      </section>
    </>
  );
};

export default Timestamp;
