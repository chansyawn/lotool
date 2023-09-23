"use client";

import { useDeferredValue, useEffect, useState } from "react";

const TIME_EMOJI_LIST = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];

export function RealTimeEmoji() {
  const [currHour, setCurrHour] = useState(0);
  const deferredCurrHour = useDeferredValue(currHour);

  useEffect(() => {
    setCurrHour(new Date().getHours());
    const updateInterval = setInterval(() => {
      setCurrHour(new Date().getHours());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return <span>{TIME_EMOJI_LIST[deferredCurrHour % 12]}</span>;
}
