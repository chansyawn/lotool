import { type TextEncoding, TEXT_ENCODING_LIST } from "@lotool/lib/text-encoding";
import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";

interface UseTextCodecOptions {
  mode: "Encode" | "Decode";
  multiLineMode: boolean;
  textEncoding: TextEncoding;
  characterEncoding: CharacterEncoding;
}

export const useTextCodec = (
  input: string,
  { mode, multiLineMode, textEncoding, characterEncoding }: UseTextCodecOptions,
) => {
  const generateOutput = (input: string) => {
    const { encode: encodeText, decode: decodeText } = TEXT_ENCODING_LIST[textEncoding];
    const { encode: encodeCharacter, decode: decodeCharacter } =
      CHARACTER_ENCODING_LIST[characterEncoding];

    const generateOutput = (content: string) => {
      if (mode === "Encode") {
        return encodeText(encodeCharacter(content));
      }
      return decodeCharacter(decodeText(content));
    };

    try {
      if (multiLineMode) {
        return input
          .split("\n")
          .map((content) => generateOutput(content))
          .join("\n");
      }
      return generateOutput(input);
    } catch (e) {
      return "Invalid input";
    }
  };

  return generateOutput(input);
};
