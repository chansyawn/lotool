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
import { type TimestampUnit } from "./persist";

export const SUPPORTED_TIMEZONES = Intl.supportedValuesOf("timeZone");

export const ALL_UTC_OFFSETS = new Array(26)
  .fill(0)
  .map((_, idx) => getEtcTimezoneNameByOffset(60 * (idx - 14)));

// Max timestamp in ECMAScript Date is milliseconds of ±100,000,000 days,
// minus two day for timezone convert correctly there.
// https://stackoverflow.com/questions/12666127/what-range-of-dates-are-permitted-in-javascript
// https://en.wikipedia.org/wiki/Time_formatting_and_storage_bugs#Year_275,760
export const MAX_TIMESTAMP = 1000 * 60 * 60 * 24 * (100000000 - 2);

export const TIME_UNIT_RATIO: Record<TimestampUnit, number> = { seconds: 1000, milliseconds: 1 };

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
