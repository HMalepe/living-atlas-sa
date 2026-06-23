import type { RoadDepthBundle, RoadDepthProfile } from "@/domain/road-detail";
import { ROAD_DEPTH_CLAIMS, getClaimsForRoad, getClaimForField } from "./claims";
import {
  ROAD_DEPTH_INTERSECTIONS,
  getIntersectionsForRoad,
  getIntersectionBySlug,
} from "./intersections";
import {
  ROAD_DEPTH_PARALLEL_EXPLANATIONS,
  getParallelExplanation,
} from "./parallel-explanations";
import {
  ROAD_DEPTH_RELATIONSHIPS,
  getRelationshipBetween,
  getRelationshipsForRoad,
} from "./relationships";
import { ROAD_DEPTH_SEGMENTS } from "./segments";
import { ROAD_DEPTH_SOURCES, resolveSources } from "./sources";
import { ROAD_DEPTH_TINY_DETAILS, getTinyDetailsForRoad } from "./tiny-details";
import { ROAD_DEPTH_TIMELINE, getTimelineForRoad } from "./timeline";

export const ROAD_DEPTH_BUNDLE: RoadDepthBundle = {
  claims: ROAD_DEPTH_CLAIMS,
  timeline: ROAD_DEPTH_TIMELINE,
  relationships: ROAD_DEPTH_RELATIONSHIPS,
  segments: ROAD_DEPTH_SEGMENTS,
  tinyDetails: ROAD_DEPTH_TINY_DETAILS,
  intersections: ROAD_DEPTH_INTERSECTIONS,
  parallelExplanations: ROAD_DEPTH_PARALLEL_EXPLANATIONS,
  sources: ROAD_DEPTH_SOURCES,
};

export function getRoadDepthProfile(roadSlug: string): RoadDepthProfile {
  const claims = getClaimsForRoad(roadSlug);
  const sourceIdSet = new Set<string>();

  for (const claim of claims) {
    for (const id of claim.sourceIds) sourceIdSet.add(id);
  }

  const timeline = getTimelineForRoad(roadSlug);
  for (const event of timeline) {
    for (const id of event.sourceIds) sourceIdSet.add(id);
  }

  const relationships = getRelationshipsForRoad(roadSlug);
  for (const rel of relationships) {
    for (const id of rel.sourceIds) sourceIdSet.add(id);
  }

  const segments = ROAD_DEPTH_SEGMENTS.filter((s) => s.roadSlug === roadSlug);
  for (const seg of segments) {
    for (const id of seg.sourceIds) sourceIdSet.add(id);
  }

  const tinyDetails = getTinyDetailsForRoad(roadSlug);
  for (const detail of tinyDetails) {
    for (const id of detail.sourceIds) sourceIdSet.add(id);
  }

  const intersections = getIntersectionsForRoad(roadSlug);
  for (const item of intersections) {
    for (const id of item.sourceIds) sourceIdSet.add(id);
  }

  return {
    roadSlug,
    claims,
    timeline,
    relationships,
    segments,
    tinyDetails,
    intersections,
    sources: resolveSources([...sourceIdSet]),
  };
}

export {
  getClaimsForRoad,
  getClaimForField,
  getIntersectionsForRoad,
  getIntersectionBySlug,
  getParallelExplanation,
  getRelationshipBetween,
  getRelationshipsForRoad,
  getTimelineForRoad,
  getTinyDetailsForRoad,
  resolveSources,
};

export { ROAD_DEPTH_INTERSECTIONS } from "./intersections";
