import { describe, expect, it } from "vitest";
import {
  ROAD_DEPTH_BUNDLE,
  getRoadDepthProfile,
  getParallelExplanation,
} from "@/data/roads/road-depth";
import { getDepthBundleStats } from "@/repositories/road-depth";
import { confidenceMeta } from "@/domain/confidence-labels";

describe("road depth data", () => {
  it("meets MVP minimum data targets", () => {
    const stats = getDepthBundleStats();
    expect(stats.sources).toBeGreaterThanOrEqual(20);
    expect(stats.segments).toBeGreaterThanOrEqual(20);
    expect(stats.intersections).toBeGreaterThanOrEqual(15);
    expect(stats.relationships).toBeGreaterThanOrEqual(20);
    expect(stats.timelineEvents).toBeGreaterThanOrEqual(30);
    expect(stats.claims).toBeGreaterThanOrEqual(10);
    expect(stats.tinyDetails).toBeGreaterThanOrEqual(10);
  });

  it("resolves depth profile for each MVP road", () => {
    const slugs = [
      "m1",
      "m2",
      "n1-johannesburg",
      "jan-smuts-avenue",
      "louis-botha-avenue",
      "oxford-road",
      "rivonia-road",
      "beyers-naude-drive",
      "winnie-mandela-drive",
      "main-reef-road",
    ];

    for (const slug of slugs) {
      const profile = getRoadDepthProfile(slug);
      expect(profile.roadSlug).toBe(slug);
      expect(profile.segments.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("provides M1/M2 parallel explanation", () => {
    const explanation = getParallelExplanation("m1", "m2");
    expect(explanation).toBeDefined();
    expect(explanation?.title).toMatch(/parallel/i);
    expect(explanation?.confidence).toBe("supported");
  });

  it("uses valid confidence levels throughout", () => {
    for (const claim of ROAD_DEPTH_BUNDLE.claims) {
      expect(confidenceMeta(claim.confidence).label).toBeTruthy();
    }
  });
});
