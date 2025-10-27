"use client";

import { useMemo, type ReactNode } from "react";

import {
  AppStoreContext,
  type AppStoreContextValue,
} from "@/core/store/AppStoreContext";
import { createAppStore } from "@/core/store/configureStore";

type AppStoreProviderProps = {
  children: ReactNode;
};

export function AppStoreProvider({ children }: AppStoreProviderProps) {
  const store = useMemo<AppStoreContextValue>(() => createAppStore(), []);

  return (
    <AppStoreContext.Provider value={store}>{children}</AppStoreContext.Provider>
  );
}
