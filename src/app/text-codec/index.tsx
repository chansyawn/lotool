"use client";

import { useState } from "react";
import {
  CHARACTER_ENCODING_LIST,
  CharacterEncoding,
  TEXT_ENCODING_LIST,
  TextEncoding,
} from "./codec-method";
import GeneralEditTool from "./general-edit-tool";
import CodecInput from "./codec-input";
import CodecOutput from "./codec-output";

const EncodeDecode = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"Encode" | "Decode">("Encode");
  const [multiLineMode, setMultiLineMode] = useState(false);
  const [textEncoding, setTextEncoding] = useState<TextEncoding>(TextEncoding.Base64);
  const [characterEncoding, setCharacterEncoding] = useState<CharacterEncoding>(
    CharacterEncoding.UTF_8,
  );

  const generateOutput = (input: string) => {
    const { encode: encodeText, decode: decodeText } = TEXT_ENCODING_LIST[textEncoding];
    const { encode: encodeCharacter, decode: decodeCharacter } =
      CHARACTER_ENCODING_LIST[characterEncoding];

    const generateOutput = (content: string) => {
      if (mode === "Encode") {
        return encodeText(encodeCharacter(content));
      } else {
        return decodeCharacter(decodeText(content));
      }
    };

    try {
      if (multiLineMode) {
        return input
          .split("\n")
          .map((content) => generateOutput(content))
          .join("\n");
      } else {
        return generateOutput(input);
      }
    } catch (e) {
      return "Invalid input";
    }
  };

  const handleModeChange = (value: "Encode" | "Decode") => {
    setMode(value);
    setInput(generateOutput(input));
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleExchangeButtonClick = () => {
    setInput(generateOutput(input));
  };

  return (
    <div className="space-y-2">
      <GeneralEditTool
        mode={mode}
        setMode={handleModeChange}
        textEncoding={textEncoding}
        setTextEncoding={setTextEncoding}
        characterEncoding={characterEncoding}
        setCharacterEncoding={setCharacterEncoding}
        onExchangeButtonClick={handleExchangeButtonClick}
        multiLineMode={multiLineMode}
        setMultiLineMode={setMultiLineMode}
      />
      <div className="flex h-[36rem] flex-col gap-2 xl:flex-row">
        <CodecInput value={input} onChange={handleInputChange} />
        <CodecOutput value={generateOutput(input)} />
      </div>
    </div>
  );
};

export default EncodeDecode;
