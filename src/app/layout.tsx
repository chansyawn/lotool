import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import fonts from "@/styles/font";
import Main from "@/layouts/main";
import { getFaviconHrefByText } from "@/utils/favicon";
import cn from "@/utils/cn";

import "./globals.css";

export const metadata: Metadata = {
  title: "Lotool",
  description: "A Toolbox",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <link rel="icon" href={getFaviconHrefByText("📦")} />
      <body className={cn(...fonts.map((font) => font.variable))}>
        <Main>{children}</Main>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
