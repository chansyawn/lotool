"use client";

import { Provider } from "jotai";
import React from "react";
import { ScrollArea, Toaster, TooltipProvider } from "@lotool/ui";
import { ColorModeProvider } from "@/features/color-mode/color-mode-context";
import { globalStore } from "@/app/store";
import { DocumentPiPProvider } from "@/features/document-pip/document-pip-context";
import { MenuContent } from "./menu";
import { HeaderContent } from "./header";
import { Logo } from "./logo";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <ColorModeProvider>
        <DocumentPiPProvider>
          <TooltipProvider delayDuration={200}>
            <div className="grid h-screen w-screen grid-rows-[3rem_1fr] md:grid-cols-[14rem_1fr] xl:grid-cols-[16rem_1fr] xl:grid-rows-[4rem_1fr]">
              <div className="hidden items-center border-b border-r px-4 md:flex">
                <Logo />
              </div>
              <header className="flex flex-shrink-0 items-center gap-4 border-b px-4">
                <HeaderContent />
              </header>
              <div className="hidden h-full overflow-hidden border-r p-2 md:block lg:p-3">
                <MenuContent />
              </div>
              <ScrollArea>
                <main className="container p-4 xl:p-6">{children}</main>
              </ScrollArea>
            </div>
            <Toaster />
          </TooltipProvider>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
}
