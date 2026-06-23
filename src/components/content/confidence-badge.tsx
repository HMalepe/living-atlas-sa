import type { ConfidenceLevel } from "@/domain/enums";
import { confidenceMeta } from "@/domain/confidence-labels";
import { cn } from "@/lib/utils";

type ConfidenceBadgeProps = {
  level: ConfidenceLevel;
  className?: string;
  showDescription?: boolean;
};

const VARIANT_CLASSES: Record<
  ReturnType<typeof confidenceMeta>["variant"],
  string
> = {
  verified:
    "border-[color:var(--confidence-verified)]/30 bg-[color:var(--confidence-verified)]/10 text-[color:var(--confidence-verified)]",
  strong:
    "border-[color:var(--confidence-supported)]/30 bg-[color:var(--confidence-supported)]/10 text-[color:var(--confidence-supported)]",
  supported:
    "border-[color:var(--confidence-supported)]/30 bg-[color:var(--confidence-supported)]/10 text-[color:var(--confidence-supported)]",
  reported:
    "border-[color:var(--confidence-reported)]/30 bg-[color:var(--confidence-reported)]/15 text-[color:var(--confidence-reported)]",
  community:
    "border-[color:var(--confidence-community)]/30 bg-[color:var(--confidence-community)]/10 text-[color:var(--confidence-community)]",
  oral:
    "border-[color:var(--confidence-community)]/30 bg-[color:var(--confidence-community)]/10 text-[color:var(--confidence-community)]",
  disputed:
    "border-[color:var(--confidence-disputed)]/30 bg-[color:var(--confidence-disputed)]/10 text-[color:var(--confidence-disputed)]",
  unknown:
    "border-[color:var(--confidence-unknown)]/30 bg-[color:var(--confidence-unknown)]/10 text-[color:var(--confidence-unknown)]",
};

export function ConfidenceBadge({
  level,
  className,
  showDescription = false,
}: ConfidenceBadgeProps) {
  const meta = confidenceMeta(level);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        VARIANT_CLASSES[meta.variant],
        className,
      )}
      title={meta.description}
    >
      {meta.label}
      {showDescription ? (
        <span className="sr-only"> — {meta.description}</span>
      ) : null}
    </span>
  );
}
