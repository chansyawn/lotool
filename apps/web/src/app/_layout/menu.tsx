import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@lotool/theme/utils";
import { ScrollArea } from "@lotool/ui";
import { ToolIcon } from "@/app/tools/_layout/tool-icon";
import { TOOL_CONFIG } from "@/app/tools/config";

export function Menu() {
  const [collapsed, setCollapsed] = useState(true);

  const handleCollapseMenu = () => {
    setCollapsed((pre) => !pre);
  };

  const handleMenuItemClick = () => {
    setCollapsed(true);
  };

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          className="border-secondary flex h-10 w-full cursor-pointer items-center border-b px-4"
          onClick={handleCollapseMenu}
        >
          <HamburgerMenuIcon className="mr-2" />
          Menu
        </button>
        {!collapsed && (
          <div className="absolute z-10 h-[calc(100%-2rem)] w-full bg-white">
            <MenuContent onMenuItemClick={handleMenuItemClick} />
          </div>
        )}
      </div>
      <div className="sticky hidden w-52 pt-2 lg:block">
        <MenuContent />
      </div>
    </>
  );
}

interface MenuContentProps {
  onMenuItemClick?: () => void;
}

export function MenuContent({ onMenuItemClick }: MenuContentProps) {
  const pathname = usePathname();

  return (
    <ScrollArea className="h-full">
      <ul className="px-1">
        {TOOL_CONFIG.map(({ path, name }) => (
          <Link
            key={path}
            href={`/tools/${path}`}
            onClick={onMenuItemClick}
            className={cn(
              "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
              pathname === `/tools/${path}`
                ? "text-foreground"
                : "text-muted-foreground",
            )}
          >
            <ToolIcon className="mr-2 size-3.5" name={name} path={path} />
            <div className="font-medium">{name}</div>
          </Link>
        ))}
      </ul>
    </ScrollArea>
  );
}
