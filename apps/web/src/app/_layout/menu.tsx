import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@lotool/theme/utils";
import { ScrollArea } from "@lotool/ui";
import { ToolIcon } from "@/app/tools/_layout/tool-icon";
import { TOOL_CONFIG } from "@/app/tools/config";

interface MenuContentProps {
  onMenuItemClick?: () => void;
}

export function MenuContent({ onMenuItemClick }: MenuContentProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      <nav className="grid items-start font-medium">
        {TOOL_CONFIG.map(({ path, name }) => (
          <Link
            key={path}
            href={`/tools/${path}`}
            onClick={onMenuItemClick}
            className={cn(
              "hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
              pathname === `/tools/${path}` ? "bg-muted text-primary" : "text-muted-foreground",
            )}
          >
            <ToolIcon name={name} path={path} className="size-4" />
            <div className="font-medium">{name}</div>
          </Link>
        ))}
      </nav>
    </ScrollArea>
  );
}
