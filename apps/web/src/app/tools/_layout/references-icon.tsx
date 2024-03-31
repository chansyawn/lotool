import { Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { type ReferencesType } from "./references";
import * as icons from "./icons";

export const LINK_ICONS: Record<ReferencesType, string> = {
  wikipedia: icons.wikipedia,
  github: icons.github,
};

interface ReferencesIconProps {
  type?: ReferencesType;
}

export function ReferencesIcon({ type }: ReferencesIconProps) {
  if (!type) {
    return <Link1Icon className="size-4" />;
  }

  return (
    <Image
      alt={`${type}-link`}
      src={LINK_ICONS[type]}
      className="size-4 dark:invert"
      width={16}
      height={16}
    />
  );
}
