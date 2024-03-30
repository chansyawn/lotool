import { useEffect, useMemo } from "react";
import { type PrimitiveFunction } from "@/types/function";
import { debounce } from "./debounce";

export const useDebounceFn = <T extends PrimitiveFunction>(fn: T, timeout = 300) => {
  const debouncedFn = useMemo(() => debounce(fn, timeout), [fn, timeout]);

  useEffect(() => {
    return () => {
      debouncedFn.cancel();
    };
  }, [debouncedFn]);

  return debouncedFn;
};
