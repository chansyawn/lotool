export enum EncodeStandard {
  Base64,
  Base64_URL,
}

export const ENCODE_STANDARD_LIST: Record<
  EncodeStandard,
  {
    name: string;
    encode: (text: string) => string;
    decode: (encodedText: string) => string;
  }
> = {
  [EncodeStandard.Base64]: {
    name: "Base64",
    encode: (text) => btoa(text),
    decode: (encodedText) => atob(encodedText),
  },
  [EncodeStandard.Base64_URL]: {
    name: "Base64 URL",
    encode: (text) => btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""),
    decode: (encodedText) => atob(encodedText.replaceAll("-", "+").replaceAll("_", "/")),
  },
};
