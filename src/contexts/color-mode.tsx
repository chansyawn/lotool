"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import useHasMounted from "@/hooks/use-has-mounted";
import useMediaQuery from "@/hooks/use-media-query";
import LocalStorageKey from "@/constants/local-storage-key";

export const colorModeAttribute = "data-color-mode";

export type ColorMode = "light" | "dark" | "system";

const getColorModeFromStorage = (value: string | null) => {
  if (value && ["light", "dark", "system"].includes(value)) {
    return value as ColorMode;
  } else {
    return "system";
  }
};

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

export const useColorMode = () => {
  return useAtom(colorModeAtom);
};

const setColorModeInDocumentElement = (colorMode: ColorMode) => {
  document.documentElement.setAttribute(
    colorModeAttribute,
    colorMode === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : colorMode,
  );
};

type ColorModeProviderProps = {
  children?: React.ReactNode;
};

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode] = useColorMode();
  const preferDark = useMediaQuery("(prefers-color-scheme: dark)");
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;
    setColorModeInDocumentElement(colorMode);
  }, [preferDark, hasMounted, colorMode]);

  return <>{children}</>;
};

export const initColorModeScript = `
(function () {
  const colorMode = localStorage.getItem("${LocalStorageKey.ColorMode}");
  if (colorMode && ["light", "dark"].includes(colorMode)) {
    document.documentElement.setAttribute("${colorModeAttribute}", colorMode);
  } else {
    document.documentElement.setAttribute(
      "${colorModeAttribute}",
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    );
    localStorage.setItem("${LocalStorageKey.ColorMode}", "system");
  }
})();
`;
