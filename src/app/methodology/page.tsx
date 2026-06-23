import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Methodology</h1>
      <p className="mt-4 text-muted">
        How Living Atlas SA handles claims, sources, and confidence.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Claims, not paragraphs</h2>
        <p className="text-muted">
          Important statements are stored as claims linked to sources with
          confidence levels. We never flatten official history, historical
          interpretation, and community memory into one confident paragraph.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Confidence levels</h2>
        <ul className="space-y-2 text-sm text-muted">
          <li>
            <strong className="text-foreground">Verified official</strong> —
            government gazettes, official datasets
          </li>
          <li>
            <strong className="text-foreground">Supported</strong> — credible
            published sources
          </li>
          <li>
            <strong className="text-foreground">Community memory</strong> —
            oral history and recollections, clearly labelled
          </li>
          <li>
            <strong className="text-foreground">Unknown</strong> — research has
            not yet established this
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Sample data</h2>
        <p className="text-muted">
          MVP road geometries are marked as development samples — approximate
          until surveyed data is imported. They are never presented as verified
          historical fact.
        </p>
      </section>

      <Link
        href="/contribute"
        className="mt-10 inline-block text-sm font-medium hover:underline"
      >
        Contribute community memory →
      </Link>
    </SiteShell>
  );
}
