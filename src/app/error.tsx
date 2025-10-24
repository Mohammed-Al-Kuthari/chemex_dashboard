'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global rendering error', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-surface text-foreground">
        <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border border-border bg-background p-8 shadow-xl">
          <h1 className="text-lg font-semibold tracking-tight">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred while loading the dashboard. Try again and contact support if the
            problem persists.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            onClick={reset}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
