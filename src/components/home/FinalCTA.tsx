"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CoverImage } from "@/components/shared/CoverImage";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";
import { media } from "@/lib/media";

export function FinalCTA() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      <CoverImage src={media.finalCta.src} alt={media.finalCta.alt} sizes="100vw" />
      <div className="absolute inset-0 bg-charcoal/50" />
      <div className="container-wide relative flex min-h-[80vh] flex-col items-start justify-end py-24 text-ivory">
        <p className="eyebrow text-ivory/60">Your space is waiting.</p>
        <h2 className="mt-5 max-w-xl text-5xl leading-[0.95] sm:text-7xl">
          Let’s turn your idea into something real.
        </h2>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="light">
            <Link href="/custom">Have an idea?</Link>
          </Button>
          <Button asChild variant="invert">
            <Link href="/quote">Get a Quote</Link>
          </Button>
          <Button asChild variant="invert">
            <a
              href={buildWhatsAppUrl("Hello SpaceCraft, I would like to talk about a project.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "final_cta" })}
            >
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
