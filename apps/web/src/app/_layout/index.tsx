"use client";

import { Provider } from "jotai";
import React from "react";
import { ScrollArea, Toaster, TooltipProvider } from "@lotool/ui";
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
          <TooltipProvider delayDuration={200}>
            <div className="flex h-screen flex-col">
              <Header />
              <div className="container relative flex w-full flex-1 flex-col overflow-hidden lg:flex-row">
                <Menu />
                <ScrollArea className="flex-1 overflow-auto py-2">
                  <main>{children}</main>
                </ScrollArea>
              </div>
            </div>
            <Toaster />
          </TooltipProvider>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
}
