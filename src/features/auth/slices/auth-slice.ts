import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthSessionMeta, AuthUser } from "../types";

export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

export type AuthState = {
  status: AuthStatus;
  session: AuthSessionMeta | null;
  user: AuthUser | null;
  lastError?: string | null;
};

const initialState: AuthState = {
  status: "unknown",
  session: null,
  user: null,
  lastError: null,
};

export interface HydrateSessionPayload {
  session: AuthSessionMeta | null;
  user: AuthUser | null;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateSession(state, action: PayloadAction<HydrateSessionPayload>) {
      state.session = action.payload.session;
      state.user = action.payload.user;
      state.status = action.payload.session ? "authenticated" : "unauthenticated";
      state.lastError = null;
    },
    clearAuthState() {
      return {
        ...initialState,
        status: "unauthenticated",
      } satisfies AuthState;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.lastError = action.payload;
      state.status = action.payload ? "unauthenticated" : state.status;
    },
  },
});

export const { hydrateSession, clearAuthState, setAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;
