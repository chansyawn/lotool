"use client";

import { LoopIcon, RowsIcon } from "@radix-ui/react-icons";
import { TEXT_ENCODING_LIST, TextEncoding } from "../../../utils/codec/text";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Select } from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { CHARACTER_ENCODING_LIST, CharacterEncoding } from "@/utils/codec/character";

const MODE_OPTIONS = ["Encode", "Decode"];

type EditBarProps = {
  mode: "Encode" | "Decode";
  onModeChange: (value: "Encode" | "Decode") => void;
  textEncoding: TextEncoding;
  onTextEncodingChange: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
  onExchangeButtonClick: () => void;
  multiLineMode: boolean;
  onMultiLineModeChange: (value: boolean) => void;
};

const EditBar = ({
  mode,
  onModeChange,
  textEncoding,
  onTextEncodingChange,
  characterEncoding,
  onCharacterEncodingChange,
  onExchangeButtonClick,
  multiLineMode,
  onMultiLineModeChange,
}: EditBarProps) => {
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
          className="w-40"
          placeholder="Select Text Encoding"
          value={textEncoding}
          onValueChange={(value: TextEncoding) => onTextEncodingChange(value)}
          options={Object.keys(TEXT_ENCODING_LIST).map((item) => ({ value: item, label: item }))}
        />
      </EditBarItem>
      <EditBarItem label="Character Encoding">
        <Select
          className="w-40"
          placeholder="Select Character Encoding"
          value={characterEncoding}
          onValueChange={(value: CharacterEncoding) => onCharacterEncodingChange(value)}
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
};

const EditBarItem = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-1">
      <div className="px-1 text-sm font-medium">{label}</div>
      {children}
    </div>
  );
};

export default EditBar;
