"use client";

import { LoopIcon } from "@radix-ui/react-icons";
import {
  CHARACTER_ENCODING_LIST,
  CharacterEncoding,
  TEXT_ENCODING_LIST,
  TextEncoding,
} from "./codec-method";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const MODE_OPTIONS = ["Encode", "Decode"];

type GeneralEditToolProps = {
  mode: "Encode" | "Decode";
  setMode: (value: "Encode" | "Decode") => void;
  textEncoding: TextEncoding;
  setTextEncoding: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  setCharacterEncoding: (value: CharacterEncoding) => void;
  onExchangeButtonClick: () => void;
};

const GeneralEditTool = ({
  mode,
  setMode,
  textEncoding,
  setTextEncoding,
  characterEncoding,
  setCharacterEncoding,
  onExchangeButtonClick,
}: GeneralEditToolProps) => {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditToolItem label="Mode">
        <Tabs
          className="flex gap-2"
          value={mode}
          onValueChange={setMode as (value: string) => void}
        >
          <TabsList>
            {MODE_OPTIONS.map((item) => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="icon" onClick={onExchangeButtonClick}>
                  <LoopIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exchange Input and Output</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Tabs>
      </EditToolItem>
      <EditToolItem label="Text Encoding">
        <Select
          value={textEncoding}
          onValueChange={(value: TextEncoding) => setTextEncoding(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Text Encoding" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TEXT_ENCODING_LIST).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </EditToolItem>
      <EditToolItem label="Character Encoding">
        <Select
          value={characterEncoding}
          onValueChange={(value: CharacterEncoding) => setCharacterEncoding(value)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Character Encoding" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(CHARACTER_ENCODING_LIST).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </EditToolItem>
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
