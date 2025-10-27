import { themeCookieConfig } from "./app-config";

export const themeConfig = {
  attribute: "class" as const,
  defaultTheme: "system" as const,
  enableSystem: true,
  storageKey: themeCookieConfig.name,
} as const;
