import { useCallback, useEffect, useState } from "react";
import { type TextEncoding, TEXT_ENCODING_LIST } from "@lotool/lib/text-encoding";
import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";
import { HASH_LIST, type Hash } from "@lotool/lib/hash";

interface UseHashOptions {
  multiLineMode: boolean;
  outputEncoding: TextEncoding;
  characterEncoding: CharacterEncoding;
  enabledAlgorithm: Hash[];
}

interface HashOptions {
  algorithm: Hash;
  characterEncoding: CharacterEncoding;
  outputEncoding: TextEncoding;
}

export const useHash = (
  input: string,
  { multiLineMode, outputEncoding, characterEncoding, enabledAlgorithm }: UseHashOptions,
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
    void getHashedTextList(input);
  }, [getHashedTextList, input]);

  return output;
};
