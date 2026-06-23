import type { ParallelExplanation } from "@/domain/road-detail";

export const ROAD_DEPTH_PARALLEL_EXPLANATIONS: ParallelExplanation[] = [
  {
    id: "parallel-m1-m2",
    roadSlugs: ["m1", "m2"],
    title: "Why do the M1 and M2 run parallel through Johannesburg?",
    body:
      "Johannesburg's metropolitan freeway system split through-traffic into complementary corridors. " +
      "The M1 carries a north–south route through the CBD and western suburbs, while the M2 forms an eastern " +
      "and southern ring that relieves pressure on the central corridor. They are not duplicates — they serve " +
      "different origin–destination patterns and connect at interchanges such as Crown. Exact construction " +
      "sequencing and engineering rationale require further archival research.",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-transport-research", "src-metro-freeways"],
  },
  {
    id: "parallel-winnie-rivonia",
    roadSlugs: ["winnie-mandela-drive", "rivonia-road"],
    title: "Why do Winnie Mandela Drive and Rivonia Road feel like parallel corridors?",
    body:
      "Both routes serve north–south movement in Johannesburg's northern suburbs, but they anchor different " +
      "commercial and residential nodes — Bryanston and Sandton respectively. Their roughly parallel alignment " +
      "reflects suburban grid expansion rather than a single engineered dual-carriageway design.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-bryanston-planning", "src-sandton-uid"],
  },
  {
    id: "parallel-beyers-n1",
    roadSlugs: ["beyers-naude-drive", "n1-johannesburg"],
    title: "Why does Beyers Naudé Drive run near the N1?",
    body:
      "The western metropolitan area places major arterials close to the N1 national corridor. Beyers Naudé Drive " +
      "serves local western suburbs while the N1 carries long-distance traffic — their proximity reflects " +
      "layered road hierarchy rather than redundancy.",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-joburg-gis", "src-sanral-routes"],
  },
];

export function getParallelExplanation(
  slugA: string,
  slugB: string,
): ParallelExplanation | undefined {
  const sorted = [slugA, slugB].sort();
  return ROAD_DEPTH_PARALLEL_EXPLANATIONS.find(
    (item) =>
      item.roadSlugs[0] === sorted[0] && item.roadSlugs[1] === sorted[1],
  );
}
