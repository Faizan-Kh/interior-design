"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { track } from "@/lib/analytics";
import { media } from "@/lib/media";

export function DesignYourRoom() {
  return (
    <section className="bg-charcoal py-28 text-ivory">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow text-ivory/50">Design your space</p>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
            See a wall before we build it.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ivory/70">
            A preview of how a feature wall, TV background or material could sit in your room.
            The live AI step comes later — the path is already here.
          </p>
          <Button asChild variant="light" size="lg" className="mt-10">
            <Link
              href="/design"
              onClick={() => track("visualizer_started", { source: "home" })}
            >
              Try the preview
            </Link>
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4]">
            <CoverImage src={media.after.src} alt={media.after.alt} />
            <div className="absolute inset-x-6 bottom-6 border border-ivory/20 bg-charcoal/45 p-5 backdrop-blur-sm">
              <p className="eyebrow text-ivory/60">Preview</p>
              <p className="mt-3 font-serif text-2xl">A TV wall, before it is built</p>
              <p className="mt-2 text-sm text-ivory/70">Choose a look. We make it real.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
