import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">About Living Atlas SA</h1>
      <p className="mt-4 text-lg text-muted">
        A world-class interactive learning platform rooted in South Africa.
      </p>
      <div className="mt-8 space-y-4 text-muted">
        <p>
          Living Atlas SA transforms roads, skies, places, histories, and
          community memories into an explorable digital universe — not a static
          encyclopedia or generic tourism app.
        </p>
        <p>
          The core promise is simple:{" "}
          <strong className="font-medium text-foreground">
            point anywhere, understand what you are seeing, why it exists, what
            it was called, how it connects, and what people believed about it.
          </strong>
        </p>
        <p>
          We distinguish official records from community memory, mark unknowns
          explicitly, and never present invented history as fact.
        </p>
      </div>
      <Link
        href="/methodology"
        className="mt-8 inline-block text-sm font-medium text-accent-ground hover:underline"
      >
        How we handle sources and claims →
      </Link>
    </SiteShell>
  );
}
