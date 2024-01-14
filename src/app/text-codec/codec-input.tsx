"use client";

import { ClipboardIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useClipboard from "@/hooks/use-clipboard";
import SimpleTooltip from "@/components/simple-tooltip";

type CodecInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const CodecInput = ({ value, onChange }: CodecInputProps) => {
  const { paste } = useClipboard();

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="mr-auto text-lg font-medium">Input</div>
        <SimpleTooltip content="Paste from clipboard">
          <Button variant="ghost" size="icon" onClick={() => paste().then(onChange)}>
            <ClipboardIcon />
          </Button>
        </SimpleTooltip>
      </div>
      <Textarea
        placeholder="Enter text to be encoded"
        className="flex-1 resize-none break-all"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CodecInput;
