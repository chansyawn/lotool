import { LinkIcon } from "@heroicons/react/24/solid";
import { RelatedLinkType } from "./RelatedLink";
import WikipediaIcon from "@/icons/wikipedia.svg";
import GithubIcon from "@/icons/github.svg";

export const LinkIconMap: Record<RelatedLinkType, React.ComponentType> = {
  wiki: WikipediaIcon,
  github: GithubIcon,
};

type RelatedLinkIconProps = {
  type?: RelatedLinkType;
};

const RelatedLinkIcon = ({ type }: RelatedLinkIconProps) => {
  const Icon = type ? LinkIconMap[type] : LinkIcon;

  return <Icon className="h-4 w-4 fill-current" />;
};

export default RelatedLinkIcon;
