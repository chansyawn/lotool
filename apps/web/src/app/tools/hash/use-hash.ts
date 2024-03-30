import { useCallback, useEffect, useState } from "react";
import { useWorkerFn } from "@/features/worker/use-worker-fn";
import { useDebounceFn } from "@/features/debounce/use-debounce";
import { type HashWorker } from "./hash-worker";

export const useHash = (params: Parameters<HashWorker>) => {
  const [output, setOutput] = useState<ReturnType<HashWorker>>([]);

  const worker = useCallback(() => new Worker(new URL("./hash-worker.ts", import.meta.url)), []);
  const { run, running } = useWorkerFn<HashWorker>(worker);

  const generateHash = useCallback(
    (...args: Parameters<HashWorker>) =>
      run(...args).then((value) => {
        setOutput(value);
      }),
    [run],
  );
  const debouncedGenerate = useDebounceFn(generateHash);

  useEffect(() => {
    debouncedGenerate(...params);
  }, [debouncedGenerate, params]);

  return { output, running };
};
