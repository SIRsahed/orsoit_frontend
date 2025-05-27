// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log("Token in middleware:", token);

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  console.log("User is authenticated, proceeding to the requested page");

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/dashboard", "/admin/dashboard/:path*"],
};
