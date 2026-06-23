import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ground",
};

export default function GroundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Ground</h1>
      <p className="mt-4 text-muted">
        Roads, intersections, and infrastructure beneath South African feet.
        MapLibre integration begins in Milestone 2.
      </p>
    </main>
  );
}
