import type { Metadata } from "next";
import Link from "next/link";
import { Map, Moon, Search, Route } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Explore",
  description: "Enter the Ground and Sky modules of Living Atlas SA.",
};

const modules = [
  {
    href: "/ground/roads",
    title: "Ground · Roads",
    description: "Interactive map of ten Johannesburg MVP roads with preview cards and detail pages.",
    icon: Map,
    accent: "text-accent-ground",
  },
  {
    href: "/search",
    title: "Search",
    description: "Find roads by name, route number, or former official name.",
    icon: Search,
    accent: "text-accent-ground",
  },
  {
    href: "/sky",
    title: "Sky",
    description: "Location-aware astronomy for South Africa — live sky arriving in Milestone 4.",
    icon: Moon,
    accent: "text-accent-sky",
  },
  {
    href: "/ground",
    title: "Ground hub",
    description: "Roads, intersections, and infrastructure beneath South African feet.",
    icon: Route,
    accent: "text-accent-ground",
  },
] as const;

export default function ExplorePage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Explore</h1>
      <p className="mt-4 text-muted">
        Choose a module to begin. The Johannesburg road map is live; the sky
        module expands in upcoming milestones.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((mod) => (
          <li key={mod.href}>
            <Link
              href={mod.href}
              className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
            >
              <mod.icon className={`h-5 w-5 ${mod.accent}`} aria-hidden />
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
