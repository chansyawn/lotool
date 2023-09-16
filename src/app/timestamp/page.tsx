"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import RealTime from "./components/RealTime";
import TimestampBreakdown from "./components/TimestampBreakdown";
import TimestampPrecisionSwitcher from "./components/TimestampPrecisionSwitcher";
import { RelativeTime } from "./components/RelativeTime";
import { RealTimeEmoji } from "./components/RealTimeEmoji";
import TimeShortcuts from "./components/TimeShortcuts";
import Input from "@/components/Input";

export default function Timestamp() {
  const [timestamp, setTimestamp] = useState(0);
  const [millisecondMode, setMillisecondMode] = useState<boolean>(false);
  const [localUtcOffset, setLocalUtcOffset] = useState(0);

  const timestampDisplay = millisecondMode ? timestamp : (timestamp / 1000).toFixed(0);

  useEffect(() => {
    setTimestamp(new Date().valueOf());
    setLocalUtcOffset(-new Date().getTimezoneOffset() / 60);
  }, []);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.target.value;
    setTimestamp(millisecondMode ? value : value * 1000);
  };

  const handleMillisecondModeChange = (isMillisecondMode: boolean, switchAndKeepValue: boolean) => {
    setMillisecondMode(isMillisecondMode);
    if (switchAndKeepValue) {
      setTimestamp((prev) => (isMillisecondMode ? +(prev / 1000).toFixed(0) : prev * 1000));
    }
  };

  return (
    <>
      <div className="text-3xl font-semibold">
        <RealTimeEmoji />
        <span className="ml-1">Timestamp</span>
      </div>
      <section className="mt-4">
        <RealTime />
      </section>
      <section className="mt-2">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Input type="number" className="w-56 px-2 text-xl" value={timestampDisplay} onChange={handleInput} />
          <TimestampPrecisionSwitcher value={millisecondMode} onChange={handleMillisecondModeChange} />
        </div>
        <RelativeTime timestamp={timestamp} />
        <TimeShortcuts timestamp={timestamp} onClick={setTimestamp} />
      </section>
      <section className="flex flex-col gap-1">
        <TimestampBreakdown
          value={timestamp}
          level={millisecondMode ? "milliseconds" : "seconds"}
          onChange={setTimestamp}
          utcOffset={localUtcOffset}
          remark="(your)"
        />
        <TimestampBreakdown value={timestamp} level="hours" onChange={setTimestamp} utcOffset={0} remark="(GMT)" />
        <TimestampBreakdown value={timestamp} level="hours" onChange={setTimestamp} />
      </section>
      <section className="prose" />
    </>
  );
}
