import { createContext, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useHasMounted from "../hooks/use-has-mounted";

type DocumentPiPContextValue = {
  isSupported: boolean;
  PiPWindow: Window | null;
  requestPiPWindow: (width: number, height: number) => Promise<void>;
  closePiPWindow: () => void;
};

const DocumentPiPContext = createContext<DocumentPiPContextValue | undefined>(undefined);

const DocumentPiPWindowContext = createContext<Window | undefined>(undefined);

type DocumentPiPProviderProps = {
  children: React.ReactNode;
};

export const DocumentPiPProvider = ({ children }: DocumentPiPProviderProps) => {
  const hasMounted = useHasMounted();
  const isSupported = hasMounted && "documentPictureInPicture" in window;
  const [documentPiPWindow, setDocumentPiPWindow] = useState<Window | null>(null);

  const closePiPWindow = useCallback(() => {
    if (documentPiPWindow != null) {
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
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          pip.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement("link");
          if (styleSheet.href == null) {
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
        isSupported,
        PiPWindow: documentPiPWindow,
        requestPiPWindow,
        closePiPWindow,
      }}
    >
      {children}
    </DocumentPiPContext.Provider>
  );
};

export const useDocumentPiP = () => {
  const context = useContext(DocumentPiPContext);
  if (context === undefined) {
    throw new Error("useDocumentPiP must be used within a DocumentPiPProvider");
  }
  return context;
};

type PiPDocumentProps = {
  pipWindow: Window;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const PiPDocument = ({ pipWindow, children, fallback }: PiPDocumentProps) => {
  return (
    <DocumentPiPWindowContext.Provider value={pipWindow}>
      {createPortal(children, pipWindow ? pipWindow.document.body : document.body)}
      {fallback}
    </DocumentPiPWindowContext.Provider>
  );
};

export const useDocumentPiPWindow = () => {
  const context = useContext(DocumentPiPWindowContext);
  return context;
};
