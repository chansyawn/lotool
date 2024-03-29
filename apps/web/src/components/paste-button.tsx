import { Tooltip, TooltipTrigger, Button, TooltipContent } from "@lotool/ui";
import { ClipboardIcon } from "@radix-ui/react-icons";
import { useClipboard } from "@/features/clipboard/use-clipboard";

interface PasteButtonProps {
  onPaste: (value: string) => void;
}

export function PasteButton({ onPaste }: PasteButtonProps) {
  const { pasteable, paste } = useClipboard();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          disabled={!pasteable}
          variant="outline"
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
