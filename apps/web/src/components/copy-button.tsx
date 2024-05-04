import { CheckIcon, CopyIcon } from "lucide-react";
import {
  Button,
  type ButtonProps,
  Tooltip,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  TooltipTrigger,
  TooltipContent,
} from "@lotool/ui";
import React from "react";
import { useClipboard } from "@/features/clipboard/use-clipboard";

type CopyButtonProps = (
  | { mode?: "single"; data: string | (() => string) }
  | {
      mode: "multiple";
      options: {
        key: string;
        label: React.ReactNode;
        data: string | (() => string);
      }[];
    }
) & {
  className?: string;
  variant?: ButtonProps["variant"];
};

export function CopyButton({ className, variant, ...props }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  const Icon = copied ? CheckIcon : CopyIcon;

  if (props.mode === "multiple") {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant={variant} size="icon" className={className}>
                <Icon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Copy to clipboard</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end">
          {props.options.map(({ key, label, data }) => (
            <DropdownMenuItem
              key={key}
              onClick={() => {
                copy(typeof data === "string" ? data : data());
              }}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  const { data } = props;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={className}
          variant={variant}
          size="icon"
          onClick={() => {
            copy(typeof data === "string" ? data : data());
          }}
        >
          <Icon className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
  );
}
