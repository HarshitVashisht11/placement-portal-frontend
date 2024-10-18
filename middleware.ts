// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/auth/login", "/auth/register", "/"];

export function middleware(request: NextRequest) {
  console.info("COOKIES: ", request.cookies);
  const token = request.cookies.get("auth_token")?.value;

  console.log("------------------------------");
  console.log("TOKEN    : ", token);

  if (!token) {
    console.log("TOKEN NOT FOUND");
  }
  const pathname = request.nextUrl.pathname;

  if (
    publicPaths.includes(request.nextUrl.pathname) ||
    pathname.startsWith("/user/verify")
  ) {
    console.info("COOKIES: ", request.cookies);
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next|favicon.ico).*)",
};
