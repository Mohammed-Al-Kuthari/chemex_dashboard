import { redirect } from "next/navigation";

import { ROUTES } from "../config";
import { readSession } from "../server/auth/session";

export default async function Home() {
  const session = await readSession();

  if (!session) {
    redirect(ROUTES.login.path);
  }

  redirect(ROUTES.dashboard.path);
}
