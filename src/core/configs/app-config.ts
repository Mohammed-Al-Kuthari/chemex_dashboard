import { env } from "./env.server";
import { COOKIE_KEYS } from "../constants/keys";

type CookieSameSite = "lax" | "strict" | "none";

type CookieConfig = {
  name: string;
  path: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: CookieSameSite;
  domain?: string | null;
};

const COOKIE_PATH = "/";

export const appConfig = {
  name: env.appName,
  apiBaseUrl: env.apiBaseUrl,
  supportedLocales: env.supportedLocales,
  defaultLocale: env.supportedLocales[0] ?? "en",
  isDebugLoggingEnabled: env.isDebugLoggingEnabled,
  sessionTokenTtlSeconds: env.sessionTokenTtlSeconds,
  refreshTokenTtlSeconds: env.refreshTokenTtlSeconds,
} as const;

export const localeCookieConfig: CookieConfig = {
  name: COOKIE_KEYS.LOCALE,
  maxAge: 60 * 60 * 24 * 365,
  path: COOKIE_PATH,
  sameSite: "lax",
};

export const themeCookieConfig: CookieConfig = {
  name: COOKIE_KEYS.THEME,
  maxAge: 60 * 60 * 24 * 365,
  path: COOKIE_PATH,
  sameSite: "lax",
};

const secureCookieDefaults = {
  path: COOKIE_PATH,
  httpOnly: true,
  secure: env.isProduction,
  sameSite: "lax" as CookieSameSite,
  domain: env.sessionCookieDomain,
} as const;

export const authCookieConfig = {
  session: {
    ...secureCookieDefaults,
    name: env.sessionCookieName,
    maxAge: env.sessionTokenTtlSeconds,
  } satisfies CookieConfig,
  accessToken: {
    ...secureCookieDefaults,
    name: COOKIE_KEYS.ACCESS_TOKEN,
    maxAge: env.sessionTokenTtlSeconds,
  } satisfies CookieConfig,
  refreshToken: {
    ...secureCookieDefaults,
    name: COOKIE_KEYS.REFRESH_TOKEN,
    maxAge: env.refreshTokenTtlSeconds,
    sameSite: "strict" as CookieSameSite,
  } satisfies CookieConfig,
} as const;

export const clientStorageConfig = {
  encryptionSalt: env.clientStorageEncryptionSalt,
  defaultStorage: "local" as const,
} as const;
