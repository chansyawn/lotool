import dynamic from "next/dynamic";
import { Metadata } from "next";
import Tool from "@/layouts/tool";
import { RelatedLinkInfo } from "@/layouts/tool/RelatedLink";

const Color = dynamic(() => import("./Color"), { ssr: false });

export const metadata: Metadata = {
  title: "Lotool - Color",
};

const TimestampRelatedLink: RelatedLinkInfo[] = [
  {
    type: "wiki",
    label: "Gamut",
    href: "https://en.wikipedia.org/wiki/Gamut",
  },
  {
    type: "github",
    label: "color-names",
    href: "https://github.com/meodai/color-names",
  },
];

const ColorPage = () => {
  return (
    <Tool name="Color" icon="🎨" relativeLink={TimestampRelatedLink}>
      <Color />
    </Tool>
  );
};

export default ColorPage;
