import { describe, expect, it } from "vitest";
import {
  JOHANNESBURG_MVP_ROADS,
  searchRoadsLocal,
  getRoadBySlug,
} from "@/data/roads/johannesburg-mvp";

describe("johannesburg-mvp roads", () => {
  it("includes 10 MVP roads", () => {
    expect(JOHANNESBURG_MVP_ROADS).toHaveLength(10);
  });

  it("finds road by slug", () => {
    expect(getRoadBySlug("m1")?.title).toBe("M1");
  });

  it("searches by current name", () => {
    const results = searchRoadsLocal("Jan Smuts");
    expect(results.some((r) => r.slug === "jan-smuts-avenue")).toBe(true);
    expect(results[0]?.matchField).toBe("title");
  });

  it("searches by former name with explanation", () => {
    const results = searchRoadsLocal("William Nicol");
    expect(results.some((r) => r.slug === "winnie-mandela-drive")).toBe(true);
    const match = results.find((r) => r.slug === "winnie-mandela-drive");
    expect(match?.matchReason).toContain("Formerly William Nicol Drive");
    expect(match?.matchField).toBe("former_name");
  });

  it("searches by route number", () => {
    const results = searchRoadsLocal("M2");
    expect(results.some((r) => r.slug === "m2")).toBe(true);
  });

  it("returns empty for blank query", () => {
    expect(searchRoadsLocal("")).toEqual([]);
    expect(searchRoadsLocal("   ")).toEqual([]);
  });
});
