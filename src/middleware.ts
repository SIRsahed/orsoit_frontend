import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  const isStatic =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon");

  if (isStatic) {
    return NextResponse.next();
  }

  // Add debugging (remove in production)
  console.log("Middleware running for:", pathname);
  console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

  let token;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
      // Add these options for better Vercel compatibility
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });
  } catch (error) {
    console.error("Error getting token in middleware:", error);
    token = null;
  }

  console.log("Token exists:", !!token);
  console.log("Token role:", token?.role);

  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/403", // Add 403 to public routes to avoid redirect loops
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Redirect unauthenticated users trying to access protected routes
  if (!token && !isPublicRoute) {
    console.log("Redirecting unauthenticated user to home");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from auth routes
  if (
    token &&
    ["/auth/login", "/auth/register", "/auth/verify-email"].includes(pathname)
  ) {
    console.log("Redirecting authenticated user from auth page");
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

  // Role-based access control
  if (token) {
    const userRole = token.role as string;

    // Admin trying to access other dashboards
    if (
      userRole === "admin" &&
      (pathname.startsWith("/sales") || pathname.startsWith("/ceo"))
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    // CEO trying to access other dashboards
    if (
      userRole === "ceo" &&
      (pathname.startsWith("/admin") || pathname.startsWith("/sales"))
    ) {
      return NextResponse.redirect(new URL("/ceo", request.url));
    }

    // Sales trying to access other dashboards
    if (
      userRole === "sales" &&
      (pathname.startsWith("/admin") || pathname.startsWith("/ceo"))
    ) {
      return NextResponse.redirect(new URL("/sales", request.url));
    }

    // Users without specific roles trying to access dashboards
    if (
      !["admin", "ceo", "sales"].includes(userRole) &&
      (pathname.startsWith("/admin") ||
        pathname.startsWith("/ceo") ||
        pathname.startsWith("/sales"))
    ) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  // Specific dashboard protections
  if (pathname.startsWith("/admin") && (!token || token.role !== "admin")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (pathname.startsWith("/ceo") && (!token || token.role !== "ceo")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  if (pathname.startsWith("/sales") && (!token || token.role !== "sales")) {
    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (*.png, *.jpg, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};
