import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
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
import { useClipboard } from "@/hooks/use-clipboard";

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
  variant?: ButtonProps["variant"];
};

export function CopyButton({ variant, ...props }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  const Icon = copied ? CheckIcon : CopyIcon;

  if (props.mode === "multiple") {
    return (
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={variant} size="icon">
                <Icon />
              </Button>
            </DropdownMenuTrigger>
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
        </TooltipTrigger>
        <TooltipContent>Copy to clipboard</TooltipContent>
      </Tooltip>
    );
  }

  const { data } = props;

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant={variant}
          size="icon"
          onClick={() => {
            copy(typeof data === "string" ? data : data());
          }}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
  );
}
