import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roads",
};

export default function RoadsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Roads</h1>
      <p className="mt-4 text-muted">
        Ten Johannesburg-area roads will anchor the MVP. Seed data and geometry
        arrive in Milestone 1–2.
      </p>
    </main>
  );
}
