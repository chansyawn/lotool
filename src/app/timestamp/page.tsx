"use client";

import Input from "@/components/Input";
import RealTime from "./components/RealTime";
import TimestampBreakdown from "./components/TimestampBreakdown";
import { ChangeEventHandler, useEffect, useState } from "react";
import TimestampPrecisionSwitcher from "./components/TimestampPrecisionSwitcher";
import dayjs from "dayjs";
import { RelativeTime } from "./components/RelativeTime";
import { RealTimeEmoji } from "./components/RealTimeEmoji";

export default function Timestamp() {
  const [timestamp, setTimestamp] = useState(0);
  const [millisecondMode, setMillisecondMode] = useState<boolean>(false);
  const [localUtcOffset, setLocalUtcOffset] = useState(0);

  useEffect(() => {
    setLocalUtcOffset(dayjs().utcOffset() / 60);
  }, []);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimestamp(+e.target.value);
  };

  const handleMillisecondModeChange = (value: boolean, onlySwitchUnit: boolean) => {
    setMillisecondMode(value);
    if (!onlySwitchUnit) {
      setTimestamp((prev) => (value ? prev * 1000 : +(prev / 1000).toPrecision(1)));
    }
  };

  return (
    <>
      <div className="mb-4 text-3xl font-semibold">
        <RealTimeEmoji />
        Timestamp
      </div>
      <section className="mb-2">
        <RealTime />
      </section>
      <section className="mb-2">
        <div className="flex items-baseline gap-2">
          <Input type="number" className="mb-1 w-56 px-2 text-xl" value={timestamp} onChange={handleInput} />
          <TimestampPrecisionSwitcher value={millisecondMode} onChange={handleMillisecondModeChange} />
        </div>
        <RelativeTime timestamp={timestamp * (millisecondMode ? 1 : 1000)} />
      </section>
      <section className="flex flex-col gap-1">
        <TimestampBreakdown
          value={timestamp}
          onChange={(val) => setTimestamp(val)}
          utcOffset={localUtcOffset}
          millisecond={millisecondMode}
        />
        <TimestampBreakdown
          value={timestamp}
          onChange={(val) => setTimestamp(val)}
          utcOffset={0}
          millisecond={millisecondMode}
        />
        <TimestampBreakdown value={timestamp} onChange={(val) => setTimestamp(val)} millisecond={millisecondMode} />
      </section>
      <section className="prose"></section>
    </>
  );
}
