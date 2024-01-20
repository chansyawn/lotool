"use client";

import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from "./ui/tooltip";

type TooltipProps = {
  children?: React.ReactNode;
  content?: string;
};

const SimpleTooltip = ({ content, children }: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SimpleTooltip;
