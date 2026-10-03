import { getToken } from "next-auth/jwt"
import { NextResponse, type NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: req.nextUrl.protocol === "https:",
  })

  if (!token) {
    const loginUrl = new URL("/login", req.url)

    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|consent|logout).*)",
  ],
}
