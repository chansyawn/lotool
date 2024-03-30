"use client";

import { atom, useAtom } from "jotai";
import { CharacterEncoding } from "@lotool/lib/character-encoding";
import { useMemo } from "react";
import { Hash } from "@lotool/lib/hash";
import { InputBlob } from "@/components/input-blob";
import { TextEncodingSelector } from "@/components/text-encoding-selector";
import { Labeled } from "@/components/labeled";
import { asTuple } from "@/types/utils";
import { outputEncodingAtom } from "./persist";
import { HashResult } from "./hash-result";
import { useHash } from "./use-hash";

const ALL_ALGORITHM = Object.values(Hash);
const textAtom = atom("");
const fileAtom = atom<File | undefined>(undefined);
const characterEncodingAtom = atom(CharacterEncoding.UTF8);
const inputTypeAtom = atom<"text" | "file">("text");

function Page() {
  const [outputEncoding, setOutputEncoding] = useAtom(outputEncodingAtom);
  const [inputType, setInputType] = useAtom(inputTypeAtom);
  const [text, setText] = useAtom(textAtom);
  const [file, setFile] = useAtom(fileAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(characterEncodingAtom);

  const params = useMemo(
    () =>
      asTuple([
        inputType === "text" ? new Blob([text]) : file ?? new Blob(),
        ALL_ALGORITHM,
        { outputEncoding },
      ]),
    [file, inputType, outputEncoding, text],
  );

  const { running, output } = useHash(params);

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
      {output.map(({ algorithm, output }) => (
        <HashResult key={algorithm} running={running} output={output} algorithm={algorithm} />
      ))}
    </div>
  );
}

export default Page;
