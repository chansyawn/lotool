export const getEtcTimezoneNameByOffset = (offset: number) =>
  `Etc/GMT${offset >= 0 ? "+" : "-"}${Math.floor(Math.abs(offset / 60))}`;

export const getISOTimezoneNameByOffset = (offset: number) =>
  `${offset > 0 ? "-" : "+"}${Math.floor(Math.abs(offset / 60))
    .toString()
    .padStart(2, "0")}:${Math.abs(offset % 60)
    .toString()
    .padStart(2, "0")}`;

export const getTimezoneOffset = (timeZone = "UTC") => {
  const utcDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  );
  const tzDate = new Date(new Date().toLocaleString("en-US", { timeZone }));
  return (utcDate.getTime() - tzDate.getTime()) / 6e4;
};

export const fixTimestamp = (timestamp: number, unitRatio: number) =>
  Number((timestamp / unitRatio).toFixed(0)) * unitRatio;
