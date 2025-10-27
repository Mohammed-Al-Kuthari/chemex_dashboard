"use client";

import { createContext, useContext } from "react";

import type { AppStore } from "./configureStore";

export type AppStoreContextValue = AppStore;

export const AppStoreContext = createContext<AppStoreContextValue | null>(null);

export function useAppStore() {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error("useAppStore must be used within an AppStoreProvider");
  }

  return store;
}
