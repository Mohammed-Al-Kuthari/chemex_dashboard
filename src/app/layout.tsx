import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppProviders } from "../providers";
import { readSession } from "../server/auth/session";
import type { AuthSessionMeta } from "../features/auth";
import type { StorePreloadedState } from "../state";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chemex Dashboard",
    template: "%s · Chemex",
  },
  description:
    "Chemex operations dashboard delivering secure, localized insights for internal teams.",
};

const buildPreloadedState = (
  sessionSnapshot: Awaited<ReturnType<typeof readSession>>
): StorePreloadedState => {
  if (!sessionSnapshot) {
    return {
      auth: {
        status: "unauthenticated",
        session: null,
        user: null,
        lastError: null,
      },
    };
  }

  const scopes = sessionSnapshot.scope?.split(" ").filter(Boolean) ?? [];

  const session: AuthSessionMeta = {
    sessionId: sessionSnapshot.sessionId,
    issuedAt: sessionSnapshot.issuedAt,
    expiresAt: sessionSnapshot.expiresAt,
    scopes,
    hasRefreshToken: sessionSnapshot.hasRefreshToken,
  };

  return {
    auth: {
      status: "authenticated",
      session,
      user: sessionSnapshot.user ?? null,
      lastError: null,
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionSnapshot = await readSession();
  const initialState = buildPreloadedState(sessionSnapshot);
  const locale = sessionSnapshot?.user?.locale ?? "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders initialState={initialState}>{children}</AppProviders>
      </body>
    </html>
  );
}
