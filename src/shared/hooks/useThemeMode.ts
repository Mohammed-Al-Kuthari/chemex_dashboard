"use client";

import { useTheme } from "next-themes";

export const useThemeMode = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme ?? "system";
  const resolvedTheme = currentTheme === "system" ? systemTheme ?? "system" : currentTheme;

  return {
    theme: currentTheme,
    resolvedTheme,
    systemTheme,
    setTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
  } as const;
};
