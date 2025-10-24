import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { ROUTES } from "@/config";
import { readSession } from "@/server/auth/session";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const sessionSnapshot = await readSession();

  if (!sessionSnapshot) {
    redirect(ROUTES.login.path);
  }

  const user = sessionSnapshot.user ?? null;
  const locale = sessionSnapshot.user?.locale ?? "en";

  return (
    <AppShell user={user} locale={locale}>
      {children}
    </AppShell>
  );
}
