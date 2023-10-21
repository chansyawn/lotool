import { LinkIcon } from "@heroicons/react/24/solid";
import { RelatedLinkType } from "./RelatedLink";
import WikipediaIcon from "@/icons/wikipedia.svg";

export const LinkIconMap: Record<RelatedLinkType, React.ReactNode> = {
  wiki: <WikipediaIcon className="h-4 w-4 fill-current" />,
};

type RelatedLinkIconProps = {
  type?: RelatedLinkType;
};

const RelatedLinkIcon = ({ type }: RelatedLinkIconProps) => {
  return type ? LinkIconMap[type] : <LinkIcon className="h-4 w-4" />;
};

export default RelatedLinkIcon;
