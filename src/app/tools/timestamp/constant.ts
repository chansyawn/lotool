import { getOffset, getUtcTimezoneNameByOffset } from "./utils";

export const SUPPORTED_TIMEZONES = Intl.supportedValuesOf("timeZone").map((item) => ({
  label: item,
  value: item,
  offset: getOffset(item),
}));

export const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => ({
  label: `UTC${getUtcTimezoneNameByOffset(60 * (idx - 11))}`,
  value: getUtcTimezoneNameByOffset(60 * (idx - 11)),
  offset: 60 * (idx - 11),
}));
