"use client";

import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

type RelativeTimeProps = {
  timestamp: number;
};

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(timestamp));

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setRelativeTime(getRelativeTime(timestamp));
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [timestamp]);

  return <span>( {relativeTime} )</span>;
}

const getRelativeTime = (timestamp: number) => {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
};
