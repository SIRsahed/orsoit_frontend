import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Add debugging
  console.log("Middleware running for:", pathname);
  console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    // Add this for debugging
    secureCookie: process.env.NODE_ENV === "production",
  });

  const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/verify-email", "/auth/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const isStatic = pathname.startsWith("/_next") || pathname.includes(".");

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute && !isStatic) {
    return NextResponse.redirect(new URL("/", request.url));
  }




  // Redirect authenticated users away from public/auth routes
  if (token && ["/login", "/register", "/verify", "/forgot-password"].includes(pathname)) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    if (token.role === "ceo") {
      return NextResponse.redirect(new URL("/ceo", request.url));
    }
    if (token.role === "sales") {
      return NextResponse.redirect(new URL("/sales", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Role-based dashboard access control
  if (token) {
    // Admin trying to access other dashboards
    if (
      token.role === "admin" &&
      (pathname.startsWith("/sales") || pathname.startsWith("/ceo"))
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // CEO trying to access other dashboards
    if (
      token.role === "ceo" &&
      (pathname.startsWith("/admin") || pathname.startsWith("/sales"))
    ) {
      return NextResponse.redirect(new URL("/ceo", request.url));
    }

    // Sales trying to access other dashboards
    if (
      token.role === "sales" &&
      (pathname.startsWith("/admin") || pathname.startsWith("/ceo"))
    ) {
      return NextResponse.redirect(new URL("/sales", request.url));
    }

    // Customer or users without specific roles trying to access any dashboard
    if (
      !["admin", "ceo", "sales"].includes(token.role) &&
      (pathname.startsWith("/admin") ||
        pathname.startsWith("/ceo") ||
        pathname.startsWith("/sales"))
    ) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
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

  // Protect /sales/* — only sales can access
  if (pathname.startsWith("/sales")) {
    if (!token || token.role !== "sales") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
