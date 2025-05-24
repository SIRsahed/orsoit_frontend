import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/verify", "/auth/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const isStatic = pathname.startsWith("/_next") || pathname.includes(".");

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute && !isStatic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from public/auth routes
  if (token && ["/login", "/register", "/verify", "/forgot-password"].includes(pathname)) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "ceo") {
      return NextResponse.redirect(new URL("/ceo", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect /admin/* — only admin can access
  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // Protect /ceo/* — only ceo can access
  if (pathname.startsWith("/ceo")) {
    if (!token || token.role !== "ceo") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
