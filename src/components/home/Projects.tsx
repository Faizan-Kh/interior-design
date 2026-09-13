"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data/projects";
import { track } from "@/lib/analytics";
import { CoverImage } from "@/components/shared/CoverImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { getCatalogName } from "@/lib/data/catalog";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const featured = ["saar-tv-wall", "riffa-bedroom", "muharraq-cnc"]
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is (typeof projects)[number] => Boolean(project));

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project]");
      cards.forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-project-image]"),
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="bg-ivory-deep py-28">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our projects"
          title="Spaces we have finished."
            copy="Rooms, TV walls, cabinets and CNC — sample photography until the workshop’s own images are in place."
        />

        <div className="mt-16 space-y-20">
          {featured.map((project) => (
            <article key={project.slug} data-project className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <Link
                href={`/projects/${project.slug}`}
                onClick={() => track("project_viewed", { project: project.slug, source: "home" })}
                className="relative aspect-[16/10] overflow-hidden lg:col-span-8"
              >
                <div data-project-image className="absolute inset-0">
                  <CoverImage src={project.image} alt={project.name} sizes="70vw" />
                </div>
              </Link>
              <div className="lg:col-span-4">
                <p className="eyebrow">
                  {project.room} · {project.location}
                </p>
                <h3 className="mt-4 font-serif text-4xl">{project.name}</h3>
                <p className="mt-4 text-muted">{project.description}</p>
                <p className="mt-5 text-sm text-ink">
                  {project.materials
                    .map((slug) => getCatalogName(slug))
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <div className="mt-8 flex flex-col gap-3 text-[0.72rem] tracking-[0.16em] uppercase">
                  <Link href={`/projects/${project.slug}`} className="hover:text-walnut">
                    View Project
                  </Link>
                  <Link href="/design" className="hover:text-walnut">
                    Create Something Similar
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
