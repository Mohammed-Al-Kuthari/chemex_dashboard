"use server";

import { cookies, headers } from "next/headers";

import { createSessionFromToken, readSessionTokenFromCookies, hasSessionExpired } from "./session";

export const getCurrentSession = async () => {
  const cookieStore = await cookies();
  const cookieMap = new Map<string, string>();

  for (const cookie of cookieStore.getAll()) {
    cookieMap.set(cookie.name, cookie.value);
  }

  const token = readSessionTokenFromCookies(cookieMap);

  if (!token) {
    return null;
  }

  const session = createSessionFromToken(token);

  if (!session || hasSessionExpired(session)) {
    return null;
  }

  const headerStore = await headers();
  const impersonation = headerStore.get("x-chemex-impersonated-role");

  if (impersonation) {
    return {
      ...session,
      attributes: {
        ...session.attributes,
        impersonation,
      },
    };
  }

  return session;
};
