import { atom } from "jotai";
import { atomWithDebounce } from "@/features/debounce/atom-with-debounce";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import {
  fixTimestamp,
  getEtcTimezoneNameByOffset,
  getISOTimezoneNameByOffset,
  getTimezoneOffset,
  isDST,
} from "./utils";
import { type TimestampUnit } from "./persist";

const { currentValueAtom, debouncedValueAtom } = atomWithDebounce<number>(
  fixTimestamp(new Date().valueOf(), 1000),
);

export const timestampAtom = atom(
  (get) => get(currentValueAtom),
  (_, set, value: number) => {
    set(debouncedValueAtom, value);
  },
);

export const unitAtom = atom<TimestampUnit>("seconds");

export const supportedTimezonesAtom = atom((get) => {
  return SUPPORTED_TIMEZONES.map((timezone) => ({
    label: timezone,
    offset: getISOTimezoneNameByOffset(getTimezoneOffset(timezone, get(debouncedValueAtom))),
    dst: isDST(timezone, get(debouncedValueAtom)),
  }));
});

export const allETCTimezonesAtom = atom((get) =>
  ALL_UTC_OFFSETS.map((timezone) => ({
    label: timezone,
    offset: getEtcTimezoneNameByOffset(getTimezoneOffset(timezone, get(debouncedValueAtom))),
    dst: false,
  })),
);
