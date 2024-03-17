"use client";

import { RowsIcon } from "@radix-ui/react-icons";
import {
  Select,
  Tooltip,
  Toggle,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TooltipTrigger,
  TooltipContent,
} from "@lotool/ui";
import {
  CHARACTER_ENCODING_LIST,
  type CharacterEncoding,
} from "@lotool/lib/character-encoding";
import {
  TEXT_ENCODING_LIST,
  type TextEncoding,
} from "@lotool/lib/text-encoding";
import React from "react";

interface EditBarProps {
  outEncoding: TextEncoding;
  onOutputEncodingChange: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
  multiLineMode: boolean;
  onMultiLineModeChange: (value: boolean) => void;
}

export function EditBar({
  outEncoding,
  onOutputEncodingChange,
  characterEncoding,
  onCharacterEncodingChange,
  multiLineMode,
  onMultiLineModeChange,
}: EditBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditBarItem label="Output Encoding">
        <Select
          value={outEncoding}
          onValueChange={(value: TextEncoding) => {
            onOutputEncodingChange(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TEXT_ENCODING_LIST).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </EditBarItem>
      <EditBarItem label="Character Encoding">
        <Select
          value={characterEncoding}
          onValueChange={(value: CharacterEncoding) => {
            onCharacterEncodingChange(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(CHARACTER_ENCODING_LIST).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </EditBarItem>
      <Tooltip>
        <TooltipTrigger>
          <Toggle
            variant="outline"
            className="size-9 p-0"
            pressed={multiLineMode}
            onPressedChange={onMultiLineModeChange}
          >
            <RowsIcon />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Handle each line separately</TooltipContent>
      </Tooltip>
    </div>
  );
}

function EditBarItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="px-1 text-sm font-medium">{label}</div>
      {children}
    </div>
  );
}
