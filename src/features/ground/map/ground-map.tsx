"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GeoJSONSource, MapLayerMouseEvent, Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { JOHANNESBURG_BBOX, JOHANNESBURG_CENTER } from "@/data/roads/johannesburg-mvp";
import { cn } from "@/lib/utils";

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const ROADS_SOURCE = "roads";
const ROADS_LAYER = "roads-line";
const ROADS_SELECTED_LAYER = "roads-selected";

export type RoadFeatureProperties = {
  slug: string;
  title: string;
  routeNumber: string | null;
  currentName: string;
};

type GroundMapProps = {
  selectedSlug?: string | null;
  onRoadSelect?: (properties: RoadFeatureProperties | null) => void;
  className?: string;
};

export function GroundMap({
  selectedSlug,
  onRoadSelect,
  className,
}: GroundMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const fetchAndLoadRoads = useCallback(async (map: MapLibreMap) => {
    const params = new URLSearchParams({
      west: String(JOHANNESBURG_BBOX.west),
      south: String(JOHANNESBURG_BBOX.south),
      east: String(JOHANNESBURG_BBOX.east),
      north: String(JOHANNESBURG_BBOX.north),
    });

    const response = await fetch(`/api/ground/roads?${params}`);
    if (!response.ok) {
      throw new Error("Failed to load roads");
    }

    const geojson = await response.json();

    if (map.getSource(ROADS_SOURCE)) {
      (map.getSource(ROADS_SOURCE) as GeoJSONSource).setData(geojson);
      return;
    }

    map.addSource(ROADS_SOURCE, { type: "geojson", data: geojson });

    map.addLayer({
      id: ROADS_LAYER,
      type: "line",
      source: ROADS_SOURCE,
      paint: {
        "line-color": [
          "case",
          ["==", ["get", "slug"], selectedSlug ?? ""],
          "#a65d3f",
          "#2a2a28",
        ],
        "line-width": [
          "case",
          ["==", ["get", "slug"], selectedSlug ?? ""],
          6,
          4,
        ],
        "line-opacity": 0.85,
      },
    });

    map.addLayer({
      id: ROADS_SELECTED_LAYER,
      type: "line",
      source: ROADS_SOURCE,
      filter: ["==", ["get", "slug"], selectedSlug ?? ""],
      paint: {
        "line-color": "#a65d3f",
        "line-width": 8,
        "line-blur": 2,
        "line-opacity": 0.5,
      },
    });
  }, [selectedSlug]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    async function initMap() {
      const maplibregl = (await import("maplibre-gl")).default;

      if (cancelled || !containerRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: MAP_STYLE,
        center: JOHANNESBURG_CENTER,
        zoom: 11,
        maxBounds: [
          [JOHANNESBURG_BBOX.west, JOHANNESBURG_BBOX.south],
          [JOHANNESBURG_BBOX.east, JOHANNESBURG_BBOX.north],
        ],
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");
      mapRef.current = map;

      map.on("load", async () => {
        try {
          await fetchAndLoadRoads(map);
          setMapReady(true);
        } catch {
          setLoadError("Could not load road network.");
        }
      });

      map.on("click", ROADS_LAYER, (event: MapLayerMouseEvent) => {
        const feature = event.features?.[0];
        if (!feature?.properties) return;

        const props = feature.properties as RoadFeatureProperties;
        onRoadSelect?.({
          slug: props.slug,
          title: props.title,
          routeNumber: props.routeNumber ?? null,
          currentName: props.currentName ?? props.title,
        });

        map.setFilter(ROADS_SELECTED_LAYER, ["==", ["get", "slug"], props.slug]);
        map.setPaintProperty(ROADS_LAYER, "line-color", [
          "case",
          ["==", ["get", "slug"], props.slug],
          "#a65d3f",
          "#2a2a28",
        ]);
        map.setPaintProperty(ROADS_LAYER, "line-width", [
          "case",
          ["==", ["get", "slug"], props.slug],
          6,
          4,
        ]);
      });

      map.on("mouseenter", ROADS_LAYER, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", ROADS_LAYER, () => {
        map.getCanvas().style.cursor = "";
      });
    }

    initMap().catch(() => setLoadError("Map failed to initialise."));

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [fetchAndLoadRoads, onRoadSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    if (map.getLayer(ROADS_SELECTED_LAYER)) {
      map.setFilter(ROADS_SELECTED_LAYER, [
        "==",
        ["get", "slug"],
        selectedSlug ?? "",
      ]);
    }
  }, [selectedSlug, mapReady]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        ref={containerRef}
        className="h-full w-full"
        role="application"
        aria-label="Johannesburg road map"
      />
      {loadError ? (
        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-border bg-surface-elevated p-4 text-sm text-red-700">
          {loadError}
        </div>
      ) : null}
    </div>
  );
}
