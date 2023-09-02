"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type RelativeTimeProps = {
  timestamp: number;
};

export function RelativeTime({ timestamp }: RelativeTimeProps) {
  return <div>({dayjs(timestamp).fromNow()})</div>;
}
