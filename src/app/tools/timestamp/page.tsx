"use client";

import { ChangeEventHandler } from "react";
import { atom, useAtom } from "jotai";
import { PlusIcon } from "@radix-ui/react-icons";
import CurrentTime from "./current-time";
import TimestampUnitSwitcher from "./timestamp-unit-switcher";
import RelativeTime from "./relative-time";
import TimeShortcuts from "./time-shortcuts";
import { TimestampUnit, timezoneAtomsAtom, unitAtom } from "./persist";
import { fixTimestamp } from "./utils";
import { TimeBreakdownWithCustomTimezone, TimeBreakdownWithFixedTimezone } from "./time-breakdown";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Max timestamp in ECMAScript Date is milliseconds of ±100,000,000 days,
// minus two day for timezone convert correctly there.
// https://stackoverflow.com/questions/12666127/what-range-of-dates-are-permitted-in-javascript
// https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760
const MAX_TIMESTAMP = 1000 * 60 * 60 * 24 * (100000000 - 2);

const TimeUnitConfig: Record<TimestampUnit, { ratio: number; width: string }> = {
  seconds: { ratio: 1000, width: "17ch" },
  milliseconds: { ratio: 1, width: "20ch" },
};

const timestampAtom = atom<number | undefined>(undefined);

const Page = () => {
  const [unit, setUnit] = useAtom(unitAtom);
  const [timezoneAtoms, dispatchTimezones] = useAtom(timezoneAtomsAtom);
  const unitRatio = TimeUnitConfig[unit].ratio;

  const [_timestamp, setTimestamp] = useAtom(timestampAtom);
  const timestamp = _timestamp ?? fixTimestamp(new Date().valueOf(), unitRatio);
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

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.valueAsNumber) {
      return;
    }
    handleTimestampChange(+e.target.valueAsNumber * unitRatio);
  };

  const handleMillisecondModeChange = (value: TimestampUnit) => {
    setUnit(value);
    const targetRatio = TimeUnitConfig[value].ratio;
    handleTimestampChange((timestamp * targetRatio) / unitRatio);
  };

  const handleShortcutClick = (value: number) => {
    handleTimestampChange(fixTimestamp(value, unitRatio));
  };

  const handleAddTimezone = () => {
    dispatchTimezones({
      type: "insert",
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  return (
    <div className="space-y-1">
      <CurrentTime />
      <div className="flex flex-wrap items-baseline gap-2">
        <Input
          type="number"
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
        <div className="text-sm text-destructive">
          <p>Reach the max timestamp in ECMAScript Date (milliseconds of ±100,000,000 days)</p>
          <p>
            minus two day for timezone convert correctly there.
            <a
              className="ml-1 cursor-pointer underline"
              target="_blank"
              href="https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760"
            >
              Read More
            </a>
          </p>
        </div>
      )}
      <RelativeTime timestamp={timestamp} />
      <TimeShortcuts timestamp={timestamp} onClick={handleShortcutClick} />
      <TimeBreakdownWithFixedTimezone
        value={timestamp}
        level={unit}
        onChange={handleTimestampChange}
        timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
      />
      <TimeBreakdownWithFixedTimezone
        value={timestamp}
        level="minutes"
        onChange={handleTimestampChange}
        timezone="Etc/UTC"
        suffix={
          <Button size="icon" variant="secondary" onClick={handleAddTimezone}>
            <PlusIcon />
          </Button>
        }
      />
      {timezoneAtoms.map((atom, idx) => (
        <TimeBreakdownWithCustomTimezone
          key={idx}
          value={timestamp}
          level="minutes"
          onChange={handleTimestampChange}
          timezoneAtom={atom}
          onRemove={() => dispatchTimezones({ type: "remove", atom })}
        />
      ))}
    </div>
  );
};

export default Page;
