"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/shared/CoverImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { media } from "@/lib/media";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stages = ["A plain room", "A considered design", "A space you'll love"];

export function Transformation() {
  const root = useRef<HTMLElement>(null);
  const after = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const [amount, setAmount] = useState(reduced ? 70 : 0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const update = () => setPinned(desktop.matches && !reduced);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reduced]);

  useEffect(() => {
    if (!pinned || !root.current || !after.current) return;

    const ctx = gsap.context(() => {
      gsap.set(after.current, { clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.65,
        },
      });

      tl.to(after.current, {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
      });

      stages.forEach((stage, index) => {
        tl.add(() => {
          if (label.current) label.current.textContent = stage;
        }, index * 0.33);
      });
    }, root);

    return () => ctx.revert();
  }, [pinned]);

  const clip = pinned ? undefined : `inset(0 ${100 - amount}% 0 0)`;

  return (
    <section ref={root} className="relative bg-ivory">
      <div className="container-wide grid min-h-[min(100svh,920px)] items-center gap-10 py-20 lg:grid-cols-[0.9fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="The transformation"
            title="From an idea to a space you'll love."
            copy="From a plain wall to a finished room — decoration, custom pieces and installation, together."
          />
          <p ref={label} className="mt-8 font-serif text-2xl text-walnut">
            {pinned ? stages[0] : amount < 35 ? stages[0] : amount < 70 ? stages[1] : stages[2]}
          </p>
          {!pinned ? (
            <input
              type="range"
              min={0}
              max={100}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="mt-8 w-full max-w-xs accent-charcoal"
              aria-label="Reveal the finished room"
            />
          ) : null}
          <Button asChild variant="outline" className="mt-10">
            <Link href="/projects">See What We Can Create</Link>
          </Button>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
          <CoverImage src={media.before.src} alt={media.before.alt} />
          <div
            ref={after}
            className="absolute inset-0"
            style={clip ? { clipPath: clip } : undefined}
          >
            <CoverImage src={media.after.src} alt={media.after.alt} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-5 py-4 text-[0.68rem] tracking-[0.16em] uppercase text-ivory">
            <span>Before</span>
            <span>After</span>
          </div>
        </div>
      </div>
    </section>
  );
}
