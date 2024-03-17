"use client";

import { atom, useAtom } from "jotai";
import { InputArea } from "@/components/input-area";
import { OutputArea } from "@/components/output-area";
import { EditBar } from "./edit-bar";
import { useTextCodec } from "./use-text-codec";
import { characterEncodingAtom, modeAtom, multiLineModeAtom, textEncodingAtom } from "./persist";

const inputAtom = atom("");

function Page() {
  const [input, setInput] = useAtom(inputAtom);
  const [mode, setMode] = useAtom(modeAtom);
  const [multiLineMode, setMultiLineMode] = useAtom(multiLineModeAtom);
  const [textEncoding, setTextEncoding] = useAtom(textEncodingAtom);
  const [characterEncoding, setCharacterEncoding] = useAtom(characterEncodingAtom);

  const output = useTextCodec(input, {
    mode,
    multiLineMode,
    textEncoding,
    characterEncoding,
  });

  const handleModeChange = (value: "Encode" | "Decode") => {
    setMode(value);
    setInput(output);
  };

  return (
    <div className="space-y-2">
      <EditBar
        mode={mode}
        onModeChange={handleModeChange}
        textEncoding={textEncoding}
        onTextEncodingChange={setTextEncoding}
        characterEncoding={characterEncoding}
        onCharacterEncodingChange={setCharacterEncoding}
        onExchangeButtonClick={() => {
          setInput(output);
        }}
        multiLineMode={multiLineMode}
        onMultiLineModeChange={setMultiLineMode}
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
}

export default Page;
