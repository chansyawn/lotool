"use client";

import { atom, useAtom } from "jotai";
import { Hash } from "@lotool/lib/hash";
import { InputArea } from "@/components/input-area";
import { OutputArea } from "@/components/output-area";
import { EditBar } from "./edit-bar";
import { useHash } from "./use-hash";
import {
  characterEncodingAtom,
  multiLineModeAtom,
  outputEncodingAtom,
} from "./persist";

const inputAtom = atom("");

const ENABLED_ALGORITHM = [
  Hash.MD5,
  Hash.SHA1,
  Hash.SHA256,
  Hash.SHA384,
  Hash.SHA512,
];

function Page() {
  const [input, setInput] = useAtom(inputAtom);
  const [multiLineMode, setMultiLineMode] = useAtom(multiLineModeAtom);
  const [outputEncoding, setOutputEncoding] = useAtom(outputEncodingAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(
    characterEncodingAtom,
  );

  const output = useHash(input, {
    multiLineMode,
    outputEncoding,
    characterEncoding,
    enabledAlgorithm: ENABLED_ALGORITHM,
  });

  return (
    <div className="space-y-2">
      <EditBar
        outEncoding={outputEncoding}
        onOutputEncodingChange={setOutputEncoding}
        characterEncoding={characterEncoding}
        onCharacterEncodingChange={setCharacterEncoding}
        multiLineMode={multiLineMode}
        onMultiLineModeChange={setMultiLineMode}
      />
      <InputArea
        className="h-48"
        title="Input"
        value={input}
        onChange={setInput}
      />
      {output.map(({ algorithm, value }) => (
        <OutputArea key={algorithm} title={algorithm} value={value} />
      ))}
    </div>
  );
}

export default Page;
