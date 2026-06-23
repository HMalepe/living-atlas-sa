import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sky",
};

export default function SkyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Sky</h1>
      <p className="mt-4 text-muted">
        Location-aware astronomy for South Africa. Live sky rendering begins in
        Milestone 4.
      </p>
    </main>
  );
}
