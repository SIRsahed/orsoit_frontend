import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server"; // Import NextRequest

export async function GET(req: NextRequest) {
  // Use NextRequest here
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return NextResponse.json(token || { error: "No token found" });
}
