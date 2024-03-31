import { type ToolConfig } from "../config";

export const config: ToolConfig = {
  path: "hash",
  name: "Hash",
  description: "Generate hash",
  relatedLink: [
    {
      type: "wikipedia",
      label: "Hash function",
      href: "https://en.wikipedia.org/wiki/Hash_function",
    },
    {
      type: "wikipedia",
      label: "HMAC",
      href: "https://en.wikipedia.org/wiki/HMAC",
    },
    {
      type: "github",
      label: "hash-wasm",
      href: "https://github.com/Daninet/hash-wasm",
    },
  ],
};
