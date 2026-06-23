import Link from "next/link";
import type { RoadRelationship } from "@/domain/road-detail";
import { getRoadBySlug } from "@/data/roads/johannesburg-mvp";
import { relationshipTypeLabel } from "@/domain/relationship-labels";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { UnknownField } from "@/components/content/unknown-field";
import { Button } from "@/components/ui/button";

type RelationshipListProps = {
  relationships: RoadRelationship[];
  currentRoadSlug: string;
  currentRoadName: string;
};

function resolveRoadName(slug: string, currentSlug: string, currentName: string) {
  if (slug === currentSlug) return currentName;
  return getRoadBySlug(slug)?.currentName ?? slug;
}

export function RelationshipList({
  relationships,
  currentRoadSlug,
  currentRoadName,
}: RelationshipListProps) {
  const external = relationships.filter(
    (rel) => rel.targetRoadSlug !== currentRoadSlug,
  );

  if (external.length === 0) {
    return <UnknownField />;
  }

  return (
    <ul className="space-y-3" role="list">
      {external.map((rel) => {
        const targetName = resolveRoadName(
          rel.targetRoadSlug,
          currentRoadSlug,
          currentRoadName,
        );

        return (
          <li
            key={rel.id}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {relationshipTypeLabel(rel.type)}
                </p>
                <Link
                  href={`/ground/roads/${rel.targetRoadSlug}`}
                  className="mt-1 font-medium text-accent-ground hover:underline"
                >
                  {targetName}
                </Link>
              </div>
              <ConfidenceBadge level={rel.confidence} />
            </div>
            {rel.explanation ? (
              <p className="mt-2 text-sm text-muted">{rel.explanation}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link
                  href={`/ground/roads/compare?a=${currentRoadSlug}&b=${rel.targetRoadSlug}`}
                >
                  Compare roads
                </Link>
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
