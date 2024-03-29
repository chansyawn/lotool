import { useCallback, useEffect, useState } from "react";
import { type TextEncoding } from "@lotool/lib/text-encoding";
import { type Hash } from "@lotool/lib/hash";
import { useWorkerFn } from "@/features/worker/use-worker-fn";
import { useDebounceFn } from "@/features/debounce/use-debounce";
import { type HashWorkerParameter, type HashWorkerResult } from "./hash-worker";

interface HashOptions {
  algorithm: Hash;
  outputEncoding: TextEncoding;
}

type UseHashOptions = HashOptions;

export const useHash = (input: Blob, { outputEncoding, algorithm }: UseHashOptions) => {
  const [output, setOutput] = useState("");

  const worker = useCallback(() => new Worker(new URL("./hash-worker.ts", import.meta.url)), []);
  const { run, running } = useWorkerFn<HashWorkerParameter, HashWorkerResult>(worker);
  const generateHash = useCallback(
    (...args: HashWorkerParameter) =>
      run(...args).then((value) => {
        setOutput(value);
      }),
    [run],
  );
  const debouncedGenerate = useDebounceFn(generateHash);

  useEffect(() => {
    debouncedGenerate(input, algorithm, outputEncoding);
  }, [algorithm, input, outputEncoding, debouncedGenerate]);

  return { output, running };
};
