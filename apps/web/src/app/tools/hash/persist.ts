import { z } from "zod";
import { focusAtom } from "jotai-optics";
import { TextEncoding } from "@lotool/lib/text-encoding";
import { CharacterEncoding } from "@lotool/lib/character-encoding";
import { Hash } from "@lotool/lib/hash";
import { atomWithValidatedStorage } from "@/features/storage/atom-with-validated-storage";
import { LocalStorageKey } from "@/features/storage/local-storage-key";

const PERSIST_SCHEMA = z.object({
  outputEncoding: z.nativeEnum(TextEncoding),
  characterEncoding: z.nativeEnum(CharacterEncoding),
  multiLineMode: z.boolean(),
  enabledAlgorithms: z.array(z.nativeEnum(Hash)),
  inputType: z.enum(["text", "file"]),
});

type Persist = z.infer<typeof PERSIST_SCHEMA>;

const persistAtom = atomWithValidatedStorage<Persist>(
  LocalStorageKey.ToolPersistHash,
  {
    outputEncoding: TextEncoding.BinaryHEX,
    characterEncoding: CharacterEncoding.UTF8,
    multiLineMode: false,
    enabledAlgorithms: [Hash.MD5, Hash.SHA1, Hash.SHA256, Hash.SHA512],
    inputType: "text",
  },
  PERSIST_SCHEMA,
);

export const outputEncodingAtom = focusAtom(persistAtom, (optic) => optic.prop("outputEncoding"));
export const characterEncodingAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("characterEncoding"),
);
export const multiLineModeAtom = focusAtom(persistAtom, (optic) => optic.prop("multiLineMode"));
export const enabledAlgorithmsAtom = focusAtom(persistAtom, (optic) =>
  optic.prop("enabledAlgorithms"),
);
export const inputTypeAtom = focusAtom(persistAtom, (optic) => optic.prop("inputType"));
