import type {
  ConfidenceLevel,
  PublicationStatus,
  RoadRelationshipType,
} from "@/domain/enums";
import type { SourceCategory } from "@/domain/source-categories";

export type DatePrecision =
  | "day"
  | "month"
  | "year"
  | "year_range"
  | "circa"
  | "unknown";

export interface DepthSource {
  id: string;
  category: SourceCategory;
  title: string;
  authority?: string;
  author?: string;
  publicationDate?: string;
  url?: string;
  archiveRef?: string;
  notes?: string;
}

export interface DepthClaim {
  id: string;
  roadSlug: string;
  statement: string;
  fieldKey?: string;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  sourceIds: string[];
  competingClaimIds?: string[];
}

export interface TimelineEvent {
  id: string;
  roadSlugs: string[];
  title: string;
  summary?: string;
  earliestDate?: string;
  latestDate?: string;
  datePrecision: DatePrecision;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  sourceIds: string[];
}

export interface RoadRelationship {
  id: string;
  roadSlug: string;
  targetRoadSlug: string;
  type: RoadRelationshipType;
  explanation?: string;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  sourceIds: string[];
}

export interface RoadSegment {
  id: string;
  roadSlug: string;
  segmentOrder: number;
  label: string;
  direction?: string;
  lengthKm?: number;
  confidence: ConfidenceLevel;
  sourceIds: string[];
}

export interface TinyDetail {
  id: string;
  roadSlug: string;
  title: string;
  body: string;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  sourceIds: string[];
}

export interface IntersectionDefinition {
  slug: string;
  title: string;
  summary: string;
  localNickname?: string;
  roadSlugs: string[];
  status: PublicationStatus;
  confidence: ConfidenceLevel;
  sourceIds: string[];
}

export interface ParallelExplanation {
  id: string;
  roadSlugs: [string, string];
  title: string;
  body: string;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
  sourceIds: string[];
}

export interface RoadDepthBundle {
  claims: DepthClaim[];
  timeline: TimelineEvent[];
  relationships: RoadRelationship[];
  segments: RoadSegment[];
  tinyDetails: TinyDetail[];
  intersections: IntersectionDefinition[];
  parallelExplanations: ParallelExplanation[];
  sources: DepthSource[];
}

export interface RoadDepthProfile {
  roadSlug: string;
  claims: DepthClaim[];
  timeline: TimelineEvent[];
  relationships: RoadRelationship[];
  segments: RoadSegment[];
  tinyDetails: TinyDetail[];
  intersections: IntersectionDefinition[];
  sources: DepthSource[];
}
