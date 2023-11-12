"use client";

import { useEffect } from "react";
import useColorMode, { ColorMode } from "@/hooks/useColorMode";
import useHasMounted from "@/hooks/useHasMounted";
import useMediaQuery from "@/hooks/useMediaQuery";
import { colorModeAttribute } from "@/styles/colorMode";

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
