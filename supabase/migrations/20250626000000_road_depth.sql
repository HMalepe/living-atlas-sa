-- Milestone 3: road intersections and typed road relationships

CREATE TABLE road_intersections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL UNIQUE REFERENCES entities(id) ON DELETE CASCADE,
  point geometry(Point, 4326),
  local_nickname text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_road_intersections_point ON road_intersections USING gist (point);

CREATE TABLE road_intersection_roads (
  intersection_id uuid NOT NULL REFERENCES road_intersections(id) ON DELETE CASCADE,
  road_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  PRIMARY KEY (intersection_id, road_id)
);

CREATE TABLE road_relationships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_a_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  road_b_id uuid NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
  relationship_type text NOT NULL,
  overlap_geom geometry(Geometry, 4326),
  explanation_claim_id uuid REFERENCES claims(id) ON DELETE SET NULL,
  confidence confidence_level NOT NULL DEFAULT 'unknown',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (road_a_id <> road_b_id)
);

CREATE INDEX idx_road_relationships_a ON road_relationships(road_a_id);
CREATE INDEX idx_road_relationships_b ON road_relationships(road_b_id);

CREATE TRIGGER trg_road_intersections_updated_at BEFORE UPDATE ON road_intersections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_road_relationships_updated_at BEFORE UPDATE ON road_relationships
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE road_intersections ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_intersection_roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_relationships ENABLE ROW LEVEL SECURITY;

CREATE POLICY road_intersections_select ON road_intersections FOR SELECT USING (true);
CREATE POLICY road_intersections_write ON road_intersections FOR ALL USING (public.has_min_role(3));

CREATE POLICY road_intersection_roads_select ON road_intersection_roads FOR SELECT USING (true);
CREATE POLICY road_intersection_roads_write ON road_intersection_roads FOR ALL USING (public.has_min_role(3));

CREATE POLICY road_relationships_select ON road_relationships FOR SELECT USING (true);
CREATE POLICY road_relationships_write ON road_relationships FOR ALL USING (public.has_min_role(3));
