"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import dynamic from "next/dynamic";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import TOOL_CONFIG from "../config";
import RelatedLink from "./related-link";
import ToolIcon from "./tool-icon";
import { DocumentPiP, useDocumentPiP } from "@/contexts/document-pip";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

type ToolProps = {
  children: React.ReactNode;
};

const Tool = ({ children }: ToolProps) => {
  const { isSupported, documentPiPWindow, requestPiPWindow, closePiPWindow } = useDocumentPiP();
  const segments = useSelectedLayoutSegments();
  const path = segments.join("/");

  const tool = TOOL_CONFIG.find((tool) => tool.path === path);

  const openPiPWindow = () => {
    requestPiPWindow(360, 640);
  };

  if (!tool) {
    return null;
  }

  const { name, relatedLink } = tool;

  return (
    <div className="xl:flex">
      <div className="flex-grow">
        <h1 className="mb-4 flex items-center text-3xl font-semibold">
          <ToolIcon className="mr-2 size-6" name={name} path={path} />
          <span>{name}</span>
          {isSupported && !documentPiPWindow && (
            <Tooltip content="Open in Picture-in-Picture mode(Beta)">
              <Button variant="ghost" size="icon" className="ml-auto" onClick={openPiPWindow}>
                <OpenInNewWindowIcon className="size-4" />
              </Button>
            </Tooltip>
          )}
        </h1>
        {children && documentPiPWindow ? (
          <DocumentPiP
            pipWindow={documentPiPWindow}
            placeholder={
              <div className="flex aspect-video flex-col items-center justify-center">
                <div className="mb-2 text-xl font-semibold">Picture in Picture Mode Activated</div>
                <Button onClick={closePiPWindow}>Click to close</Button>
              </div>
            }
          >
            <div className="p-4">{children}</div>
          </DocumentPiP>
        ) : (
          children
        )}
      </div>
      <aside className={"mt-4 flex-shrink-0 xl:ml-2 xl:mt-0 xl:w-[18rem]"}>
        {relatedLink && <RelatedLink links={relatedLink} />}
      </aside>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Tool), { ssr: false });
