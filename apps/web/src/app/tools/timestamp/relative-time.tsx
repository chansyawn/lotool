"use client";

import { formatDistance } from "date-fns";
import { useEffect, useState } from "react";

interface RelativeTimeProps {
  timestamp: number;
}

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(timestamp));

  useEffect(() => {
    setRelativeTime(getRelativeTime(timestamp));
    const updateInterval = setInterval(() => {
      setRelativeTime(getRelativeTime(timestamp));
    }, 1000);

    return () => {
      clearInterval(updateInterval);
    };
  }, [timestamp]);

  return <div className="text-muted-foreground ml-1">( {relativeTime} )</div>;
}

const getRelativeTime = (timestamp: number) => {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
};
