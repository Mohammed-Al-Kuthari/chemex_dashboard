'use client';

import type { PropsWithChildren } from 'react';
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

const storageKey = 'chemex-theme';

export type AppThemeProviderProps = PropsWithChildren<ThemeProviderProps>;

export const AppThemeProvider = ({ children, ...props }: AppThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};
