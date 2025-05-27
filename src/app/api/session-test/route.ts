import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server"; // Import NextRequest

export async function GET(req: NextRequest) {
  // Use NextRequest here
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  });

  return NextResponse.json(token || { error: "No token found" });
}
