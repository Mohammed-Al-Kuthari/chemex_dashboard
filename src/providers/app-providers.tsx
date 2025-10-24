'use client';

import type { PropsWithChildren } from 'react';
import { StoreProvider, type StorePreloadedState } from '../state';
import { AppThemeProvider } from './theme-provider';

export type AppProvidersProps = PropsWithChildren<{
  initialState?: StorePreloadedState;
}>;

export const AppProviders = ({ children, initialState }: AppProvidersProps) => {
  return (
    <AppThemeProvider>
      <StoreProvider preloadedState={initialState}>{children}</StoreProvider>
    </AppThemeProvider>
  );
};
