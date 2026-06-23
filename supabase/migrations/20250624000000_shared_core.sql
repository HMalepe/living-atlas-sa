-- Milestone 1: shared core knowledge graph tables

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ─── Entity registry ───

CREATE TABLE entity_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  module text NOT NULL CHECK (module IN ('ground', 'sky', 'time', 'memory', 'journeys', 'shared')),
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type_id uuid NOT NULL REFERENCES entity_types(id),
  slug text NOT NULL,
  title text NOT NULL,
  summary text,
  status publication_status NOT NULL DEFAULT 'draft',
  seed_tier seed_data_tier NOT NULL DEFAULT 'placeholder',
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  UNIQUE (entity_type_id, slug)
);

CREATE INDEX idx_entities_status ON entities(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_entities_type ON entities(entity_type_id) WHERE deleted_at IS NULL;

CREATE TABLE entity_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  target_entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  notes text,
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  status publication_status NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (source_entity_id <> target_entity_id)
);

CREATE INDEX idx_entity_relationships_source ON entity_relationships(source_entity_id);
CREATE INDEX idx_entity_relationships_target ON entity_relationships(target_entity_id);

-- ─── Names and places ───

CREATE TABLE name_origins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etymology text,
  naming_authority text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE names (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  name text NOT NULL,
  language text DEFAULT 'en',
  name_type text DEFAULT 'official',
  valid_from date,
  valid_to date,
  is_preferred boolean NOT NULL DEFAULT false,
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  name_origin_id uuid REFERENCES name_origins(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_names_entity ON names(entity_id);
CREATE INDEX idx_names_name_trgm ON names USING gin (name gin_trgm_ops);

CREATE TABLE people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid UNIQUE REFERENCES entities(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  birth_date date,
  death_date date,
  biography text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid UNIQUE REFERENCES entities(id) ON DELETE SET NULL,
  name text NOT NULL,
  org_type text,
  founded_date date,
  dissolved_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE places (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid UNIQUE REFERENCES entities(id) ON DELETE SET NULL,
  name text NOT NULL,
  place_type text,
  geom geometry(Geometry, 4326),
  municipality text,
  province text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_places_geom ON places USING gist (geom);

-- ─── Timeline ───

CREATE TABLE timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  event_type text,
  earliest_date date,
  latest_date date,
  date_precision text DEFAULT 'unknown',
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  status publication_status NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_timeline_events_entity ON timeline_events(entity_id);

-- ─── Claims and sources ───

CREATE TABLE sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category source_category NOT NULL,
  title text NOT NULL,
  author text,
  issuing_authority text,
  publication_date date,
  url text,
  archive_ref text,
  page_section text,
  quality confidence_level NOT NULL DEFAULT 'unknown',
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  statement text NOT NULL,
  field_key text,
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  status publication_status NOT NULL DEFAULT 'draft',
  earliest_date date,
  latest_date date,
  ai_generated boolean NOT NULL DEFAULT false,
  ai_review_status text,
  competing_claim_id uuid REFERENCES claims(id),
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_claims_entity ON claims(entity_id);
CREATE INDEX idx_claims_status ON claims(status);

CREATE TABLE claim_sources (
  claim_id uuid NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  source_id uuid NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  page_section text,
  excerpt text,
  PRIMARY KEY (claim_id, source_id)
);

-- ─── Media and tags ───

CREATE TABLE media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid REFERENCES entities(id) ON DELETE SET NULL,
  storage_path text NOT NULL,
  media_type text NOT NULL,
  title text,
  caption text,
  alt_text text,
  credit text,
  status publication_status NOT NULL DEFAULT 'draft',
  uploaded_by uuid REFERENCES auth.users(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE entity_tags (
  entity_id uuid NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (entity_id, tag_id)
);

-- ─── Editorial workflow ───

CREATE TABLE editorial_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE,
  entity_id uuid REFERENCES entities(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES auth.users(id),
  review_status publication_status NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (claim_id IS NOT NULL OR entity_id IS NOT NULL)
);

CREATE TABLE change_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL CHECK (action IN ('insert', 'update', 'delete')),
  old_data jsonb,
  new_data jsonb,
  changed_by uuid REFERENCES auth.users(id),
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_change_history_record ON change_history(table_name, record_id);

-- ─── Community submissions ───

CREATE TYPE submission_type AS ENUM (
  'oral_history',
  'photograph',
  'document',
  'nickname',
  'pronunciation',
  'sky_story',
  'correction',
  'other'
);

CREATE TYPE moderation_status AS ENUM (
  'submitted',
  'safety_check',
  'consent_review',
  'geographic_review',
  'editorial_review',
  'community_review',
  'published',
  'disputed',
  'rejected',
  'archived'
);

CREATE TABLE community_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid REFERENCES entities(id) ON DELETE SET NULL,
  submitter_id uuid NOT NULL REFERENCES auth.users(id),
  submission_type submission_type NOT NULL,
  title text,
  content text NOT NULL,
  consent_given boolean NOT NULL DEFAULT false,
  attribution_choice text DEFAULT 'anonymous',
  permission_status text DEFAULT 'pending',
  display_restrictions text DEFAULT 'public',
  commercial_reuse text DEFAULT 'restricted',
  moderation_status moderation_status NOT NULL DEFAULT 'submitted',
  seed_tier seed_data_tier NOT NULL DEFAULT 'development_sample',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_community_submissions_status ON community_submissions(moderation_status);

CREATE TABLE moderation_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES community_submissions(id) ON DELETE CASCADE,
  moderator_id uuid NOT NULL REFERENCES auth.users(id),
  action moderation_status NOT NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── Updated-at trigger ───

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_entity_types_updated_at BEFORE UPDATE ON entity_types
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_entities_updated_at BEFORE UPDATE ON entities
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_entity_relationships_updated_at BEFORE UPDATE ON entity_relationships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_names_updated_at BEFORE UPDATE ON names
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_people_updated_at BEFORE UPDATE ON people
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_organisations_updated_at BEFORE UPDATE ON organisations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_places_updated_at BEFORE UPDATE ON places
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_timeline_events_updated_at BEFORE UPDATE ON timeline_events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_sources_updated_at BEFORE UPDATE ON sources
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_claims_updated_at BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_media_assets_updated_at BEFORE UPDATE ON media_assets
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_community_submissions_updated_at BEFORE UPDATE ON community_submissions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
