import { useCallback, useEffect, useState } from "react";
import { TextEncoding, TEXT_ENCODING_LIST } from "@/utils/codec/text";
import { CHARACTER_ENCODING_LIST, CharacterEncoding } from "@/utils/codec/character";
import { HASH_LIST, Hash } from "@/utils/hash";

type useHashOptions = {
  multiLineMode: boolean;
  textEncoding: TextEncoding;
  characterEncoding: CharacterEncoding;
  enabledAlgorithm: Hash[];
};

type HashOptions = {
  algorithm: Hash;
  characterEncoding: CharacterEncoding;
  textEncoding: TextEncoding;
};

const useHash = (
  input: string,
  { multiLineMode, textEncoding, characterEncoding, enabledAlgorithm }: useHashOptions,
) => {
  const [output, setOutput] = useState<{ algorithm: Hash; value: string }[]>([]);

  const hash = useCallback(
    async (text: string, { algorithm, characterEncoding, textEncoding }: HashOptions) => {
      try {
        const data = CHARACTER_ENCODING_LIST[characterEncoding].encode(text);
        const hash = await HASH_LIST[algorithm](data);
        return TEXT_ENCODING_LIST[textEncoding].encode(new Uint8Array(hash));
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
                hash(input, { algorithm, characterEncoding, textEncoding }),
              ),
            );
            return {
              algorithm,
              value: splittedValue.join("\n"),
            };
          }
          return {
            algorithm,
            value: await hash(text, { algorithm, characterEncoding, textEncoding }),
          };
        }),
      );
      setOutput(hashedList);
    },
    [characterEncoding, enabledAlgorithm, hash, multiLineMode, textEncoding],
  );

  useEffect(() => {
    getHashedTextList(input);
  }, [getHashedTextList, input]);

  return output;
};

export default useHash;
