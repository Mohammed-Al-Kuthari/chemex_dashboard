import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { authReducer } from "../features/auth";
import { apiSlice } from "./api/base-api";

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  // TODO: register additional feature reducers (locale, ui, etc.).
});

export type RootState = ReturnType<typeof rootReducer>;
export type StorePreloadedState = Partial<RootState>;

export const createAppStore = (preloadedState?: StorePreloadedState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState | undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore["dispatch"];
