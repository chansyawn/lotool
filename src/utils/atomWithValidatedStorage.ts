import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

const atomWithValidatedStorage = <Value extends Record<string, unknown>>(
  key: string,
  initialValue: Value,
  schema: z.ZodType<Value>,
) =>
  atomWithStorage(key, initialValue, {
    getItem: (key, initialValue) => {
      try {
        return schema.parse(JSON.parse(localStorage.getItem(key) ?? ""));
      } catch {
        return initialValue;
      }
    },
    setItem: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
      localStorage.removeItem(key);
    },
    subscribe: (key, callback, initialValue) => {
      if (typeof window === "undefined" || typeof window.addEventListener === "undefined") {
        return () => {};
      }

      const handleStorageChange = (e: StorageEvent) => {
        if (e.storageArea === localStorage && e.key === key) {
          let newValue;
          try {
            newValue = schema.parse(JSON.parse(e.newValue ?? ""));
          } catch {
            newValue = initialValue;
          }
          callback(newValue);
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    },
  });

export default atomWithValidatedStorage;
