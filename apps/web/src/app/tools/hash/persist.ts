import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { TextEncoding } from "@lotool/lib/text-encoding";
import { CharacterEncoding } from "@lotool/lib/character-encoding";
import { atomWithValidatedStorage } from "@/utils/atom-with-validated-storage";
import { LocalStorageKey } from "@/constants/local-storage-key";

const PERSIST_SCHEMA = z.object({
  outputEncoding: z.nativeEnum(TextEncoding),
  characterEncoding: z.nativeEnum(CharacterEncoding),
  multiLineMode: z.boolean(),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistHash,
  {
    outputEncoding: TextEncoding.BinaryHEX,
    characterEncoding: CharacterEncoding.UTF8,
    multiLineMode: false,
  },
  PERSIST_SCHEMA,
);

export const outputEncodingAtom = focusAtom(persistAtom, (optic) => optic.prop("outputEncoding"));
export const characterEncodingAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("characterEncoding"),
);
export const multiLineModeAtom = focusAtom(persistAtom, (optic) => optic.prop("multiLineMode"));
