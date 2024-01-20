import { RelatedLinkInfo } from "./_layout/related-link";
import { config as timestamp } from "./timestamp";

export type ToolConfig = {
  path: string;
  name: string;
  description: string;
  relatedLink?: RelatedLinkInfo[];
};

const TOOL_CONFIG: ToolConfig[] = [
  timestamp,
  {
    path: "text-codec",
    name: "Text Codec",
    description: "Encode and decode text",
    relatedLink: [
      {
        type: "wikipedia",
        label: "Base 64",
        href: "https://en.wikipedia.org/wiki/Base64",
      },
    ],
  },
];

export default TOOL_CONFIG;
