"use client";

import Link from "next/link";
import { getVisibleServices } from "@/lib/data/services";
import { track } from "@/lib/analytics";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ExploreServices() {
  const items = getVisibleServices();

  return (
    <section id="services" className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="What we make"
            title="Decoration, custom work, and the workshop."
            copy="Walls, furniture, CNC and finishing — started from your idea, not from a fixed catalogue."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.03} y={20}>
              <Link
                href={`/services/${service.slug}`}
                onClick={() =>
                  track("service_selected", { service: service.slug, source: "home" })
                }
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <CoverImage
                  src={service.image}
                  alt={service.name}
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <h3 className="font-serif text-3xl">{service.name}</h3>
                  <p className="mt-2 text-sm text-ivory/75">{service.short}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
