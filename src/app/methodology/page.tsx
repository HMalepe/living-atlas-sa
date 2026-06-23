import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Methodology</h1>
      <p className="mt-4 text-muted">
        Claims, sources, confidence levels, and editorial review — see{" "}
        <code className="text-sm">docs/SOURCE_CONFIDENCE_MODEL.md</code> for the
        full model.
      </p>
    </main>
  );
}
