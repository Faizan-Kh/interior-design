"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { rooms } from "@/lib/data/rooms";
import { track } from "@/lib/analytics";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function ExploreRooms() {
  return (
    <section id="rooms" className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Explore by room"
            title="What are you transforming?"
            copy="Start with the room. The design follows."
          />
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room, index) => (
            <Reveal key={room.slug} delay={index * 0.04} y={20}>
              <Link
                href={`/rooms/${room.slug}`}
                onClick={() => track("room_selected", { room: room.slug, source: "home" })}
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <CoverImage
                  src={room.image}
                  alt={`${room.name} interior`}
                  className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="font-serif text-3xl">{room.name}</p>
                  <p className="mt-2 max-w-[14rem] text-sm text-ivory/75 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                    {room.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[0.7rem] tracking-[0.16em] uppercase">
                    Explore {room.name}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
