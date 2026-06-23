import { getAdminDashboardStats } from "@/repositories/admin-dashboard";
import { getSessionUser } from "@/services/auth/get-session-user";

export default async function AdminDashboardPage() {
  const [stats, user] = await Promise.all([
    getAdminDashboardStats(),
    getSessionUser(),
  ]);

  const cards = [
    {
      label: "Draft entities",
      value: stats.draftEntities,
      hint: "Entities awaiting review or completion",
    },
    {
      label: "Missing citations",
      value: stats.missingCitations,
      hint: "Claims without attached sources",
    },
    {
      label: "Pending submissions",
      value: stats.pendingSubmissions,
      hint: "Community memories awaiting moderation",
    },
    {
      label: "Disputed claims",
      value: stats.disputedClaims,
      hint: "Claims with competing evidence",
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Research dashboard</h1>
      <p className="mt-2 text-muted">
        Signed in as {user?.email}. Roles:{" "}
        {user?.roles.length ? user.roles.join(", ") : "none assigned"}.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-xl border border-border bg-surface-elevated p-6"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums">
              {card.value}
            </p>
            <p className="mt-2 text-xs text-muted">{card.hint}</p>
          </article>
        ))}
      </div>

      <section className="mt-10 rounded-xl border border-border bg-surface-elevated p-6">
        <h2 className="text-lg font-semibold">Milestone 1 complete</h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted">
          <li>Core schema with claims, sources, and entity graph</li>
          <li>Row Level Security and role-based access</li>
          <li>Auth sign-in / sign-up with profile auto-creation</li>
          <li>Protected admin shell with research dashboard</li>
        </ul>
        <p className="mt-4 text-sm text-muted">
          Next: MapLibre ground map and Johannesburg road geometries (Milestone
          2).
        </p>
      </section>
    </main>
  );
}
