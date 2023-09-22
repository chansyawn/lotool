import { Roboto_Flex, Roboto_Mono } from "next/font/google";

const RobotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
  fallback: ["sans-serif"],
});

const RobotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  fallback: ["monospace"],
});

const fonts = [RobotoFlex, RobotoMono];

export default fonts;
