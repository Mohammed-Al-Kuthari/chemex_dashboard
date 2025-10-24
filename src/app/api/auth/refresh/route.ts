import { NextResponse } from "next/server";

import { refreshAccessToken } from "../../../../features/auth";
import { persistSession, readRefreshToken } from "../../../../server/auth/session";

export async function POST() {
  const refreshToken = await readRefreshToken();

  if (!refreshToken) {
    return NextResponse.json({ error: "missing_refresh_token" }, { status: 401 });
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);
    await persistSession(tokens);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Token refresh failed", error);
    return NextResponse.json({ error: "refresh_failed" }, { status: 500 });
  }
}
