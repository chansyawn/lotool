"use client";

import { Provider } from "jotai";
import React from "react";
import { Toaster, TooltipProvider } from "@lotool/ui";
import { ColorModeProvider } from "@/features/color-mode/color-mode-context";
import { globalStore } from "@/app/store";
import { DocumentPiPProvider } from "@/features/document-pip/document-pip-context";
import { MenuContent } from "./menu";
import { MenuDrawer } from "./menu-drawer";
import { Logo } from "./logo";
import { Auxiliary } from "./auxiliary";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={globalStore}>
      <ColorModeProvider>
        <DocumentPiPProvider>
          <TooltipProvider delayDuration={200}>
            <div className="md:bg-secondary bg-background relative flex min-h-dvh w-full max-md:flex-col">
              <header className="flex items-center border-b px-4 py-2 md:hidden">
                <MenuDrawer />
                <Auxiliary className="ml-auto" />
              </header>
              <div className="fixed inset-y-0 left-0 flex w-64 flex-col p-2 max-md:hidden">
                <Logo className="p-2" />
                <MenuContent className="flex-1 overflow-auto" />
                <Auxiliary />
              </div>
              <div className="flex flex-1 flex-col pb-2 md:min-w-0 md:pl-64 md:pr-2 md:pt-2">
                <div className="md:bg-background grow p-6 md:rounded-lg md:border md:p-6 md:shadow-sm">
                  <main className="container isolate">{children}</main>
                </div>
              </div>
            </div>
            <Toaster />
          </TooltipProvider>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
}
