import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/data/projects";
import { getCatalogItem } from "@/lib/data/catalog";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const used = project.materials
    .map((item) => getCatalogItem(item))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const next = projects.find((item) => item.slug !== project.slug);

  return (
    <>
      <section className="relative h-[80vh] min-h-[560px]">
        <CoverImage src={project.image} alt={project.name} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="container-wide relative flex h-full items-end pb-16 text-ivory">
          <div>
            <p className="eyebrow text-ivory/60">
              {project.room} · {project.location}
            </p>
            <h1 className="mt-4 text-5xl sm:text-7xl">{project.name}</h1>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="max-w-xl text-xl leading-relaxed">{project.description}</p>
        <p className="mt-6 text-sm text-taupe">{project.detail}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/design">Create Something Similar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/quote">Request a quote</Link>
          </Button>
        </div>
      </section>

      <section className="container-wide pb-24">
        <p className="eyebrow">Used in this project</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {used.map((item) => (
            <Link key={item.slug} href={`/showroom/${item.slug}`} className="flex gap-5">
              <span className="relative h-24 w-24 shrink-0 overflow-hidden">
                <CoverImage src={item.texture ?? item.image} alt={item.name} />
              </span>
              <span>
                <span className="block font-serif text-2xl">{item.name}</span>
                <span className="mt-1 block text-sm text-muted">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {next ? (
        <section className="container-wide pb-28">
          <p className="eyebrow">Next project</p>
          <Link href={`/projects/${next.slug}`} className="group mt-6 block">
            <div className="relative aspect-[16/8] overflow-hidden">
              <CoverImage src={next.image} alt={next.name} className="transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <h2 className="mt-5 font-serif text-3xl">{next.name}</h2>
          </Link>
        </section>
      ) : null}
    </>
  );
}
