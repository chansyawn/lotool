import { Link2Icon } from "lucide-react";
import { type IconType, SiGithub, SiWikipedia } from "@icons-pack/react-simple-icons";
import { type ReferencesType } from "./references";

export const LINK_ICONS: Record<ReferencesType, IconType> = {
  wikipedia: SiWikipedia,
  github: SiGithub,
};

interface ReferencesIconProps {
  type?: ReferencesType;
}

export function ReferencesIcon({ type }: ReferencesIconProps) {
  if (!type) {
    return <Link2Icon className="size-4" />;
  }

  const Icon = LINK_ICONS[type];

  return <Icon className="size-4" />;
}
