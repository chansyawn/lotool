"use client";

import { useEffect, useState } from "react";

export default function RealTime() {
  const [currTimestamp, setCurrTimestamp] = useState(new Date().valueOf());
  const currTimestampSeconds = (currTimestamp / 1000).toFixed();

  useEffect(() => {
    const timeout = setInterval(() => {
      setCurrTimestamp(new Date().valueOf());
    }, 1000);

    return () => clearInterval(timeout);
  });

  return (
    <>
      <div className="ml-auto text-4xl">{currTimestampSeconds}</div>
      <div>seconds since 1970/1/1</div>
    </>
  );
}
