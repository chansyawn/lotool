import { CopyButton } from "@/components/copy-button";

interface HashResultProps {
  algorithm: string;
  output: string;
  running: boolean;
}

export function HashResult({ algorithm, output, running }: HashResultProps) {
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
