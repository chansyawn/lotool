"use client";

import { useEffect, useState } from "react";

export function CurrentTime() {
  const [currentTimestamp, setCurrentTimestamp] = useState(
    new Date().valueOf(),
  );
  const currTimestampSeconds = (currentTimestamp / 1000).toFixed();

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentTimestamp(new Date().valueOf());
    }, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  return (
    <div>
      <div className="ml-auto text-4xl">{currTimestampSeconds}</div>
      <div>seconds since 1970/1/1</div>
    </div>
  );
}
