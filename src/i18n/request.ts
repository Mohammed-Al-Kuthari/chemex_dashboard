import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import { COOKIE_KEYS } from "@/core/constants";
import { loadMessages, type AppLocale } from "@/core/configs/i18n-config";
import { resolveLocale as resolvePreferredLocale } from "@/core/security/auth/locale";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(COOKIE_KEYS.LOCALE)?.value;
  const locale = resolvePreferredLocale(localeCookie) as AppLocale;
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
