import { env } from "../services/env.service";

export const supportedLocales = env.supportedLocales;
export const defaultLocale = supportedLocales[0] ?? "en";

export type AppLocale = (typeof supportedLocales)[number];
export type IntlMessages = typeof import("../locales/messages/en/common.json");

export const i18nConfig = {
  defaultLocale,
  locales: supportedLocales,
  localeDetection: true,
} as const;

export const loadMessages = async (locale: AppLocale) => {
  const { default: messages } = await import(`../locales/messages/${locale}/common.json`);
  return messages satisfies IntlMessages;
};
