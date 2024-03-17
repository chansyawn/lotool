import React, { createContext, useCallback, useContext, useState } from "react";
import * as Portal from "@radix-ui/react-portal";
import { useHasMounted } from "@/hooks/use-has-mounted";

interface DocumentPiPContextValue {
  isSupported: boolean;
  documentPiPWindow: Window | null;
  requestPiPWindow: (width: number, height: number) => Promise<void>;
  closePiPWindow: () => void;
}

const DocumentPiPContext = createContext<DocumentPiPContextValue | undefined>(
  undefined,
);
export function DocumentPiPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasMounted = useHasMounted();
  const isSupport = hasMounted && "documentPictureInPicture" in window;
  const [documentPiPWindow, setDocumentPiPWindow] = useState<Window | null>(
    null,
  );

  const closePiPWindow = useCallback(() => {
    if (documentPiPWindow !== null) {
      documentPiPWindow.close();
      setDocumentPiPWindow(null);
    }
  }, [documentPiPWindow]);

  const requestPiPWindow = useCallback(
    async (width: number, height: number) => {
      if (documentPiPWindow !== null || typeof window === "undefined") {
        return;
      }

      const pip = await window.documentPictureInPicture.requestWindow({
        width,
        height,
      });

      pip.addEventListener("pagehide", () => {
        setDocumentPiPWindow(null);
      });

      // https://developer.chrome.com/docs/web-platform/document-picture-in-picture/#copy-style-sheets-to-the-picture-in-picture-window
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          pip.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement("link");
          if (styleSheet.href === null) {
            return;
          }
          link.rel = "stylesheet";
          link.type = styleSheet.type;
          link.media = styleSheet.media.toString();
          link.href = styleSheet.href;
          pip.document.head.appendChild(link);
        }
      });

      setDocumentPiPWindow(pip);
    },
    [documentPiPWindow],
  );

  return (
    <DocumentPiPContext.Provider
      value={{
        isSupported: isSupport,
        documentPiPWindow,
        requestPiPWindow,
        closePiPWindow,
      }}
    >
      {children}
    </DocumentPiPContext.Provider>
  );
}

export const useDocumentPiP = () => {
  const context = useContext(DocumentPiPContext);
  if (context === undefined) {
    throw new Error("useDocumentPiP must be used within a DocumentPiPProvider");
  }
  return context;
};

const DefaultContainerContext = createContext<HTMLElement | undefined>(
  undefined,
);
export const useDefaultContainer = () => useContext(DefaultContainerContext);

interface DocumentPiPProps {
  pipWindow: Window;
  children: React.ReactNode;
  placeholder?: React.ReactNode;
}

export function DocumentPiP({
  pipWindow,
  children,
  placeholder,
}: DocumentPiPProps) {
  const container = pipWindow.document.body;

  return (
    <DefaultContainerContext.Provider value={container}>
      <Portal.Root container={container}>{children}</Portal.Root>
      {placeholder}
    </DefaultContainerContext.Provider>
  );
}
