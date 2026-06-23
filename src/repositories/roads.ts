import {
  JOHANNESBURG_MVP_ROADS,
  filterRoadsByBbox,
  getRoadBySlug,
  roadsToGeoJSON,
  roadsToSummaries,
  type RoadDefinition,
  type RoadSummary,
} from "@/data/roads/johannesburg-mvp";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

/** MVP road list — sourced from verified catalogue (static until DB seed is applied). */
export async function listRoads(): Promise<RoadSummary[]> {
  return roadsToSummaries(JOHANNESBURG_MVP_ROADS);
}

export async function getRoadGeoJSON(bbox: {
  west: number;
  south: number;
  east: number;
  north: number;
}): Promise<GeoJSON.FeatureCollection> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.rpc("roads_in_bbox", {
        min_lng: bbox.west,
        min_lat: bbox.south,
        max_lng: bbox.east,
        max_lat: bbox.north,
        max_results: 50,
      });

      if (!error && data?.length) {
        return {
          type: "FeatureCollection",
          features: data.map(
            (row: {
              slug: string;
              title: string;
              primary_route_number: string | null;
              geojson: GeoJSON.Geometry;
            }) => ({
              type: "Feature" as const,
              id: row.slug,
              properties: {
                slug: row.slug,
                title: row.title,
                routeNumber: row.primary_route_number,
                currentName: row.title,
              },
              geometry: row.geojson,
            }),
          ),
        };
      }
    } catch {
      // Use static catalogue when Supabase is unavailable
    }
  }

  const roads = filterRoadsByBbox(JOHANNESBURG_MVP_ROADS, bbox);
  return roadsToGeoJSON(roads);
}

export async function getRoadBySlugFromStore(
  slug: string,
): Promise<RoadDefinition | null> {
  return getRoadBySlug(slug) ?? null;
}
