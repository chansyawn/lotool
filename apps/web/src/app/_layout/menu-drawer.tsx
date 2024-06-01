import { Button, Sheet, SheetContent, SheetTrigger } from "@lotool/ui";
import { MenuIcon } from "lucide-react";
import { MenuContent } from "./menu";
import { Logo } from "./logo";

export function MenuDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-secondary flex flex-col p-3">
        <Logo className="p-2" />
        <MenuContent />
      </SheetContent>
    </Sheet>
  );
}
