type SignInPageProps = {
  searchParams: Promise<{
    error?: string;
  } | undefined>;
};

const errorMessages: Record<string, string> = {
  invalid_state: 'Your sign-in attempt expired. Please try again.',
  invalid_state_payload: 'Something went wrong while validating your session. Please retry.',
  missing_verifier: 'Missing PKCE verifier. Restart the sign-in flow.',
  oauth_failed: 'Authentication failed. Contact support if the problem persists.',
};

const resolveErrorMessage = (code?: string) => {
  if (!code) {
    return null;
  }

  return errorMessages[code] ?? 'Unable to sign in right now.';
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedParams = await searchParams;
  const message = resolveErrorMessage(resolvedParams?.error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-10 shadow-lg">
        <header className="mb-8 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-foreground">Sign in to Chemex</h1>
          <p className="text-sm text-muted-foreground">
            Use your Chemex identity provider to access dashboards and operational tooling.
          </p>
        </header>

        {message && (
          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700">
            {message}
          </div>
        )}

        <form action="/api/auth/login" method="get" className="space-y-4">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
          >
            Continue with Chemex SSO
          </button>
        </form>
      </section>
    </main>
  );
}
