import { CheckIcon, CopyIcon } from "lucide-react";
import {
  Button,
  type ButtonProps,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@lotool/ui";
import React from "react";
import { cn } from "@lotool/theme/utils";
import { useClipboard } from "@/features/clipboard/use-clipboard";

type CopyButtonProps = (
  | { mode?: "single"; data: string | (() => string) }
  | {
      mode: "multiple";
      options: { key: string; label: React.ReactNode; data: string | (() => string) }[];
    }
) & {
  className?: string;
  variant?: ButtonProps["variant"];
};

export function CopyButton({ className, variant, ...props }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  const renderIcon = () => {
    return (
      <>
        <CopyIcon
          className={cn(
            "size-4 transition-transform",
            copied ? "-rotate-90 scale-0" : "rotate-0 scale-100",
          )}
        />
        <CheckIcon
          className={cn(
            "absolute size-4 transition-transform",
            copied ? "rotate-0 scale-100" : "rotate-90 scale-0",
          )}
        />
      </>
    );
  };

  if (props.mode === "multiple") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="icon" className={className}>
            {renderIcon()}
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
    );
  }

  const { data } = props;

  return (
    <Button
      className={className}
      variant={variant}
      size="icon"
      onClick={() => {
        copy(typeof data === "string" ? data : data());
      }}
    >
      {renderIcon()}
    </Button>
  );
}
