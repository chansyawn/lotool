import { useEffect, useMemo } from "react";
import { debounce } from "./debounce";

export const useDebounceFn = <T extends unknown[], U>(
  fn: (...args: T) => PromiseLike<U> | U,
  delay = 300,
) => {
  const debouncedFn = useMemo(() => debounce(fn, delay), [fn, delay]);

  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return debouncedFn;
};
