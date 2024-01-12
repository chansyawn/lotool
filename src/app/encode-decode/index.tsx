"use client";

import { ChangeEventHandler, useState } from "react";
import { ENCODE_STANDARD_LIST, EncodeStandard } from "./encode-standards";
import { asciiToUnicode, unicodeToAscii } from "./encode-standards/utils";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const EncodeDecode = () => {
  const [text, setText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [encodeStandard, setEncodeStandard] = useState<EncodeStandard>(EncodeStandard.Base64);
  const { encode, decode } = ENCODE_STANDARD_LIST[encodeStandard];

  const handleTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const text = e.target.value;
    setText(text);
    setEncodedText(encode(unicodeToAscii(text)));
  };

  const handleEncodedTextChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const encodedText = e.target.value;
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
        className="flex items-center"
        value={String(encodeStandard)}
        onValueChange={handleEncodeStandardChange}
      >
        {Object.entries(ENCODE_STANDARD_LIST).map(([key, { name }]) => (
          <>
            <RadioGroupItem key={key} value={key} />
            <Label>{name}</Label>
          </>
        ))}
      </RadioGroup>
      <section>
        <div className="mb-1 flex items-center gap-1">
          <span className="mr-auto text-lg font-medium">Decoded</span>
        </div>
        <Textarea className="min-h-[10rem] break-all" value={text} onChange={handleTextChange} />
      </section>
      <section>
        <div className="mb-1 flex items-center">
          <span className="mr-auto text-lg font-medium">Decoded</span>
        </div>
        <Textarea
          className="min-h-[10rem] break-all"
          value={encodedText}
          onChange={handleEncodedTextChange}
        />
      </section>
    </div>
  );
};

export default EncodeDecode;
