import type { Metadata } from "next";
import { MeasurementForm } from "@/components/forms/MeasurementForm";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Book a free home measurement",
  description:
    "Book a free home measurement in Bahrain. We visit, measure your space and help you choose the right materials.",
};

export default function MeasurePage() {
  return (
    <>
      <PageIntro
        eyebrow="Free measurement"
        title="Not sure what will work in your space?"
        copy="We visit, measure and help you choose. No obligation — just a clearer next step."
      />
      <section className="container-page max-w-2xl pb-28">
        <MeasurementForm />
      </section>
    </>
  );
}
