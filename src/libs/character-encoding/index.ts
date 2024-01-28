import { utf8ToUtf16 } from "./utf16";

export enum CharacterEncoding {
  Ascii = "AscII",
  UTF_8 = "UTF-8",
  UTF_16LE = "UTF-16LE",
  UTF_16BE = "UTF-16BE",
}

export const CHARACTER_ENCODING_LIST: Record<
  CharacterEncoding,
  { encode: (text: string) => ArrayBuffer; decode: (binary: ArrayBuffer) => string }
> = {
  [CharacterEncoding.Ascii]: {
    encode: (text) => {
      if (!/^[\x00-\x7F]*$/.test(text)) {
        throw new Error("Unsupported ascii text.");
      }
      return new TextEncoder().encode(text);
    },
    decode: (binary) => new TextDecoder("ascii").decode(binary),
  },
  [CharacterEncoding.UTF_8]: {
    encode: (text) => new TextEncoder().encode(text),
    decode: (binary) => new TextDecoder("utf-8").decode(binary),
  },
  [CharacterEncoding.UTF_16LE]: {
    encode: (text) => utf8ToUtf16(new TextEncoder().encode(text), "LE"),
    decode: (binary) => new TextDecoder("utf-16le").decode(binary),
  },
  [CharacterEncoding.UTF_16BE]: {
    encode: (text) => utf8ToUtf16(new TextEncoder().encode(text), "BE"),
    decode: (binary) => new TextDecoder("utf-16be").decode(binary),
  },
};
