import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import Framework from "./components/Framework";
import { Analytics } from "@vercel/analytics/react";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tool",
  description: "A Toolbox",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>
        <Framework>{children}</Framework>
        <Analytics />
      </body>
    </html>
  );
}
