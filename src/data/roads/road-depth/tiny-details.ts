import type { TinyDetail } from "@/domain/road-detail";

/** Observational tiny details — marked reported/sample where not independently verified. */
export const ROAD_DEPTH_TINY_DETAILS: TinyDetail[] = [
  {
    id: "tiny-m1-deck",
    roadSlug: "m1",
    title: "Elevated sections near the CBD",
    body:
      "Parts of the M1 include elevated viaduct structures through the central business district — " +
      "notice how the road rises above surface streets rather than cutting at grade.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-m2-gilloolys-signage",
    roadSlug: "m2",
    title: "Gillooly's directional signage cluster",
    body:
      "Approaching Gillooly's, signage density increases sharply as the M2, N3, and R24 routes diverge — " +
      "a visual cue to the interchange's complexity.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-n1-route-markers",
    roadSlug: "n1-johannesburg",
    title: "National route marker shields",
    body:
      "Look for the N1 national route marker — a different designation system from metropolitan M-routes.",
    confidence: "verified_official",
    status: "published",
    sourceIds: ["src-sanral-routes"],
  },
  {
    id: "tiny-jan-smuts-canopy",
    roadSlug: "jan-smuts-avenue",
    title: "Tree canopy in Saxonwold",
    body:
      "Sections of Jan Smuts Avenue pass through established tree canopy in Saxonwold — the road width " +
      "narrows visually even when lane count stays constant.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-louis-botha-grade",
    roadSlug: "louis-botha-avenue",
    title: "Grade changes toward Alexandra",
    body:
      "Louis Botha Avenue undulates as it climbs toward north-eastern suburbs — elevation shifts are " +
      "noticeable compared to flat freeway sections.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-oxford-medians",
    roadSlug: "oxford-road",
    title: "Landscaped medians in Rosebank",
    body:
      "Oxford Road through Rosebank often features landscaped central medians — a suburban arterial treatment " +
      "distinct from freeway design.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-rivonia-sandton-rise",
    roadSlug: "rivonia-road",
    title: "Sandton skyline reveal",
    body:
      "Driving north on Rivonia Road, the Sandton skyline becomes visible before you reach the commercial core — " +
      "a landmark orientation cue.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-survey-observation"],
  },
  {
    id: "tiny-beyers-renamed-signs",
    roadSlug: "beyers-naude-drive",
    title: "Legacy signage remnants",
    body:
      "Some side streets and older maps may still reference the former HF Verwoerd Drive name — " +
      "watch for dual naming in unofficial contexts.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-newspaper-renaming"],
  },
  {
    id: "tiny-winnie-renamed-signs",
    roadSlug: "winnie-mandela-drive",
    title: "William Nicol name persistence",
    body:
      "Businesses and older signage along the corridor sometimes still use 'William Nicol' — " +
      "official street signs show Winnie Mandela Drive.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-newspaper-renaming"],
  },
  {
    id: "tiny-main-reef-mine-headgear",
    roadSlug: "main-reef-road",
    title: "Mine headgear silhouettes",
    body:
      "Along parts of Main Reef Road, disused or heritage mine headgear structures may be visible — " +
      "reminders of the Witwatersrand gold reef.",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-wits-mining-geo", "src-sahra-heritage"],
  },
];

export function getTinyDetailsForRoad(roadSlug: string): TinyDetail[] {
  return ROAD_DEPTH_TINY_DETAILS.filter((detail) => detail.roadSlug === roadSlug);
}
