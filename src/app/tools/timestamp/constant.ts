import { getOffset, getUtcTimezoneNameByOffset } from "./utils";

export const SUPPORTED_TIMEZONES = Intl.supportedValuesOf("timeZone").map((item) => ({
  label: item,
  value: item,
  offset: getOffset(item),
}));

export const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => ({
  label: getUtcTimezoneNameByOffset(60 * (idx - 14)),
  value: getUtcTimezoneNameByOffset(60 * (idx - 14)),
  offset: 60 * (idx - 11),
}));
