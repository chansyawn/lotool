import useMediaQuery from "./useMediaQuery";
import theme from "@/styles/theme";

type BreakpointKey = "sm" | "md" | "lg" | "xl";
const breakpoints = theme.screens! as Record<BreakpointKey, string>;

export default function useBreakpoint(breakpointKey: BreakpointKey) {
  const match = useMediaQuery(`(min-width: ${breakpoints[breakpointKey]})`);
  return match;
}
