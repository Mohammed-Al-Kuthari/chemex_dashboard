import { AppThemeProvider } from "./AppThemeProvider";
import { AppStoreProvider } from "./AppStoreProvider";
import { AppIntlProvider } from "./AppIntlProvider";
import { AppSessionProvider } from "./AppSessionProvider";
import { AppFeatureFlagProvider } from "./AppFeatureFlagProvider";
import { AppTelemetryProvider } from "./AppTelemetryProvider";
import { AppMonitoringProvider } from "./AppMonitoringProvider";
import type { Session } from "@/core/security/auth/session";
import type { IntlMessages } from "@/core/configs/i18n-config";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
  locale: string;
  messages: IntlMessages;
  session: Session | null;
}>;

export function AppProviders({ children, locale, messages, session }: AppProvidersProps) {
  return (
    <AppStoreProvider>
      <AppSessionProvider initialSession={session}>
        <AppFeatureFlagProvider>
          <AppTelemetryProvider
            options={{
              defaultContext: {
                locale,
                userId: session?.userId,
              },
            }}
          >
            <AppMonitoringProvider>
              <AppThemeProvider>
                <AppIntlProvider locale={locale} messages={messages}>{children}</AppIntlProvider>
              </AppThemeProvider>
            </AppMonitoringProvider>
          </AppTelemetryProvider>
        </AppFeatureFlagProvider>
      </AppSessionProvider>
    </AppStoreProvider>
  );
}
