import { env } from "./env";

export const API_CONFIG = {
  baseUrl: env.apiBaseUrl,
  timeoutMs: 15000,
  defaultHeaders: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

export const AUTH_CONFIG = {
  clientId: env.auth.clientId,
  redirectUri: env.auth.redirectUri,
  authorizationEndpoint: env.auth.authorizationEndpoint,
  tokenEndpoint: env.auth.tokenEndpoint,
  logoutEndpoint: env.auth.logoutEndpoint,
  userInfoEndpoint: env.auth.userInfoEndpoint,
  clientSecret: env.auth.clientSecret,
  scope: "openid profile email offline_access chemex.api",
};
