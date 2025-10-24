import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { DEFAULT_LOGIN_REDIRECT, ROUTES } from "../../../../config";
import { exchangeAuthorizationCode, fetchUserProfile } from "../../../../features/auth";
import { ApiClientError } from "../../../../lib/http";
import { consumeOauthState, consumePkceVerifier } from "../../../../server/auth/pkce-store";
import { persistSession } from "../../../../server/auth/session";

interface StatePayload {
  nonce: string;
  returnTo: string;
}

const decodeState = (state: string): StatePayload | null => {
  try {
    const decoded = Buffer.from(state, "base64url").toString("utf8");
    return JSON.parse(decoded) as StatePayload;
  } catch (error) {
    console.error("Failed to decode OAuth state", error);
    return null;
  }
};

const safeReturnTo = (value: string | undefined) => {
  if (!value || !value.startsWith("/")) {
    return DEFAULT_LOGIN_REDIRECT;
  }

  return value;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    const redirectUrl = new URL(ROUTES.login.path, request.nextUrl.origin);
    redirectUrl.searchParams.set("error", error);
    return NextResponse.redirect(redirectUrl);
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL(ROUTES.login.path, request.nextUrl.origin));
  }

  const storedState = await consumeOauthState();

  if (!storedState || storedState !== state) {
    const redirectUrl = new URL(ROUTES.login.path, request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "invalid_state");
    return NextResponse.redirect(redirectUrl);
  }

  const statePayload = decodeState(state);

  if (!statePayload) {
    const redirectUrl = new URL(ROUTES.login.path, request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "invalid_state_payload");
    return NextResponse.redirect(redirectUrl);
  }

  const codeVerifier = await consumePkceVerifier();

  if (!codeVerifier) {
    const redirectUrl = new URL(ROUTES.login.path, request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "missing_verifier");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    const tokens = await exchangeAuthorizationCode(code, codeVerifier);
    const user = await fetchUserProfile(tokens.accessToken);

    await persistSession(tokens, user);

    const redirectTo = safeReturnTo(statePayload.returnTo);
    return NextResponse.redirect(new URL(redirectTo, request.nextUrl.origin));
  } catch (authError: unknown) {
    if (authError instanceof ApiClientError) {
      console.error("OAuth callback failed", {
        message: authError.message,
        status: authError.status,
        payload: authError.payload,
      });
    } else {
      console.error("OAuth callback failed", authError);
    }
    const redirectUrl = new URL(ROUTES.login.path, request.nextUrl.origin);
    redirectUrl.searchParams.set("error", "oauth_failed");
    return NextResponse.redirect(redirectUrl);
  }
}
