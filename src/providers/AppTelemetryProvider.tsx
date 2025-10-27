"use client";

import { createContext, useContext, useMemo, useEffect, type ReactNode } from "react";

import {
  createTelemetryClient,
  type TelemetryClient,
  type TelemetryOptions,
} from "@/shared/services/analytics";

const TelemetryContext = createContext<TelemetryClient | null>(null);

export const useTelemetryClient = () => {
  const context = useContext(TelemetryContext);

  if (!context) {
    throw new Error("useTelemetryClient must be used within an AppTelemetryProvider");
  }

  return context;
};

type AppTelemetryProviderProps = {
  children: ReactNode;
  options?: TelemetryOptions;
};

export function AppTelemetryProvider({ children, options }: AppTelemetryProviderProps) {
  const client = useMemo(
    () =>
      createTelemetryClient({
        endpoint: options?.endpoint,
        disabled: options?.disabled,
      }),
    [options?.endpoint, options?.disabled],
  );
  const serializedContext = options?.defaultContext
    ? JSON.stringify(options.defaultContext)
    : null;

  useEffect(() => {
    if (options?.defaultContext) {
      client.setContext(options.defaultContext);
    }
  }, [client, options?.defaultContext, serializedContext]);

  return <TelemetryContext.Provider value={client}>{children}</TelemetryContext.Provider>;
}
