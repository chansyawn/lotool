import { LinkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { RelatedLinkType } from "./RelatedLink";
import WikipediaIcon from "@/icons/wikipedia.svg";

export const LinkIconMap: Record<RelatedLinkType, React.ReactNode> = {
  wiki: <Image src={WikipediaIcon} className="h-4 w-4" alt="Wikipedia" />,
};

type RelatedLinkIconProps = {
  type?: RelatedLinkType;
};

const RelatedLinkIcon = ({ type }: RelatedLinkIconProps) => {
  return type ? LinkIconMap[type] : <LinkIcon className="h-4 w-4" />;
};

export default RelatedLinkIcon;
