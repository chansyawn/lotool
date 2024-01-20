import { Link1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import { RelatedLinkType } from "./related-link";
import * as icons from "./icons";

type RelatedLinkIconProps = {
  type?: RelatedLinkType;
};

const RelatedLinkIcon = ({ type }: RelatedLinkIconProps) => {
  if (!type) {
    return <Link1Icon className="size-4" />;
  }

  return <Image alt={`${type}-link`} src={icons[type]} className="size-4" width={16} height={16} />;
};

export default RelatedLinkIcon;
