"use client";

import { useHydrated } from "@/shared/hooks";
import { type ReactNode } from "react";

type ClientRenderGateProps = {
  children: ReactNode;
  fallback: ReactNode;
  delayMs?: number;
};

export function ClientRenderGate({
  children,
  fallback,
}: ClientRenderGateProps) {
  const isHydrated = useHydrated();

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
