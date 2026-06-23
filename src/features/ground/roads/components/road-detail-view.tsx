import type { ReactNode } from "react";
import Link from "next/link";
import type { RoadDefinition } from "@/data/roads/johannesburg-mvp";
import type { RoadDepthProfile } from "@/domain/road-detail";
import { getClaimForField } from "@/data/roads/road-depth";
import { SeedTierBadge } from "@/components/content/seed-tier-badge";
import { UnknownField } from "@/components/content/unknown-field";
import { ClaimDisplay } from "@/components/content/claims-list";
import { Button } from "@/components/ui/button";
import { IntersectionLinks } from "@/features/ground/roads/components/tiny-details-section";
import { ParallelExplainer } from "@/features/ground/roads/components/parallel-explainer";
import { RelationshipList } from "@/features/ground/roads/components/relationship-list";
import { SegmentList } from "@/features/ground/roads/components/segment-list";
import { TimelineList } from "@/features/ground/roads/components/timeline-list";
import { TinyDetailsSection } from "@/features/ground/roads/components/tiny-details-section";
import { getParallelExplanation } from "@/data/roads/road-depth";

const SECTIONS = [
  { id: "identity", title: "Identity" },
  { id: "anatomy", title: "Spatial anatomy" },
  { id: "timeline", title: "Timeline" },
  { id: "relationships", title: "Relationships" },
  { id: "intersections", title: "Intersections" },
  { id: "origin", title: "Origin and purpose" },
  { id: "sources", title: "Sources and claims" },
  { id: "notice", title: "Things you might never notice" },
] as const;

type RoadDetailViewProps = {
  road: RoadDefinition;
  depth: RoadDepthProfile;
};

function FieldClaim({
  roadSlug,
  fieldKey,
  depth,
  fallback,
}: {
  roadSlug: string;
  fieldKey: string;
  depth: RoadDepthProfile;
  fallback?: ReactNode;
}) {
  const claim = getClaimForField(roadSlug, fieldKey);
  if (claim) {
    return <ClaimDisplay claim={claim} sources={depth.sources} />;
  }
  return fallback ?? <UnknownField />;
}

export function RoadDetailView({ road, depth }: RoadDetailViewProps) {
  const parallelPair = depth.relationships.find(
    (rel) => rel.type === "runs_parallel_to" && rel.targetRoadSlug !== road.slug,
  );
  const parallelExplanation = parallelPair
    ? getParallelExplanation(road.slug, parallelPair.targetRoadSlug)
    : undefined;

  const identityClaims = depth.claims.filter((c) =>
    c.fieldKey?.startsWith("identity."),
  );
  const originClaims = depth.claims.filter((c) =>
    c.fieldKey?.startsWith("origin."),
  );

  return (
    <>
      {road.primaryRouteNumber ? (
        <p className="text-xs font-medium uppercase tracking-wider text-accent-ground">
          Route {road.primaryRouteNumber}
        </p>
      ) : null}
      <h1 className="mt-2 text-3xl font-semibold">{road.currentName}</h1>
      <p className="mt-4 text-muted">{road.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <SeedTierBadge tier={road.seedTier} />
        <Button variant="outline" size="sm" asChild>
          <Link href={`/ground/roads/compare?a=${road.slug}`}>Compare roads</Link>
        </Button>
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
        {SECTIONS.map((section) => (
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
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-medium">Current official name</dt>
            <dd className="mt-1">
              <FieldClaim
                roadSlug={road.slug}
                fieldKey="identity.current_name"
                depth={depth}
                fallback={<p className="text-muted">{road.currentName}</p>}
              />
            </dd>
          </div>
          <div>
            <dt className="font-medium">Route numbers</dt>
            <dd className="mt-1">
              <FieldClaim
                roadSlug={road.slug}
                fieldKey="identity.route_number"
                depth={depth}
                fallback={
                  road.routeNumbers.length ? (
                    <p className="text-muted">{road.routeNumbers.join(", ")}</p>
                  ) : (
                    <UnknownField />
                  )
                }
              />
            </dd>
          </div>
          <div>
            <dt className="font-medium">Pronunciation</dt>
            <dd className="mt-1">
              <UnknownField />
            </dd>
          </div>
          {identityClaims
            .filter(
              (c) =>
                c.fieldKey !== "identity.current_name" &&
                c.fieldKey !== "identity.route_number",
            )
            .map((claim) => (
              <div key={claim.id}>
                <dt className="font-medium capitalize">
                  {claim.fieldKey?.replace("identity.", "").replace("_", " ")}
                </dt>
                <dd className="mt-1">
                  <ClaimDisplay claim={claim} sources={depth.sources} />
                </dd>
              </div>
            ))}
        </dl>
      </section>

      <section id="anatomy" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Spatial anatomy</h2>
        <p className="mt-2 text-sm text-muted">
          Road segments with approximate development-sample geometry.
        </p>
        <div className="mt-4">
          <SegmentList segments={depth.segments} />
        </div>
        <Button variant="outline" className="mt-4" asChild>
          <Link href={`/ground/roads?road=${road.slug}`}>View on map</Link>
        </Button>
      </section>

      <section id="timeline" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Timeline</h2>
        <div className="mt-4">
          <TimelineList events={depth.timeline} sources={depth.sources} />
        </div>
      </section>

      <section id="relationships" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Relationships</h2>
        <div className="mt-4">
          <RelationshipList
            relationships={depth.relationships}
            currentRoadSlug={road.slug}
            currentRoadName={road.currentName}
          />
        </div>
        {parallelExplanation ? (
          <div className="mt-6">
            <ParallelExplainer
              explanation={parallelExplanation}
              sources={depth.sources}
            />
          </div>
        ) : null}
      </section>

      <section id="intersections" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Key intersections</h2>
        <div className="mt-4">
          <IntersectionLinks intersections={depth.intersections} />
        </div>
      </section>

      <section id="origin" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Origin and purpose</h2>
        <div className="mt-4 space-y-3">
          {originClaims.length > 0 ? (
            originClaims.map((claim) => (
              <ClaimDisplay
                key={claim.id}
                claim={claim}
                sources={depth.sources}
              />
            ))
          ) : (
            <UnknownField />
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium">Construction start date</h3>
          <div className="mt-1">
            <UnknownField />
          </div>
        </div>
      </section>

      <section id="sources" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Sources and claims</h2>
        <p className="mt-2 text-sm text-muted">
          All factual statements on this page link to sources with confidence
          levels. Official records, reported accounts, and community memory are
          kept distinct.
        </p>
        <ul className="mt-4 space-y-2" role="list">
          {depth.sources.map((source) => (
            <li
              key={source.id}
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
            >
              <span className="font-medium">{source.title}</span>
              {source.authority ? (
                <span className="text-muted"> — {source.authority}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="notice" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold">Things you might never notice</h2>
        <div className="mt-4">
          <TinyDetailsSection
            details={depth.tinyDetails}
            sources={depth.sources}
          />
        </div>
      </section>
    </>
  );
}
