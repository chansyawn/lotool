import Link from "next/link";
import ToolIcon from "../tools/_layout/tool-icon";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import TOOL_CONFIG from "@/app/tools/config";

export const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="overflow-x-auto">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-3 p-2">
              {TOOL_CONFIG.map(({ path, name, description }) => (
                <ToolMenuItem key={path} title={name} path={path} description={description} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/awesome" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Awesome
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

type ToolMenuItemProps = {
  title: string;
  path: string;
  description: string;
};

const ToolMenuItem = ({ title, description, path }: ToolMenuItemProps) => {
  return (
    <li className="overflow-hidden">
      <Link href={`/tools/${path}`} legacyBehavior passHref>
        <NavigationMenuLink className="flex select-none items-center space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <ToolIcon className="mr-2 size-6" name={title} path={path} />
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
