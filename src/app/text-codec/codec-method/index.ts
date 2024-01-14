import { base64ToBinary, binaryToBase64 } from "./base64";
import { binaryToString, stringToBinary } from "./binary";
import { utf8ToUtf16 } from "./utf16";

export enum TextEncoding {
  Base64 = "Base64",
  Base64_URL = "Base64 URL",
  Binary = "Binary",
  Binary_HEX = "Binary HEX",
  URL = "URL",
}

export enum CharacterEncoding {
  Ascii = "AscII",
  UTF_8 = "UTF-8",
  UTF_16LE = "UTF-16LE",
  UTF_16BE = "UTF-16BE",
}

export const CHARACTER_ENCODING_LIST: Record<
  CharacterEncoding,
  {
    encode: (text: string) => Uint8Array;
    decode: (binary: Uint8Array) => string;
  }
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

export const TEXT_ENCODING_LIST: Record<
  TextEncoding,
  {
    encode: (binary: Uint8Array) => string;
    decode: (text: string) => Uint8Array;
  }
> = {
  [TextEncoding.Base64]: {
    encode: (binary) => binaryToBase64(binary),
    decode: (text) => base64ToBinary(text),
  },
  [TextEncoding.Base64_URL]: {
    encode: (binary) =>
      binaryToBase64(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""),
    decode: (text) => base64ToBinary(text.replaceAll("-", "+").replaceAll("_", "/")),
  },

  [TextEncoding.Binary]: {
    encode: (binary) => binaryToString(binary, 2),
    decode: (text) => stringToBinary(text, 2),
  },
  [TextEncoding.Binary_HEX]: {
    encode: (binary) => binaryToString(binary, 16),
    decode: (text) => stringToBinary(text, 16),
  },
  [TextEncoding.URL]: {
    encode: (binary) => encodeURI(new TextDecoder("utf-8").decode(binary)),
    decode: (text) => new TextEncoder().encode(decodeURI(text)),
  },
};
