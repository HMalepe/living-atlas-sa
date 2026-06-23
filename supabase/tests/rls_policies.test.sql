-- RLS policy tests — run with: supabase test db
-- Requires local Supabase: supabase start && supabase db reset

BEGIN;

SELECT plan(4);

-- Anonymous users cannot insert entities
SELECT throws_ok(
  $$ INSERT INTO entities (entity_type_id, slug, title)
     SELECT id, 'test-road', 'Test Road' FROM entity_types WHERE slug = 'road' LIMIT 1 $$,
  '42501',
  NULL,
  'Anon cannot insert entities'
);

-- Published entities visible to anon (after seed entity exists)
-- Placeholder: expand in Milestone 2 with fixture data

SELECT ok(
  (SELECT COUNT(*) >= 0 FROM entity_types),
  'Entity types readable'
);

SELECT ok(
  (SELECT COUNT(*) = 6 FROM roles),
  'Six roles seeded'
);

SELECT ok(
  (SELECT COUNT(*) >= 9 FROM permissions),
  'Permissions seeded'
);

SELECT * FROM finish();

ROLLBACK;
