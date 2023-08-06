"use client";

import { useEffect, useState } from "react";

export default function RealTime() {
  const [currTimestamp, setCurrTimestamp] = useState(0);
  const currTimestampSeconds = (currTimestamp / 1000).toFixed();

  useEffect(() => {
    setCurrTimestamp(new Date().valueOf());
    const updateInterval = setInterval(() => {
      setCurrTimestamp(new Date().valueOf());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <>
      <div className="ml-auto text-4xl">{currTimestampSeconds}</div>
      <div>seconds since 1970/1/1</div>
    </>
  );
}
