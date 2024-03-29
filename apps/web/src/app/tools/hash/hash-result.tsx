import { type Hash } from "@lotool/lib/hash";
import { type TextEncoding } from "@lotool/lib/text-encoding";
import { CopyButton } from "@/components/copy-button";
import { useHash } from "./use-hash";

interface HashResultProps {
  algorithm: Hash;
  value: Blob;
  outputEncoding: TextEncoding;
}

export function HashResult({ algorithm, value, outputEncoding }: HashResultProps) {
  const { output, running } = useHash(value, { algorithm, outputEncoding });

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="mr-auto text-lg font-medium">{algorithm}</div>
        <CopyButton data={output} variant="ghost" />
      </div>
      <div className="bg-muted text-muted-foreground flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border px-3 py-2 text-sm shadow-sm">
        {running ? "Running..." : output}
      </div>
    </div>
  );
}
