"use client";

import { Provider } from "jotai";
import Header from "./header";
import { ColorModeProvider } from "@/contexts/color-mode";
import globalStore from "@/app/store";
import { DocumentPiPProvider } from "@/contexts/document-pip";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={globalStore}>
      <ColorModeProvider>
        <DocumentPiPProvider>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="flex-1 overflow-auto">
              <div className="container isolate px-3 pt-4">{children}</div>
            </div>
          </div>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
};

export default Main;
