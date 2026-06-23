import { NextResponse } from "next/server";
import { z } from "zod";
import { JOHANNESBURG_BBOX } from "@/data/roads/johannesburg-mvp";
import { getRoadGeoJSON } from "@/repositories/roads";
import { logger } from "@/lib/logger";

function optionalCoord(
  defaultValue: number,
  min: number,
  max: number,
) {
  return z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.coerce.number().min(min).max(max).default(defaultValue),
  );
}

const bboxSchema = z.object({
  west: optionalCoord(JOHANNESBURG_BBOX.west, -180, 180),
  south: optionalCoord(JOHANNESBURG_BBOX.south, -90, 90),
  east: optionalCoord(JOHANNESBURG_BBOX.east, -180, 180),
  north: optionalCoord(JOHANNESBURG_BBOX.north, -90, 90),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = bboxSchema.safeParse({
    west: searchParams.get("west"),
    south: searchParams.get("south"),
    east: searchParams.get("east"),
    north: searchParams.get("north"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid bounding box parameters" },
      { status: 400 },
    );
  }

  try {
    const geojson = await getRoadGeoJSON(parsed.data);
    return NextResponse.json(geojson, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  } catch (error) {
    logger.error("Failed to fetch road GeoJSON", { error: String(error) });
    return NextResponse.json(
      { error: "Failed to load road geometries" },
      { status: 500 },
    );
  }
}
