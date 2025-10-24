import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { RETURN_TO_PARAM, ROUTES } from './src/config';
import { COOKIE_NAMES } from './src/constants';

const protectedRouteMatchers = [ROUTES.dashboard.path];

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isProtected = protectedRouteMatchers.some((route) =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const hasSessionCookie = Boolean(request.cookies.get(COOKIE_NAMES.session));

  if (!hasSessionCookie) {
    const loginUrl = new URL(ROUTES.login.path, request.url);
    loginUrl.searchParams.set(RETURN_TO_PARAM, `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
