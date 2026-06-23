import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Ground",
};

export default function GroundPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Ground</h1>
      <p className="mt-4 text-muted">
        Roads, intersections, and infrastructure beneath South African feet.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/ground/roads"
          className="rounded-xl border border-border bg-surface-elevated p-6 transition-shadow hover:shadow-md"
        >
          <span className="font-semibold">Johannesburg roads</span>
          <p className="mt-2 text-sm text-muted">
            Interactive MapLibre map with ten MVP roads, preview cards, and
            detail pages.
          </p>
        </Link>
        <Link
          href="/search"
          className="rounded-xl border border-border bg-surface-elevated p-6 transition-shadow hover:shadow-md"
        >
          <span className="font-semibold">Search</span>
          <p className="mt-2 text-sm text-muted">
            Find roads by name, route number, or former official name.
          </p>
        </Link>
      </div>
    </SiteShell>
  );
}
