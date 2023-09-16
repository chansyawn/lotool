"use client";

import { formatRelative } from "date-fns";

type RelativeTimeProps = {
  timestamp: number;
};

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  return <div>({formatRelative(timestamp, new Date())})</div>;
}
