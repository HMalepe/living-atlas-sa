import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Explore</h1>
      <p className="mt-4 text-muted">
        Ground and Sky modules arrive in Milestones 2–5. This route confirms
        navigation scaffolding.
      </p>
      <ul className="mt-8 space-y-2">
        <li>
          <Link href="/ground" className="text-accent-ground hover:underline">
            Ground
          </Link>
        </li>
        <li>
          <Link href="/sky" className="text-accent-sky hover:underline">
            Sky
          </Link>
        </li>
      </ul>
    </main>
  );
}
