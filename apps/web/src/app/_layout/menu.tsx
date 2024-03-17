import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { TOOL_CONFIG } from "@/app/tools/config";
import { ToolIcon } from "@/app/tools/_layout/tool-icon";

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
          className="border-secondary flex h-10 cursor-pointer items-center border-b px-4"
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
  return (
    <ul className="flex h-full flex-col gap-3 overflow-auto p-2">
      {TOOL_CONFIG.map(({ path, name }) => (
        <Link
          key={path}
          href={`/tools/${path}`}
          onClick={onMenuItemClick}
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex select-none items-center rounded-md p-2"
        >
          <ToolIcon className="mr-2 size-4" name={name} path={path} />
          <div className="font-medium">{name}</div>
        </Link>
      ))}
    </ul>
  );
}
