import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { splitAtom } from "jotai/utils";
import atomWithValidatedStorage from "@/utils/atomWithValidatedStorage";
import LocalStorageKey from "@/constants/localStorageKey";

const timestampMemoSchema = z.object({
  unit: z.literal("seconds").or(z.literal("milliseconds")),
  customTimezone: z.array(z.string()),
});

type TimestampMemo = z.infer<typeof timestampMemoSchema>;

export type TimestampUnit = TimestampMemo["unit"];

const timestampMemoAtom = atomWithValidatedStorage<TimestampMemo>(
  LocalStorageKey.ToolTimestampMemo,
  {
    unit: "seconds",
    customTimezone: ["+00:00"],
  },
  timestampMemoSchema,
);

export const unitAtom = focusAtom(timestampMemoAtom, (optic) => optic.prop("unit"));
export const timezoneAtomsAtom = splitAtom(
  focusAtom(timestampMemoAtom, (optic) => optic.prop("customTimezone")),
);

export default timestampMemoAtom;
