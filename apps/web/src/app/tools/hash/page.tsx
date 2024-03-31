"use client";

import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { Hash } from "@lotool/lib/hash";
import { Badge, Progress, ToggleGroup, ToggleGroupItem } from "@lotool/ui";
import { InputBlob } from "@/components/input-blob";
import { TextEncodingSelector } from "@/components/text-encoding-selector";
import { Labeled } from "@/components/labeled";
import { asTuple } from "@/types/utils";
import {
  characterEncodingAtom,
  enabledAlgorithmsAtom,
  inputTypeAtom,
  outputEncodingAtom,
} from "./persist";
import { HashResult } from "./hash-result";
import { useHash } from "./use-hash";

const ALL_ALGORITHM = Object.values(Hash);
const textAtom = atom("");
const fileAtom = atom<File | undefined>(undefined);

function Page() {
  const [outputEncoding, setOutputEncoding] = useAtom(outputEncodingAtom);
  const [inputType, setInputType] = useAtom(inputTypeAtom);
  const [text, setText] = useAtom(textAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(characterEncodingAtom);
  const [enabledAlgorithms, setEnabledAlgorithms] = useAtom(enabledAlgorithmsAtom);

  const params = useMemo(
    () =>
      asTuple([
        inputType === "text" ? new Blob([text]) : file ?? new Blob(),
        enabledAlgorithms,
        { outputEncoding },
      ]),
    [enabledAlgorithms, file, inputType, outputEncoding, text],
  );

  const { progress, calculating, output } = useHash(params);

  return (
    <div className="space-y-2">
      <InputBlob
        inputType={inputType}
        text={text}
        file={file}
        extra={
          <Labeled label="Output Encoding">
            <TextEncodingSelector value={outputEncoding} onValueChange={setOutputEncoding} />
          </Labeled>
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
              running={calculating}
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
