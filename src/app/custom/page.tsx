import type { Metadata } from "next";
import { CustomRequestForm } from "@/components/forms/CustomRequestForm";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Custom request",
  description:
    "Request a custom CNC, carpentry or decorative project in Bahrain. Describe the idea and receive a quotation.",
};

export default function CustomPage() {
  return (
    <>
      <PageIntro
        eyebrow="Custom work"
        title="Have an idea? Let’s build it."
        copy="Not everything belongs in a catalogue. Describe the piece. We will come back with a quotation."
      />
      <section className="container-page max-w-2xl pb-28">
        <CustomRequestForm />
      </section>
    </>
  );
}
