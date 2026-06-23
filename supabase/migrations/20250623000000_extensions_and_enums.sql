-- Milestone 0: extensions and shared enums
-- Full schema arrives in Milestone 1

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Publication status for editorial workflow
CREATE TYPE publication_status AS ENUM (
  'draft',
  'in_review',
  'published',
  'disputed',
  'archived',
  'rejected'
);

-- Source confidence levels
CREATE TYPE confidence_level AS ENUM (
  'verified_official',
  'strongly_supported',
  'supported',
  'reported',
  'community_memory',
  'oral_history',
  'disputed',
  'unverified',
  'unknown'
);

-- Source categories
CREATE TYPE source_category AS ENUM (
  'government_gazette',
  'municipal_minutes',
  'engineering_report',
  'historical_map',
  'archival_record',
  'academic_source',
  'book',
  'newspaper',
  'oral_history',
  'community_submission',
  'official_dataset',
  'astronomical_catalogue',
  'research_paper',
  'institutional_website'
);

-- Seed data classification
CREATE TYPE seed_data_tier AS ENUM (
  'verified',
  'development_sample',
  'placeholder'
);

COMMENT ON TYPE publication_status IS 'Editorial lifecycle for entities and claims';
COMMENT ON TYPE confidence_level IS 'Evidence strength for factual claims';
COMMENT ON TYPE source_category IS 'Provenance classification for sources';
COMMENT ON TYPE seed_data_tier IS 'Distinguishes verified production data from samples';
