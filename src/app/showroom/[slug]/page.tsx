import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogItems, getCatalogItem } from "@/lib/data/catalog";
import { getProjectsByMaterial } from "@/lib/data/projects";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return {};
  return { title: item.name, description: item.description };
}

export default async function ShowroomItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();
  const relatedProjects = getProjectsByMaterial(item.slug).slice(0, 2);

  return (
    <>
      <section className="grid min-h-[80vh] lg:grid-cols-2">
        <div className="relative min-h-[50vh]">
          <CoverImage src={item.image} alt={item.name} priority sizes="50vw" />
        </div>
        <div className="flex flex-col justify-end bg-ivory px-8 py-24 sm:px-16">
          <p className="eyebrow">{item.kind}</p>
          <h1 className="mt-4 text-5xl sm:text-6xl">{item.name}</h1>
          <p className="mt-6 max-w-md text-lg text-muted">{item.description}</p>
          {item.finishes?.length ? (
            <p className="mt-8 text-sm">Looks: {item.finishes.join(", ")}</p>
          ) : null}
          {item.application ? <p className="mt-3 text-sm text-ink">{item.application}</p> : null}
          <p className="mt-8 font-serif text-2xl">{item.pricingLabel}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href={`/quote?material=${item.slug}`}>Request a quote</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={item.kind === "material" ? `/design?look=${item.slug}` : "/custom"}>
                {item.kind === "material" ? "See in a room" : "Request something similar"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {relatedProjects.length ? (
        <section className="container-wide py-20">
          <p className="eyebrow">Seen in projects</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CoverImage src={project.image} alt={project.name} />
                </div>
                <h2 className="mt-4 font-serif text-2xl">{project.name}</h2>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
