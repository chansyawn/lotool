import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { atomWithValidatedStorage } from "@/features/storage/atom-with-validated-storage";
import { LocalStorageKey } from "@/features/storage/local-storage-key";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";

const PERSIST_SCHEMA = z.object({
  customTimezone: z.array(
    z.enum([...ALL_UTC_OFFSETS, ...SUPPORTED_TIMEZONES] as [string, ...string[]]),
  ),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

export type TimestampUnit = "seconds" | "milliseconds";

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistTimestamp,
  {
    customTimezone: [],
  },
  PERSIST_SCHEMA,
);

export const timezoneAtomsAtom = splitAtom(
  focusAtom(persistAtom, (optic) => optic.prop("customTimezone")),
);
