"use client";

import { atom, useAtom } from "jotai";
import { Hash } from "@lotool/lib/hash";
import { CharacterEncoding } from "@lotool/lib/character-encoding";
import { InputBlob } from "@/components/input-blob";
import { TextEncodingSelector } from "@/components/text-encoding-selector";
import { Labeled } from "@/components/labeled";
import { outputEncodingAtom } from "./persist";
import { HashResult } from "./hash-result";

const ENABLED_ALGORITHM = [Hash.MD5, Hash.SHA1, Hash.SHA256, Hash.SHA384, Hash.SHA512];

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
  const input = inputType === "text" ? new Blob([text]) : file;

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
      {ENABLED_ALGORITHM.map((algorithm) => (
        <HashResult
          key={algorithm}
          algorithm={algorithm}
          value={input ?? new Blob()}
          outputEncoding={outputEncoding}
        />
      ))}
    </div>
  );
}

export default Page;
