"use client";

import { useDeferredValue, useEffect, useState } from "react";

const TIME_EMOJI_LIST = ["🕛", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];

const CurrentTimeEmoji = () => {
  const [currentHour, setCurrentHour] = useState(0);
  const deferredCurrHour = useDeferredValue(currentHour);

  useEffect(() => {
    setCurrentHour(new Date().getHours());
    const updateInterval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return <span>{TIME_EMOJI_LIST[deferredCurrHour % 12]}</span>;
};

export default CurrentTimeEmoji;
