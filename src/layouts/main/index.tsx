"use client";

import { Provider } from "jotai";
import Header from "./Header";
import { ColorModeProvider } from "./ColorModeProvider";
import globalStore from "@/app/store";
import { DocumentPiPProvider } from "@/hooks/useDocumentPiP";

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
