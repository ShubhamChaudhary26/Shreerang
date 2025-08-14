import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login"; // ya tumhara OTP page
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "supersecretkey");
    const { payload } = await jwtVerify(token, secret);

    if (!payload.isAdmin) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
