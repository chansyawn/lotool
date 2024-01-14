import dynamic from "next/dynamic";
import { Metadata } from "next";
import Tool from "@/layouts/tool";
import { RelatedLinkInfo } from "@/layouts/tool/related-link";

const PageContent = dynamic(() => import("."), { ssr: false });

export const metadata: Metadata = {
  title: "Lotool - Encode",
};

const RelatedLink: RelatedLinkInfo[] = [
  {
    type: "wiki",
    label: "Base 64",
    href: "https://en.wikipedia.org/wiki/Base64",
  },
];

const Page = () => {
  return (
    <Tool name="Text Codec" icon="🔣" relativeLink={RelatedLink}>
      <PageContent />
    </Tool>
  );
};

export default Page;
