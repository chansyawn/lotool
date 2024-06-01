"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Button,
  PortalContainerProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@lotool/ui";
import React from "react";
import { Portal } from "@radix-ui/react-portal";
import { PictureInPictureIcon } from "lucide-react";
import { Provider } from "jotai";
import { useDocumentPiPContext } from "@/features/document-pip/document-pip-context";
import { TOOL_CONFIG } from "../config";
import { References } from "./references";
import { ToolIcon } from "./tool-icon";

interface ToolProps {
  children: React.ReactNode;
}

function ToolLayout({ children }: ToolProps) {
  const { isSupportDocumentPiP, documentPiPWindow, requestPiPWindow, closePiPWindow } =
    useDocumentPiPContext();
  const segments = useSelectedLayoutSegments();
  const path = segments.join("/");

  const tool = TOOL_CONFIG.find((tool) => tool.path === path);

  const openPiPWindow = () => {
    void requestPiPWindow(800, 600);
  };

  if (!tool) {
    return null;
  }

  const { name, relatedLink } = tool;

  return (
    <Provider key={path}>
      <div className="px-4">
        <div className="flex-grow">
          <h1 className="mb-4 flex items-center text-3xl font-semibold">
            <ToolIcon className="mr-2 size-6" name={name} path={path} />
            <span>{name}</span>
            {isSupportDocumentPiP && !documentPiPWindow ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-auto" onClick={openPiPWindow}>
                    <PictureInPictureIcon className="size-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Open in Picture-in-Picture mode(Beta)</TooltipContent>
              </Tooltip>
            ) : null}
          </h1>
          {documentPiPWindow ? (
            <PortalContainerProvider container={documentPiPWindow.document.body}>
              <Portal container={documentPiPWindow.document.body} className="p-4">
                {children}
              </Portal>
              <div className="flex aspect-video flex-col items-center justify-center">
                <div className="mb-2 text-xl font-semibold">Picture in Picture Mode Activated</div>
                <Button onClick={closePiPWindow}>Click to close</Button>
              </div>
            </PortalContainerProvider>
          ) : (
            children
          )}
        </div>
        <aside className="mt-4 flex-shrink-0">
          {relatedLink ? <References links={relatedLink} /> : null}
        </aside>
      </div>
    </Provider>
  );
}

export const Tool = dynamic(() => Promise.resolve(ToolLayout), { ssr: false });
