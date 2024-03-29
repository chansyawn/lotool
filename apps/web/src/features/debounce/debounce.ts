import { type PrimitiveFunction } from "@/types/function";

export const debounce = <T extends PrimitiveFunction>(
  fn: T,
  timeout = 300,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
};
