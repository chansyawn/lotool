import {
  getDate,
  getHours,
  getMilliseconds,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
} from "date-fns";
import { getTimezoneOffset, getEtcTimezoneNameByOffset, getISOTimezoneNameByOffset } from "./utils";

export const SUPPORTED_TIMEZONES = Intl.supportedValuesOf("timeZone").map((item) => ({
  label: item,
  value: item,
  offset: getTimezoneOffset(item),
}));

export const ALL_UTC_OFFSETS = new Array(26).fill(0).map((_, idx) => ({
  label: getEtcTimezoneNameByOffset(60 * (idx - 14)),
  value: getEtcTimezoneNameByOffset(60 * (idx - 14)),
  offset: 60 * (idx - 11),
}));

const getIntlDateTimeFormatterPreset = (preset: "full" | "long" | "medium" | "short") => ({
  label: `Intl-${preset}`,
  formatter: (value: number, timezone: string) =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: preset,
      timeStyle: preset,
      timeZone: timezone,
    }).format(value),
});

export const TIME_FORMATTER: {
  label: string;
  formatter: (value: number, timezone: string) => string;
}[] = [
  {
    label: "ISO",
    formatter: (value, timezone) =>
      `${new Intl.DateTimeFormat("sv-SE", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: timezone,
      })
        .format(value)
        .replace(" ", "T")}${getISOTimezoneNameByOffset(getTimezoneOffset(timezone))}`,
  },
  getIntlDateTimeFormatterPreset("short"),
  getIntlDateTimeFormatterPreset("medium"),
  getIntlDateTimeFormatterPreset("long"),
  getIntlDateTimeFormatterPreset("full"),
];

export type TimeField =
  | "year"
  | "month"
  | "date"
  | "hours"
  | "minutes"
  | "seconds"
  | "milliseconds";

export const TIME_FIELDS: {
  label: string;
  field: TimeField;
  get: (value: Date | number) => number;
}[] = [
  { label: "Year", field: "year", get: getYear },
  { label: "Month", field: "month", get: getMonth },
  { label: "Day", field: "date", get: getDate },
  { label: "Hour", field: "hours", get: getHours },
  { label: "Minute", field: "minutes", get: getMinutes },
  { label: "Second", field: "seconds", get: getSeconds },
  { label: "Millisecond", field: "milliseconds", get: getMilliseconds },
];
