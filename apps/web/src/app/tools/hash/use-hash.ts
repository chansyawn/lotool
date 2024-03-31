import { useCallback, useEffect, useState } from "react";
import { type WorkerReturnType, useWorkerFn } from "@/features/worker/use-worker-fn";
import { type HashFunction } from "./hash-worker";

const worker = () => new Worker(new URL("./hash-worker.ts", import.meta.url));

const BIG_FILE_THRESHOLD = 10 * 1024 * 1024;

export const useHash = (params: Parameters<HashFunction>) => {
  const [input] = params;
  const [output, setOutput] = useState<WorkerReturnType<HashFunction>>([]);
  const [progress, setProgress] = useState(0);

  const handleWorkEnd = useCallback(() => {
    setProgress(0);
  }, []);

  const { run, running } = useWorkerFn<HashFunction, number>(worker, {
    processCallback: setProgress,
    onFinally: handleWorkEnd,
  });

  const setHashResult = useCallback(
    (...args: Parameters<HashFunction>) =>
      run(...args).then((value) => {
        setOutput(value);
      }),
    [run],
  );

  useEffect(() => {
    void setHashResult(...params);
  }, [setHashResult, params]);

  return {
    progress,
    output,
    // only show calculating progress if the input is big
    calculating: running && input.size > BIG_FILE_THRESHOLD,
    setHashResult,
  };
};
