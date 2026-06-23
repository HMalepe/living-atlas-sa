import Link from "next/link";
import { MapPin, Moon, Search } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { HorizonHero } from "@/components/home/horizon-hero";
import { JOHANNESBURG_MVP_ROADS } from "@/data/roads/johannesburg-mvp";
import { Button } from "@/components/ui/button";

const featuredSlugs = ["m1", "winnie-mandela-drive", "main-reef-road"] as const;

export default function HomePage() {
  const featured = JOHANNESBURG_MVP_ROADS.filter((road) =>
    featuredSlugs.includes(road.slug as (typeof featuredSlugs)[number]),
  );

  return (
    <SiteShell mainClassName="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="flex flex-col gap-12">
        <HorizonHero />

        <section className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2 text-accent-ground">
              <MapPin className="h-4 w-4" aria-hidden />
              <h2 className="text-lg font-semibold text-foreground">
                Point → Understand
              </h2>
            </div>
            <p className="mt-2 text-muted">
              A playable map of Johannesburg roads, intersections, and the
              stories behind them — with sources you can trust.
            </p>
            <Button variant="ground" className="mt-4" asChild>
              <Link href="/ground/roads">Open road map</Link>
            </Button>
          </article>
          <article className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-md">
            <div className="flex items-center gap-2 text-accent-sky">
              <Moon className="h-4 w-4" aria-hidden />
              <h2 className="text-lg font-semibold text-foreground">
                Look up → Learn
              </h2>
            </div>
            <p className="mt-2 text-muted">
              The Southern Hemisphere sky from your location — planets, Moon,
              constellations, and cultural traditions.
            </p>
            <Button variant="sky" className="mt-4" asChild>
              <Link href="/sky">Explore the Sky</Link>
            </Button>
          </article>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Featured roads</h2>
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
            >
              <Search className="h-3.5 w-3.5" aria-hidden />
              Search all roads
            </Link>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {featured.map((road) => (
              <li key={road.slug}>
                <Link
                  href={`/ground/roads/${road.slug}`}
                  className="block rounded-lg border border-border bg-surface-elevated p-4 transition-colors hover:border-accent-ground"
                >
                  <p className="font-medium">{road.currentName}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {road.summary}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-surface-elevated p-6">
          <h2 className="text-lg font-semibold">Built on evidence</h2>
          <p className="mt-2 text-muted">
            Every important statement is a claim with a source and confidence
            level. Community memory is shown as memory — never as undisputed
            fact.
          </p>
          <Link
            href="/methodology"
            className="mt-4 inline-block text-sm font-medium hover:underline"
          >
            Our methodology →
          </Link>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/ground/roads/compare?a=m1&b=m2"
              className="text-sm text-accent-ground hover:underline"
            >
              Compare M1 &amp; M2 →
            </Link>
            <Link
              href="/ground/intersections"
              className="text-sm text-accent-ground hover:underline"
            >
              Explore intersections →
            </Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
