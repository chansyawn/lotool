import { atomWithStorage } from "jotai/utils";
import { type z } from "zod";
import { type LocalStorageKey } from "@/constants/local-storage-key";

export const atomWithValidatedStorage = <Value extends Record<string, unknown>>(
  key: LocalStorageKey,
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
      if (
        typeof window === "undefined" ||
        typeof window.addEventListener === "undefined"
      ) {
        return () => void 0;
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
