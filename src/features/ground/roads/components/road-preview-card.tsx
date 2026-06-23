import Link from "next/link";
import { X } from "lucide-react";
import { SeedTierBadge } from "@/components/content/seed-tier-badge";
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
            className="rounded-md p-1 text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {road.summary ? (
        <p className="mt-3 text-sm text-muted">{road.summary}</p>
      ) : null}

      {road.seedTier ? (
        <div className="mt-3">
          <SeedTierBadge tier={road.seedTier} />
        </div>
      ) : null}

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Button variant="ground" className="flex-1" asChild>
          <Link href={`/ground/roads/${road.slug}`}>Open road page</Link>
        </Button>
        <Button variant="outline" className="flex-1" asChild>
          <Link href={`/ground/roads/compare?a=${road.slug}&b=m1`}>
            Compare
          </Link>
        </Button>
      </div>
    </article>
  );
}
