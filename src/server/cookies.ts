import { cookies } from "next/headers";

import { COOKIE_MAX_AGE, COOKIE_NAMES, COOKIE_PATH_ROOT } from "../constants";

export interface HttpOnlyCookieOptions {
  domain?: string;
  expires?: Date;
  maxAge?: number;
  sameSite?: "lax" | "strict" | "none";
}

export const setHttpOnlyCookie = async (
  name: string,
  value: string,
  options: HttpOnlyCookieOptions = {}
) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    httpOnly: true,
    secure: true,
    sameSite: options.sameSite ?? "lax",
    path: COOKIE_PATH_ROOT,
    maxAge: options.maxAge ?? COOKIE_MAX_AGE.session,
    expires: options.expires,
    domain: options.domain,
  });
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete({ name, path: COOKIE_PATH_ROOT });
};

export const getCookieValue = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const setLocaleCookie = async (locale: string) => {
  const cookieStore = await cookies();

  cookieStore.set({
    name: COOKIE_NAMES.locale,
    value: locale,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: COOKIE_PATH_ROOT,
    maxAge: COOKIE_MAX_AGE.refreshToken,
  });
};

export const readLocaleCookie = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAMES.locale)?.value;
};
