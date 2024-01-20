"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import dynamic from "next/dynamic";
import TOOL_CONFIG from "../config";
import RelatedLink from "./related-link";
import ToolIcon from "./tool-icon";
import cn from "@/utils/cn";

type ToolProps = {
  children: React.ReactNode;
};

const Tool = ({ children }: ToolProps) => {
  const segments = useSelectedLayoutSegments();
  const path = segments.join("/");

  const tool = TOOL_CONFIG.find((tool) => tool.path === path);

  if (!tool) {
    return null;
  }

  const { name, relatedLink } = tool;

  return (
    <div className="lg:flex">
      <main className="flex-grow">
        <h1 className="mb-4 flex items-center text-3xl font-semibold">
          <ToolIcon className="size-6" name={name} path={path} />
          <span className="ml-1">{name}</span>
        </h1>
        {children}
      </main>
      <aside className={cn("mt-4 lg:ml-2 lg:mt-0 lg:w-[18rem]")}>
        {relatedLink && <RelatedLink links={relatedLink} />}
      </aside>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Tool), { ssr: false });
