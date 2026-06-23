-- Milestone 1: profiles, roles, permissions, RLS

-- ─── Profiles ───

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  locale text DEFAULT 'en-ZA',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── RBAC ───

CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  rank int NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  granted_by uuid REFERENCES auth.users(id),
  granted_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);

-- ─── Business model placeholders ───

CREATE TABLE partner_organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  org_kind text NOT NULL CHECK (org_kind IN ('municipal', 'tourism', 'school', 'museum', 'sponsor', 'other')),
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE subscription_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('consumer', 'education', 'tourism', 'government', 'api')),
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE plan_entitlements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  entitlement_key text NOT NULL,
  entitlement_value jsonb NOT NULL DEFAULT '{}',
  UNIQUE (plan_id, entitlement_key)
);

CREATE TABLE user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES subscription_plans(id),
  partner_org_id uuid REFERENCES partner_organisations(id),
  status text NOT NULL DEFAULT 'inactive',
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ─── Auth helpers ───

CREATE OR REPLACE FUNCTION public.user_role_rank()
RETURNS int
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(MAX(r.rank), 0)
  FROM user_roles ur
  JOIN roles r ON r.id = ur.role_id
  WHERE ur.user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_slug text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN roles r ON r.id = ur.role_id
    WHERE ur.user_id = auth.uid() AND r.slug = required_slug
  );
$$;

CREATE OR REPLACE FUNCTION public.has_min_role(min_rank int)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.user_role_rank() >= min_rank;
$$;

CREATE OR REPLACE FUNCTION public.has_permission(required_slug text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_permissions rp ON rp.role_id = ur.role_id
    JOIN permissions p ON p.id = rp.permission_id
    WHERE ur.user_id = auth.uid() AND p.slug = required_slug
  );
$$;

-- ─── New user handler ───

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  viewer_role_id uuid;
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );

  SELECT id INTO viewer_role_id FROM roles WHERE slug = 'viewer';

  IF viewer_role_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role_id)
    VALUES (NEW.id, viewer_role_id);
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Enable RLS ───

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE names ENABLE ROW LEVEL SECURITY;
ALTER TABLE name_origins ENABLE ROW LEVEL SECURITY;
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE editorial_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE change_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE moderation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- ─── Profiles policies ───

CREATE POLICY profiles_select_own ON profiles
  FOR SELECT USING (auth.uid() = id OR public.has_min_role(5));

CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ─── Roles (read for authenticated) ───

CREATE POLICY roles_select_authenticated ON roles
  FOR SELECT TO authenticated USING (true);

CREATE POLICY permissions_select_authenticated ON permissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY role_permissions_select_authenticated ON role_permissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY user_roles_select_own ON user_roles
  FOR SELECT USING (auth.uid() = user_id OR public.has_min_role(5));

CREATE POLICY user_roles_manage_admin ON user_roles
  FOR ALL USING (public.has_min_role(5));

-- ─── Entity types (public read) ───

CREATE POLICY entity_types_select_all ON entity_types
  FOR SELECT USING (true);

CREATE POLICY entity_types_manage_staff ON entity_types
  FOR ALL USING (public.has_min_role(5));

-- ─── Entities ───

CREATE POLICY entities_select_published ON entities
  FOR SELECT USING (
    deleted_at IS NULL
    AND (
      status = 'published'
      OR public.has_min_role(3)
    )
  );

CREATE POLICY entities_insert_researcher ON entities
  FOR INSERT WITH CHECK (public.has_min_role(3));

CREATE POLICY entities_update_researcher ON entities
  FOR UPDATE USING (public.has_min_role(3));

CREATE POLICY entities_delete_admin ON entities
  FOR DELETE USING (public.has_min_role(5));

-- ─── Claims ───

CREATE POLICY claims_select ON claims
  FOR SELECT USING (
    status = 'published' OR public.has_min_role(3)
  );

CREATE POLICY claims_write_researcher ON claims
  FOR INSERT WITH CHECK (public.has_min_role(3));

CREATE POLICY claims_update_researcher ON claims
  FOR UPDATE USING (public.has_min_role(3));

CREATE POLICY claims_publish_editor ON claims
  FOR UPDATE USING (public.has_min_role(4));

-- ─── Sources ───

CREATE POLICY sources_select ON sources
  FOR SELECT USING (true);

CREATE POLICY sources_write_researcher ON sources
  FOR ALL USING (public.has_min_role(3));

-- ─── Claim sources ───

CREATE POLICY claim_sources_select ON claim_sources
  FOR SELECT USING (true);

CREATE POLICY claim_sources_write_researcher ON claim_sources
  FOR ALL USING (public.has_min_role(3));

-- ─── Names, relationships, timeline (mirror entity access) ───

CREATE POLICY names_select ON names
  FOR SELECT USING (true);

CREATE POLICY names_write_researcher ON names
  FOR ALL USING (public.has_min_role(3));

CREATE POLICY entity_relationships_select ON entity_relationships
  FOR SELECT USING (status = 'published' OR public.has_min_role(3));

CREATE POLICY entity_relationships_write ON entity_relationships
  FOR ALL USING (public.has_min_role(3));

CREATE POLICY timeline_events_select ON timeline_events
  FOR SELECT USING (status = 'published' OR public.has_min_role(3));

CREATE POLICY timeline_events_write ON timeline_events
  FOR ALL USING (public.has_min_role(3));

CREATE POLICY places_select ON places FOR SELECT USING (true);
CREATE POLICY places_write ON places FOR ALL USING (public.has_min_role(3));

CREATE POLICY people_select ON people FOR SELECT USING (true);
CREATE POLICY people_write ON people FOR ALL USING (public.has_min_role(3));

CREATE POLICY organisations_select ON organisations FOR SELECT USING (true);
CREATE POLICY organisations_write ON organisations FOR ALL USING (public.has_min_role(3));

CREATE POLICY name_origins_select ON name_origins FOR SELECT USING (true);
CREATE POLICY name_origins_write ON name_origins FOR ALL USING (public.has_min_role(3));

CREATE POLICY media_assets_select ON media_assets
  FOR SELECT USING (status = 'published' OR public.has_min_role(3));

CREATE POLICY media_assets_write ON media_assets
  FOR ALL USING (public.has_min_role(3));

CREATE POLICY tags_select ON tags FOR SELECT USING (true);
CREATE POLICY tags_write ON tags FOR ALL USING (public.has_min_role(3));

CREATE POLICY entity_tags_select ON entity_tags FOR SELECT USING (true);
CREATE POLICY entity_tags_write ON entity_tags FOR ALL USING (public.has_min_role(3));

CREATE POLICY editorial_reviews_select ON editorial_reviews
  FOR SELECT USING (public.has_min_role(3));

CREATE POLICY editorial_reviews_write ON editorial_reviews
  FOR ALL USING (public.has_min_role(4));

CREATE POLICY change_history_select ON change_history
  FOR SELECT USING (public.has_min_role(3));

CREATE POLICY change_history_insert ON change_history
  FOR INSERT WITH CHECK (public.has_min_role(3));

-- ─── Community submissions ───

CREATE POLICY community_submissions_select_own ON community_submissions
  FOR SELECT USING (
    submitter_id = auth.uid()
    OR public.has_min_role(4)
    OR moderation_status = 'published'
  );

CREATE POLICY community_submissions_insert ON community_submissions
  FOR INSERT WITH CHECK (
    auth.uid() = submitter_id
    AND consent_given = true
    AND public.has_min_role(2)
  );

CREATE POLICY community_submissions_moderate ON community_submissions
  FOR UPDATE USING (public.has_min_role(4));

CREATE POLICY moderation_actions_select ON moderation_actions
  FOR SELECT USING (public.has_min_role(4));

CREATE POLICY moderation_actions_insert ON moderation_actions
  FOR INSERT WITH CHECK (public.has_min_role(4));

-- ─── Business placeholders (admin only for writes) ───

CREATE POLICY partner_orgs_select ON partner_organisations FOR SELECT USING (true);
CREATE POLICY partner_orgs_write ON partner_organisations FOR ALL USING (public.has_min_role(5));

CREATE POLICY subscription_plans_select ON subscription_plans FOR SELECT USING (true);
CREATE POLICY subscription_plans_write ON subscription_plans FOR ALL USING (public.has_min_role(5));

CREATE POLICY plan_entitlements_select ON plan_entitlements FOR SELECT USING (true);
CREATE POLICY plan_entitlements_write ON plan_entitlements FOR ALL USING (public.has_min_role(5));

CREATE POLICY user_subscriptions_select_own ON user_subscriptions
  FOR SELECT USING (user_id = auth.uid() OR public.has_min_role(5));

CREATE POLICY user_subscriptions_write_admin ON user_subscriptions
  FOR ALL USING (public.has_min_role(5));
