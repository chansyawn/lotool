"use client";

import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { Hash } from "@lotool/lib/hash";
import { Badge, Input, Progress, ToggleGroup, ToggleGroupItem } from "@lotool/ui";
import { CHARACTER_ENCODING_LIST } from "@lotool/lib/character-encoding";
import { InputBlob } from "@/components/input-blob";
import { TextEncodingSelector } from "@/components/text-encoding-selector";
import { Labeled } from "@/components/labeled";
import { asTuple } from "@/types/utils";
import { CharacterEncodingSelector } from "@/components/character-encoding-selector";
import {
  characterEncodingAtom,
  enabledAlgorithmsAtom,
  hmacCharacterEncodingAtom,
  inputTypeAtom,
  outputEncodingAtom,
} from "./persist";
import { HashResult } from "./hash-result";
import { useHash } from "./use-hash";

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

  const params = useMemo(
    () =>
      asTuple([
        inputType === "text" ? new Blob([text]) : file ?? new Blob(),
        enabledAlgorithms,
        {
          outputEncoding,
          hmacKey: hmac ? CHARACTER_ENCODING_LIST[hmacCharacterEncoding].encode(hmac) : undefined,
        },
      ]),
    [enabledAlgorithms, file, hmac, hmacCharacterEncoding, inputType, outputEncoding, text],
  );

  const { progress, calculating, output } = useHash(params);

  return (
    <div className="space-y-2">
      <InputBlob
        inputType={inputType}
        text={text}
        file={file}
        extra={
          <>
            <Labeled label="Output Encoding">
              <TextEncodingSelector value={outputEncoding} onValueChange={setOutputEncoding} />
            </Labeled>
            <Labeled label="HMAC Secret" className="flex-1">
              <Input
                value={hmac}
                onChange={(e) => {
                  setHmac(e.target.value);
                }}
              />
            </Labeled>
            <Labeled label="Secret Encoding">
              <CharacterEncodingSelector
                characterEncoding={hmacCharacterEncoding}
                onCharacterEncodingChange={setHmacCharacterEncoding}
              />
            </Labeled>
          </>
        }
        onInputTypeChange={setInputType}
        onTextChange={setText}
        onFileChange={setFile}
        characterEncoding={characterEncoding}
        onCharacterEncodingChange={setCharacterEncoding}
      />
      <ToggleGroup
        className="justify-start flex-wrap"
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
      {calculating ? (
        <div className="flex items-center gap-2">
          <Badge variant="outline">{(progress * 100).toFixed(2)}%</Badge>
          <Progress className="h-2" value={progress * 100} />
        </div>
      ) : null}
      {ALL_ALGORITHM.filter((algorithm) => enabledAlgorithms.includes(algorithm)).map(
        (algorithm) => {
          const content = output.find((o) => o.algorithm === algorithm)?.output ?? " ";
          return (
            <HashResult
              key={algorithm}
              calculating={calculating}
              content={content}
              algorithm={algorithm}
            />
          );
        },
      )}
    </div>
  );
}

export default Page;
