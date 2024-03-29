import { HASH_LIST, type Hash } from "@lotool/lib/hash";
import { TEXT_ENCODING_LIST, type TextEncoding } from "@lotool/lib/text-encoding";

export type HashWorkerParameter = [input: Blob, algorithm: Hash, outputEncoding: TextEncoding];
export type HashWorkerResult = string;

self.onmessage = async (e: MessageEvent<HashWorkerParameter>) => {
  const [input, algorithm, outputEncoding] = e.data;

  const arrayBuffer = await input.arrayBuffer();
  const hash = await HASH_LIST[algorithm](arrayBuffer);
  const output = TEXT_ENCODING_LIST[outputEncoding].encode(hash);

  self.postMessage(output);
};
