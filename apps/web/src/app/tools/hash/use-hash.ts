import { useCallback, useEffect, useState } from "react";
import { useWorkerFn } from "@/features/worker/use-worker-fn";
import { useDebounceFn } from "@/features/debounce/use-debounce";
import { type HashWorker } from "./hash-worker";

const worker = () => new Worker(new URL("./hash-worker.ts", import.meta.url));

export const useHash = (params: Parameters<HashWorker>) => {
  const [output, setOutput] = useState<ReturnType<HashWorker>>([]);
  const { run, running } = useWorkerFn<HashWorker>(worker);

  const setHashResult = useCallback(
    (...args: Parameters<HashWorker>) =>
      run(...args).then((value) => {
        setOutput(value);
      }),
    [run],
  );
  const { run: debouncedSetHashResult } = useDebounceFn(setHashResult);

  useEffect(() => {
    debouncedSetHashResult(...params);
  }, [debouncedSetHashResult, params]);

  return { output, running };
};
