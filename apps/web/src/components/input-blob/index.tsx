import { Tabs, TabsContent, TabsList, TabsTrigger } from "@lotool/ui";
import { type CharacterEncoding } from "@lotool/lib/character-encoding";
import React from "react";
import { Labeled } from "../labeled";
import { InputBlobText } from "./input-blob-text";
import { InputBlobFile } from "./input-blob-file";

interface InputBlobProps {
  inputType: "text" | "file";
  text: string;
  file: File | undefined;
  characterEncoding: CharacterEncoding;
  extra?: React.ReactNode;
  onInputTypeChange: (type: "text" | "file") => void;
  onTextChange: (value: string) => void;
  onFileChange: (value: File | undefined) => void;
  onCharacterEncodingChange: (value: CharacterEncoding) => void;
}

export function InputBlob({
  inputType,
  text,
  file,
  extra,
  characterEncoding,
  onInputTypeChange,
  onTextChange,
  onFileChange,
  onCharacterEncodingChange,
}: InputBlobProps) {
  return (
    <div>
      <Tabs value={inputType} onValueChange={onInputTypeChange as (value: string) => void}>
        <div className="flex gap-2">
          <Labeled label="Input Type">
            <TabsList className="block w-fit">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="file">File</TabsTrigger>
            </TabsList>
          </Labeled>
          {extra}
        </div>
        <TabsContent value="text">
          <InputBlobText
            value={text}
            onValueChange={onTextChange}
            characterEncoding={characterEncoding}
            onCharacterEncodingChange={onCharacterEncodingChange}
          />
        </TabsContent>
        <TabsContent value="file">
          <InputBlobFile value={file} onValueChange={onFileChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
