"use client";

import { LoopIcon, RowsIcon } from "@radix-ui/react-icons";
import {
  CHARACTER_ENCODING_LIST,
  CharacterEncoding,
  TEXT_ENCODING_LIST,
  TextEncoding,
} from "./codec-method";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import SimpleSelect from "@/components/simple-select";
import SimpleTooltip from "@/components/simple-tooltip";

const MODE_OPTIONS = ["Encode", "Decode"];

type GeneralEditToolProps = {
  mode: "Encode" | "Decode";
  setMode: (value: "Encode" | "Decode") => void;
  textEncoding: TextEncoding;
  setTextEncoding: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  setCharacterEncoding: (value: CharacterEncoding) => void;
  onExchangeButtonClick: () => void;
  multiLineMode: boolean;
  setMultiLineMode: (value: boolean) => void;
};

const GeneralEditTool = ({
  mode,
  setMode,
  textEncoding,
  setTextEncoding,
  characterEncoding,
  setCharacterEncoding,
  onExchangeButtonClick,
  multiLineMode,
  setMultiLineMode,
}: GeneralEditToolProps) => {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditToolItem label="Mode">
        <Tabs value={mode} onValueChange={setMode as (value: string) => void}>
          <TabsList>
            {MODE_OPTIONS.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </EditToolItem>
      <EditToolItem label="Text Encoding">
        <SimpleSelect
          className="w-40"
          placeholder="Select Text Encoding"
          value={textEncoding}
          onValueChange={(value: TextEncoding) => setTextEncoding(value)}
          options={Object.keys(TEXT_ENCODING_LIST).map((item) => ({ value: item, label: item }))}
        />
      </EditToolItem>
      <EditToolItem label="Character Encoding">
        <SimpleSelect
          className="w-40"
          placeholder="Select Character Encoding"
          value={characterEncoding}
          onValueChange={(value: CharacterEncoding) => setCharacterEncoding(value)}
          options={Object.keys(CHARACTER_ENCODING_LIST).map((item) => ({
            value: item,
            label: item,
          }))}
        />
      </EditToolItem>
      <SimpleTooltip content="Use output as input">
        <Button variant="outline" size="icon" onClick={onExchangeButtonClick}>
          <LoopIcon />
        </Button>
      </SimpleTooltip>
      <SimpleTooltip content="Handle each line separately">
        <Toggle
          variant="outline"
          className="h-9 w-9 p-0"
          pressed={multiLineMode}
          onPressedChange={setMultiLineMode}
        >
          <RowsIcon />
        </Toggle>
      </SimpleTooltip>
    </div>
  );
};

const EditToolItem = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="space-y-1">
      <div className="px-1 text-sm font-medium">{label}</div>
      {children}
    </div>
  );
};

export default GeneralEditTool;
