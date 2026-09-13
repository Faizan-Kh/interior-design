import { SectionHeading } from "@/components/shared/SectionHeading";
import { MeasurementForm } from "@/components/forms/MeasurementForm";
import { CoverImage } from "@/components/shared/CoverImage";
import { media } from "@/lib/media";

export function Measurement() {
  return (
    <section id="measure" className="bg-ivory-deep py-28">
      <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Free home measurement"
            title="Not sure what will work in your space?"
            copy="Let us visit, measure your space and help you choose the right solution."
          />
          <div className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
            <CoverImage src={media.measurement.src} alt={media.measurement.alt} />
          </div>
        </div>
        <MeasurementForm />
      </div>
    </section>
  );
}
