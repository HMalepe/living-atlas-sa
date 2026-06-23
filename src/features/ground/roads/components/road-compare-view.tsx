"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  JOHANNESBURG_MVP_ROADS,
  getRoadBySlug,
} from "@/data/roads/johannesburg-mvp";
import {
  getRoadDepthProfile,
  getParallelExplanation,
  getRelationshipBetween,
} from "@/data/roads/road-depth";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SeedTierBadge } from "@/components/content/seed-tier-badge";
import { ParallelExplainer } from "@/features/ground/roads/components/parallel-explainer";
import { RelationshipList } from "@/features/ground/roads/components/relationship-list";
import { Button } from "@/components/ui/button";

export function RoadCompareView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slugA = searchParams.get("a") ?? "m1";
  const slugB = searchParams.get("b") ?? "m2";

  const roadA = getRoadBySlug(slugA);
  const roadB = getRoadBySlug(slugB);

  const updateCompare = useCallback(
    (nextA: string, nextB: string) => {
      const params = new URLSearchParams();
      params.set("a", nextA);
      params.set("b", nextB);
      router.push(`/ground/roads/compare?${params.toString()}`);
    },
    [router],
  );

  if (!roadA || !roadB) {
    return (
      <p className="text-muted">
        Select two valid roads from the Johannesburg catalogue.
      </p>
    );
  }

  const depthA = getRoadDepthProfile(roadA.slug);
  const depthB = getRoadDepthProfile(roadB.slug);
  const between = getRelationshipBetween(roadA.slug, roadB.slug);
  const parallel = getParallelExplanation(roadA.slug, roadB.slug);
  const sources = [...depthA.sources, ...depthB.sources].filter(
    (source, index, arr) =>
      arr.findIndex((s) => s.id === source.id) === index,
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium">First road</span>
          <select
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2"
            value={slugA}
            onChange={(e) => updateCompare(e.target.value, slugB)}
            aria-label="First road to compare"
          >
            {JOHANNESBURG_MVP_ROADS.map((road) => (
              <option key={road.slug} value={road.slug}>
                {road.currentName}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium">Second road</span>
          <select
            className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2"
            value={slugB}
            onChange={(e) => updateCompare(slugA, e.target.value)}
            aria-label="Second road to compare"
          >
            {JOHANNESBURG_MVP_ROADS.map((road) => (
              <option key={road.slug} value={road.slug}>
                {road.currentName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[roadA, roadB].map((road, index) => {
          const depth = index === 0 ? depthA : depthB;
          return (
            <article
              key={road.slug}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <Link
                href={`/ground/roads/${road.slug}`}
                className="text-xl font-semibold hover:text-accent-ground hover:underline"
              >
                {road.currentName}
              </Link>
              <p className="mt-2 text-sm text-muted">{road.summary}</p>
              <div className="mt-3">
                <SeedTierBadge tier={road.seedTier} />
              </div>
              {road.routeNumbers.length > 0 ? (
                <p className="mt-3 text-sm">
                  <span className="font-medium">Routes: </span>
                  {road.routeNumbers.join(", ")}
                </p>
              ) : null}
              {depth.claims.slice(0, 2).map((claim) => (
                <div
                  key={claim.id}
                  className="mt-3 rounded-md border border-border/60 bg-background/50 p-3 text-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p>{claim.statement}</p>
                    <ConfidenceBadge level={claim.confidence} />
                  </div>
                </div>
              ))}
            </article>
          );
        })}
      </div>

      <section>
        <h2 className="text-lg font-semibold">How these roads relate</h2>
        {between.length > 0 ? (
          <div className="mt-4">
            <RelationshipList
              relationships={between}
              currentRoadSlug={roadA.slug}
              currentRoadName={roadA.currentName}
            />
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted">
            No direct published relationship between these roads yet.
          </p>
        )}
      </section>

      {parallel ? (
        <ParallelExplainer explanation={parallel} sources={sources} />
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <Link href={`/ground/roads/${roadA.slug}`}>View {roadA.currentName}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/ground/roads/${roadB.slug}`}>View {roadB.currentName}</Link>
        </Button>
      </div>
    </div>
  );
}
