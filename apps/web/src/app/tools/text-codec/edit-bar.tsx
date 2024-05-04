"use client";

import { TEXT_ENCODING_LIST, type TextEncoding } from "@lotool/lib/text-encoding";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  Button,
  Toggle,
  Select,
  Tooltip,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TooltipTrigger,
  TooltipContent,
} from "@lotool/ui";
import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";
import React from "react";
import { AlignJustify, Repeat2 } from "lucide-react";

const MODE_OPTIONS = ["Encode", "Decode"];

interface EditBarProps {
  mode: "Encode" | "Decode";
  onModeChange: (value: "Encode" | "Decode") => void;
  textEncoding: TextEncoding;
  onTextEncodingChange: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
  onExchangeButtonClick: () => void;
  multiLineMode: boolean;
  onMultiLineModeChange: (value: boolean) => void;
}

export function EditBar({
  mode,
  onModeChange,
  textEncoding,
  onTextEncodingChange,
  characterEncoding,
  onCharacterEncodingChange,
  onExchangeButtonClick,
  multiLineMode,
  onMultiLineModeChange,
}: EditBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditBarItem label="Mode">
        <Tabs value={mode} onValueChange={onModeChange as (value: string) => void}>
          <TabsList>
            {MODE_OPTIONS.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </EditBarItem>
      <EditBarItem label="Text Encoding">
        <Select
          value={textEncoding}
          onValueChange={(value: TextEncoding) => {
            onTextEncodingChange(value);
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
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={onExchangeButtonClick}>
            <Repeat2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Use output as input</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              variant="outline"
              className="size-10 p-0"
              pressed={multiLineMode}
              onPressedChange={onMultiLineModeChange}
            >
              <AlignJustify className="size-4" />
            </Toggle>
          </div>
        </TooltipTrigger>
        <TooltipContent>Handle each line separately</TooltipContent>
      </Tooltip>
    </div>
  );
}

function EditBarItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="px-1 text-sm font-medium">{label}</div>
      {children}
    </div>
  );
}
