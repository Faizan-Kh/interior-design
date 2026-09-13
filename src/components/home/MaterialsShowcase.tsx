"use client";

import Link from "next/link";
import { useState } from "react";
import { materialCategories, materials } from "@/lib/data/materials";
import { track } from "@/lib/analytics";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export function MaterialsShowcase() {
  const [category, setCategory] = useState(materialCategories[0].id);
  const visible = materials.filter((material) => material.category === category).slice(0, 2);

  return (
    <section className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Materials"
            title="Make your walls unforgettable."
            copy="A material library — not a catalogue. Touch the texture, then see it in a room."
          />
        </Reveal>

        <div className="mt-12 flex gap-8 border-b border-line">
          {materialCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={cn(
                "pb-4 text-[0.72rem] tracking-[0.18em] uppercase transition-colors",
                category === item.id
                  ? "border-b border-charcoal text-charcoal"
                  : "text-taupe hover:text-charcoal",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          A short look at {visible[0]?.category}.{" "}
          <Link href="/materials" className="text-charcoal underline-offset-4 hover:underline">
            View the full library
          </Link>
        </p>

        <div className="mt-12 space-y-16">
          {visible.map((material, index) => (
            <Reveal key={material.slug} delay={index * 0.04}>
              <article className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <Link
                  href={`/materials/${material.slug}`}
                  onClick={() =>
                    track("material_selected", { material: material.slug, source: "home" })
                  }
                  className="group relative aspect-[16/10] overflow-hidden"
                >
                  <CoverImage
                    src={material.image}
                    alt={material.name}
                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </Link>
                <div>
                  <p className="eyebrow">{material.category}</p>
                  <h3 className="mt-3 font-serif text-4xl">{material.name}</h3>
                  <p className="mt-4 max-w-sm text-muted">{material.description}</p>
                  <p className="mt-6 text-sm text-ink">{material.application}</p>
                  <div className="mt-8 flex flex-wrap gap-6 text-[0.72rem] tracking-[0.16em] uppercase">
                    <Link href={`/design?material=${material.slug}`} className="hover:text-walnut">
                      See in a room
                    </Link>
                    <Link href={`/quote?material=${material.slug}`} className="hover:text-walnut">
                      Request a quote
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
