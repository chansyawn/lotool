import React, { createContext, useContext } from "react";
import { useDocumentPiP } from "./use-document-pip";

interface DocumentPiPContextValue {
  isSupportDocumentPiP: boolean;
  documentPiPWindow: Window | null;
  requestPiPWindow: (width: number, height: number) => Promise<void>;
  closePiPWindow: () => void;
}

const DocumentPiPContext = createContext<DocumentPiPContextValue | undefined>(undefined);

export function DocumentPiPProvider({ children }: { children: React.ReactNode }) {
  const documentPiPValue = useDocumentPiP();
  return (
    <DocumentPiPContext.Provider value={documentPiPValue}>{children}</DocumentPiPContext.Provider>
  );
}

export const useDocumentPiPContext = () => {
  const context = useContext(DocumentPiPContext);
  if (context === undefined) {
    throw new Error("useDocumentPiP must be used within a DocumentPiPProvider");
  }
  return context;
};
