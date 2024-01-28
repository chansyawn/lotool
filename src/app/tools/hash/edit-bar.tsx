"use client";

import { RowsIcon } from "@radix-ui/react-icons";
import { Select } from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { CHARACTER_ENCODING_LIST, CharacterEncoding } from "@/utils/codec/character";
import { TEXT_ENCODING_LIST, TextEncoding } from "@/utils/codec/text";
import { Toggle } from "@/components/ui/toggle";

type EditBarProps = {
  outEncoding: TextEncoding;
  onOutputEncodingChange: (value: TextEncoding) => void;
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
  multiLineMode: boolean;
  onMultiLineModeChange: (value: boolean) => void;
};

const EditBar = ({
  outEncoding,
  onOutputEncodingChange,
  characterEncoding,
  onCharacterEncodingChange,
  multiLineMode,
  onMultiLineModeChange,
}: EditBarProps) => {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditBarItem label="Output Encoding">
        <Select
          className="w-40"
          placeholder="Select Text Encoding"
          value={outEncoding}
          onValueChange={(value: TextEncoding) => onOutputEncodingChange(value)}
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
      <Tooltip content="Handle each line separately">
        <Toggle
          variant="outline"
          className="size-9 p-0"
          pressed={multiLineMode}
          onPressedChange={onMultiLineModeChange}
        >
          <RowsIcon />
        </Toggle>
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
