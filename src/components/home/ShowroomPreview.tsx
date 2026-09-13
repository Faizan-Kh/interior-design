"use client";

import Link from "next/link";
import { getVisibleCatalog } from "@/lib/data/catalog";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ShowroomPreview() {
  const items = [
    ...getVisibleCatalog("product").slice(0, 3),
    ...getVisibleCatalog("material").slice(0, 2),
  ];

  return (
    <section className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Digital showroom"
            title="Materials, pieces, and what we can build."
            copy="A growing record of the work — not a shop grid. Prices are quoted to the room."
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.04}>
              <Link href={`/showroom/${item.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <CoverImage
                    src={item.image}
                    alt={item.name}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-5">{item.kind}</p>
                <h3 className="mt-2 font-serif text-3xl">{item.name}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link
          href="/showroom"
          className="mt-12 inline-block text-[0.72rem] tracking-[0.16em] uppercase"
        >
          Open the showroom
        </Link>
      </div>
    </section>
  );
}
