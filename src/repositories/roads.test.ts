import { describe, expect, it } from "vitest";
import { JOHANNESBURG_BBOX } from "@/data/roads/johannesburg-mvp";
import { getRoadGeoJSON } from "@/repositories/roads";
import { searchRoads } from "@/repositories/search";

describe("roads repository", () => {
  it("returns GeoJSON for all MVP roads", async () => {
    const geojson = await getRoadGeoJSON(JOHANNESBURG_BBOX);
    expect(geojson.type).toBe("FeatureCollection");
    expect(geojson.features).toHaveLength(10);
  });
});

describe("search repository", () => {
  it("finds roads by former name", async () => {
    const results = await searchRoads("William Nicol");
    expect(results.some((r) => r.slug === "winnie-mandela-drive")).toBe(true);
  });

  it("finds roads by route number", async () => {
    const results = await searchRoads("M1");
    expect(results.some((r) => r.slug === "m1")).toBe(true);
  });
});
