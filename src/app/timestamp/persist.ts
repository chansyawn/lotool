import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import { ALL_UTC_OFFSETS, SUPPORTED_TIMEZONES } from "./constant";
import atomWithValidatedStorage from "@/utils/atom-with-validated-storage";
import LocalStorageKey from "@/constants/local-storage-key";

const timestampPersistSchema = z.object({
  unit: z.literal("seconds").or(z.literal("milliseconds")),
  customTimezone: z.array(
    z.enum(
      [...ALL_UTC_OFFSETS, ...SUPPORTED_TIMEZONES].map(({ value }) => value) as [
        string,
        ...string[],
      ],
    ),
  ),
});

type TimestampPersist = z.infer<typeof timestampPersistSchema>;

export type TimestampUnit = TimestampPersist["unit"];

const timestampPersistAtom = atomWithValidatedStorage<TimestampPersist>(
  LocalStorageKey.ToolTimestampPersist,
  {
    unit: "seconds",
    customTimezone: [],
  },
  timestampPersistSchema,
);

export const unitAtom = focusAtom(timestampPersistAtom, (optic) => optic.prop("unit"));
export const timezoneAtomsAtom = splitAtom(
  focusAtom(timestampPersistAtom, (optic) => optic.prop("customTimezone")),
);

export default timestampPersistAtom;
