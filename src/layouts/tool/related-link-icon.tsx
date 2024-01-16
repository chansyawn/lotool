import { Link1Icon } from "@radix-ui/react-icons";
import { RelatedLinkType } from "./related-link";
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
  const Icon = type ? LinkIconMap[type] : Link1Icon;

  return <Icon className="size-4 fill-current" />;
};

export default RelatedLinkIcon;
