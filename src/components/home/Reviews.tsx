import { reviews } from "@/lib/data/reviews";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";

export function Reviews() {
  return (
    <section className="bg-ivory py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="From the home"
            title="What it feels like after."
            copy="Placeholder notes until real customer reviews are published."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.name} className="border-t border-line pt-8">
              <blockquote className="font-serif text-2xl leading-snug">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-8 text-sm text-muted">
                <span className="text-charcoal">{review.name}</span>
                <span className="mx-2">·</span>
                {review.project}
                <p className="mt-2 text-[0.68rem] tracking-[0.14em] uppercase text-taupe">
                  Sample review — placeholder
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
