import { type RelatedLinkInfo } from "./_layout/related-link";
import { config as timestamp } from "./timestamp";
import { config as textCodec } from "./text-codec";
import { config as hash } from "./hash";

export interface ToolConfig {
  path: string;
  name: string;
  description: string;
  relatedLink?: RelatedLinkInfo[];
}

export const TOOL_CONFIG: ToolConfig[] = [timestamp, textCodec, hash];
