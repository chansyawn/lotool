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
          <Header />
          <div className="container isolate mx-auto px-3">{children}</div>
        </DocumentPiPProvider>
      </ColorModeProvider>
    </Provider>
  );
};

export default Main;
