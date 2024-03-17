import { binaryToString, stringToBinary } from "./binary";

export enum TextEncoding {
  Base64 = "Base64",
  Base64URL = "Base64 URL",
  Binary = "Binary",
  BinaryHEX = "Binary HEX",
}

export const TEXT_ENCODING_LIST: Record<
  TextEncoding,
  {
    encode: (binary: ArrayBuffer) => string;
    decode: (text: string) => ArrayBuffer;
  }
> = {
  [TextEncoding.Base64]: {
    encode: (binary) => btoa(String.fromCharCode(...new Uint8Array(binary))),
    decode: (text) =>
      Uint8Array.from(atob(text), (c) => c.charCodeAt(0)).buffer,
  },
  [TextEncoding.Base64URL]: {
    encode: (binary) =>
      btoa(String.fromCharCode(...new Uint8Array(binary)))
        .replaceAll("+", "-")
        .replaceAll("/", "_")
        .replaceAll("=", ""),
    decode: (text) =>
      Uint8Array.from(
        atob(text.replaceAll("-", "+").replaceAll("_", "/")),
        (c) => c.charCodeAt(0),
      ),
  },
  [TextEncoding.Binary]: {
    encode: (binary) => binaryToString(binary, 2),
    decode: (text) => stringToBinary(text, 2),
  },
  [TextEncoding.BinaryHEX]: {
    encode: (binary) => binaryToString(binary, 16),
    decode: (text) => stringToBinary(text, 16),
  },
};
