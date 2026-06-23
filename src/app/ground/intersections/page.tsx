import Link from "next/link";
import { ROAD_DEPTH_INTERSECTIONS } from "@/data/roads/road-depth";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata = {
  title: "Intersections",
  description: "Major Johannesburg road intersections and interchanges.",
};

export default function IntersectionsIndexPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 text-sm">
        <Link href="/ground/roads" className="text-muted hover:text-foreground hover:underline">
          ← Roads map
        </Link>
      </nav>

      <h1 className="text-3xl font-semibold">Intersections</h1>
      <p className="mt-2 text-muted">
        Major junctions and interchanges in the Johannesburg MVP catalogue.
      </p>

      <ul className="mt-8 space-y-4" role="list">
        {ROAD_DEPTH_INTERSECTIONS.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/ground/intersections/${item.slug}`}
              className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-accent-ground"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h2 className="font-semibold">
                    {item.localNickname ?? item.title}
                  </h2>
                  {item.localNickname ? (
                    <p className="text-sm text-muted">{item.title}</p>
                  ) : null}
                </div>
                <ConfidenceBadge level={item.confidence} />
              </div>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
