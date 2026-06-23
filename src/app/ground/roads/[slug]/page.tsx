import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoadBySlug } from "@/data/roads/johannesburg-mvp";
import { getRoadBySlugFromStore } from "@/repositories/roads";
import { SeedTierBadge } from "@/components/content/seed-tier-badge";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

type RoadDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { JOHANNESBURG_MVP_ROADS } = await import("@/data/roads/johannesburg-mvp");
  return JOHANNESBURG_MVP_ROADS.map((road) => ({ slug: road.slug }));
}

export async function generateMetadata({ params }: RoadDetailPageProps) {
  const { slug } = await params;
  const road = getRoadBySlug(slug);
  return {
    title: road?.currentName ?? "Road",
    description: road?.summary,
  };
}

function UnknownField() {
  return (
    <p className="text-sm italic text-muted">
      Research has not yet established this.
    </p>
  );
}

export default async function RoadDetailPage({ params }: RoadDetailPageProps) {
  const { slug } = await params;
  const road = (await getRoadBySlugFromStore(slug)) ?? getRoadBySlug(slug);

  if (!road) {
    notFound();
  }

  const sections = [
    { id: "identity", title: "Identity" },
    { id: "anatomy", title: "Spatial anatomy" },
    { id: "origin", title: "Origin and purpose" },
    { id: "notice", title: "Things you might never notice" },
  ];

  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex items-center justify-between text-sm">
        <Link href="/ground/roads" className="text-muted hover:text-foreground hover:underline">
          ← Roads map
        </Link>
        <Link href="/search" className="text-muted hover:text-foreground hover:underline">
          Search
        </Link>
      </nav>

      {road.primaryRouteNumber ? (
        <p className="text-xs font-medium uppercase tracking-wider text-accent-ground">
          Route {road.primaryRouteNumber}
        </p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold">{road.currentName}</h1>
      <p className="mt-4 text-muted">{road.summary}</p>
      <div className="mt-3">
        <SeedTierBadge tier={road.seedTier} />
      </div>

      {road.formerNames.length > 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold">Former names</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {road.formerNames.map((former) => (
              <li key={former.name}>
                {former.name}
                {former.note ? (
                  <span className="text-muted"> — {former.note}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <nav className="mt-8 flex flex-wrap gap-2" aria-label="Road sections">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:bg-surface"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <section id="identity" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Identity</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-medium">Current official name</dt>
            <dd className="text-muted">{road.currentName}</dd>
          </div>
          <div>
            <dt className="font-medium">Route numbers</dt>
            <dd className="text-muted">
              {road.routeNumbers.length ? road.routeNumbers.join(", ") : "—"}
            </dd>
          </div>
          <div>
            <dt className="font-medium">Pronunciation</dt>
            <dd>
              <UnknownField />
            </dd>
          </div>
        </dl>
      </section>

      <section id="anatomy" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Spatial anatomy</h2>
        <div className="mt-4 text-sm">
          <UnknownField />
        </div>
        <Button variant="outline" className="mt-4" asChild>
          <Link href={`/ground/roads?road=${road.slug}`}>View on map</Link>
        </Button>
      </section>

      <section id="origin" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Origin and purpose</h2>
        <div className="mt-4">
          <UnknownField />
        </div>
      </section>

      <section id="notice" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Things you might never notice</h2>
        <div className="mt-4">
          <UnknownField />
        </div>
      </section>
    </SiteShell>
  );
}
