"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import type { Session } from "@/core/security/auth/session";

type SessionContextValue = {
  session: Session | null;
  setSession: (value: Session | null) => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within an AppSessionProvider");
  }

  return context;
};

type AppSessionProviderProps = {
  children: ReactNode;
  initialSession: Session | null;
};

export function AppSessionProvider({ children, initialSession }: AppSessionProviderProps) {
  const [session, setSession] = useState<Session | null>(initialSession);

  const value = useMemo<SessionContextValue>(() => ({ session, setSession }), [session]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
