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
      return;
    }
    void readBinaryFromBlob(blob).then(setBinary);
  }, [blob]);

  return (
    <Labeled className="flex flex-col h-full w-[24ch]" label="Binary Preview">
      <ScrollArea className="px-2 bg-muted rounded font-mono py-1 overflow-y-auto flex-1 relative text-sm">
        {(blob?.size ?? 0) > MAX_BYTES && (
          <div className="text-destructive sticky top-0 bg-secondary text-xs font-medium">
            Only display the first {MAX_BYTES} bytes of the binary.
          </div>
        )}
        {binary ? binaryToString(binary, 16) : ""}
      </ScrollArea>
    </Labeled>
  );
}
