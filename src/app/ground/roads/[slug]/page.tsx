import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoadBySlug } from "@/data/roads/johannesburg-mvp";
import { getRoadBySlugFromStore } from "@/repositories/roads";
import { getRoadDepthFromStore } from "@/repositories/road-depth";
import { RoadDetailView } from "@/features/ground/roads/components/road-detail-view";
import { SiteShell } from "@/components/layout/site-shell";

type RoadDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { JOHANNESBURG_MVP_ROADS } = await import("@/data/roads/johannesburg-mvp");
  return JOHANNESBURG_MVP_ROADS.map((road) => ({ slug: road.slug }));
}

export async function generateMetadata({ params }: RoadDetailPageProps) {
  const { slug } = await params;
  const road = getRoadBySlug(slug);
  return {
    title: road?.currentName ?? "Road",
    description: road?.summary,
  };
}

export default async function RoadDetailPage({ params }: RoadDetailPageProps) {
  const { slug } = await params;
  const road = (await getRoadBySlugFromStore(slug)) ?? getRoadBySlug(slug);

  if (!road) {
    notFound();
  }

  const depth = (await getRoadDepthFromStore(slug))!;

  return (
    <SiteShell mainClassName="mx-auto max-w-3xl px-6 py-10">
      <nav className="mb-8 flex items-center justify-between text-sm">
        <Link href="/ground/roads" className="text-muted hover:text-foreground hover:underline">
          ← Roads map
        </Link>
        <Link href="/search" className="text-muted hover:text-foreground hover:underline">
          Search
        </Link>
      </nav>

      <RoadDetailView road={road} depth={depth} />
    </SiteShell>
  );
}
