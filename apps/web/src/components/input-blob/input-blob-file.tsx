import { useState, type DragEventHandler, type ChangeEventHandler } from "react";
import { cn } from "@lotool/theme/utils";
import { UploadIcon } from "@radix-ui/react-icons";
import { Badge } from "@lotool/ui";
import { formatBytes } from "@/features/formatter/byte";
import { Labeled } from "../labeled";
import { BinaryPreview } from "./binary-preview";

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
    <div className="gap-2 mt-2 flex h-72">
      <Labeled label="File" className="flex-1 flex flex-col font-medium">
        <label
          className={cn(
            "flex items-center gap-2 justify-center border rounded border-dashed cursor-pointer hover:bg-secondary transition-colors w-full flex-1 flex-col p-2 text-center",
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
              <div className="gap-1 flex">
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
      </Labeled>
      <BinaryPreview blob={value} />
    </div>
  );
}
