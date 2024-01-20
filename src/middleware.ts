import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tool-path", new URL(request.url).pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: "/tools/:path*",
};
