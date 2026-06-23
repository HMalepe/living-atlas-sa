import Link from "next/link";
import type { TimelineEvent, DepthSource } from "@/domain/road-detail";
import { formatTimelineDate } from "@/domain/timeline-format";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SourceList } from "@/components/content/source-citation";
import { UnknownField } from "@/components/content/unknown-field";

type TimelineListProps = {
  events: TimelineEvent[];
  sources: DepthSource[];
};

export function TimelineList({ events, sources }: TimelineListProps) {
  if (events.length === 0) {
    return <UnknownField />;
  }

  return (
    <ol className="relative space-y-0 border-l border-border pl-6" aria-label="Timeline">
      {events.map((event, index) => {
        const eventSources = sources.filter((s) =>
          event.sourceIds.includes(s.id),
        );
        const dateLabel = formatTimelineDate(event);

        return (
          <li key={event.id} className="relative pb-8 last:pb-0">
            <span
              className="absolute -left-[1.625rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent-ground bg-background"
              aria-hidden
            />
            <div className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <time
                    className="text-xs font-medium uppercase tracking-wide text-muted"
                    dateTime={event.earliestDate}
                  >
                    {dateLabel}
                  </time>
                  <h3 className="mt-1 font-medium">{event.title}</h3>
                </div>
                <ConfidenceBadge level={event.confidence} />
              </div>
              {event.summary ? (
                <p className="mt-2 text-sm text-muted">{event.summary}</p>
              ) : null}
              {event.roadSlugs.length > 1 ? (
                <p className="mt-2 text-xs text-muted">
                  Also relates to:{" "}
                  {event.roadSlugs.slice(1).map((slug, i) => (
                    <span key={slug}>
                      {i > 0 ? ", " : null}
                      <Link
                        href={`/ground/roads/${slug}`}
                        className="text-accent-ground hover:underline"
                      >
                        {slug}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
              <SourceList sources={eventSources} compact />
            </div>
            {index < events.length - 1 ? null : null}
          </li>
        );
      })}
    </ol>
  );
}
