import { StaticImageData } from "next/image";
import * as icons from "./icons";

type AwesomeTool = {
  name: string;
  url: string;
  desc: string;
  icon?: StaticImageData;
};

export const AWESOME_TOOLS: AwesomeTool[] = [
  {
    name: "Excalidraw",
    url: "https://excalidraw.com",
    desc: "An open source virtual hand-drawn style whiteboard. Collaborative and end-to-end encrypted.",
    icon: icons.excalidraw,
  },
  {
    name: "Carbon",
    url: "https://carbon.now.sh",
    desc: "Create and share beautiful images of your source code.",
    icon: icons.carbon,
  },
  {
    name: "Color Hunt",
    url: "https://colorhunt.co",
    desc: "Discover the newest hand-picked color palettes of Color Hunt. Get color inspiration for your design and art projects.",
    icon: icons.color_hunt,
  },
  {
    name: "Temp Email",
    url: "https://temp-mail.org",
    desc: "Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.",
    icon: icons.temp_mail,
  },
  {
    name: "Random User Generator",
    url: "https://randomuser.me",
    desc: "A free, open-source API for generating random user data. Like Lorem Ipsum, but for people.",
    icon: icons.random_user,
  },
  {
    name: "RegExr",
    url: "https://regexr.com",
    desc: "Regular expression tester with syntax highlighting, PHP / PCRE & JS Support, contextual help, cheat sheet, reference, and searchable community patterns.",
    icon: icons.regexr,
  },
  {
    name: "regex 101",
    url: "https://regex101.com/",
    desc: "Regular expression tester with syntax highlighting, explanation, cheat sheet for PHP/PCRE, Python, GO, JavaScript, Java, C#/.NET, Rust.",
    icon: icons.regex101,
  },
];
