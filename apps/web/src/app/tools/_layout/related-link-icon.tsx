import { Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { type RelatedLinkType } from "./related-link";
import * as icons from "./icons";

export const LINK_ICONS: Record<RelatedLinkType, string> = {
  wikipedia: icons.wikipedia,
  github: icons.github,
};

interface RelatedLinkIconProps {
  type?: RelatedLinkType;
}

export function RelatedLinkIcon({ type }: RelatedLinkIconProps) {
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
