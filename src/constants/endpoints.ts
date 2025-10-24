export const API_ENDPOINTS = {
  auth: {
    authorize: "/oauth/authorize",
    token: "/oauth/token",
    userInfo: "/oauth/userinfo",
    revoke: "/oauth/revoke",
  },
} as const;

export type ApiEndpointGroup = keyof typeof API_ENDPOINTS;
