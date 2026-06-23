/** Shared domain enums — mirror database enums. Single source of truth for UI and services. */

export const CONFIDENCE_LEVELS = [
  "verified_official",
  "strongly_supported",
  "supported",
  "reported",
  "community_memory",
  "oral_history",
  "disputed",
  "unverified",
  "unknown",
] as const;

export type ConfidenceLevel = (typeof CONFIDENCE_LEVELS)[number];

export const PUBLICATION_STATUSES = [
  "draft",
  "in_review",
  "published",
  "disputed",
  "archived",
  "rejected",
] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

export const SEED_DATA_TIERS = [
  "verified",
  "development_sample",
  "placeholder",
] as const;

export type SeedDataTier = (typeof SEED_DATA_TIERS)[number];

export const ROAD_RELATIONSHIP_TYPES = [
  "intersects",
  "runs_parallel_to",
  "merges_with",
  "splits_from",
  "continues_as",
  "formerly_continued_as",
  "shares_alignment_with",
  "feeds_into",
  "provides_relief_for",
  "replaced",
  "was_replaced_by",
  "crosses_over",
  "passes_under",
  "follows_old_boundary",
  "follows_watercourse",
  "follows_ridge",
  "connects_place",
  "divides_place",
] as const;

export type RoadRelationshipType = (typeof ROAD_RELATIONSHIP_TYPES)[number];
