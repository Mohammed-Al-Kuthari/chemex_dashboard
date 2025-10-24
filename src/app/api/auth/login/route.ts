import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { RETURN_TO_PARAM, ROUTES } from "../../../../config";
import { buildAuthorizationUrl } from "../../../../features/auth";
import { createPkcePair } from "../../../../lib";
import { createOauthState } from "../../../../features/auth/utils/oauth-state";
import { persistOauthState, persistPkceVerifier } from "../../../../server/auth/pkce-store";

const encodeStatePayload = (payload: { nonce: string; returnTo: string }) =>
  Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");

export async function GET(request: NextRequest) {
  const { verifier, challenge } = createPkcePair();
  const nonce = createOauthState();
  const returnToParam = request.nextUrl.searchParams.get(RETURN_TO_PARAM);

  const state = encodeStatePayload({
    nonce,
    returnTo: returnToParam ?? ROUTES.dashboard.path,
  });

  await persistPkceVerifier(verifier);
  await persistOauthState(state);

  const authorizationUrl = buildAuthorizationUrl({
    state,
    codeChallenge: challenge,
  });

  return NextResponse.redirect(authorizationUrl);
}
