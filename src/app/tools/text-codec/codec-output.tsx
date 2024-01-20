"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/use-clipboard";
import SimpleTooltip from "@/components/simple-tooltip";

type CodecOutputProps = {
  value: string;
};

const CodecOutput = ({ value }: CodecOutputProps) => {
  const { copy, copied } = useClipboard();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="mr-auto text-lg font-medium">Output</div>
        <SimpleTooltip content="Paste from clipboard">
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => copy(value)}>
            {copied ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </SimpleTooltip>
      </div>
      <div className="flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground shadow-sm">
        {value}
      </div>
    </div>
  );
};

export default CodecOutput;
