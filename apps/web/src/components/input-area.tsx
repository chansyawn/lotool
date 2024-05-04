"use client";

import React from "react";
import { ClipboardIcon, XIcon } from "lucide-react";
import { Button, Textarea, Tooltip, TooltipContent, TooltipTrigger } from "@lotool/ui";
import { cn } from "@lotool/theme/utils";
import { useClipboard } from "@/features/clipboard/use-clipboard";

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
  const { pasteable, paste } = useClipboard();

  return (
    <div className={cn("flex flex-col", className)} style={style}>
      <div className="mb-1 flex items-center gap-1 px-1">
        <div className="mr-auto text-lg font-medium">{title}</div>
        {extra}
        {pasteable ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  void paste().then(onChange);
                }}
              >
                <ClipboardIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Paste from clipboard</TooltipContent>
          </Tooltip>
        ) : null}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onChange("");
              }}
            >
              <XIcon className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear content</TooltipContent>
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
