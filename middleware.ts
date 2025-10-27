import { NextResponse, type NextRequest } from "next/server";

import { localeCookieConfig } from "@/core/configs/app-config";
import { detectPreferredLocale } from "@/core/security/auth/locale";
import {
  createSessionFromToken,
  readSessionTokenFromCookies,
  hasSessionExpired,
} from "@/core/security/auth/session";
import { evaluateRouteAccess } from "@/core/security/auth/route-access";
import { ROUTES } from "@/core/constants/routes";
import { logger } from "@/core/lib/logging/logger";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const cookieMap = new Map<string, string>();
  request.cookies.getAll().forEach((cookie) => cookieMap.set(cookie.name, cookie.value));

  const preferredLocale = detectPreferredLocale(
    cookieMap.get(localeCookieConfig.name),
    request.headers.get("accept-language"),
  );
  const shouldSetLocaleCookie = cookieMap.get(localeCookieConfig.name) !== preferredLocale;

  const token = readSessionTokenFromCookies(cookieMap);
  const session = token ? createSessionFromToken(token) : null;
  const validSession = session && !hasSessionExpired(session) ? session : null;

  const access = evaluateRouteAccess(pathname, validSession);

  if (access.requiresAuth && !validSession) {
    logger.warn("Unauthenticated access attempt", { pathname });
    return withLocaleCookie(redirectToLogin(request), preferredLocale, shouldSetLocaleCookie);
  }

  if (!access.allowed) {
    logger.warn("Access denied due to missing permissions", {
      pathname,
      missingPermissions: access.missingPermissions,
      userId: validSession?.userId,
    });

    return withLocaleCookie(
      redirectToForbidden(request, access.missingPermissions),
      preferredLocale,
      shouldSetLocaleCookie,
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-chemex-locale", preferredLocale);
  if (validSession) {
    requestHeaders.set("x-chemex-user-id", validSession.userId);
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  if (shouldSetLocaleCookie) {
    setLocaleCookie(response, preferredLocale);
  }

  return response;
}

const shouldBypass = (pathname: string) => {
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return true;
  }

  if (PUBLIC_FILE.test(pathname)) {
    return true;
  }

  return false;
};

const redirectToLogin = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  const loginUrl = new URL(ROUTES.AUTH.LOGIN, url.origin);
  const nextPath = `${url.pathname}${url.search}`;
  loginUrl.searchParams.set("next", nextPath);
  return NextResponse.redirect(loginUrl);
};

const redirectToForbidden = (request: NextRequest, missingPermissions: string[]) => {
  const url = request.nextUrl.clone();
  const fallback = new URL(ROUTES.AUTH.LOGIN, url.origin);
  fallback.searchParams.set("error", "forbidden");
  if (missingPermissions.length > 0) {
    fallback.searchParams.set("missing", missingPermissions.join(","));
  }

  return NextResponse.redirect(fallback);
};

const withLocaleCookie = (
  response: NextResponse,
  locale: string,
  shouldSet: boolean,
) => {
  if (shouldSet) {
    setLocaleCookie(response, locale);
  }

  return response;
};

const setLocaleCookie = (response: NextResponse, locale: string) => {
  response.cookies.set({
    name: localeCookieConfig.name,
    value: locale,
    path: localeCookieConfig.path,
    maxAge: localeCookieConfig.maxAge,
    sameSite: localeCookieConfig.sameSite,
    secure: localeCookieConfig.secure,
  });
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
