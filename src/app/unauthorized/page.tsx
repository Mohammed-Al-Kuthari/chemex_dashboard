import Link from 'next/link';

import { ROUTES } from '../../config';

export const metadata = {
  title: 'Access denied',
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <section className="w-full max-w-lg rounded-2xl border border-border bg-surface p-10 text-center shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Access denied</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground">You do not have permission to view this page.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          If you believe this is a mistake, contact the Chemex administrator to request the appropriate role.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={ROUTES.login.path}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Return to sign in
          </Link>
          <Link
            href={ROUTES.dashboard.path}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border px-6 text-sm font-semibold text-foreground transition hover:bg-background"
          >
            Go to dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
