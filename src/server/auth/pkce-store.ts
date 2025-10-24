import { COOKIE_MAX_AGE, COOKIE_NAMES } from "../../constants";
import { deleteCookie, getCookieValue, setHttpOnlyCookie } from "../cookies";

const toBase64Url = (value: string) => Buffer.from(value, "utf8").toString("base64url");
const fromBase64Url = (value: string) => Buffer.from(value, "base64url").toString("utf8");

export const persistPkceVerifier = async (verifier: string) => {
  await setHttpOnlyCookie(COOKIE_NAMES.pkceVerifier, toBase64Url(verifier), {
    maxAge: COOKIE_MAX_AGE.pkceVerifier,
  });
};

export const consumePkceVerifier = async (): Promise<string | null> => {
  const encoded = await getCookieValue(COOKIE_NAMES.pkceVerifier);

  if (!encoded) {
    return null;
  }

  await deleteCookie(COOKIE_NAMES.pkceVerifier);

  try {
    return fromBase64Url(encoded);
  } catch (error) {
    console.error("Failed to decode PKCE verifier", error);
    return null;
  }
};

export const persistOauthState = async (state: string) => {
  await setHttpOnlyCookie(COOKIE_NAMES.oauthState, toBase64Url(state), {
    maxAge: COOKIE_MAX_AGE.pkceVerifier,
  });
};

export const consumeOauthState = async (): Promise<string | null> => {
  const encoded = await getCookieValue(COOKIE_NAMES.oauthState);

  if (!encoded) {
    return null;
  }

  await deleteCookie(COOKIE_NAMES.oauthState);

  try {
    return fromBase64Url(encoded);
  } catch (error) {
    console.error("Failed to decode OAuth state", error);
    return null;
  }
};
