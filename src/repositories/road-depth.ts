import {
  getRoadDepthProfile,
  getParallelExplanation,
  getRelationshipBetween,
  ROAD_DEPTH_BUNDLE,
  getIntersectionBySlug,
} from "@/data/roads/road-depth";
import type { RoadDepthProfile } from "@/domain/road-detail";

export async function getRoadDepthFromStore(
  roadSlug: string,
): Promise<RoadDepthProfile | null> {
  try {
    // Future: Supabase depth queries when configured
    return getRoadDepthProfile(roadSlug);
  } catch {
    return getRoadDepthProfile(roadSlug);
  }
}

export function getCompareContext(slugA: string, slugB: string) {
  return {
    relationships: getRelationshipBetween(slugA, slugB),
    parallelExplanation: getParallelExplanation(slugA, slugB),
  };
}

export function getDepthBundleStats() {
  return {
    sources: ROAD_DEPTH_BUNDLE.sources.length,
    segments: ROAD_DEPTH_BUNDLE.segments.length,
    intersections: ROAD_DEPTH_BUNDLE.intersections.length,
    relationships: ROAD_DEPTH_BUNDLE.relationships.length,
    timelineEvents: ROAD_DEPTH_BUNDLE.timeline.length,
    claims: ROAD_DEPTH_BUNDLE.claims.length,
    tinyDetails: ROAD_DEPTH_BUNDLE.tinyDetails.length,
  };
}

export { getIntersectionBySlug };
