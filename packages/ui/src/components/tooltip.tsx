import {
  Tooltip as TooltipRoot,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../primitives/tooltip";

type TooltipProps = {
  children?: React.ReactNode;
  content?: string;
} & React.ComponentProps<typeof TooltipRoot>;

export function Tooltip({ content, children, ...props }: TooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <TooltipRoot {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}
