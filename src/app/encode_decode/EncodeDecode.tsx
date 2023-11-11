"use client";

import { useState } from "react";
import { ENCODE_STANDARD_LIST, EncodeStandard } from "./encodeStandards";
import { asciiToUnicode, unicodeToAscii } from "./encodeStandards/utils";
import { Textarea } from "@/components/TextArea";
import { RadioGroup, RadioGroupItem } from "@/components/Radio";

const EncodeDecode = () => {
  const [text, setText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [encodeStandard, setEncodeStandard] = useState<EncodeStandard>(EncodeStandard.Base64);
  const { encode, decode } = ENCODE_STANDARD_LIST[encodeStandard];

  const handleTextChange = (text: string) => {
    setText(text);
    setEncodedText(encode(unicodeToAscii(text)));
  };

  const handleEncodedTextChange = (encodedText: string) => {
    setEncodedText(encodedText);
    try {
      setText(asciiToUnicode(decode(encodedText)));
    } catch (e) {
      setText("The string to be decoded is not correctly encoded");
    }
  };

  const handleEncodeStandardChange = (value: string) => {
    const targetStandard: EncodeStandard = Number(value);
    const { encode } = ENCODE_STANDARD_LIST[targetStandard];
    setEncodeStandard(targetStandard);
    setEncodedText(encode(unicodeToAscii(text)));
  };

  return (
    <div className="space-y-2">
      <RadioGroup
        className="flex"
        variant="button"
        value={String(encodeStandard)}
        onValueChange={handleEncodeStandardChange}
      >
        {Object.entries(ENCODE_STANDARD_LIST).map(([key, { name }]) => (
          <RadioGroupItem key={key} value={key} label={name} />
        ))}
      </RadioGroup>
      <Textarea value={text} onChange={handleTextChange} />
      <Textarea value={encodedText} onChange={handleEncodedTextChange} />
    </div>
  );
};

export default EncodeDecode;
