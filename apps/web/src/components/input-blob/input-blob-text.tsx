import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";
import { Textarea } from "@lotool/ui";
import { Labeled } from "../labeled";
import { PasteButton } from "../paste-button";
import { CharacterEncodingSelector } from "../character-encoding-selector";
import { BinaryPreview } from "./binary-preview";

interface InputBlobTextProps {
  value: string;
  onValueChange: (value: string) => void;
  characterEncoding: CharacterEncoding;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
}

export function InputBlobText({
  value,
  onValueChange,
  characterEncoding,
  onCharacterEncodingChange,
}: InputBlobTextProps) {
  return (
    <div className="gap-2 mt-2 flex h-72">
      <div className="flex-1 flex-col flex">
        <div className="flex gap-2 items-end">
          <Labeled label="Character Encoding" className="mr-auto">
            <CharacterEncodingSelector
              characterEncoding={characterEncoding}
              onCharacterEncodingChange={onCharacterEncodingChange}
            />
          </Labeled>
          <PasteButton onPaste={onValueChange} variant="outline" />
        </div>
        <Textarea
          className="resize-none mt-2 flex-1 break-all"
          value={value}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
        />
      </div>
      <BinaryPreview blob={new Blob([CHARACTER_ENCODING_LIST[characterEncoding].encode(value)])} />
    </div>
  );
}
