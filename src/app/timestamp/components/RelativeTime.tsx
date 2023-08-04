"use client";

import dayjs from "dayjs";

type RelativeTimeProps = {
  timestamp: number;
};

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  return <div>({dayjs(timestamp).fromNow()})</div>;
}
