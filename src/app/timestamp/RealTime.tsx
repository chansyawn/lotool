"use client";

import { useEffect, useState } from "react";

const RealTime = () => {
  const [currTimestamp, setCurrTimestamp] = useState(new Date().valueOf());
  const currTimestampSeconds = (currTimestamp / 1000).toFixed();

  useEffect(() => {
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
};

export default RealTime;
