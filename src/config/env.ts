import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_AUTH_CLIENT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_AUTH_REDIRECT_URI: z.string().url().optional(),
});

const serverEnvSchema = z.object({
  AUTH_CLIENT_SECRET: z.string().min(1).optional(),
  AUTH_TOKEN_ENDPOINT: z.string().url().optional(),
  AUTH_AUTHORIZATION_ENDPOINT: z.string().url().optional(),
  AUTH_LOGOUT_ENDPOINT: z.string().url().optional(),
  AUTH_USERINFO_ENDPOINT: z.string().url().optional(),
});

const clientEnv = clientEnvSchema.parse(process.env);
const serverEnv = serverEnvSchema.parse(process.env);

const fallbackApiBaseUrl = "http://localhost:4000";
const fallbackAppUrl = "http://localhost:3000";

export const env = {
  apiBaseUrl: clientEnv.NEXT_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl,
  appUrl: clientEnv.NEXT_PUBLIC_APP_URL ?? fallbackAppUrl,
  auth: {
    clientId: clientEnv.NEXT_PUBLIC_AUTH_CLIENT_ID ?? "",
    redirectUri: clientEnv.NEXT_PUBLIC_AUTH_REDIRECT_URI ?? `${fallbackAppUrl}/api/auth/callback`,
    authorizationEndpoint: serverEnv.AUTH_AUTHORIZATION_ENDPOINT ?? "",
    tokenEndpoint: serverEnv.AUTH_TOKEN_ENDPOINT ?? "",
    logoutEndpoint: serverEnv.AUTH_LOGOUT_ENDPOINT ?? "",
    clientSecret: serverEnv.AUTH_CLIENT_SECRET ?? "",
    userInfoEndpoint: serverEnv.AUTH_USERINFO_ENDPOINT ?? "",
  },
};

export type Env = typeof env;
