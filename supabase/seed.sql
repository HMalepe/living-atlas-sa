-- Milestone 1: seed roles, permissions, entity types, subscription placeholders

-- ─── Roles (rank determines hierarchy) ───

INSERT INTO roles (slug, name, rank, description) VALUES
  ('viewer', 'Viewer', 1, 'Can explore published content'),
  ('contributor', 'Contributor', 2, 'Can submit community memories'),
  ('researcher', 'Researcher', 3, 'Can create and edit draft entities'),
  ('editor', 'Editor', 4, 'Can publish reviewed content'),
  ('moderator', 'Moderator', 4, 'Can moderate community submissions'),
  ('administrator', 'Administrator', 5, 'Full platform access');

-- ─── Permissions ───

INSERT INTO permissions (slug, name, description) VALUES
  ('entities.read', 'Read entities', 'View published entities'),
  ('entities.write', 'Write entities', 'Create and edit draft entities'),
  ('entities.publish', 'Publish entities', 'Publish entities and claims'),
  ('sources.write', 'Write sources', 'Create and attach sources'),
  ('community.submit', 'Submit community content', 'Submit community memories'),
  ('community.moderate', 'Moderate community content', 'Review and publish submissions'),
  ('admin.access', 'Admin access', 'Access admin portal'),
  ('admin.users', 'Manage users', 'Assign roles to users'),
  ('admin.audit', 'View audit history', 'View change history');

-- ─── Role → permission mapping ───

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'viewer' AND p.slug IN ('entities.read');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'contributor' AND p.slug IN ('entities.read', 'community.submit');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'researcher' AND p.slug IN (
  'entities.read', 'entities.write', 'sources.write', 'community.submit', 'admin.access'
);

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'editor' AND p.slug IN (
  'entities.read', 'entities.write', 'entities.publish', 'sources.write',
  'community.submit', 'admin.access', 'admin.audit'
);

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.slug = 'moderator' AND p.slug IN (
  'entities.read', 'community.submit', 'community.moderate', 'admin.access'
);

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r CROSS JOIN permissions p
WHERE r.slug = 'administrator';

-- ─── Entity types ───

INSERT INTO entity_types (slug, name, module, description) VALUES
  ('road', 'Road', 'ground', 'Significant road or route'),
  ('intersection', 'Intersection', 'ground', 'Road junction or interchange'),
  ('place', 'Place', 'ground', 'Named geographic place'),
  ('infrastructure', 'Infrastructure', 'ground', 'Built infrastructure feature'),
  ('star', 'Star', 'sky', 'Individual star'),
  ('planet', 'Planet', 'sky', 'Solar system planet'),
  ('moon', 'Moon', 'sky', 'Natural satellite'),
  ('constellation', 'Constellation', 'sky', 'Star pattern or region'),
  ('deep_sky', 'Deep Sky Object', 'sky', 'Nebula, galaxy, cluster, etc.'),
  ('journey', 'Journey', 'journeys', 'Guided exploration route'),
  ('collection', 'Collection', 'journeys', 'Themed content collection'),
  ('event', 'Event', 'time', 'Historical or astronomical event'),
  ('person', 'Person', 'shared', 'Historical or notable person'),
  ('organisation', 'Organisation', 'shared', 'Institution or company');

-- ─── Subscription plan placeholders (inactive) ───

INSERT INTO subscription_plans (slug, name, plan_type, is_active) VALUES
  ('free', 'Free Explorer', 'consumer', true),
  ('premium', 'Premium Journeys', 'consumer', false),
  ('school', 'School Edition', 'education', false),
  ('tourism', 'Tourism Partner', 'tourism', false),
  ('municipal', 'Municipal Portal', 'government', false),
  ('api', 'Data API', 'api', false);

INSERT INTO plan_entitlements (plan_id, entitlement_key, entitlement_value)
SELECT id, 'offline_collections', '{"enabled": false}'::jsonb FROM subscription_plans WHERE slug = 'free';

INSERT INTO plan_entitlements (plan_id, entitlement_key, entitlement_value)
SELECT id, 'advanced_sky_tools', '{"enabled": false}'::jsonb FROM subscription_plans WHERE slug = 'free';

INSERT INTO plan_entitlements (plan_id, entitlement_key, entitlement_value)
SELECT id, 'offline_collections', '{"enabled": true}'::jsonb FROM subscription_plans WHERE slug = 'premium';

INSERT INTO plan_entitlements (plan_id, entitlement_key, entitlement_value)
SELECT id, 'teacher_dashboard', '{"enabled": true}'::jsonb FROM subscription_plans WHERE slug = 'school';
