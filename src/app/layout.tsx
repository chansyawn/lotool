import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import fonts from "@/styles/font";
import Main from "@/layouts/main";
import { getFaviconHrefByText } from "@/utils/favicon";
import cn from "@/utils/cn";
import "./globals.css";
import { initColorModeScript } from "@/contexts/color-mode";

export const metadata: Metadata = {
  title: "Lotool",
  description: "A Toolbox",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={getFaviconHrefByText("📦")} />
        <script id="set-theme" dangerouslySetInnerHTML={{ __html: initColorModeScript }} />
      </head>
      <body className={cn(...fonts.map((font) => font.variable))}>
        <Main>{children}</Main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
