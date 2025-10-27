import { cookies } from "next/headers";

import { AppProviders } from "@/providers/AppProviders";
import { COOKIE_KEYS } from "@/core/constants";
import { loadMessages, type AppLocale } from "@/core/configs/i18n-config";
import { getCurrentSession } from "@/core/security/auth/get-session.server";
import { resolveLocale as resolvePreferredLocale } from "@/core/security/auth/locale";
import "@/styles/globals.css";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(COOKIE_KEYS.LOCALE)?.value;
  const locale = resolvePreferredLocale(localeCookie) as AppLocale;
  const messages = await loadMessages(locale);
  const session = await getCurrentSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AppProviders locale={locale} messages={messages} session={session}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
