"use client";

import { ChangeEventHandler, useState } from "react";
import {
  CHARACTER_ENCODING_LIST,
  CharacterEncoding,
  TEXT_ENCODING_LIST,
  TextEncoding,
} from "./codec-method";
import GeneralEditTool from "./general-edit-tool";
import { Textarea } from "@/components/ui/textarea";

const EncodeDecode = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"Encode" | "Decode">("Encode");
  const [textEncoding, setTextEncoding] = useState<TextEncoding>(TextEncoding.Base64);
  const [characterEncoding, setCharacterEncoding] = useState<CharacterEncoding>(
    CharacterEncoding.UTF_8,
  );

  const generateOutput = (input: string) => {
    const { encode: encodeText, decode: decodeText } = TEXT_ENCODING_LIST[textEncoding];
    const { encode: encodeCharacter, decode: decodeCharacter } =
      CHARACTER_ENCODING_LIST[characterEncoding];

    try {
      if (mode === "Encode") {
        return encodeText(encodeCharacter(input));
      } else {
        return decodeCharacter(decodeText(input));
      }
    } catch (e) {
      return "Invalid input";
    }
  };

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const text = e.target.value;
    setInput(text);
  };

  const handleExchangeButtonClick = () => {
    setMode(mode === "Encode" ? "Decode" : "Encode");
    setInput(generateOutput(input));
  };

  return (
    <div className="space-y-2">
      <GeneralEditTool
        mode={mode}
        setMode={setMode}
        textEncoding={textEncoding}
        setTextEncoding={setTextEncoding}
        characterEncoding={characterEncoding}
        setCharacterEncoding={setCharacterEncoding}
        onExchangeButtonClick={handleExchangeButtonClick}
      />
      <div className="flex h-[36rem] flex-col gap-4 xl:flex-row">
        <Textarea
          placeholder="Enter text to be encoded"
          className="h-full flex-1 resize-none break-all"
          value={input}
          onChange={handleTextChange}
        />
        <div className="h-full flex-1 break-all rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground shadow-sm">
          {generateOutput(input)}
        </div>
      </div>
    </div>
  );
};

export default EncodeDecode;
