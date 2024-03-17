import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { atomWithValidatedStorage } from "@/utils/atom-with-validated-storage";
import { LocalStorageKey } from "@/constants/local-storage-key";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";

const PERSIST_SCHEMA = z.object({
  unit: z.literal("seconds").or(z.literal("milliseconds")),
  customTimezone: z.array(
    z.enum(
      [...ALL_UTC_OFFSETS, ...SUPPORTED_TIMEZONES].map(
        ({ value }) => value,
      ) as [string, ...string[]],
    ),
  ),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

export type TimestampUnit = Persist["unit"];

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistTimestamp,
  {
    unit: "seconds",
    customTimezone: [],
  },
  PERSIST_SCHEMA,
);

export const unitAtom = focusAtom(persistAtom, (optic) => optic.prop("unit"));
export const timezoneAtomsAtom = splitAtom(
  focusAtom(persistAtom, (optic) => optic.prop("customTimezone")),
);
