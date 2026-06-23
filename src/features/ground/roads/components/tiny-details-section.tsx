import Link from "next/link";
import type { TinyDetail, DepthSource } from "@/domain/road-detail";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SourceList } from "@/components/content/source-citation";
import { UnknownField } from "@/components/content/unknown-field";

type TinyDetailsSectionProps = {
  details: TinyDetail[];
  sources: DepthSource[];
};

export function TinyDetailsSection({
  details,
  sources,
}: TinyDetailsSectionProps) {
  if (details.length === 0) {
    return <UnknownField />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {details.map((detail) => {
        const detailSources = sources.filter((s) =>
          detail.sourceIds.includes(s.id),
        );

        return (
          <article
            key={detail.id}
            className="rounded-lg border border-border bg-surface-elevated p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium">{detail.title}</h3>
              <ConfidenceBadge level={detail.confidence} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {detail.body}
            </p>
            <SourceList sources={detailSources} compact />
          </article>
        );
      })}
    </div>
  );
}

type IntersectionLinksProps = {
  intersections: { slug: string; title: string; localNickname?: string }[];
};

export function IntersectionLinks({ intersections }: IntersectionLinksProps) {
  if (intersections.length === 0) {
    return <UnknownField />;
  }

  return (
    <ul className="flex flex-wrap gap-2" role="list">
      {intersections.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/ground/intersections/${item.slug}`}
            className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:border-accent-ground hover:text-accent-ground"
          >
            {item.localNickname ?? item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
