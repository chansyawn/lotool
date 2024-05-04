import { useState, type DragEventHandler, type ChangeEventHandler } from "react";
import { cn } from "@lotool/theme/utils";
import { UploadIcon } from "lucide-react";
import { Badge } from "@lotool/ui";
import { formatBytes } from "@/features/formatter/byte";

interface InputBlobFileProps {
  value: File | undefined;
  onValueChange: (value: File | undefined) => void;
}

export function InputBlobFile({ value, onValueChange }: InputBlobFileProps) {
  const [activated, setActivated] = useState(false);

  const handleButtonClick: ChangeEventHandler<HTMLInputElement> = (e) => {
    onValueChange(e.target.files?.[0]);
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    setActivated(false);
    const dataTransfer = [...e.dataTransfer.items].filter((item) => item.kind === "file")[0];
    const file = dataTransfer?.getAsFile();
    if (file) {
      onValueChange(file);
    }
  };

  return (
    <div className="flex h-full gap-2">
      <label
        className={cn(
          "hover:bg-secondary flex w-full flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded border border-dashed p-2 text-center transition-colors",
          activated && "bg-secondary",
        )}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
        onDragEnter={() => {
          setActivated(true);
        }}
        onDragLeave={() => {
          setActivated(false);
        }}
      >
        <input type="file" className="hidden" onChange={handleButtonClick} />
        {value ? (
          <>
            <div>{value.name}</div>
            <div className="flex gap-1">
              <Badge>{formatBytes(value.size)}</Badge>
              {value.type ? <Badge>{value.type}</Badge> : null}
            </div>
          </>
        ) : (
          <span className="flex items-center gap-1 font-medium">
            <UploadIcon className="size-4" /> Drag and drop or click to select file
          </span>
        )}
      </label>
    </div>
  );
}
