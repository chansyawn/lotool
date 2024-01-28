import { z } from "zod";
import { focusAtom } from "jotai-optics";
import atomWithValidatedStorage from "@/utils/atom-with-validated-storage";
import LocalStorageKey from "@/constants/local-storage-key";
import { TextEncoding } from "@/utils/codec/text";
import { CharacterEncoding } from "@/utils/codec/character";

const PERSIST_SCHEMA = z.object({
  outputEncoding: z.nativeEnum(TextEncoding),
  characterEncoding: z.nativeEnum(CharacterEncoding),
  multiLineMode: z.boolean(),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistTextCodec,
  {
    outputEncoding: TextEncoding.Binary_HEX,
    characterEncoding: CharacterEncoding.UTF_8,
    multiLineMode: false,
  },
  PERSIST_SCHEMA,
);

export const outputEncodingAtom = focusAtom(persistAtom, (optic) => optic.prop("outputEncoding"));
export const characterEncodingAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("characterEncoding"),
);
export const multiLineModeAtom = focusAtom(persistAtom, (optic) => optic.prop("multiLineMode"));
