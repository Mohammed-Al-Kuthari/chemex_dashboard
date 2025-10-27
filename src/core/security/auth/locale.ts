import { appConfig } from "@/core/configs/app-config";
import type { AppLocale } from "@/core/configs/i18n-config";

const parseAcceptLanguage = (headerValue: string | null | undefined) => {
  if (!headerValue) {
    return [];
  }

  return headerValue
    .split(",")
    .map((languageRange) => {
      const [value, quality] = languageRange.trim().split(";");
      const qValue = quality?.split("=")?.[1];
      const weight = qValue ? Number.parseFloat(qValue) : 1;
      return { value: value.toLowerCase(), weight: Number.isNaN(weight) ? 0 : weight };
    })
    .sort((a, b) => b.weight - a.weight);
};

export const resolveLocale = (input?: string | null): AppLocale => {
  if (!input) {
    return appConfig.defaultLocale as AppLocale;
  }

  const normalized = input.toLowerCase();
  const match = appConfig.supportedLocales.find((locale) => locale.toLowerCase() === normalized);
  return (match ?? appConfig.defaultLocale) as AppLocale;
};

export const detectPreferredLocale = (
  cookieLocale?: string | null,
  acceptLanguageHeader?: string | null,
) => {
  if (cookieLocale) {
    return resolveLocale(cookieLocale);
  }

  const acceptedLocales = parseAcceptLanguage(acceptLanguageHeader);

  for (const candidate of acceptedLocales) {
    const locale = resolveLocale(candidate.value);
    if (locale) {
      return locale;
    }
  }

  return appConfig.defaultLocale as AppLocale;
};
