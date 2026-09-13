import type { Metadata } from "next";
import Link from "next/link";
import { rooms } from "@/lib/data/rooms";
import { CoverImage } from "@/components/shared/CoverImage";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Explore rooms",
  description: "Choose the room you want to transform — bedroom, living room, majlis, balcony and more across Bahrain.",
};

export default function RoomsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Rooms"
        title="What are you transforming?"
        copy="Every room asks for a different approach. Start here."
      />
      <section className="container-wide grid gap-4 pb-28 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room) => (
          <Link key={room.slug} href={`/rooms/${room.slug}`} className="group relative aspect-[3/4] overflow-hidden">
            <CoverImage
              src={room.image}
              alt={room.name}
              className="transition-transform duration-700 group-hover:scale-105"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
              <h2 className="font-serif text-3xl">{room.name}</h2>
              <p className="mt-2 text-sm text-ivory/75">{room.short}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
