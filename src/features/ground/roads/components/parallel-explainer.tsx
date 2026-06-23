import type { ParallelExplanation, DepthSource } from "@/domain/road-detail";
import { ConfidenceBadge } from "@/components/content/confidence-badge";
import { SourceList } from "@/components/content/source-citation";

type ParallelExplainerProps = {
  explanation: ParallelExplanation;
  sources: DepthSource[];
};

export function ParallelExplainer({
  explanation,
  sources,
}: ParallelExplainerProps) {
  const explainerSources = sources.filter((s) =>
    explanation.sourceIds.includes(s.id),
  );

  return (
    <section className="rounded-xl border border-accent-ground/20 bg-accent-ground/5 p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 className="text-lg font-semibold">{explanation.title}</h2>
        <ConfidenceBadge level={explanation.confidence} />
      </div>
      <p className="mt-4 text-sm leading-relaxed">{explanation.body}</p>
      <SourceList sources={explainerSources} />
    </section>
  );
}
