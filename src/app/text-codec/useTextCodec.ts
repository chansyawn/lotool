import {
  TextEncoding,
  CharacterEncoding,
  CHARACTER_ENCODING_LIST,
  TEXT_ENCODING_LIST,
} from "./codec-method";

type useTextCodecOptions = {
  mode: "Encode" | "Decode";
  multiLineMode: boolean;
  textEncoding: TextEncoding;
  characterEncoding: CharacterEncoding;
};

const useTextCodec = (
  input: string,
  { mode, multiLineMode, textEncoding, characterEncoding }: useTextCodecOptions,
) => {
  const generateOutput = (input: string) => {
    const { encode: encodeText, decode: decodeText } = TEXT_ENCODING_LIST[textEncoding];
    const { encode: encodeCharacter, decode: decodeCharacter } =
      CHARACTER_ENCODING_LIST[characterEncoding];

    const generateOutput = (content: string) => {
      if (mode === "Encode") {
        return encodeText(encodeCharacter(content));
      } else {
        return decodeCharacter(decodeText(content));
      }
    };

    try {
      if (multiLineMode) {
        return input
          .split("\n")
          .map((content) => generateOutput(content))
          .join("\n");
      } else {
        return generateOutput(input);
      }
    } catch (e) {
      return "Invalid input";
    }
  };

  return generateOutput(input);
};

export default useTextCodec;
