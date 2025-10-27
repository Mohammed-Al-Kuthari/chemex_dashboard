import { z } from "zod";

type NodeEnvironment = "development" | "test" | "production";

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    SUPPORTED_LOCALES: z
      .string()
      .min(1, "SUPPORTED_LOCALES must include at least one locale code (e.g., en,ar)")
      .transform((value) =>
        value
          .split(",")
          .map((locale) => locale.trim())
          .filter(Boolean)
      ),
    NEXT_PUBLIC_APP_NAME: z.string().default("Chemex Dashboard"),
    API_BASE_URL: z.string().url({ message: "API_BASE_URL must be a valid URL" }),
    SESSION_COOKIE_NAME: z.string().default("chemex.session"),
    SESSION_COOKIE_DOMAIN: z.string().optional(),
    SESSION_TOKEN_TTL_SECONDS: z
      .coerce
      .number()
      .int({ message: "SESSION_TOKEN_TTL_SECONDS must be an integer" })
      .positive({ message: "SESSION_TOKEN_TTL_SECONDS must be positive" })
      .default(60 * 60),
    REFRESH_TOKEN_TTL_SECONDS: z
      .coerce
      .number()
      .int({ message: "REFRESH_TOKEN_TTL_SECONDS must be an integer" })
      .positive({ message: "REFRESH_TOKEN_TTL_SECONDS must be positive" })
      .default(60 * 60 * 24 * 30),
    NEXT_PUBLIC_SECURE_STORAGE_SALT: z
      .string()
      .min(8, "NEXT_PUBLIC_SECURE_STORAGE_SALT must be at least 8 characters long")
      .default("chemex-demo-secret"),
  })
  .transform((data) => ({
    ...data,
    SUPPORTED_LOCALES: data.SUPPORTED_LOCALES as string[],
  }));

type RawEnv = z.input<typeof EnvSchema>;
const parseEnvironment = (rawEnv: RawEnv) => {
  const result = EnvSchema.safeParse(rawEnv);

  if (!result.success) {
    console.error("Environment validation failed", result.error.flatten().fieldErrors);
    throw new Error("Invalid environment configuration. Review your .env settings.");
  }

  return result.data;
};

const sanitizedEnv = parseEnvironment({
  NODE_ENV: process.env.NODE_ENV,
  SUPPORTED_LOCALES:
    process.env.NEXT_PUBLIC_SUPPORTED_LOCALES ?? process.env.SUPPORTED_LOCALES ?? "",
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "",
  SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
  SESSION_COOKIE_DOMAIN: process.env.SESSION_COOKIE_DOMAIN,
  SESSION_TOKEN_TTL_SECONDS: process.env.SESSION_TOKEN_TTL_SECONDS,
  REFRESH_TOKEN_TTL_SECONDS: process.env.REFRESH_TOKEN_TTL_SECONDS,
  NEXT_PUBLIC_SECURE_STORAGE_SALT: process.env.NEXT_PUBLIC_SECURE_STORAGE_SALT,
});

export const env = {
  nodeEnv: sanitizedEnv.NODE_ENV as NodeEnvironment,
  supportedLocales: sanitizedEnv.SUPPORTED_LOCALES,
  appName: sanitizedEnv.NEXT_PUBLIC_APP_NAME,
  apiBaseUrl: sanitizedEnv.API_BASE_URL,
  isDevelopment: sanitizedEnv.NODE_ENV === "development",
  isTest: sanitizedEnv.NODE_ENV === "test",
  isProduction: sanitizedEnv.NODE_ENV === "production",
  isDebugLoggingEnabled: sanitizedEnv.NODE_ENV !== "production",
  sessionCookieName: sanitizedEnv.SESSION_COOKIE_NAME,
  sessionCookieDomain: sanitizedEnv.SESSION_COOKIE_DOMAIN ?? null,
  sessionTokenTtlSeconds: sanitizedEnv.SESSION_TOKEN_TTL_SECONDS,
  refreshTokenTtlSeconds: sanitizedEnv.REFRESH_TOKEN_TTL_SECONDS,
  clientStorageEncryptionSalt: sanitizedEnv.NEXT_PUBLIC_SECURE_STORAGE_SALT,
} as const;

export type EnvConfig = typeof env;
