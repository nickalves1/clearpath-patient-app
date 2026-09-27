import { auth } from "@/app/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url)

    return NextResponse.redirect(loginUrl)
  }
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login|register|consent|logout).*)",
  ],
}
