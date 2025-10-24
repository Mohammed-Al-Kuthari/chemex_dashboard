import { readSession } from "@/server/auth/session";

export default async function DashboardPage() {
  const session = await readSession();
  const userName = session?.user?.name ?? session?.user?.email ?? "Chemex teammate";

  return (
    <>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-foreground">Welcome back, {userName}!</h1>
        <p className="text-sm text-muted-foreground">
          This is a placeholder dashboard. Upcoming iterations will render live metrics and operational controls.
        </p>
      </header>
      <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h2 className="text-xl font-semibold text-foreground">Next steps</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Integrate RTK Query services to hydrate dashboard data.</li>
          <li>Wire access control policies to feature-level components.</li>
          <li>Replace this placeholder with real UI from the product design system.</li>
        </ul>
      </section>
    </>
  );
}
