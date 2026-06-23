import type { DepthClaim } from "@/domain/road-detail";
import type { DepthSource } from "@/domain/road-detail";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SourceList } from "@/components/content/source-citation";

type ClaimDisplayProps = {
  claim: DepthClaim;
  sources: DepthSource[];
};

export function ClaimDisplay({ claim, sources }: ClaimDisplayProps) {
  const claimSources = sources.filter((s) => claim.sourceIds.includes(s.id));

  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm leading-relaxed">{claim.statement}</p>
        <ConfidenceBadge level={claim.confidence} />
      </div>
      <SourceList sources={claimSources} compact />
    </article>
  );
}

type ClaimsListProps = {
  claims: DepthClaim[];
  sources: DepthSource[];
  emptyMessage?: string;
};

export function ClaimsList({ claims, sources, emptyMessage }: ClaimsListProps) {
  if (claims.length === 0) {
    return emptyMessage ? (
      <p className="text-sm text-muted">{emptyMessage}</p>
    ) : null;
  }

  return (
    <div className="space-y-3">
      {claims.map((claim) => (
        <ClaimDisplay key={claim.id} claim={claim} sources={sources} />
      ))}
    </div>
  );
}
