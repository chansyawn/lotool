"use client";

import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import RelatedLink, { RelatedLinkInfo } from "./related-link";
import { Button } from "@/components/ui/button";
import { DocumentPiP, useDocumentPiP } from "@/contexts/document-pip";
import useHasMounted from "@/hooks/use-has-mounted";
import cn from "@/utils/cn";

type ToolProps = {
  name: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  relativeLink?: RelatedLinkInfo[];
};

const Tool = ({ name, icon, children, relativeLink }: ToolProps) => {
  const hasMounted = useHasMounted();
  const { isSupported, requestPiPWindow, pipWindow, closePiPWindow } = useDocumentPiP();

  const openPiP = () => {
    requestPiPWindow(360, 640);
  };

  return (
    <div className="lg:flex">
      <main className="flex-grow">
        <h1 className="mb-4 flex text-3xl font-semibold">
          {icon}
          <span className="ml-1">{name}</span>
          {isSupported && !pipWindow && (
            <Button variant="ghost" size="icon" className="ml-2" onClick={openPiP}>
              <OpenInNewWindowIcon className="h-4 w-4" />
            </Button>
          )}
        </h1>
        {children && pipWindow ? (
          <DocumentPiP
            pipWindow={pipWindow}
            fallback={
              <div className="flex aspect-video flex-col items-center justify-center">
                <div className="mb-2 text-xl font-semibold">Picture in Picture Mode Activated</div>
                <Button onClick={closePiPWindow}>Click to close</Button>
              </div>
            }
          >
            <main className="p-4">{children}</main>
          </DocumentPiP>
        ) : (
          children
        )}
      </main>
      <aside
        className={cn(
          "mt-4 lg:ml-2 lg:mt-0 lg:w-[18rem]",
          // when in vertical layout,
          // render axillary content after children mounted to avoid flicker
          !hasMounted && "hidden lg:block",
        )}
      >
        {relativeLink && <RelatedLink links={relativeLink} />}
      </aside>
    </div>
  );
};

export default Tool;
