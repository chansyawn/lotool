import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx";
import fonts from "@/styles/font";
import Framework from "@/app/components/Framework";
import { getFaviconHrefByText } from "@/utils/favicon";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lotool",
  description: "A Toolbox",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href={getFaviconHrefByText("📦")} />
      <body className={clsx(...fonts.map((font) => font.variable))}>
        <Framework>{children}</Framework>
        <Analytics />
      </body>
    </html>
  );
}
