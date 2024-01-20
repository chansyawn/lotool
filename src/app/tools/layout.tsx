import { Metadata } from "next";
import { headers } from "next/headers";
import TOOL_CONFIG from "./config";
import Tool from "./_layout";

export const HEADER_TOOL_PATH = "x-tool-path";

export async function generateMetadata(): Promise<Metadata> {
  const tool = TOOL_CONFIG.find(
    (tool) => `/tools/${tool.path}` === headers().get(HEADER_TOOL_PATH),
  );
  if (!tool) {
    return {};
  }

  const { name, description } = tool;
  return {
    title: `Lotool - ${name}`,
    description,
  };
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Tool>{children}</Tool>;
};

export default Layout;
