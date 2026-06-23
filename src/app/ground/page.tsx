import type { Metadata } from "next";
import Link from "next/link";
import { GitCompare, Map, Route, Search } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Ground",
};

const modules = [
  {
    href: "/ground/roads",
    title: "Johannesburg roads",
    description:
      "Interactive MapLibre map with ten MVP roads, preview cards, timelines, and sourced claims.",
    icon: Map,
  },
  {
    href: "/ground/intersections",
    title: "Intersections",
    description:
      "Fifteen major junctions and interchanges — Gillooly's, Buccleuch, Crown, and more.",
    icon: Route,
  },
  {
    href: "/ground/roads/compare",
    title: "Compare roads",
    description:
      "Side-by-side comparison with relationship types and parallel corridor explanations.",
    icon: GitCompare,
  },
  {
    href: "/search",
    title: "Search",
    description: "Find roads by name, route number, or former official name.",
    icon: Search,
  },
] as const;

export default function GroundPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Ground</h1>
      <p className="mt-4 text-muted">
        Roads, intersections, and infrastructure beneath South African feet —
        every fact linked to a source and confidence level.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((mod) => (
          <li key={mod.href}>
            <Link
              href={mod.href}
              className="flex h-full flex-col rounded-xl border border-border bg-surface-elevated p-6 transition-shadow hover:shadow-md"
            >
              <mod.icon className="h-5 w-5 text-accent-ground" aria-hidden />
              <span className="mt-3 font-semibold">{mod.title}</span>
              <span className="mt-2 flex-1 text-sm text-muted">
                {mod.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SiteShell>
  );
}
