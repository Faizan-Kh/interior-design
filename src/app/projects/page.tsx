import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { getCatalogName } from "@/lib/data/catalog";
import { CoverImage } from "@/components/shared/CoverImage";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Completed interiors, TV walls, cabinets and CNC work across Bahrain — placeholder photography until SpaceCraft work is published.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Projects"
        title="Spaces, finished."
        copy="Bedrooms, TV walls, cabinets, CNC and more. These images are placeholders until the workshop’s own photographs are in place."
      />
      <section className="container-wide space-y-20 pb-28">
        {projects.map((project) => (
          <article key={project.slug} className="grid items-end gap-8 lg:grid-cols-12">
            <Link href={`/projects/${project.slug}`} className="relative aspect-[16/10] overflow-hidden lg:col-span-8">
              <CoverImage src={project.image} alt={project.name} sizes="70vw" />
            </Link>
            <div className="lg:col-span-4">
              <p className="eyebrow">
                {project.kind ? `${project.kind} · ` : ""}
                {project.room} · {project.location}
              </p>
              <h2 className="mt-4 font-serif text-4xl">{project.name}</h2>
              <p className="mt-4 text-muted">{project.description}</p>
              <p className="mt-5 text-sm">
                {project.materials
                  .map((slug) => getCatalogName(slug))
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-block text-[0.72rem] tracking-[0.16em] uppercase"
              >
                View Project
              </Link>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
