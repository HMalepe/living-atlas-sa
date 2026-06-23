import type { RoadRelationshipType } from "@/domain/enums";

const LABELS: Record<RoadRelationshipType, string> = {
  intersects: "Intersects",
  runs_parallel_to: "Runs parallel to",
  merges_with: "Merges with",
  splits_from: "Splits from",
  continues_as: "Continues as",
  formerly_continued_as: "Formerly continued as",
  shares_alignment_with: "Shares alignment with",
  feeds_into: "Feeds into",
  provides_relief_for: "Provides relief for",
  replaced: "Replaced",
  was_replaced_by: "Was replaced by",
  crosses_over: "Crosses over",
  passes_under: "Passes under",
  follows_old_boundary: "Follows old boundary",
  follows_watercourse: "Follows watercourse",
  follows_ridge: "Follows ridge",
  connects_place: "Connects place",
  divides_place: "Divides place",
};

export function relationshipTypeLabel(type: RoadRelationshipType): string {
  return LABELS[type];
}
