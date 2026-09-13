import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageIntro } from "@/components/shared/PageIntro";

export const metadata: Metadata = {
  title: "Request a quotation",
  description:
    "Request a quotation for interior decoration, custom furniture, CNC work or decorative finishing in Bahrain.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string; material?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <PageIntro
        eyebrow="Quotation"
        title="Tell us what you have in mind."
        copy="A first range after we understand the space. The exact quote follows a conversation or a measurement."
      />
      <section className="container-page max-w-2xl pb-28">
        <QuoteForm defaultRoom={params.room} defaultMaterial={params.material} />
      </section>
    </>
  );
}
