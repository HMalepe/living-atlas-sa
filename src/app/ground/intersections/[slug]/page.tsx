import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ROAD_DEPTH_INTERSECTIONS,
  getIntersectionBySlug,
  resolveSources,
} from "@/data/roads/road-depth";
import { getRoadBySlug } from "@/data/roads/johannesburg-mvp";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SourceList } from "@/components/content/source-citation";
import { SiteShell } from "@/components/layout/site-shell";

type IntersectionPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ROAD_DEPTH_INTERSECTIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: IntersectionPageProps) {
  const { slug } = await params;
  const intersection = getIntersectionBySlug(slug);
  return {
    title: intersection?.title ?? "Intersection",
    description: intersection?.summary,
  };
}

export default async function IntersectionDetailPage({
  params,
}: IntersectionPageProps) {
  const { slug } = await params;
  const intersection = getIntersectionBySlug(slug);

  if (!intersection) {
    notFound();
  }

  const sources = resolveSources(intersection.sourceIds);
  const connectedRoads = intersection.roadSlugs
    .map((roadSlug) => getRoadBySlug(roadSlug))
    .filter(Boolean);

  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex items-center justify-between text-sm">
        <Link
          href="/ground/intersections"
          className="text-muted hover:text-foreground hover:underline"
        >
          ← All intersections
        </Link>
        <Link href="/ground/roads" className="text-muted hover:text-foreground hover:underline">
          Roads map
        </Link>
      </nav>

      {intersection.localNickname ? (
        <p className="text-xs font-medium uppercase tracking-wider text-accent-ground">
          {intersection.localNickname}
        </p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold">{intersection.title}</h1>
      <div className="mt-3">
        <ConfidenceBadge level={intersection.confidence} />
      </div>
      <p className="mt-4 text-muted">{intersection.summary}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Connected roads</h2>
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {connectedRoads.map((road) =>
            road ? (
              <li key={road.slug}>
                <Link
                  href={`/ground/roads/${road.slug}`}
                  className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:border-accent-ground hover:text-accent-ground"
                >
                  {road.currentName}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>
    </SiteShell>
  );
}
