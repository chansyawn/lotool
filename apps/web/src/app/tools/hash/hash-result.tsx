import { CopyButton } from "@/components/copy-button";

interface HashResultProps {
  algorithm: string;
  content: string;
  running: boolean;
}

export function HashResult({ algorithm, content, running }: HashResultProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="text-lg font-medium mr-auto">{algorithm}</div>
        <CopyButton data={content} variant="ghost" />
      </div>
      <div className="bg-muted text-muted-foreground flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border px-3 py-2 text-sm shadow-sm">
        {running ? "Running..." : content}
      </div>
    </div>
  );
}
