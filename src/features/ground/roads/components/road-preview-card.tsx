import Link from "next/link";
import { seedTierLabel } from "@/data/roads/johannesburg-mvp";
import type { SeedDataTier } from "@/domain/enums";
import { Button } from "@/components/ui/button";

export type RoadPreviewData = {
  slug: string;
  title: string;
  currentName: string;
  routeNumber: string | null;
  summary?: string;
  seedTier?: SeedDataTier;
};

type RoadPreviewCardProps = {
  road: RoadPreviewData | null;
  onClose?: () => void;
};

export function RoadPreviewCard({ road, onClose }: RoadPreviewCardProps) {
  if (!road) {
    return (
      <div className="rounded-xl border border-border bg-surface-elevated p-6 text-sm text-muted">
        Tap a road on the map to preview it here.
      </div>
    );
  }

  return (
    <article className="rounded-xl border border-border bg-surface-elevated p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          {road.routeNumber ? (
            <p className="text-xs font-medium uppercase tracking-wider text-accent-ground">
              Route {road.routeNumber}
            </p>
          ) : null}
          <h2 className="mt-1 text-xl font-semibold">{road.currentName}</h2>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-muted hover:text-foreground"
            aria-label="Close preview"
          >
            ✕
          </button>
        ) : null}
      </div>

      {road.summary ? (
        <p className="mt-3 text-sm text-muted">{road.summary}</p>
      ) : null}

      {road.seedTier ? (
        <p className="mt-3 text-xs text-muted">{seedTierLabel(road.seedTier)}</p>
      ) : null}

      <Button variant="ground" className="mt-4 w-full" asChild>
        <Link href={`/ground/roads/${road.slug}`}>Open road page</Link>
      </Button>
    </article>
  );
}
