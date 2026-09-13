"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { styles } from "@/lib/data/styles";
import { track } from "@/lib/analytics";
import { CoverImage } from "@/components/shared/CoverImage";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";

export function FindStyle() {
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function updateArrows() {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function move(direction: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-style-card]");
    const amount = (card?.offsetWidth ?? 360) + 16;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="style" className="bg-ivory-deep py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="Find your style"
            title="Start with the feeling."
            copy="You do not need to know the material yet. Choose the atmosphere."
          />
        </Reveal>
        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!canPrev}
            aria-label="Previous styles"
            className={cn(
              "flex h-11 w-11 items-center justify-center border border-[#1c1916]/20 bg-ivory text-[#1c1916] transition-opacity",
              !canPrev && "opacity-30",
            )}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!canNext}
            aria-label="Next styles"
            className={cn(
              "flex h-11 w-11 items-center justify-center border border-[#1c1916]/20 bg-ivory text-[#1c1916] transition-opacity",
              !canNext && "opacity-30",
            )}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={updateArrows}
        data-lenis-prevent
        className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100%-1360px)/2+2.5rem))] pb-4 [scrollbar-width:thin]"
      >
        {styles.map((style) => (
          <Link
            key={style.slug}
            href={`/styles/${style.slug}`}
            data-style-card
            onClick={() => track("style_selected", { style: style.slug, source: "home" })}
            className="group relative w-[72vw] shrink-0 snap-start overflow-hidden sm:w-[360px]"
          >
            <div className="relative aspect-[4/5]">
              <CoverImage
                src={style.image}
                alt={`${style.name} interior mood`}
                className="transition-transform duration-700 group-hover:scale-105"
                sizes="360px"
              />
              <div className="absolute inset-0 bg-charcoal/15 transition-colors group-hover:bg-charcoal/25" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                <p className="font-serif text-3xl">{style.name}</p>
                <p className="mt-2 text-sm text-ivory/80">{style.feeling}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
