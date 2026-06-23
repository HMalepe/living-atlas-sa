import type { DepthClaim } from "@/domain/road-detail";

/** Editorial claims per road — no invented construction dates or costs. */
export const ROAD_DEPTH_CLAIMS: DepthClaim[] = [
  {
    id: "claim-m1-route",
    roadSlug: "m1",
    statement: "M1 is designated as a Johannesburg metropolitan freeway route.",
    fieldKey: "identity.route_number",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-metro-freeways"],
  },
  {
    id: "claim-m1-purpose",
    roadSlug: "m1",
    statement:
      "The M1 provides a major north–south metropolitan freeway corridor through Johannesburg, including the CBD.",
    fieldKey: "origin.purpose",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-transport-research"],
  },
  {
    id: "claim-m2-route",
    roadSlug: "m2",
    statement: "M2 is designated as a Johannesburg metropolitan freeway route.",
    fieldKey: "identity.route_number",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-metro-freeways"],
  },
  {
    id: "claim-m2-purpose",
    roadSlug: "m2",
    statement:
      "The M2 forms part of Johannesburg's eastern and southern metropolitan ring road system.",
    fieldKey: "origin.purpose",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-transport-research"],
  },
  {
    id: "claim-n1-route",
    roadSlug: "n1-johannesburg",
    statement: "N1 is a national route forming part of the Cape Town–Beit Bridge corridor.",
    fieldKey: "identity.route_number",
    confidence: "verified_official",
    status: "published",
    sourceIds: ["src-sanral-routes"],
  },
  {
    id: "claim-jan-smuts-corridor",
    roadSlug: "jan-smuts-avenue",
    statement:
      "Jan Smuts Avenue is a major north–south arterial linking Rosebank, Saxonwold, and Parktown North.",
    fieldKey: "origin.purpose",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-rosebank-uid"],
  },
  {
    id: "claim-louis-botha-corridor",
    roadSlug: "louis-botha-avenue",
    statement:
      "Louis Botha Avenue connects north-eastern inner-city areas with Orange Grove and Alexandra approaches.",
    fieldKey: "origin.purpose",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-alex-corridor"],
  },
  {
    id: "claim-oxford-corridor",
    roadSlug: "oxford-road",
    statement:
      "Oxford Road is an east–west corridor through Rosebank and Illovo commercial areas.",
    fieldKey: "origin.purpose",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-rosebank-uid"],
  },
  {
    id: "claim-rivonia-corridor",
    roadSlug: "rivonia-road",
    statement:
      "Rivonia Road is a north–south route through Sandton toward Rivonia.",
    fieldKey: "origin.purpose",
    confidence: "reported",
    status: "published",
    sourceIds: ["src-sandton-uid"],
  },
  {
    id: "claim-beyers-former-name",
    roadSlug: "beyers-naude-drive",
    statement: "The road was formerly officially named HF Verwoerd Drive.",
    fieldKey: "identity.former_name",
    confidence: "strongly_supported",
    status: "published",
    sourceIds: ["src-joburg-naming", "src-newspaper-renaming"],
  },
  {
    id: "claim-beyers-current-name",
    roadSlug: "beyers-naude-drive",
    statement: "The road is officially named Beyers Naudé Drive.",
    fieldKey: "identity.current_name",
    confidence: "strongly_supported",
    status: "published",
    sourceIds: ["src-joburg-naming"],
  },
  {
    id: "claim-winnie-former-name",
    roadSlug: "winnie-mandela-drive",
    statement: "The road was formerly officially named William Nicol Drive.",
    fieldKey: "identity.former_name",
    confidence: "strongly_supported",
    status: "published",
    sourceIds: ["src-joburg-naming", "src-newspaper-renaming"],
  },
  {
    id: "claim-winnie-current-name",
    roadSlug: "winnie-mandela-drive",
    statement: "The road is officially named Winnie Mandela Drive.",
    fieldKey: "identity.current_name",
    confidence: "strongly_supported",
    status: "published",
    sourceIds: ["src-joburg-naming"],
  },
  {
    id: "claim-main-reef-association",
    roadSlug: "main-reef-road",
    statement:
      "Main Reef Road is associated with the Witwatersrand gold reef and Johannesburg's mining belt.",
    fieldKey: "origin.purpose",
    confidence: "supported",
    status: "published",
    sourceIds: ["src-wits-mining-geo"],
  },
];

export function getClaimsForRoad(roadSlug: string): DepthClaim[] {
  return ROAD_DEPTH_CLAIMS.filter((claim) => claim.roadSlug === roadSlug);
}

export function getClaimForField(
  roadSlug: string,
  fieldKey: string,
): DepthClaim | undefined {
  return ROAD_DEPTH_CLAIMS.find(
    (claim) =>
      claim.roadSlug === roadSlug &&
      claim.fieldKey === fieldKey &&
      claim.status === "published",
  );
}
