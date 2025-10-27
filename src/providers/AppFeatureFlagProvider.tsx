"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type FeatureFlagName = string;
export type FeatureFlagState = Record<FeatureFlagName, boolean>;

type FeatureFlagContextValue = {
  flags: FeatureFlagState;
  isEnabled: (name: FeatureFlagName, defaultValue?: boolean) => boolean;
  setFlag: (name: FeatureFlagName, value: boolean) => void;
};

const FeatureFlagContext = createContext<FeatureFlagContextValue | null>(null);

export const useFeatureFlagContext = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error("useFeatureFlagContext must be used within an AppFeatureFlagProvider");
  }

  return context;
};

type AppFeatureFlagProviderProps = {
  children: ReactNode;
  initialFlags?: FeatureFlagState;
};

export function AppFeatureFlagProvider({ children, initialFlags = {} }: AppFeatureFlagProviderProps) {
  const [flags, setFlags] = useState<FeatureFlagState>(initialFlags);

  const value = useMemo<FeatureFlagContextValue>(
    () => ({
      flags,
      isEnabled: (name, defaultValue = false) => flags[name] ?? defaultValue,
      setFlag: (name, value) =>
        setFlags((current) => ({
          ...current,
          [name]: value,
        })),
    }),
    [flags],
  );

  return <FeatureFlagContext.Provider value={value}>{children}</FeatureFlagContext.Provider>;
}
