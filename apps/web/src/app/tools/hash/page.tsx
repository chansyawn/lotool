"use client";

import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { Hash } from "@lotool/lib/hash";
import { Input, ToggleGroup, ToggleGroupItem } from "@lotool/ui";
import { CHARACTER_ENCODING_LIST } from "@lotool/lib/character-encoding";
import { InputBlob } from "@/components/input-blob";
import { TextEncodingSelector } from "@/components/text-encoding-selector";
import { Labeled } from "@/components/labeled";
import { CharacterEncodingSelector } from "@/components/character-encoding-selector";
import {
  characterEncodingAtom,
  enabledAlgorithmsAtom,
  hmacCharacterEncodingAtom,
  inputTypeAtom,
  outputEncodingAtom,
} from "./persist";
import { HashResult } from "./hash-result";

const ALL_ALGORITHM = Object.values(Hash);
const textAtom = atom("");
const fileAtom = atom<File | undefined>(undefined);
const hmacAtom = atom("");

function Page() {
  const [outputEncoding, setOutputEncoding] = useAtom(outputEncodingAtom);
  const [inputType, setInputType] = useAtom(inputTypeAtom);
  const [text, setText] = useAtom(textAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(characterEncodingAtom);
  const [enabledAlgorithms, setEnabledAlgorithms] = useAtom(enabledAlgorithmsAtom);
  const [hmac, setHmac] = useAtom(hmacAtom);
  const [hmacCharacterEncoding, setHmacCharacterEncoding] = useAtom(hmacCharacterEncodingAtom);

  const input = useMemo(
    () => (inputType === "text" ? new Blob([text]) : file ?? new Blob()),
    [file, inputType, text],
  );

  const hashOptions = useMemo(
    () => ({
      outputEncoding,
      hmacKey: hmac ? CHARACTER_ENCODING_LIST[hmacCharacterEncoding].encode(hmac) : undefined,
    }),
    [hmac, hmacCharacterEncoding, outputEncoding],
  );

  return (
    <div className="space-y-2">
      <Labeled label="Output Encoding">
        <TextEncodingSelector value={outputEncoding} onValueChange={setOutputEncoding} />
      </Labeled>
      <div className="flex gap-2">
        <Labeled label="HMAC Secret Encoding">
          <CharacterEncodingSelector
            characterEncoding={hmacCharacterEncoding}
            onCharacterEncodingChange={setHmacCharacterEncoding}
          />
        </Labeled>
        <Labeled label="HMAC Secret" className="flex-1">
          <Input
            className="min-w-48"
            value={hmac}
            onChange={(e) => {
              setHmac(e.target.value);
            }}
          />
        </Labeled>
      </div>
      <InputBlob
        inputType={inputType}
        text={text}
        file={file}
        onInputTypeChange={setInputType}
        onTextChange={setText}
        onFileChange={(file) => {
          setFile(file);
        }}
        characterEncoding={characterEncoding}
        onCharacterEncodingChange={setCharacterEncoding}
      />
      <ToggleGroup
        className="flex-wrap justify-start"
        type="multiple"
        variant="outline"
        value={enabledAlgorithms}
        onValueChange={(value) => {
          setEnabledAlgorithms(value as Hash[]);
        }}
      >
        {ALL_ALGORITHM.map((algorithm) => (
          <ToggleGroupItem key={algorithm} value={algorithm}>
            {algorithm}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <HashResult input={input} algorithms={enabledAlgorithms} options={hashOptions} />
    </div>
  );
}

export default Page;
