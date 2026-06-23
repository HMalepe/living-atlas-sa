-- Milestone 2: road domain tables

CREATE TABLE roads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  primary_route_number text,
  total_length_km numeric(10, 2),
  direction_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_roads_route_number ON roads(primary_route_number);

CREATE TABLE road_segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  segment_order int NOT NULL,
  direction text,
  length_km numeric(10, 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (road_id, segment_order)
);

CREATE TABLE road_geometries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  segment_id uuid REFERENCES road_segments(id) ON DELETE SET NULL,
  geom geometry(LineString, 4326) NOT NULL,
  simplify_tolerance int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_road_geometries_geom ON road_geometries USING gist (geom);
CREATE INDEX idx_road_geometries_road ON road_geometries(road_id);

CREATE TABLE route_designations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  designation text NOT NULL,
  authority text,
  valid_from date,
  valid_to date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE road_names (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  name text NOT NULL,
  name_type text NOT NULL DEFAULT 'official',
  language text DEFAULT 'en',
  valid_from date,
  valid_to date,
  is_current boolean NOT NULL DEFAULT true,
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_road_names_name_trgm ON road_names USING gin (name gin_trgm_ops);
CREATE INDEX idx_road_names_road ON road_names(road_id);

CREATE TRIGGER trg_roads_updated_at BEFORE UPDATE ON roads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_road_segments_updated_at BEFORE UPDATE ON road_segments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─── RLS ───

ALTER TABLE roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_segments ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_geometries ENABLE ROW LEVEL SECURITY;
ALTER TABLE route_designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_names ENABLE ROW LEVEL SECURITY;

CREATE POLICY roads_select ON roads FOR SELECT USING (true);
CREATE POLICY roads_write ON roads FOR ALL USING (public.has_min_role(3));

CREATE POLICY road_segments_select ON road_segments FOR SELECT USING (true);
CREATE POLICY road_segments_write ON road_segments FOR ALL USING (public.has_min_role(3));

CREATE POLICY road_geometries_select ON road_geometries FOR SELECT USING (true);
CREATE POLICY road_geometries_write ON road_geometries FOR ALL USING (public.has_min_role(3));

CREATE POLICY route_designations_select ON route_designations FOR SELECT USING (true);
CREATE POLICY route_designations_write ON route_designations FOR ALL USING (public.has_min_role(3));

CREATE POLICY road_names_select ON road_names FOR SELECT USING (true);
CREATE POLICY road_names_write ON road_names FOR ALL USING (public.has_min_role(3));

-- ─── GeoJSON helper for bbox queries ───

CREATE OR REPLACE FUNCTION public.roads_in_bbox(
  min_lng double precision,
  min_lat double precision,
  max_lng double precision,
  max_lat double precision,
  max_results int DEFAULT 50
)
RETURNS TABLE (
  road_id uuid,
  entity_id uuid,
  slug text,
  title text,
  primary_route_number text,
  geojson jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    r.id AS road_id,
    e.id AS entity_id,
    e.slug,
    e.title,
    r.primary_route_number,
    ST_AsGeoJSON(rg.geom)::jsonb AS geojson
  FROM road_geometries rg
  JOIN roads r ON r.id = rg.road_id
  JOIN entities e ON e.id = r.entity_id
  WHERE e.deleted_at IS NULL
    AND (e.status = 'published' OR public.has_min_role(3))
    AND rg.geom && ST_MakeEnvelope(min_lng, min_lat, max_lng, max_lat, 4326)
  LIMIT max_results;
$$;

-- ─── Road search with match reason ───

CREATE OR REPLACE FUNCTION public.search_roads(
  search_query text,
  result_limit int DEFAULT 20
)
RETURNS TABLE (
  slug text,
  title text,
  current_name text,
  match_reason text,
  match_field text,
  former_name text,
  seed_tier seed_data_tier
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  q text := lower(trim(search_query));
BEGIN
  IF q = '' THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT DISTINCT ON (e.slug)
    e.slug,
    e.title,
    COALESCE(rn.name, e.title) AS current_name,
    CASE
      WHEN lower(e.title) LIKE '%' || q || '%' THEN 'Matched road name "' || e.title || '"'
      WHEN lower(rn.name) LIKE '%' || q || '%' THEN 'Matched current name "' || rn.name || '"'
      WHEN lower(rn_former.name) LIKE '%' || q || '%' THEN 'Formerly ' || rn_former.name
      WHEN lower(r.primary_route_number) LIKE '%' || q || '%' THEN 'Matched route number ' || r.primary_route_number
      ELSE 'Matched search'
    END AS match_reason,
    CASE
      WHEN lower(e.title) LIKE '%' || q || '%' THEN 'title'
      WHEN lower(rn.name) LIKE '%' || q || '%' THEN 'current_name'
      WHEN lower(rn_former.name) LIKE '%' || q || '%' THEN 'former_name'
      WHEN lower(r.primary_route_number) LIKE '%' || q || '%' THEN 'route_number'
      ELSE 'title'
    END AS match_field,
    CASE WHEN lower(rn_former.name) LIKE '%' || q || '%' THEN rn_former.name ELSE NULL END AS former_name,
    e.seed_tier
  FROM entities e
  JOIN entity_types et ON et.id = e.entity_type_id AND et.slug = 'road'
  JOIN roads r ON r.entity_id = e.id
  LEFT JOIN road_names rn ON rn.road_id = r.id AND rn.is_current = true
  LEFT JOIN road_names rn_former ON rn_former.road_id = r.id AND rn_former.is_current = false
  WHERE e.deleted_at IS NULL
    AND (e.status = 'published' OR public.has_min_role(3))
    AND (
      lower(e.title) LIKE '%' || q || '%'
      OR lower(rn.name) LIKE '%' || q || '%'
      OR lower(rn_former.name) LIKE '%' || q || '%'
      OR lower(r.primary_route_number) LIKE '%' || q || '%'
      OR similarity(rn.name, q) > 0.3
      OR similarity(rn_former.name, q) > 0.3
    )
  ORDER BY e.slug, similarity(COALESCE(rn.name, e.title), q) DESC
  LIMIT result_limit;
END;
$$;
