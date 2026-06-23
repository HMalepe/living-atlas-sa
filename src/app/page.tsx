import Link from "next/link";
import { HorizonHero } from "@/components/home/horizon-hero";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border px-6 py-4">
        <nav className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Living Atlas SA
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/explore" className="hover:underline">
              Explore
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/admin" className="hover:underline">
              Admin
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-10">
        <HorizonHero />

        <section className="grid gap-6 sm:grid-cols-2">
          <article className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Point → Understand</h2>
            <p className="mt-2 text-muted">
              A playable map of South African roads, intersections, and the
              stories behind them — with sources you can trust.
            </p>
            <Link
              href="/ground/roads"
              className="mt-4 inline-block text-sm font-medium text-accent-ground hover:underline"
            >
              Explore Johannesburg roads →
            </Link>
          </article>
          <article className="rounded-xl border border-border bg-surface p-6">
            <h2 className="text-lg font-semibold">Look up → Learn</h2>
            <p className="mt-2 text-muted">
              The Southern Hemisphere sky from your location — planets, Moon,
              constellations, and cultural traditions.
            </p>
            <Link
              href="/sky/live"
              className="mt-4 inline-block text-sm font-medium text-accent-sky hover:underline"
            >
              Tonight&apos;s sky →
            </Link>
          </article>
        </section>

        <section className="rounded-xl border border-border bg-surface-elevated p-6">
          <h2 className="text-lg font-semibold">Built on evidence</h2>
          <p className="mt-2 text-muted">
            Every important statement is a claim with a source and confidence
            level. Community memory is shown as memory — never as undisputed
            fact.
          </p>
          <Link
            href="/methodology"
            className="mt-4 inline-block text-sm font-medium hover:underline"
          >
            Our methodology →
          </Link>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted">
        <p>Milestone 0 — foundation in progress</p>
      </footer>
    </div>
  );
}
