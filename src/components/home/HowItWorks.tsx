"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    n: "01",
    title: "Explore",
    copy: "See finished rooms, materials and custom pieces.",
  },
  {
    n: "02",
    title: "Describe",
    copy: "Share a photo, a reference, or simply the idea.",
  },
  {
    n: "03",
    title: "Quote",
    copy: "We price the work after we understand the space.",
  },
  {
    n: "04",
    title: "Make",
    copy: "Workshop, site and installation — until the room is finished.",
  },
];

export function HowItWorks() {
  const line = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || !line.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From the idea to the room."
            copy="Inspiration, custom design, fabrication and installation — as one conversation."
          />
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4">
          <div className="absolute top-4 right-0 left-0 hidden h-px origin-left bg-stone md:block">
            <div ref={line} className="h-px origin-left bg-charcoal" />
          </div>
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.08}>
              <p className="font-serif text-3xl text-sand">{step.n}</p>
              <h3 className="mt-5 font-serif text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">
                {step.copy}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
