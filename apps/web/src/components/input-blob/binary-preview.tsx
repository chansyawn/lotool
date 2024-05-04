import { ScrollArea } from "@lotool/ui";
import { useEffect, useState } from "react";
import { Labeled } from "../labeled";

interface BinaryPreviewProps {
  blob: Blob | undefined;
}

const MAX_BYTES = 4096;

const binaryToString = (binary: ArrayBuffer, radix: number): string => {
  const itemMaxLength = Math.ceil(8 / Math.log2(radix));
  return Array.from(new Uint8Array(binary))
    .map((byte: number) => byte.toString(radix).padStart(itemMaxLength, "0"))
    .join(" ");
};

const readBinaryFromBlob = async (blob: Blob) => {
  const stream = blob.stream();
  const reader = stream.getReader({ mode: "byob" });
  const buffer = new ArrayBuffer(MAX_BYTES);
  const { value } = await reader.read(new Uint8Array(buffer));
  return value;
};

export function BinaryPreview({ blob }: BinaryPreviewProps) {
  const [binary, setBinary] = useState<ArrayBuffer>();

  useEffect(() => {
    if (!blob) {
      setBinary(undefined);
      return;
    }
    void readBinaryFromBlob(blob).then(setBinary);
  }, [blob]);

  return (
    <Labeled className="flex min-h-32 flex-1 flex-col" label="Binary Preview">
      <ScrollArea className="bg-muted relative flex-1 overflow-y-auto rounded px-2 py-1 font-mono text-sm">
        {(blob?.size ?? 0) > MAX_BYTES && (
          <div className="text-destructive bg-secondary sticky top-0 text-xs font-medium">
            Only display the first {MAX_BYTES} bytes of the binary.
          </div>
        )}
        {binary ? binaryToString(binary, 16) : ""}
      </ScrollArea>
    </Labeled>
  );
}
