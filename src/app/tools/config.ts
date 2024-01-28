import { RelatedLinkInfo } from "./_layout/related-link";
import { config as timestamp } from "./timestamp";
import { config as textCodec } from "./text-codec";
import { config as hash } from "./hash";

export type ToolConfig = {
  path: string;
  name: string;
  description: string;
  relatedLink?: RelatedLinkInfo[];
};

const TOOL_CONFIG: ToolConfig[] = [timestamp, textCodec, hash];

export default TOOL_CONFIG;
