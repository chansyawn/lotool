import { TEXT_ENCODING_LIST, TextEncoding } from "@lotool/lib/text-encoding";
import { type Hash, HASH_MAP, withHMAC } from "@lotool/lib/hash";
import { createOnMessage } from "@/features/worker/use-worker-fn";

export interface HashOptions {
  outputEncoding?: TextEncoding;
  hmacKey?: ArrayBuffer;
}

export type HashFunction = (
  input: Blob,
  algorithms: Hash[],
  options?: HashOptions,
) => Promise<{ algorithm: Hash; output: string }[]>;

self.onmessage = createOnMessage<HashFunction, number>(
  (callback) => async (input, algorithms, options) => {
    const { outputEncoding = TextEncoding.BinaryHEX, hmacKey } = options ?? {};

    const stream = input.stream();
    const reader = stream.getReader();

    const hashFunctions = await Promise.all(
      algorithms.map(async (algorithm) => ({
        algorithm,
        hasher: await withHMAC(HASH_MAP[algorithm])(hmacKey ? new Uint8Array(hmacKey) : undefined),
      })),
    );

    let calculatedBinary = 0;
    const totalBinary = input.size;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition -- breaks if stream is empty
    while (true) {
      const res = await reader.read();
      if (res.done) break;
      hashFunctions.forEach(({ hasher }) => hasher.update(res.value));
      calculatedBinary += res.value.byteLength;
      callback(calculatedBinary / totalBinary);
    }

    const output = hashFunctions.map(({ algorithm, hasher }) => ({
      algorithm,
      output: TEXT_ENCODING_LIST[outputEncoding].encode(hasher.digest("binary")),
    }));

    return output;
  },
);
