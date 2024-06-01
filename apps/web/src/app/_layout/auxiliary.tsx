import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "@lotool/theme/utils";
import { Button } from "@lotool/ui";
import { ColorModeSelector } from "@/features/color-mode/color-mode-selector";

interface AuxiliaryProps {
  className?: string;
}

export function Auxiliary({ className }: AuxiliaryProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      <a href="https://github.com/chansyawn/lotool" target="_blank" rel="noopener">
        <Button variant="ghost" size="icon">
          <SiGithub className="size-4" />
        </Button>
      </a>
      <ColorModeSelector />
    </div>
  );
}
