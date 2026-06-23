import type { ConfidenceLevel, PublicationStatus, SeedDataTier } from "./enums";
import type { RoleSlug } from "./roles";

export interface Profile {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  locale: string;
  createdAt: string;
}

export interface Entity {
  id: string;
  entityTypeId: string;
  slug: string;
  title: string;
  summary: string | null;
  status: PublicationStatus;
  seedTier: SeedDataTier;
  createdAt: string;
  updatedAt: string;
}

export interface Claim {
  id: string;
  entityId: string;
  statement: string;
  fieldKey: string | null;
  confidence: ConfidenceLevel;
  status: PublicationStatus;
}

export interface AdminDashboardStats {
  draftEntities: number;
  missingCitations: number;
  pendingSubmissions: number;
  disputedClaims: number;
}

export interface SessionUser {
  id: string;
  email: string;
  roles: RoleSlug[];
  permissions: string[];
}
