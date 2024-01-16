import CurrentTimeEmoji from "./timestamp/current-time-emoji";

type Tool = {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
};

export const TOOLS: Tool[] = [
  {
    name: "Timestamp",
    href: "/timestamp",
    icon: <CurrentTimeEmoji />,
    description: "Format timestamp",
  },
  {
    name: "Text Codec",
    href: "/text-codec",
    icon: "🔣",
    description: "Encode and decode text",
  },
];
