import { createContext, useContext, useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import useMediaQuery from "./useMediaQuery";
import useHasMounted from "./useHasMounted";
import { colorModeAttribute } from "@/styles/colorMode";
import LocalStorageKey from "@/constants/localStorageKey";

type ColorMode = "light" | "dark" | "system";

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

const ColorContext = createContext<[ColorMode, (value: ColorMode) => void]>(["system", () => {}]);

type ColorContextProviderProps = {
  children?: React.ReactNode;
};

export const ColorContextProvider = ({ children }: ColorContextProviderProps) => {
  const [colorMode, setColorMode] = useAtom(colorModeAtom);
  const preferDark = useMediaQuery("(prefers-color-scheme: dark)");
  const hasMounted = useHasMounted();

  useEffect(() => {
    if (!hasMounted) return;
    setColorModeInDocumentElement(colorMode);
  }, [preferDark, hasMounted, colorMode]);

  return (
    <ColorContext.Provider value={[colorMode, setColorMode]}>{children}</ColorContext.Provider>
  );
};

const useColorMode = () => {
  return useContext(ColorContext);
};

export default useColorMode;
