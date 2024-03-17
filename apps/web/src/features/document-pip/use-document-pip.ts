import { useCallback, useState } from "react";
import { useHasMounted } from "@/hooks/use-has-mounted";

export const useDocumentPiP = () => {
  const hasMounted = useHasMounted();
  const isSupportDocumentPiP =
    hasMounted && "documentPictureInPicture" in window;
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

  return {
    isSupportDocumentPiP,
    documentPiPWindow,
    requestPiPWindow,
    closePiPWindow,
  };
};
