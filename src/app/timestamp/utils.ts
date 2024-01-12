export const getTzNameByOffset = (offset: number) =>
  `${offset >= 0 ? "+" : "-"}${("" + Math.abs(offset)).padStart(2, "0")}:00`;

export const fixTimestamp = (timestamp: number, unitRatio: number) =>
  +(timestamp / unitRatio).toFixed(0) * unitRatio;

export const getOffset = (timeZone = "UTC", date = new Date()) => {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
  return (tzDate.getTime() - utcDate.getTime()) / 6e4;
};
