import { Tabs, TabsContent, TabsList, TabsTrigger, Textarea } from "@lotool/ui";
import { CHARACTER_ENCODING_LIST, type CharacterEncoding } from "@lotool/lib/character-encoding";
import React from "react";
import { Labeled } from "../labeled";
import { CharacterEncodingSelector } from "../character-encoding-selector";
import { PasteButton } from "../paste-button";
import { InputBlobFile } from "./input-blob-file";
import { BinaryPreview } from "./binary-preview";

interface InputBlobProps {
  inputType: "text" | "file";
  text: string;
  file: File | undefined;
  characterEncoding: CharacterEncoding;
  onInputTypeChange: (type: "text" | "file") => void;
  onTextChange: (value: string) => void;
  onFileChange: (value: File | undefined) => void;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
}

export function InputBlob({
  inputType,
  text,
  file,
  characterEncoding,
  onInputTypeChange,
  onTextChange,
  onFileChange,
  onCharacterEncodingChange,
}: InputBlobProps) {
  return (
    <div className="flex flex-col gap-2 sm:h-96 sm:flex-row">
      <Tabs
        value={inputType}
        onValueChange={onInputTypeChange as (value: string) => void}
        className="flex flex-1 flex-col"
      >
        <div className="flex gap-2">
          <Labeled label="Input Type">
            <TabsList className="block w-fit">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="file">File</TabsTrigger>
            </TabsList>
          </Labeled>
          <TabsContent value="text" className="mt-0 flex flex-1 items-end">
            <Labeled label="Character Encoding" className="mr-auto">
              <CharacterEncodingSelector
                characterEncoding={characterEncoding}
                onCharacterEncodingChange={onCharacterEncodingChange}
              />
            </Labeled>
            <PasteButton onPaste={onTextChange} variant="outline" className="ml-auto" />
          </TabsContent>
        </div>
        <TabsContent value="text" className="h-48 sm:flex-1">
          <Textarea
            className="h-full resize-none break-all"
            value={text}
            onChange={(e) => {
              onTextChange(e.target.value);
            }}
          />
        </TabsContent>
        <TabsContent value="file" className="h-48 sm:flex-1">
          <InputBlobFile value={file} onValueChange={onFileChange} />
        </TabsContent>
      </Tabs>
      <BinaryPreview
        blob={
          inputType === "text"
            ? new Blob([CHARACTER_ENCODING_LIST[characterEncoding].encode(text)])
            : file
        }
      />
    </div>
  );
}
