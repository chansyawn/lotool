export const getEtcTimezoneNameByOffset = (offset: number) =>
  `Etc/GMT${offset >= 0 ? "+" : "-"}${Math.floor(Math.abs(offset / 60))}`;

export const getISOTimezoneNameByOffset = (offset: number) =>
  `${offset > 0 ? "-" : "+"}${Math.floor(Math.abs(offset / 60))
    .toString()
    .padStart(2, "0")}:${Math.abs(offset % 60)
    .toString()
    .padStart(2, "0")}`;

export const getTimezoneOffset = (timezone = "UTC", timestamp = new Date().getTime() / 1000) => {
  const date = new Date(Math.max(0, timestamp * 1000));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  return date.getTimezoneOffset() - (tzDate.getTime() - date.getTime()) / 6e4;
};

export const isDST = (timezone: string, timestamp: number) => {
  const year = new Date(timestamp * 1000).getUTCFullYear();
  const winterSolsticeOffset = getTimezoneOffset(timezone, Date.UTC(year, 11, 21) / 1000);
  const summerSolsticeOffset = getTimezoneOffset(timezone, Date.UTC(year, 6, 21) / 1000);
  if (winterSolsticeOffset === summerSolsticeOffset) {
    return false;
  }
  return getTimezoneOffset(timezone, timestamp) === summerSolsticeOffset;
};
