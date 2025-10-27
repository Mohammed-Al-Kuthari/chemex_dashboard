"use client";

import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

import type { IntlMessages } from "@/core/configs/i18n-config";

export type AppIntlProviderProps = {
  locale: string;
  messages: IntlMessages;
  children: ReactNode;
};

export function AppIntlProvider({ locale, messages, children }: AppIntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}
