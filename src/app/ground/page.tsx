import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ground",
};

export default function GroundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Ground</h1>
      <p className="mt-4 text-muted">
        Roads, intersections, and infrastructure beneath South African feet.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/ground/roads"
          className="rounded-lg border border-border bg-surface-elevated px-6 py-4 hover:border-accent-ground"
        >
          <span className="font-semibold">Johannesburg roads</span>
          <p className="mt-1 text-sm text-muted">
            Interactive map with 10 MVP roads
          </p>
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-border bg-surface-elevated px-6 py-4 hover:border-accent-ground"
        >
          <span className="font-semibold">Search</span>
          <p className="mt-1 text-sm text-muted">
            Roads, route numbers, former names
          </p>
        </Link>
      </div>
    </main>
  );
}
