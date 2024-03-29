import { useCallback, useRef, useState } from "react";

interface WorkerRef {
  thread: Worker;
  timeoutTimer: ReturnType<typeof setTimeout> | undefined;
}

interface UseWorkerOptions {
  timeout?: number;
}

export const useWorkerFn = <T extends unknown[], K>(
  worker: () => Worker,
  { timeout }: UseWorkerOptions = {},
) => {
  const [running, setRunning] = useState(false);
  const workerRef = useRef<WorkerRef>();

  const terminate = useCallback(() => {
    if (!workerRef.current) {
      return;
    }
    const { thread, timeoutTimer } = workerRef.current;
    clearTimeout(timeoutTimer);
    thread.terminate();
    workerRef.current = undefined;
    setRunning(false);
  }, []);

  const run = useCallback(
    (...args: T) => {
      return new Promise<K>((resolve, reject) => {
        if (workerRef.current) {
          terminate();
        }
        setRunning(true);
        const thread = worker();
        const timeoutTimer = timeout
          ? setTimeout(() => {
              terminate();
              reject(new Error("timeout"));
            }, timeout)
          : undefined;

        thread.postMessage(args);
        thread.onmessage = (e: MessageEvent<K>) => {
          resolve(e.data);
          terminate();
        };
        thread.onerror = (e) => {
          reject(new Error(e.message));
          terminate();
        };

        workerRef.current = { thread, timeoutTimer };
      });
    },
    [terminate, timeout, worker],
  );

  return {
    run,
    running,
  };
};
