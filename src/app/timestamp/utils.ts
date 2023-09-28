export const getTzNameByOffset = (offset: number) =>
  `${offset >= 0 ? "+" : "-"}${("" + Math.abs(offset)).padStart(2, "0")}:00`;

export const fixTimestamp = (timestamp: number, unitRatio: number) => +(timestamp / unitRatio).toFixed(0) * unitRatio;
