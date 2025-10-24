export const COOKIE_NAMES = {
  session: "chemex_session",
  refreshToken: "chemex_refresh",
  locale: "chemex_locale",
  pkceVerifier: "chemex_pkce_verifier",
  oauthState: "chemex_oauth_state",
} as const;

export const COOKIE_MAX_AGE = {
  session: 60 * 60, // 1 hour
  refreshToken: 60 * 60 * 24 * 30, // 30 days
  pkceVerifier: 60 * 5, // 5 minutes
} as const;

export const COOKIE_PATH_ROOT = "/";
