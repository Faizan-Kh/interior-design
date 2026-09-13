import { redirect } from "next/navigation";
import { materials } from "@/lib/data/materials";

export function generateStaticParams() {
  return materials.map((material) => ({ slug: material.slug }));
}

export default async function MaterialRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/showroom/${slug}`);
}
