import { type PrimitiveFunction } from "@/types/function";

export const debounce = <T extends PrimitiveFunction>(
  fn: T,
  timeout = 300,
): { run: (...args: Parameters<T>) => void; cancel: () => void } => {
  let timer: ReturnType<typeof setTimeout>;
  return {
    run: (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, timeout);
    },
    cancel: () => {
      clearTimeout(timer);
    },
  };
};
