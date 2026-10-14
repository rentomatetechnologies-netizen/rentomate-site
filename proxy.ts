import { NextResponse, type NextRequest } from "next/server";

// Fast redirect to the login page when there's no admin session cookie at all.
// This is only a convenience: the backend validates the session on every API call.
const SESSION_COOKIE = "rom_admin_session";

export default function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
