"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/shared/CoverImage";
import { track } from "@/lib/analytics";
import { media } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-svh min-h-[680px] overflow-hidden">
      <div data-hero-top className="pointer-events-none absolute top-0 left-0 h-px w-full" />
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduce ? 0 : 2.2, ease }}
      >
        <CoverImage
          src={media.hero.src}
          alt={media.hero.alt}
          priority
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/40" />

      <div className="container-wide relative flex h-full items-end pb-20 pt-28 sm:pb-24">
        <div className="max-w-xl text-ivory">
          <motion.p
            className="eyebrow text-ivory drop-shadow-[0_1px_8px_rgba(28,25,22,0.55)]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.35, ease }}
          >
            Interior decoration · Bahrain
          </motion.p>
          <motion.h1
            className="mt-5 text-4xl leading-[0.96] sm:text-6xl lg:text-[4.6rem]"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.5, ease }}
          >
            From an idea to your finished space.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-ivory/78 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.75, ease }}
          >
            Interior decoration, custom design, CNC and carpentry — made around your space.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.95, ease }}
          >
            <Button asChild variant="light" size="lg">
              <Link
                href="/quote"
                onClick={() => track("hero_cta_clicked", { cta: "quote" })}
              >
                Get a Quote
              </Link>
            </Button>
            <Button asChild variant="invert" size="lg">
              <Link
                href="#services"
                onClick={() => track("hero_cta_clicked", { cta: "explore" })}
              >
                Explore Our Work
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/70 sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1.4, duration: reduce ? 0 : 0.8 }}
      >
        <span className="text-[0.65rem] tracking-[0.22em] uppercase">Scroll</span>
        <span className="h-10 w-px origin-top bg-ivory/50" />
      </motion.div>
    </section>
  );
}
