import { useCallback, useEffect, useState } from "react";
import { TextEncoding, TEXT_ENCODING_LIST } from "@/libs/text-encoding";
import { CHARACTER_ENCODING_LIST, CharacterEncoding } from "@/libs/character-encoding";
import { HASH_LIST, Hash } from "@/libs/hash";

type useHashOptions = {
  multiLineMode: boolean;
  outputEncoding: TextEncoding;
  characterEncoding: CharacterEncoding;
  enabledAlgorithm: Hash[];
};

type HashOptions = {
  algorithm: Hash;
  characterEncoding: CharacterEncoding;
  outputEncoding: TextEncoding;
};

const useHash = (
  input: string,
  { multiLineMode, outputEncoding, characterEncoding, enabledAlgorithm }: useHashOptions,
) => {
  const [output, setOutput] = useState<{ algorithm: Hash; value: string }[]>([]);

  const hash = useCallback(
    async (text: string, { algorithm, characterEncoding, outputEncoding }: HashOptions) => {
      try {
        const data = CHARACTER_ENCODING_LIST[characterEncoding].encode(text);
        const hash = await HASH_LIST[algorithm](data);
        return TEXT_ENCODING_LIST[outputEncoding].encode(hash);
      } catch (e) {
        return "Invalid input";
      }
    },
    [],
  );

  const getHashedTextList = useCallback(
    async (text: string) => {
      const hashedList = await Promise.all(
        enabledAlgorithm.map(async (algorithm) => {
          if (multiLineMode) {
            const splittedText = text.split("\n");
            const splittedValue = await Promise.all(
              splittedText.map((input) =>
                hash(input, { algorithm, characterEncoding, outputEncoding }),
              ),
            );
            return {
              algorithm,
              value: splittedValue.join("\n"),
            };
          }
          return {
            algorithm,
            value: await hash(text, {
              algorithm,
              characterEncoding,
              outputEncoding,
            }),
          };
        }),
      );
      setOutput(hashedList);
    },
    [hash, characterEncoding, outputEncoding, enabledAlgorithm, multiLineMode],
  );

  useEffect(() => {
    getHashedTextList(input);
  }, [getHashedTextList, input]);

  return output;
};

export default useHash;
