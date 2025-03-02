import { NextRequest, NextResponse } from "next/server";
import {
  getTokenFromNextRequest,
  isValidToken,
} from "./services/utils/jwtToken";
import { loginUrl, productsUrl } from "./contants/urls";

export const config = {
  matcher: ["/api/secure/:path*", "/secure/:path*", "/"],
};

const secureApiUnauthorizedResponse = () => {
  return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
};

const redirctToLogin = (req: NextRequest) => {
  return NextResponse.redirect(new URL(loginUrl, req.url));
};

const redirectToInitialSecurePage = (req: NextRequest) => {
  return NextResponse.redirect(new URL(productsUrl, req.url));
};

export function middleware(req: NextRequest): NextResponse {
  const pathname = req.nextUrl.pathname;

  const token = getTokenFromNextRequest(req);
  const isTokenValid = isValidToken(token);

  if (pathname === "/" && isTokenValid) {
    return redirectToInitialSecurePage(req);
  }

  if (pathname.startsWith("/secure") || pathname.startsWith("/api/secure")) {
    if (!isTokenValid) {
      return pathname.startsWith("/api")
        ? secureApiUnauthorizedResponse()
        : redirctToLogin(req);
    }
  }

  return NextResponse.next();
}
