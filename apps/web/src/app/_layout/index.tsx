"use client";

import { Provider } from "jotai";
import React from "react";
import { ColorModeProvider } from "@/contexts/color-mode";
import { globalStore } from "@/app/store";
import { DocumentPiPProvider } from "@/contexts/document-pip";
import { Menu } from "./menu";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <ColorModeProvider>
        <DocumentPiPProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="relative mx-auto flex w-full max-w-screen-2xl flex-1 flex-col overflow-hidden lg:flex-row">
              <Menu />
              <main className="isolate flex-1 overflow-auto p-4">
                {children}
              </main>
            </div>
          </div>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
}
