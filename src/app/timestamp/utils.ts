export const getUtcTimezoneNameByOffset = (offset: number) =>
  `${offset >= 0 ? "+" : "-"}${("" + Math.abs(offset / 60)).padStart(2, "0")}:00`;

export const getOffset = (timeZone = "UTC") => {
  const utcDate = new Date(new Date().toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(new Date().toLocaleString("en-US", { timeZone }));
  return (tzDate.getTime() - utcDate.getTime()) / 6e4;
};

export const fixTimestamp = (timestamp: number, unitRatio: number) =>
  +(timestamp / unitRatio).toFixed(0) * unitRatio;
