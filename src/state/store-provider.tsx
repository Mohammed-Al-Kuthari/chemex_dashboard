'use client';

import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { useSyncExternalStore } from 'react';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createAppStore, type AppDispatch, type AppStore, type RootState, type StorePreloadedState } from './store';

const StoreContext = createContext<AppStore | null>(null);

export type StoreProviderProps = PropsWithChildren<{
  preloadedState?: StorePreloadedState;
}>;

export const StoreProvider = ({ children, preloadedState }: StoreProviderProps) => {
  const store = useMemo(() => createAppStore(preloadedState), [preloadedState]);

  useEffect(() => {
    setupListeners(store.dispatch);
  }, [store]);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

const useStoreInstance = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('StoreProvider is missing in the component tree.');
  }

  return store;
};

export const useAppStore = () => useStoreInstance();

export const useAppDispatch = (): AppDispatch => useStoreInstance().dispatch;

export const useAppSelector = <TSelected,>(selector: (state: RootState) => TSelected): TSelected => {
  const store = useStoreInstance();

  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState())
  );
};
