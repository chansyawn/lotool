"use client";

import React from "react";
import { ClipboardIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button, Textarea, Tooltip } from "@lotool/ui";
import { cn } from "@lotool/theme/utils";
import { useClipboard } from "@/hooks/use-clipboard";

interface InputAreaProps {
  style?: React.CSSProperties;
  className?: string;
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  extra?: React.ReactNode;
}

export function InputArea({
  style,
  className,
  title,
  value,
  onChange,
  placeholder,
  extra,
}: InputAreaProps) {
  const { paste } = useClipboard();

  return (
    <div className={cn("flex flex-col", className)} style={style}>
      <div className="mb-1 flex items-center gap-1 px-1">
        <div className="mr-auto text-lg font-medium">{title}</div>
        {extra}
        <Tooltip content="Paste from clipboard">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              paste()
                .then(onChange)
                .catch(() => {
                  // TODO
                });
            }}
          >
            <ClipboardIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Clear content">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              onChange("");
            }}
          >
            <Cross1Icon />
          </Button>
        </Tooltip>
      </div>
      <Textarea
        placeholder={placeholder}
        className="flex-1 resize-none break-all"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
