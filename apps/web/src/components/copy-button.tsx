import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button, type ButtonProps, Tooltip, DropdownMenu } from "@lotool/ui";
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
      <Tooltip content="Copy to clipboard">
        <DropdownMenu
          align="end"
          options={props.options.map(({ key, label, data }) => ({
            key,
            label,
            onClick: () => {
              copy(typeof data === "string" ? data : data());
            },
          }))}
        >
          <Button variant={variant} size="icon">
            <Icon />
          </Button>
        </DropdownMenu>
      </Tooltip>
    );
  }

  const { data } = props;

  return (
    <Tooltip content="Copy to clipboard">
      <Button
        variant={variant}
        size="icon"
        onClick={() => {
          copy(typeof data === "string" ? data : data());
        }}
      >
        <Icon />
      </Button>
    </Tooltip>
  );
}
