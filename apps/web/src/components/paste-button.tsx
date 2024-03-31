import { Tooltip, TooltipTrigger, Button, TooltipContent, type ButtonProps } from "@lotool/ui";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useClipboard } from "@/features/clipboard/use-clipboard";

interface PasteButtonProps {
  className?: string;
  variant?: ButtonProps["variant"];
  onPaste: (value: string) => void;
}

export function PasteButton({ onPaste, variant, className }: PasteButtonProps) {
  const { pasteable, paste } = useClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={className}
          disabled={!pasteable}
          variant={variant}
          size="icon"
          onClick={() => {
            void paste().then(onPaste);
          }}
        >
          <ClipboardIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Paste from clipboard</TooltipContent>
    </Tooltip>
  );
}
