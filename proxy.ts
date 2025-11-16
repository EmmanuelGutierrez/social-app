import { NextResponse } from "next/server";
import type { NextRequest, ProxyConfig } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value; // Tu JWT HttpOnly

  const { pathname } = request.nextUrl;

  // ✅ Rutas públicas (por ejemplo, login y registro)
  const isPublicPath =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/public") ||
    pathname === "/favicon.ico";

  // Si no está logeado y la ruta no es pública → redirige al login
  console.log("PROXY", token, isPublicPath);
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Si está logeado e intenta ir a /auth, lo redirigimos al home
  if (token && pathname.startsWith("/auth")) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
