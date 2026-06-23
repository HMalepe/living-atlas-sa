"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useState } from "react";
import type { RoadSummary } from "@/data/roads/johannesburg-mvp";
import {
  RoadPreviewCard,
  type RoadPreviewData,
} from "@/features/ground/roads/components/road-preview-card";
import type { RoadFeatureProperties } from "@/features/ground/map/ground-map";
import { cn } from "@/lib/utils";

const GroundMap = dynamic(
  () =>
    import("@/features/ground/map/ground-map").then((mod) => mod.GroundMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-surface text-sm text-muted">
        Loading map…
      </div>
    ),
  },
);

type RoadsExplorerProps = {
  roads: RoadSummary[];
  initialSelectedSlug?: string;
};

export function RoadsExplorer({ roads, initialSelectedSlug }: RoadsExplorerProps) {
  const initialRoad = roads.find((r) => r.slug === initialSelectedSlug);
  const [selected, setSelected] = useState<RoadPreviewData | null>(
    initialRoad
      ? {
          slug: initialRoad.slug,
          title: initialRoad.title,
          currentName: initialRoad.currentName,
          routeNumber: initialRoad.primaryRouteNumber,
          summary: initialRoad.summary,
          seedTier: initialRoad.seedTier,
        }
      : null,
  );

  const handleRoadSelect = useCallback(
    (properties: RoadFeatureProperties | null) => {
      if (!properties) {
        setSelected(null);
        return;
      }

      const road = roads.find((r) => r.slug === properties.slug);
      setSelected({
        slug: properties.slug,
        title: properties.title,
        currentName: properties.currentName,
        routeNumber: properties.routeNumber,
        summary: road?.summary,
        seedTier: road?.seedTier,
      });
    },
    [roads],
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <div className="relative min-h-[50vh] flex-1 lg:min-h-0">
        <GroundMap
          selectedSlug={selected?.slug}
          onRoadSelect={handleRoadSelect}
          className="absolute inset-0"
        />
      </div>

      <aside className="flex w-full flex-col gap-4 border-t border-border bg-surface p-4 lg:w-96 lg:border-l lg:border-t-0">
        <RoadPreviewCard road={selected} onClose={() => setSelected(null)} />

        <div>
          <h3 className="text-sm font-semibold">Johannesburg MVP roads</h3>
          <ul className="mt-2 max-h-64 space-y-1 overflow-y-auto text-sm">
            {roads.map((road) => (
              <li key={road.slug}>
                <button
                  type="button"
                  onClick={() =>
                    handleRoadSelect({
                      slug: road.slug,
                      title: road.title,
                      routeNumber: road.primaryRouteNumber,
                      currentName: road.currentName,
                    })
                  }
                  className={cn(
                    "w-full rounded-md px-2 py-1.5 text-left hover:bg-surface-elevated",
                    selected?.slug === road.slug && "bg-surface-elevated font-medium",
                  )}
                >
                  {road.primaryRouteNumber ? `${road.primaryRouteNumber} · ` : ""}
                  {road.currentName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/search"
          className="text-sm text-accent-ground hover:underline"
        >
          Search roads and former names →
        </Link>
      </aside>
    </div>
  );
}
