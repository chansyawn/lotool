import { useCallback, useEffect, useRef, useState } from "react";
import { type PrimitiveFunctionAsync, type PrimitiveFunction } from "@/types/function";

export type WorkerReturnType<T extends PrimitiveFunction> = T extends PrimitiveFunctionAsync
  ? Awaited<ReturnType<T>>
  : ReturnType<T>;

interface WorkerRef {
  thread: Worker;
  timeoutTimer: ReturnType<typeof setTimeout> | undefined;
}

interface UseWorkerOptions<T> {
  timeout?: number;
  processCallback?: (content: T) => void;
  onStart?: () => void;
  onFinish?: () => void;
  onAbort?: () => void;
  onTimeout?: () => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

interface WorkerMessage<T> {
  type: "final" | "process";
  content: T;
}

export const useWorkerFn = <F extends PrimitiveFunction, C>(
  worker: () => Worker,
  {
    timeout,
    processCallback,
    onStart,
    onFinish,
    onAbort,
    onTimeout,
    onError,
    onFinally,
  }: UseWorkerOptions<C> = {},
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
    (...args: Parameters<F>) => {
      return new Promise<WorkerReturnType<F>>((resolve) => {
        if (workerRef.current) {
          onAbort?.();
          terminate();
        }
        setRunning(true);
        const thread = worker();
        const timeoutTimer = timeout
          ? setTimeout(() => {
              terminate();
              onTimeout?.();
            }, timeout)
          : undefined;

        onStart?.();
        thread.postMessage(args);
        thread.onmessage = (e: MessageEvent<WorkerMessage<WorkerReturnType<F>>>) => {
          const { type, content } = e.data;
          if (type === "final") {
            resolve(content);
            onFinish?.();
            onFinally?.();
            terminate();
          } else {
            processCallback?.(content);
          }
        };
        thread.onerror = (e) => {
          onError?.(new Error(e.message));
          onFinally?.();
          terminate();
        };

        workerRef.current = { thread, timeoutTimer };
      });
    },
    [
      onAbort,
      onError,
      onFinally,
      onFinish,
      onStart,
      onTimeout,
      processCallback,
      terminate,
      timeout,
      worker,
    ],
  );

  useEffect(() => {
    return () => {
      terminate();
    };
  }, [terminate]);

  return { run, running };
};

export const createOnMessage =
  <F extends PrimitiveFunction, C>(func: (callback: (content: C) => void) => F) =>
  async (e: MessageEvent<Parameters<F>>) => {
    const workerFn = func((content) => {
      self.postMessage({
        type: "process",
        content,
      });
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- this is fine
    const res = { type: "final", content: await workerFn(...e.data) };
    self.postMessage(res);
  };
