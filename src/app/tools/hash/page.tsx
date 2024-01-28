"use client";

import { useState } from "react";
import EditBar from "./edit-bar";
import useHash from "./use-hash";
import InputArea from "@/components/input-area";
import OutputArea from "@/components/output-area";
import { CharacterEncoding } from "@/utils/codec/character";
import { TextEncoding } from "@/utils/codec/text";
import { Hash } from "@/utils/hash";

const Page = () => {
  const [input, setInput] = useState("");
  const [multiLineMode, setMultiLineMode] = useState(false);
  const [outputEncoding, setOutputEncoding] = useState<TextEncoding>(TextEncoding.Base64);
  const [characterEncoding, setCharacterEncoding] = useState<CharacterEncoding>(
    CharacterEncoding.UTF_8,
  );

  const output = useHash(input, {
    multiLineMode,
    textEncoding: outputEncoding,
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
