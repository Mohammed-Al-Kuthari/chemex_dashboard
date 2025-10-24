import { randomUUID } from "node:crypto";

import { COOKIE_MAX_AGE, COOKIE_NAMES } from "../../constants";
import type { AuthUser } from "../../features/auth/types";
import { deleteCookie, getCookieValue, setHttpOnlyCookie } from "../cookies";

export interface SessionTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number; // seconds
  tokenType?: string;
  scope?: string;
}

export interface SessionSnapshot {
  accessToken: string;
  expiresAt: string;
  issuedAt: string;
  sessionId: string;
  tokenType?: string;
  scope?: string;
  user?: AuthUser;
  hasRefreshToken: boolean;
}

const toBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");
const fromBase64Url = (value: string) => Buffer.from(value, "base64url").toString("utf8");

export const persistSession = async (tokens: SessionTokens, user?: AuthUser) => {
  const expiresAt = new Date(Date.now() + tokens.expiresIn * 1000);
  const snapshot: SessionSnapshot = {
    accessToken: tokens.accessToken,
    expiresAt: expiresAt.toISOString(),
    issuedAt: new Date().toISOString(),
    sessionId: randomUUID(),
    tokenType: tokens.tokenType,
    scope: tokens.scope,
    user,
    hasRefreshToken: Boolean(tokens.refreshToken),
  };

  await setHttpOnlyCookie(
    COOKIE_NAMES.session,
    toBase64Url(JSON.stringify(snapshot)),
    {
      maxAge: tokens.expiresIn,
    }
  );

  if (tokens.refreshToken) {
    await setHttpOnlyCookie(COOKIE_NAMES.refreshToken, toBase64Url(tokens.refreshToken), {
      maxAge: COOKIE_MAX_AGE.refreshToken,
    });
  }
};

export const clearSession = async () => {
  await deleteCookie(COOKIE_NAMES.session);
  await deleteCookie(COOKIE_NAMES.refreshToken);
};

export const readSession = async (): Promise<SessionSnapshot | null> => {
  const encoded = await getCookieValue(COOKIE_NAMES.session);

  if (!encoded) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(encoded)) as SessionSnapshot;
    return parsed;
  } catch (error) {
    console.error("Failed to parse session cookie", error);
    await clearSession();
    return null;
  }
};

export const readRefreshToken = async (): Promise<string | null> => {
  const encoded = await getCookieValue(COOKIE_NAMES.refreshToken);

  if (!encoded) {
    return null;
  }

  try {
    return fromBase64Url(encoded);
  } catch (error) {
    console.error("Failed to decode refresh token cookie", error);
    await deleteCookie(COOKIE_NAMES.refreshToken);
    return null;
  }
};
