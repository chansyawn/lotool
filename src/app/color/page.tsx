import dynamic from "next/dynamic";
import Tool from "@/layouts/tool";
import { RelatedLinkInfo } from "@/layouts/tool/RelatedLink";

const Color = dynamic(() => import("./Color"), { ssr: false });

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
    <Tool name="Color" icon="🎨" relativeLink={TimestampRelatedLink} developing>
      <Color />
    </Tool>
  );
};

export default ColorPage;
