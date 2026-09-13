import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getVisibleServices } from "@/lib/data/services";
import { getVisibleCatalog } from "@/lib/data/catalog";
import { projects } from "@/lib/data/projects";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return getVisibleServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return { title: service.name, description: service.description };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = [
    ...getVisibleCatalog().filter((item) => {
      if (service.slug.includes("cnc")) return item.slug.includes("cnc") || item.category === "CNC";
      if (service.slug.includes("tv")) return item.slug.includes("tv") || item.slug.includes("uv");
      if (service.slug.includes("cabinet")) return item.slug.includes("cabinet") || item.slug.includes("cupboard");
      if (service.slug.includes("furniture")) return item.kind === "product";
      return service.relatedKinds.includes(item.kind);
    }),
    ...getVisibleCatalog(),
  ]
    .filter((item, index, list) => list.findIndex((entry) => entry.slug === item.slug) === index)
    .slice(0, 3);
  const relatedProjects = (
    service.slug.includes("cnc")
      ? projects.filter((project) => project.kind === "cnc")
      : service.slug.includes("cabinet") ||
          service.slug.includes("furniture") ||
          service.slug.includes("tv")
        ? projects.filter((project) => project.kind === "furniture")
        : service.slug.includes("bedroom")
          ? projects.filter((project) => project.room === "Bedroom")
          : projects
  ).slice(0, 2);

  return (
    <>
      <section className="relative h-[70vh] min-h-[520px]">
        <CoverImage src={service.image} alt={service.name} priority sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="container-wide relative flex h-full items-end pb-16 text-ivory">
          <div>
            <p className="eyebrow text-ivory/60">Service</p>
            <h1 className="mt-4 text-5xl sm:text-7xl">{service.name}</h1>
            <p className="mt-4 max-w-md text-lg text-ivory/80">{service.short}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="max-w-xl text-xl leading-relaxed">{service.description}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/quote">Request a quotation</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/custom">Have something else in mind?</Link>
          </Button>
        </div>
      </section>

      <section className="container-wide pb-20">
        <p className="eyebrow">In the showroom</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/showroom/${item.slug}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <CoverImage src={item.image} alt={item.name} />
              </div>
              <h2 className="mt-4 font-serif text-2xl">{item.name}</h2>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wide pb-28">
        <p className="eyebrow">Related work</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {relatedProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <CoverImage src={project.image} alt={project.name} />
              </div>
              <h3 className="mt-4 font-serif text-2xl">{project.name}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
