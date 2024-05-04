import { Button, Sheet, SheetContent, SheetTrigger } from "@lotool/ui";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { MenuIcon } from "lucide-react";
import { ColorModeSelector } from "@/features/color-mode/color-mode-selector";
import { MenuContent } from "./menu";
import { Logo } from "./logo";

export function HeaderContent() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Logo />
          <MenuContent />
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex gap-1">
        <a href="https://github.com/chansyawn/lotool" target="_blank" rel="noopener">
          <Button variant="ghost" size="icon">
            <SiGithub className="size-4" />
          </Button>
        </a>
        <ColorModeSelector />
      </div>
    </>
  );
}
