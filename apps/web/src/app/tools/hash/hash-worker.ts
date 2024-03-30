import { TEXT_ENCODING_LIST, TextEncoding } from "@lotool/lib/text-encoding";
import { type Hash, HASH_MAP } from "@lotool/lib/hash";

export type HashWorker = (
  input: Blob,
  algorithms: Hash[],
  options?: { outputEncoding?: TextEncoding; hmacKey?: Uint8Array },
) => { algorithm: Hash; output: string }[];

self.onmessage = async (e: MessageEvent<Parameters<HashWorker>>) => {
  const [input, algorithms, options] = e.data;
  const { outputEncoding = TextEncoding.BinaryHEX, hmacKey } = options ?? {};

  const stream = input.stream();
  const reader = stream.getReader();

  const hashFunctions = await Promise.all(
    algorithms.map(async (algorithm) => ({
      algorithm,
      hasher: await HASH_MAP[algorithm](hmacKey),
    })),
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition -- breaks if stream is empty
  while (true) {
    const res = await reader.read();
    if (res.done) break;
    hashFunctions.forEach(({ hasher }) => hasher.update(res.value));
  }

  const output: ReturnType<HashWorker> = hashFunctions.map(({ algorithm, hasher }) => ({
    algorithm,
    output: TEXT_ENCODING_LIST[outputEncoding].encode(hasher.digest("binary")),
  }));

  self.postMessage(output);
};
