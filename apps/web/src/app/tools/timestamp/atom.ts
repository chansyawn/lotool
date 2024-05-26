import { atom } from "jotai";
import { atomWithDebounce } from "@/features/debounce/atom-with-debounce";
import { ALL_UTC_OFFSETS, MAX_TIMESTAMP, SUPPORTED_TIMEZONES } from "./constant";
import { getISOTimezoneNameByOffset, getTimezoneOffset, isDST } from "./utils";

const { currentValueAtom, debouncedValueAtom } = atomWithDebounce<number>(
  Number((new Date().valueOf() / 1000).toFixed(0)),
);

export const timestampAtom = atom(
  (get) => get(currentValueAtom),
  (_, set, value: number) => {
    const clampedValue = Math.min(Math.max(value, -MAX_TIMESTAMP), MAX_TIMESTAMP);
    set(debouncedValueAtom, clampedValue);
  },
);

export const supportedTimezonesAtom = atom((get) =>
  SUPPORTED_TIMEZONES.map((timezone) => getTimezoneInfo(timezone, get(debouncedValueAtom))),
);

export const allETCTimezonesAtom = atom((get) =>
  ALL_UTC_OFFSETS.map((timezone) => getTimezoneInfo(timezone, get(debouncedValueAtom))),
);

const getTimezoneInfo = (timezone: string, timestamp: number) => {
  return {
    label: timezone,
    offset: getISOTimezoneNameByOffset(getTimezoneOffset(timezone, timestamp)),
    dst: isDST(timezone, timestamp),
  };
};
