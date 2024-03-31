import { CopyButton } from "@/components/copy-button";

interface HashResultProps {
  algorithm: string;
  content: string;
  calculating: boolean;
}

export function HashResult({ algorithm, content, calculating }: HashResultProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-1 flex items-center gap-2 px-1">
        <div className="text-lg font-medium">{algorithm}</div>
        <CopyButton data={content} variant="ghost" className="ml-auto" />
      </div>
      <div className="bg-muted text-muted-foreground flex-1 overflow-auto whitespace-pre-wrap break-all rounded-md border px-3 py-2 text-sm shadow-sm">
        {calculating ? "Calculating..." : content}
      </div>
    </div>
  );
}
