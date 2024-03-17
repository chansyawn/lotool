"use client";

import { Provider } from "jotai";
import React from "react";
import { ScrollArea } from "@lotool/ui";
import { ColorModeProvider } from "@/contexts/color-mode";
import { globalStore } from "@/app/store";
import { DocumentPiPProvider } from "@/features/document-pip";
import { Menu } from "./menu";
import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <ColorModeProvider>
        <DocumentPiPProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="container relative flex w-full flex-1 flex-col overflow-hidden lg:flex-row">
              <Menu />
              <ScrollArea className="isolate flex-1 overflow-auto py-2 pr-4">
                <main>{children}</main>
              </ScrollArea>
            </div>
          </div>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
}
