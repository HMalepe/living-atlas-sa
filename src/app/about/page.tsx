import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">About Living Atlas SA</h1>
      <p className="mt-4 text-muted">
        A world-class interactive learning platform rooted in South Africa —
        transforming roads, skies, places, and community memories into an
        explorable digital universe.
      </p>
    </main>
  );
}
