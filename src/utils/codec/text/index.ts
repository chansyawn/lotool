import { base64ToBinary, binaryToBase64 } from "./base64";
import { binaryToString, stringToBinary } from "./binary";

export enum TextEncoding {
  Base64 = "Base64",
  Base64_URL = "Base64 URL",
  Binary = "Binary",
  Binary_HEX = "Binary HEX",
}

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
};
