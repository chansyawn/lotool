import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import LocalStorageKey from "@/constants/localStorageKey";

export type ColorMode = "light" | "dark" | "system";

const colorModeAtom = atomWithStorage<ColorMode>(LocalStorageKey.ColorMode, "system", {
  getItem: (key) => getColorModeFromStorage(localStorage.getItem(key)),
  setItem: (key, value) => localStorage.setItem(key, value),
  removeItem: (key) => localStorage.removeItem(key),
  subscribe: (key, callback) => {
    if (typeof window === "undefined" || typeof window.addEventListener === "undefined")
      return () => {};

    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        callback(getColorModeFromStorage(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  },
});

const getColorModeFromStorage = (value: string | null) => {
  if (value && ["light", "dark", "system"].includes(value)) {
    return value as ColorMode;
  } else {
    return "system";
  }
};

const useColorMode = () => {
  return useAtom(colorModeAtom);
};

export default useColorMode;
