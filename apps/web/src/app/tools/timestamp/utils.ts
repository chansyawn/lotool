export const getEtcTimezoneNameByOffset = (offset: number) =>
  `Etc/GMT${offset >= 0 ? "+" : "-"}${Math.floor(Math.abs(offset / 60))}`;

export const getISOTimezoneNameByOffset = (offset: number) =>
  `${offset > 0 ? "-" : "+"}${Math.floor(Math.abs(offset / 60))
    .toString()
    .padStart(2, "0")}:${Math.abs(offset % 60)
    .toString()
    .padStart(2, "0")}`;

export const getTimezoneOffset = (timezone = "UTC", timestamp = new Date().getTime()) => {
  const date = new Date(timestamp);
  const utcDate = new Date(date.toLocaleString(undefined, { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString(undefined, { timeZone: timezone }));
  return (utcDate.getTime() - tzDate.getTime()) / 6e4;
};

export const isTimezoneHaveDST = (timezone: string, timestamp: number) => {
  const year = new Date(timestamp).getUTCFullYear();
  const winterSolsticeOffset = getTimezoneOffset(timezone, Date.UTC(year, 11, 21));
  const summerSolsticeOffset = getTimezoneOffset(timezone, Date.UTC(year, 6, 21));
  return winterSolsticeOffset !== summerSolsticeOffset;
};

export const isDST = (timezone: string, timestamp: number) => {
  if (!isTimezoneHaveDST(timezone, timestamp)) {
    return false;
  }
  const year = new Date(timestamp).getUTCFullYear();
  const summerSolsticeOffset = getTimezoneOffset(timezone, Date.UTC(year, 6, 21));
  return getTimezoneOffset(timezone, timestamp) === summerSolsticeOffset;
};

export const fixTimestamp = (timestamp: number, unitRatio: number) =>
  Number((timestamp / unitRatio).toFixed(0)) * unitRatio;
