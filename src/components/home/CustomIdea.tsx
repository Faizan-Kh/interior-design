"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";

export function CustomIdea() {
  return (
    <section className="bg-ivory-deep py-28">
      <div className="container-page max-w-2xl">
        <Reveal>
          <p className="eyebrow">Have something else in mind?</p>
          <h2 className="mt-5 text-4xl leading-tight sm:text-6xl">
            Have an idea? Let’s build it.
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            A CNC pattern, a cabinet, a house number, a wall that does not exist yet.
            Send a description or a photo. We reply with a quotation.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/custom">Start a custom request</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/quote">Request a quotation</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
