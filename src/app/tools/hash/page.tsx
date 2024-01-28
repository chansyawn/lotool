"use client";

import { atom, useAtom } from "jotai";
import EditBar from "./edit-bar";
import useHash from "./use-hash";
import { characterEncodingAtom, multiLineModeAtom, outputEncodingAtom } from "./persist";
import InputArea from "@/components/input-area";
import OutputArea from "@/components/output-area";
import { Hash } from "@/utils/hash";

const inputAtom = atom("");

const Page = () => {
  const [input, setInput] = useAtom(inputAtom);
  const [multiLineMode, setMultiLineMode] = useAtom(multiLineModeAtom);
  const [outputEncoding, setOutputEncoding] = useAtom(outputEncodingAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(characterEncodingAtom);

  const output = useHash(input, {
    multiLineMode,
    outputEncoding: outputEncoding,
    characterEncoding,
    enabledAlgorithm: [Hash.SHA_1, Hash.SHA_256, Hash.SHA_384, Hash.SHA_512],
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
      <InputArea title="Input" value={input} onChange={setInput} />
      {output.map(({ algorithm, value }) => (
        <OutputArea key={algorithm} title={algorithm} value={value} />
      ))}
    </div>
  );
};

export default Page;
