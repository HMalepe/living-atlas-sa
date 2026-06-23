import type { ConfidenceLevel } from "@/domain/enums";

export interface ConfidenceMeta {
  label: string;
  shortLabel: string;
  description: string;
  variant: ConfidenceBadgeVariant;
}

export type ConfidenceBadgeVariant =
  | "verified"
  | "strong"
  | "supported"
  | "reported"
  | "community"
  | "oral"
  | "disputed"
  | "unknown";

const CONFIDENCE_META: Record<ConfidenceLevel, ConfidenceMeta> = {
  verified_official: {
    label: "Official record",
    shortLabel: "Official",
    description: "Government gazette, official dataset, or signed engineering record.",
    variant: "verified",
  },
  strongly_supported: {
    label: "Strongly supported",
    shortLabel: "Strong",
    description: "Multiple independent reputable sources agree.",
    variant: "strong",
  },
  supported: {
    label: "Supported",
    shortLabel: "Supported",
    description: "Credible single source or consistent geographic evidence.",
    variant: "supported",
  },
  reported: {
    label: "Reported",
    shortLabel: "Reported",
    description: "Reported but not independently verified.",
    variant: "reported",
  },
  community_memory: {
    label: "Community memory",
    shortLabel: "Memory",
    description: "Community submission, not independently verified.",
    variant: "community",
  },
  oral_history: {
    label: "Oral history",
    shortLabel: "Oral",
    description: "Recorded oral account with attribution.",
    variant: "oral",
  },
  disputed: {
    label: "Disputed",
    shortLabel: "Disputed",
    description: "Competing evidence exists.",
    variant: "disputed",
  },
  unverified: {
    label: "Unverified",
    shortLabel: "Unverified",
    description: "Awaiting editorial review.",
    variant: "unknown",
  },
  unknown: {
    label: "Unknown",
    shortLabel: "Unknown",
    description: "Research has not yet established this.",
    variant: "unknown",
  },
};

export function confidenceMeta(level: ConfidenceLevel): ConfidenceMeta {
  return CONFIDENCE_META[level];
}

export function confidenceLabel(level: ConfidenceLevel): string {
  return CONFIDENCE_META[level].label;
}
