"use client";

import { useEffect, useState } from "react";

const CurrentTime = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date().valueOf());
  const currTimestampSeconds = (currentTimestamp / 1000).toFixed();

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentTimestamp(new Date().valueOf());
    }, 1000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <section>
      <div className="ml-auto text-4xl">{currTimestampSeconds}</div>
      <div>seconds since 1970/1/1</div>
    </section>
  );
};

export default CurrentTime;
