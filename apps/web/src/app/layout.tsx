import type { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@lotool/theme/utils";
import { Layout } from "@/app/_layout";
import "@lotool/theme/globals.css";
import { initColorModeScript } from "@/features/color-mode/init-color-mode";
import { fonts } from "./font";

export const metadata: Metadata = {
  title: "Lotool",
  description: "A Toolbox",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script id="set-color-mode" dangerouslySetInnerHTML={{ __html: initColorModeScript }} />
      </head>
      <body className={cn(...fonts.map((font) => font.variable))}>
        <Layout>{children}</Layout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export default RootLayout;
