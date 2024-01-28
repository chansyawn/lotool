import { z } from "zod";
import { focusAtom } from "jotai-optics";
import atomWithValidatedStorage from "@/utils/atom-with-validated-storage";
import LocalStorageKey from "@/constants/local-storage-key";
import { TextEncoding } from "@/utils/codec/text";
import { CharacterEncoding } from "@/utils/codec/character";

const PERSIST_SCHEMA = z.object({
  textEncoding: z.nativeEnum(TextEncoding),
  characterEncoding: z.nativeEnum(CharacterEncoding),
  mode: z.literal("Encode").or(z.literal("Decode")),
  multiLineMode: z.boolean(),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistTextCodec,
  {
    textEncoding: TextEncoding.Base64,
    characterEncoding: CharacterEncoding.UTF_8,
    mode: "Encode",
    multiLineMode: false,
  },
  PERSIST_SCHEMA,
);

export const textEncodingAtom = focusAtom(persistAtom, (optic) => optic.prop("textEncoding"));
export const characterEncodingAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("characterEncoding"),
);
export const modeAtom = focusAtom(persistAtom, (optic) => optic.prop("mode"));
export const multiLineModeAtom = focusAtom(persistAtom, (optic) => optic.prop("multiLineMode"));
