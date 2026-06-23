import type { RoadSegment } from "@/domain/road-detail";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { UnknownField } from "@/components/content/unknown-field";

type SegmentListProps = {
  segments: RoadSegment[];
};

export function SegmentList({ segments }: SegmentListProps) {
  if (segments.length === 0) {
    return <UnknownField />;
  }

  const sorted = [...segments].sort(
    (a, b) => a.segmentOrder - b.segmentOrder,
  );

  return (
    <ol className="space-y-2" role="list">
      {sorted.map((segment) => (
        <li
          key={segment.id}
          className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-surface px-4 py-3 text-sm"
        >
          <div>
            <span className="font-medium">
              {segment.segmentOrder}. {segment.label}
            </span>
            {segment.direction ? (
              <span className="ml-2 text-muted">({segment.direction})</span>
            ) : null}
          </div>
          <ConfidenceBadge level={segment.confidence} />
        </li>
      ))}
    </ol>
  );
}
