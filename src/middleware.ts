// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Just pass the request through with no changes
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Applies only to the root path ("/")
};
