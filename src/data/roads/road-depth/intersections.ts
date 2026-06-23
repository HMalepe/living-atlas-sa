import type { IntersectionDefinition } from "@/domain/road-detail";

/** MVP minimum: 15 major Johannesburg intersections. */
export const ROAD_DEPTH_INTERSECTIONS: IntersectionDefinition[] = [
  {
    slug: "gilloolys-interchange",
    title: "Gillooly's Interchange",
    summary:
      "Major eastern interchange where the M2, N3, and R24 corridors converge east of Johannesburg.",
    localNickname: "Gillooly's",
    roadSlugs: ["m2"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-engineering-gilloolys", "src-n3-corridor"],
  },
  {
    slug: "buccleuch-n1-m1",
    title: "Buccleuch Interchange (N1 / M1)",
    summary:
      "Northern metropolitan interchange connecting National Route 1 with the M1 freeway.",
    roadSlugs: ["n1-johannesburg", "m1"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-sanral-routes", "src-metro-freeways"],
  },
  {
    slug: "grayston-m1",
    title: "Grayston Drive / M1 Interchange",
    summary:
      "Sandton-area interchange linking Grayston Drive with the M1 metropolitan freeway.",
    roadSlugs: ["m1", "rivonia-road"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-sandton-uid", "src-metro-freeways"],
  },
  {
    slug: "oxford-rivonia",
    title: "Oxford Road & Rivonia Road",
    summary:
      "Major northern suburban crossing of two commercial arterials in Rosebank / Illovo.",
    roadSlugs: ["oxford-road", "rivonia-road"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-rosebank-uid", "src-sandton-uid"],
  },
  {
    slug: "jan-smuts-oxford",
    title: "Jan Smuts Avenue & Oxford Road",
    summary:
      "Rosebank junction where north–south and east–west arterials meet.",
    roadSlugs: ["jan-smuts-avenue", "oxford-road"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-rosebank-uid"],
  },
  {
    slug: "winnie-mandela-rivonia",
    title: "Winnie Mandela Drive & Rivonia Road",
    summary:
      "Northern suburban crossing linking Bryanston approaches with Sandton.",
    roadSlugs: ["winnie-mandela-drive", "rivonia-road"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-bryanston-planning", "src-sandton-uid"],
  },
  {
    slug: "louis-botha-m1",
    title: "Louis Botha Avenue / M1 approaches",
    summary:
      "Eastern corridor where Louis Botha Avenue approaches the M1 freeway system.",
    roadSlugs: ["louis-botha-avenue", "m1"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-alex-corridor", "src-metro-freeways"],
  },
  {
    slug: "main-reef-n1",
    title: "Main Reef Road & N1 crossing area",
    summary:
      "Western metropolitan area where the mining-belt route crosses the N1 corridor.",
    roadSlugs: ["main-reef-road", "n1-johannesburg"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-wits-mining-geo", "src-sanral-routes"],
  },
  {
    slug: "marlboro-m1",
    title: "Marlboro Drive / M1 Interchange",
    summary:
      "Northern interchange connecting Marlboro Drive with the M1.",
    roadSlugs: ["m1", "rivonia-road"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-metro-freeways"],
  },
  {
    slug: "eleanor-m1",
    title: "Eleanor Cross / M1 area",
    summary:
      "Northern metropolitan junction area along the M1 corridor.",
    roadSlugs: ["m1"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-metro-freeways"],
  },
  {
    slug: "crown-m1",
    title: "Crown Interchange (M1 / M2)",
    summary:
      "Central interchange where the M1 and M2 freeway systems connect near the CBD.",
    roadSlugs: ["m1", "m2"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-metro-freeways", "src-transport-research"],
  },
  {
    slug: "beyers-naude-n1",
    title: "Beyers Naudé Drive & N1 western crossing",
    summary:
      "Western metropolitan area where Beyers Naudé Drive approaches the N1 corridor.",
    roadSlugs: ["beyers-naude-drive", "n1-johannesburg"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-joburg-gis", "src-sanral-routes"],
  },
  {
    slug: "sandton-central",
    title: "Sandton Central interchange cluster",
    summary:
      "Dense interchange and crossing cluster at the heart of Sandton's road network.",
    roadSlugs: ["rivonia-road", "m1"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-sandton-uid"],
  },
  {
    slug: "n1-n3-buccleuch",
    title: "Buccleuch N1 / N3 interchange",
    summary:
      "Northern ring interchange where the N1 and N3 national routes meet.",
    roadSlugs: ["n1-johannesburg"],
    status: "published",
    confidence: "supported",
    sourceIds: ["src-sanral-routes", "src-n3-corridor"],
  },
  {
    slug: "jan-smuts-louis-botha",
    title: "Jan Smuts Avenue & Louis Botha Avenue approaches",
    summary:
      "Northern and eastern arterial approaches in the Parktown / Houghton area.",
    roadSlugs: ["jan-smuts-avenue", "louis-botha-avenue"],
    status: "published",
    confidence: "reported",
    sourceIds: ["src-joburg-sdf"],
  },
];

export function getIntersectionBySlug(
  slug: string,
): IntersectionDefinition | undefined {
  return ROAD_DEPTH_INTERSECTIONS.find((item) => item.slug === slug);
}

export function getIntersectionsForRoad(
  roadSlug: string,
): IntersectionDefinition[] {
  return ROAD_DEPTH_INTERSECTIONS.filter((item) =>
    item.roadSlugs.includes(roadSlug),
  );
}
