"use client";

import { LoopIcon, RowsIcon } from "@radix-ui/react-icons";
import {
  TEXT_ENCODING_LIST,
  type TextEncoding,
} from "@lotool/lib/text-encoding";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  Button,
  Toggle,
  Select,
  Tooltip,
} from "@lotool/ui";
import {
  CHARACTER_ENCODING_LIST,
  type CharacterEncoding,
} from "@lotool/lib/character-encoding";
import React from "react";

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
        <Tabs
          value={mode}
          onValueChange={onModeChange as (value: string) => void}
        >
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
          className="w-40"
          placeholder="Select Text Encoding"
          value={textEncoding}
          onValueChange={(value: TextEncoding) => {
            onTextEncodingChange(value);
          }}
          options={Object.keys(TEXT_ENCODING_LIST).map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </EditBarItem>
      <EditBarItem label="Character Encoding">
        <Select
          className="w-40"
          placeholder="Select Character Encoding"
          value={characterEncoding}
          onValueChange={(value: CharacterEncoding) => {
            onCharacterEncodingChange(value);
          }}
          options={Object.keys(CHARACTER_ENCODING_LIST).map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </EditBarItem>
      <Tooltip content="Use output as input">
        <Button variant="outline" size="icon" onClick={onExchangeButtonClick}>
          <LoopIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Handle each line separately">
        <span>
          <Toggle
            variant="outline"
            className="size-9 p-0"
            pressed={multiLineMode}
            onPressedChange={onMultiLineModeChange}
          >
            <RowsIcon />
          </Toggle>
        </span>
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
