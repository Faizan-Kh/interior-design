import type { Metadata } from "next";
import Link from "next/link";
import { getVisibleServices } from "@/lib/data/services";
import { CoverImage } from "@/components/shared/CoverImage";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Interior decoration, feature walls, TV units, CNC fabrication, cabinets and custom work in Bahrain.",
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="What we can make for you."
        copy="Start with the need. The material and the workshop follow."
      />
      <section className="container-wide grid gap-4 pb-28 sm:grid-cols-2 lg:grid-cols-3">
        {getVisibleServices().map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="group relative aspect-[4/5] overflow-hidden">
            <CoverImage
              src={service.image}
              alt={service.name}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
              <h2 className="font-serif text-3xl">{service.name}</h2>
              <p className="mt-2 text-sm text-ivory/75">{service.short}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
