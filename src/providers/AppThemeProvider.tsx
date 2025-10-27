
"use client";

import { ThemeProvider } from "next-themes";
import { themeConfig } from "@/core/configs/theme-config";

export function AppThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute={themeConfig.attribute}
      enableSystem={themeConfig.enableSystem}
      defaultTheme={themeConfig.defaultTheme}
      storageKey={themeConfig.storageKey}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
