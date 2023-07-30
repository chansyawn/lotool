"use client";

import Input from "@/components/Input";
import RealTime from "./components/RealTime";
import TimestampBreakdown from "./components/TimestampBreakdown";
import { ChangeEventHandler, useState } from "react";
import TimestampPrecisionSwitcher from "./components/TimestampPrecisionSwitcher";
import dayjs from "dayjs";

export default function Timestamp() {
  const [timestamp, setTimestamp] = useState(0);
  const [millisecond, setMillisecond] = useState<boolean>(false);

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTimestamp(+e.target.value);
  };

  return (
    <>
      <div className="mb-4 text-3xl font-semibold">Timestamp</div>
      <section className="mb-2 flex">
        <div className="mr-auto">
          <Input type="number" className="mb-1 block px-2 text-xl" value={timestamp} onChange={handleInput} />
          <TimestampPrecisionSwitcher value={millisecond} onChange={setMillisecond} />
        </div>
        <RealTime />
      </section>
      <section className="flex flex-col gap-1">
        <TimestampBreakdown
          value={timestamp}
          onChange={(val) => setTimestamp(val)}
          fixedOffset={dayjs().utcOffset() / 60}
          millisecond={millisecond}
        />
        <TimestampBreakdown
          value={timestamp}
          onChange={(val) => setTimestamp(val)}
          fixedOffset={0}
          millisecond={millisecond}
        />
        <TimestampBreakdown value={timestamp} onChange={(val) => setTimestamp(val)} millisecond={millisecond} />
      </section>
      <section className="prose"></section>
    </>
  );
}
