import type { DepthSource } from "@/domain/road-detail";

/** Editorial source registry — MVP minimum 20 sources. */
export const ROAD_DEPTH_SOURCES: DepthSource[] = [
  {
    id: "src-sanral-routes",
    category: "official_dataset",
    title: "SANRAL national route designation records",
    authority: "South African National Roads Agency SOC Ltd",
    notes: "Route numbering for national roads including N1.",
  },
  {
    id: "src-gauteng-roads",
    category: "institutional_website",
    title: "Gauteng provincial roads and transport publications",
    authority: "Gauteng Department of Roads and Transport",
  },
  {
    id: "src-joburg-gis",
    category: "official_dataset",
    title: "City of Johannesburg geographic information services",
    authority: "City of Johannesburg",
    notes: "Street centreline and naming datasets.",
  },
  {
    id: "src-joburg-naming",
    category: "municipal_minutes",
    title: "City of Johannesburg street naming committee records",
    authority: "City of Johannesburg",
    notes: "Official renaming proceedings for metropolitan streets.",
  },
  {
    id: "src-metro-freeways",
    category: "official_dataset",
    title: "Johannesburg metropolitan freeway designation (M1, M2)",
    authority: "City of Johannesburg / Gauteng provincial records",
    notes: "Metropolitan route numbers for urban freeways.",
  },
  {
    id: "src-joburg-sdf",
    category: "institutional_website",
    title: "Johannesburg spatial development framework",
    authority: "City of Johannesburg",
    notes: "Corridor and arterial hierarchy references.",
  },
  {
    id: "src-wits-mining-geo",
    category: "academic_source",
    title: "Witwatersrand gold reef geography studies",
    authority: "University of the Witwatersrand",
    notes: "Academic treatment of the Main Reef and mining belt.",
  },
  {
    id: "src-sahra-heritage",
    category: "institutional_website",
    title: "South African Heritage Resources Agency",
    authority: "SAHRA",
    notes: "Heritage context for mining-era landscapes.",
  },
  {
    id: "src-historical-joburg-maps",
    category: "historical_map",
    title: "Historical Johannesburg street and transport maps",
    authority: "Municipal and provincial archives",
    notes: "Archival cartography for street alignments.",
  },
  {
    id: "src-sandton-uid",
    category: "institutional_website",
    title: "Sandton urban improvement district planning references",
    authority: "Sandton Central Management District",
  },
  {
    id: "src-rosebank-uid",
    category: "institutional_website",
    title: "Rosebank urban improvement district corridor notes",
    authority: "Rosebank Management District",
  },
  {
    id: "src-n3-corridor",
    category: "official_dataset",
    title: "N3 corridor route documentation",
    authority: "N3 Toll Concession / provincial records",
    notes: "Eastern ring corridor including Gillooly's interchange area.",
  },
  {
    id: "src-transport-research",
    category: "research_paper",
    title: "Johannesburg metropolitan freeway network analysis",
    author: "Transport research literature",
    notes: "Academic and policy literature on Joburg freeway layout.",
  },
  {
    id: "src-engineering-gilloolys",
    category: "engineering_report",
    title: "Gillooly's interchange engineering documentation",
    authority: "Provincial roads authority",
    notes: "Interchange geometry and connecting routes.",
  },
  {
    id: "src-newspaper-renaming",
    category: "newspaper",
    title: "Contemporary press coverage of Johannesburg street renamings",
    notes: "Reported public record of renaming decisions.",
  },
  {
    id: "src-alex-corridor",
    category: "institutional_website",
    title: "Alexandra corridor planning documents",
    authority: "City of Johannesburg",
    notes: "Louis Botha Avenue corridor references.",
  },
  {
    id: "src-bryanston-planning",
    category: "archival_record",
    title: "Northern suburbs arterial planning records",
    authority: "City of Johannesburg",
    notes: "William Nicol / Winnie Mandela Drive corridor context.",
  },
  {
    id: "src-main-reef-oral",
    category: "oral_history",
    title: "Recorded accounts from mining-belt communities",
    notes: "Oral history placeholder — sample tier, not independently verified.",
  },
  {
    id: "src-community-north",
    category: "community_submission",
    title: "Northern suburbs community memory submissions",
    notes: "Sample community memory — unpublished editorial review pending.",
  },
  {
    id: "src-survey-observation",
    category: "engineering_report",
    title: "Field observation notes (Living Atlas editorial)",
    notes: "Observational notes for tiny details; geometry approximate.",
  },
];

export const ROAD_DEPTH_SOURCE_MAP = new Map(
  ROAD_DEPTH_SOURCES.map((source) => [source.id, source]),
);

export function getSourceById(id: string): DepthSource | undefined {
  return ROAD_DEPTH_SOURCE_MAP.get(id);
}

export function resolveSources(ids: string[]): DepthSource[] {
  return ids
    .map((id) => ROAD_DEPTH_SOURCE_MAP.get(id))
    .filter((source): source is DepthSource => source !== undefined);
}
