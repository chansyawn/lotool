"use client";

import { useState } from "react";
import { CharacterEncoding, TextEncoding } from "./codec-method";
import GeneralEditTool from "./general-edit-tool";
import useTextCodec from "./useTextCodec";
import InputArea from "@/components/input-area";
import OutputArea from "@/components/output-area";

const Page = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"Encode" | "Decode">("Encode");
  const [multiLineMode, setMultiLineMode] = useState(false);
  const [textEncoding, setTextEncoding] = useState<TextEncoding>(TextEncoding.Base64);
  const [characterEncoding, setCharacterEncoding] = useState<CharacterEncoding>(
    CharacterEncoding.UTF_8,
  );

  const output = useTextCodec(input, {
    mode,
    multiLineMode,
    textEncoding,
    characterEncoding,
  });

  const handleTextEncodingChange = (value: TextEncoding) => {
    setTextEncoding(value);
  };

  const handleModeChange = (value: "Encode" | "Decode") => {
    setMode(value);
    setInput(output);
  };

  return (
    <div className="space-y-2">
      <GeneralEditTool
        mode={mode}
        setMode={handleModeChange}
        textEncoding={textEncoding}
        setTextEncoding={handleTextEncodingChange}
        characterEncoding={characterEncoding}
        setCharacterEncoding={setCharacterEncoding}
        onExchangeButtonClick={() => setInput(output)}
        multiLineMode={multiLineMode}
        setMultiLineMode={setMultiLineMode}
      />
      <div className="flex h-[36rem] flex-col gap-2 xl:flex-row">
        <InputArea
          className="flex-1"
          title="Input"
          value={input}
          onChange={setInput}
          placeholder="Enter text to be encoded"
        />
        <OutputArea className="flex-1" value={output} title="Output" />
      </div>
    </div>
  );
};

export default Page;
