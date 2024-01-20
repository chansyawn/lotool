type Tool = {
  path: string;
  name: string;
  description: string;
};

export const TOOLS: Tool[] = [
  {
    path: "timestamp",
    name: "Timestamp",
    description: "Format timestamp",
  },
  {
    path: "text-codec",
    name: "Text Codec",
    description: "Encode and decode text",
  },
];
