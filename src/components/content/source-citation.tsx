import type { DepthSource } from "@/domain/road-detail";
import { sourceCategoryLabel } from "@/domain/source-categories";

type SourceCitationProps = {
  source: DepthSource;
  compact?: boolean;
};

export function SourceCitation({ source, compact = false }: SourceCitationProps) {
  return (
    <li className={compact ? "text-xs" : "text-sm"}>
      <p className="font-medium">{source.title}</p>
      <p className="text-muted">
        {sourceCategoryLabel(source.category)}
        {source.authority ? ` · ${source.authority}` : null}
        {source.author ? ` · ${source.author}` : null}
        {source.publicationDate ? ` · ${source.publicationDate}` : null}
      </p>
      {source.notes && !compact ? (
        <p className="mt-1 text-xs text-muted">{source.notes}</p>
      ) : null}
      {source.url ? (
        <a
          href={source.url}
          className="mt-1 inline-block text-xs text-accent-ground hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source
        </a>
      ) : null}
    </li>
  );
}

type SourceListProps = {
  sources: DepthSource[];
  title?: string;
  compact?: boolean;
};

export function SourceList({
  sources,
  title = "Sources",
  compact = false,
}: SourceListProps) {
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 rounded-md border border-border/60 bg-surface/50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {title}
      </p>
      <ul className="mt-2 space-y-2" role="list">
        {sources.map((source) => (
          <SourceCitation key={source.id} source={source} compact={compact} />
        ))}
      </ul>
    </div>
  );
}
