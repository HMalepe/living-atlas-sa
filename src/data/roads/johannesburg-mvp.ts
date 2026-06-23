import type { PublicationStatus, SeedDataTier } from "@/domain/enums";

export type RoadLineString = {
  type: "LineString";
  coordinates: [number, number][];
};

export interface RoadDefinition {
  slug: string;
  title: string;
  summary: string;
  primaryRouteNumber: string | null;
  currentName: string;
  formerNames: { name: string; note?: string }[];
  routeNumbers: string[];
  status: PublicationStatus;
  seedTier: SeedDataTier;
  geometry: RoadLineString;
}

/** Johannesburg metropolitan bounding box for map constraints */
export const JOHANNESBURG_BBOX = {
  west: 27.85,
  south: -26.35,
  east: 28.2,
  north: -26.05,
} as const;

export const JOHANNESBURG_CENTER: [number, number] = [28.0473, -26.2041];

/**
 * MVP road catalogue — simplified placeholder geometries for map UX.
 * seed_tier: development_sample until surveyed geometry is imported.
 * No construction dates, costs, or historical claims are asserted here.
 */
export const JOHANNESBURG_MVP_ROADS: RoadDefinition[] = [
  {
    slug: "m1",
    title: "M1",
    summary:
      "Major north–south metropolitan freeway through Johannesburg, linking southern and northern suburbs via the CBD.",
    primaryRouteNumber: "M1",
    currentName: "M1",
    formerNames: [],
    routeNumbers: ["M1"],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [27.98, -26.28],
        [28.02, -26.24],
        [28.04, -26.21],
        [28.05, -26.17],
        [28.06, -26.12],
      ],
    },
  },
  {
    slug: "m2",
    title: "M2",
    summary:
      "Metropolitan freeway forming part of Johannesburg's eastern and southern ring road system.",
    primaryRouteNumber: "M2",
    currentName: "M2",
    formerNames: [],
    routeNumbers: ["M2"],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [27.96, -26.26],
        [28.02, -26.24],
        [28.08, -26.23],
        [28.14, -26.22],
        [28.18, -26.21],
      ],
    },
  },
  {
    slug: "n1-johannesburg",
    title: "N1 (Johannesburg section)",
    summary:
      "National Route 1 where it passes through the Johannesburg area, part of the Cape Town–Beit Bridge corridor.",
    primaryRouteNumber: "N1",
    currentName: "N1",
    formerNames: [],
    routeNumbers: ["N1"],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [27.88, -26.15],
        [27.92, -26.19],
        [27.95, -26.23],
        [27.98, -26.28],
        [28.0, -26.32],
      ],
    },
  },
  {
    slug: "jan-smuts-avenue",
    title: "Jan Smuts Avenue",
    summary:
      "Major north–south arterial linking Rosebank, Saxonwold, and Parktown North.",
    primaryRouteNumber: null,
    currentName: "Jan Smuts Avenue",
    formerNames: [],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [28.03, -26.15],
        [28.04, -26.18],
        [28.045, -26.21],
        [28.05, -26.24],
      ],
    },
  },
  {
    slug: "louis-botha-avenue",
    title: "Louis Botha Avenue",
    summary:
      "North-eastern arterial connecting Hillbrow, Orange Grove, and Alexandra approaches.",
    primaryRouteNumber: null,
    currentName: "Louis Botha Avenue",
    formerNames: [],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [28.05, -26.18],
        [28.06, -26.2],
        [28.07, -26.22],
        [28.08, -26.24],
      ],
    },
  },
  {
    slug: "oxford-road",
    title: "Oxford Road",
    summary:
      "East–west corridor through Rosebank and Illovo, a major commercial and residential spine.",
    primaryRouteNumber: null,
    currentName: "Oxford Road",
    formerNames: [],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [28.02, -26.14],
        [28.04, -26.145],
        [28.06, -26.15],
        [28.08, -26.155],
      ],
    },
  },
  {
    slug: "rivonia-road",
    title: "Rivonia Road",
    summary:
      "North–south route through Sandton and toward Rivonia, a key northern suburban connector.",
    primaryRouteNumber: null,
    currentName: "Rivonia Road",
    formerNames: [],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [28.05, -26.1],
        [28.055, -26.13],
        [28.06, -26.16],
        [28.065, -26.19],
      ],
    },
  },
  {
    slug: "beyers-naude-drive",
    title: "Beyers Naudé Drive",
    summary:
      "Western Johannesburg arterial; renamed from HF Verwoerd Drive.",
    primaryRouteNumber: null,
    currentName: "Beyers Naudé Drive",
    formerNames: [
      {
        name: "HF Verwoerd Drive",
        note: "Former official name",
      },
    ],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [27.92, -26.18],
        [27.95, -26.2],
        [27.98, -26.22],
        [28.0, -26.24],
      ],
    },
  },
  {
    slug: "winnie-mandela-drive",
    title: "Winnie Mandela Drive",
    summary:
      "Northern suburban arterial through Bryanston; renamed from William Nicol Drive.",
    primaryRouteNumber: null,
    currentName: "Winnie Mandela Drive",
    formerNames: [
      {
        name: "William Nicol Drive",
        note: "Former official name",
      },
    ],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [28.0, -26.1],
        [28.02, -26.12],
        [28.04, -26.14],
        [28.06, -26.16],
      ],
    },
  },
  {
    slug: "main-reef-road",
    title: "Main Reef Road",
    summary:
      "Historic route along the Witwatersrand gold reef, associated with Johannesburg's mining belt.",
    primaryRouteNumber: null,
    currentName: "Main Reef Road",
    formerNames: [],
    routeNumbers: [],
    status: "published",
    seedTier: "development_sample",
    geometry: {
      type: "LineString",
      coordinates: [
        [27.9, -26.22],
        [27.94, -26.23],
        [27.98, -26.24],
        [28.02, -26.25],
        [28.06, -26.26],
      ],
    },
  },
];

export interface RoadSummary extends Omit<RoadDefinition, "geometry"> {
  id: string;
}

export interface SearchResult {
  slug: string;
  title: string;
  currentName: string;
  matchReason: string;
  matchField: "title" | "current_name" | "former_name" | "route_number";
  formerName?: string;
  seedTier: SeedDataTier;
}

export function roadsToSummaries(
  roads: RoadDefinition[],
): RoadSummary[] {
  return roads.map((road) => ({
    id: road.slug,
    slug: road.slug,
    title: road.title,
    summary: road.summary,
    primaryRouteNumber: road.primaryRouteNumber,
    currentName: road.currentName,
    formerNames: road.formerNames,
    routeNumbers: road.routeNumbers,
    status: road.status,
    seedTier: road.seedTier,
  }));
}

export function roadsToGeoJSON(
  roads: RoadDefinition[],
): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: roads.map((road) => ({
      type: "Feature",
      id: road.slug,
      properties: {
        slug: road.slug,
        title: road.title,
        routeNumber: road.primaryRouteNumber,
        currentName: road.currentName,
      },
      geometry: road.geometry,
    })),
  };
}

export function searchRoadsLocal(
  query: string,
  limit = 20,
): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const road of JOHANNESBURG_MVP_ROADS) {
    if (road.title.toLowerCase().includes(q)) {
      results.push({
        slug: road.slug,
        title: road.title,
        currentName: road.currentName,
        matchReason: `Matched road name "${road.title}"`,
        matchField: "title",
        seedTier: road.seedTier,
      });
      continue;
    }

    if (road.currentName.toLowerCase().includes(q)) {
      results.push({
        slug: road.slug,
        title: road.title,
        currentName: road.currentName,
        matchReason: `Matched current name "${road.currentName}"`,
        matchField: "current_name",
        seedTier: road.seedTier,
      });
      continue;
    }

    for (const former of road.formerNames) {
      if (former.name.toLowerCase().includes(q)) {
        results.push({
          slug: road.slug,
          title: road.title,
          currentName: road.currentName,
          matchReason: `Formerly ${former.name}`,
          matchField: "former_name",
          formerName: former.name,
          seedTier: road.seedTier,
        });
        break;
      }
    }

    if (results.some((r) => r.slug === road.slug)) continue;

    for (const route of road.routeNumbers) {
      if (route.toLowerCase().includes(q)) {
        results.push({
          slug: road.slug,
          title: road.title,
          currentName: road.currentName,
          matchReason: `Matched route number ${route}`,
          matchField: "route_number",
          seedTier: road.seedTier,
        });
        break;
      }
    }
  }

  return results.slice(0, limit);
}

export function getRoadBySlug(slug: string): RoadDefinition | undefined {
  return JOHANNESBURG_MVP_ROADS.find((r) => r.slug === slug);
}

export function filterRoadsByBbox(
  roads: RoadDefinition[],
  bbox: { west: number; south: number; east: number; north: number },
): RoadDefinition[] {
  return roads.filter((road) =>
    road.geometry.coordinates.some(
      ([lng, lat]) =>
        lng >= bbox.west &&
        lng <= bbox.east &&
        lat >= bbox.south &&
        lat <= bbox.north,
    ),
  );
}

/** Confidence label for seed tier display */
export function seedTierLabel(tier: SeedDataTier): string {
  switch (tier) {
    case "verified":
      return "Verified data";
    case "development_sample":
      return "Sample data — geometry approximate";
    case "placeholder":
      return "Placeholder";
    default:
      return "Unknown";
  }
}
