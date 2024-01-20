import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { HEADER_TOOL_PATH } from "./app/tools/layout";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER_TOOL_PATH, new URL(request.url).pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: "/tools/:path*",
};
