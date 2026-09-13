import type { Metadata } from "next";
import Link from "next/link";
import { catalogKinds, getVisibleCatalog, type ShowroomFilter } from "@/lib/data/catalog";
import { projects } from "@/lib/data/projects";
import { CoverImage } from "@/components/shared/CoverImage";
import { PageIntro } from "@/components/shared/PageIntro";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "A digital showroom of materials, custom furniture, CNC work and services in Bahrain.",
};

export default async function ShowroomPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string }>;
}) {
  const { kind: raw } = await searchParams;
  const kind = catalogKinds.some((item) => item.id === raw)
    ? (raw as ShowroomFilter)
    : "all";
  const catalogKind = kind === "all" || kind === "project" ? undefined : kind;
  const items = kind === "project" ? [] : getVisibleCatalog(catalogKind);
  const projectItems = kind === "all" || kind === "project" ? projects : [];

  return (
    <>
      <PageIntro
        eyebrow="Showroom"
        title="A record of what we offer — and what we can still invent."
        copy="Materials, built pieces, services and finished projects. Everything here can grow as the workshop does."
      />
      <nav className="container-page mb-12 flex flex-wrap gap-6 border-b border-line pb-4">
        {catalogKinds.map((item) => (
          <Link
            key={item.id}
            href={item.id === "all" ? "/showroom" : `/showroom?kind=${item.id}`}
            className={cn(
              "text-[0.72rem] tracking-[0.16em] uppercase",
              kind === item.id ? "text-charcoal" : "text-taupe hover:text-charcoal",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <section className="container-wide grid gap-10 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article key={item.slug}>
            <Link href={`/showroom/${item.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <CoverImage
                  src={item.image}
                  alt={item.name}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-5">{item.kind}</p>
              <h2 className="mt-2 font-serif text-3xl">{item.name}</h2>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </Link>
          </article>
        ))}
        {projectItems.map((project) => (
          <article key={project.slug}>
            <Link href={`/projects/${project.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <CoverImage
                  src={project.image}
                  alt={project.name}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-5">project</p>
              <h2 className="mt-2 font-serif text-3xl">{project.name}</h2>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
            </Link>
          </article>
        ))}
      </section>
      <section className="container-page pb-28">
        <p className="font-serif text-3xl">Have something else in mind?</p>
        <Link href="/custom" className="mt-4 inline-block text-[0.72rem] tracking-[0.16em] uppercase">
          Send a custom request
        </Link>
      </section>
    </>
  );
}
