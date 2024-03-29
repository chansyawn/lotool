import { useState, type DragEventHandler } from "react";
import { cn } from "@lotool/theme/utils";
import { BinaryPreview } from "./binary-preview";

interface InputBlobFileProps {
  value: File | undefined;
  onValueChange: (value: File) => void;
}

export function InputBlobFile({ value, onValueChange }: InputBlobFileProps) {
  const [activated, setActivated] = useState(false);

  const handleButtonClick = async () => {
    try {
      const [fileHandle] = await window.showOpenFilePicker();
      const file = await fileHandle.getFile();
      onValueChange(file);
    } catch (e) {
      //
    }
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
      <button
        type="button"
        className={cn(
          "flex-1 flex items-center gap-2 justify-center border rounded border-dashed cursor-pointer hover:bg-secondary transition-colors",
          activated && "bg-secondary",
        )}
        onClick={handleButtonClick}
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
        {value ? `${value.name} (${value.size} bytes)` : "Drop or select file here"}
      </button>
      <BinaryPreview blob={value} />
    </div>
  );
}
