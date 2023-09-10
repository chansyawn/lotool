import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Framework from "./components/Framework";
import { getFaviconHrefByText } from "@/utils/favicon";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lotool",
  description: "A Toolbox",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href={getFaviconHrefByText("📦")} />
      <body className={robotoMono.className}>
        <Framework>{children}</Framework>
        <Analytics />
      </body>
    </html>
  );
}
