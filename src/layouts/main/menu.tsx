"use client";

import Link from "next/link";
import { BackpackIcon, StarIcon } from "@radix-ui/react-icons";
import cn from "@/utils/cn";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { TOOLS } from "@/app/routes";

export const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="overflow-x-auto">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <BackpackIcon className="mr-2" />
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-3 p-2">
              {TOOLS.map(({ name, href, icon, description }) => (
                <MenuItem
                  key={href}
                  title={name}
                  href={href}
                  description={description}
                  icon={icon}
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/awesome" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <StarIcon className="mr-2" />
              Awesome
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type MenuItemProps = {
  title: string;
  href: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
};

const MenuItem = ({ className, title, description, href, icon }: MenuItemProps) => {
  return (
    <li className="overflow-hidden">
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            "flex select-none items-center space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
        >
          {icon && <div className="mr-1 text-3xl">{icon}</div>}
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="truncate text-sm leading-snug text-muted-foreground">{description}</p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};

export default Menu;
