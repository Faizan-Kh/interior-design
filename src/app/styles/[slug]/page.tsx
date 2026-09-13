import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStyle, styles } from "@/lib/data/styles";
import { getRoom } from "@/lib/data/rooms";
import { getMaterialsBySlugs } from "@/lib/data/materials";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return styles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) return {};
  return {
    title: `${style.name} interiors`,
    description: style.feeling,
  };
}

export default async function StylePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getStyle(slug);
  if (!style) notFound();

  const relatedRooms = style.rooms.map((item) => getRoom(item)).filter(Boolean);
  const relatedMaterials = getMaterialsBySlugs(style.materials);

  return (
    <>
      <section className="relative h-[70vh] min-h-[520px]">
        <CoverImage src={style.image} alt={style.name} priority sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="container-wide relative flex h-full items-end pb-16 text-ivory">
          <div>
            <p className="eyebrow text-ivory/60">Style</p>
            <h1 className="mt-4 text-5xl sm:text-7xl">{style.name}</h1>
            <p className="mt-4 text-lg text-ivory/80">{style.feeling}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <Button asChild>
          <Link href="/design">See this style in your room</Link>
        </Button>
      </section>

      <section className="container-wide pb-20">
        <p className="eyebrow">Rooms that hold this mood</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {relatedRooms.map((room) =>
            room ? (
              <Link key={room.slug} href={`/rooms/${room.slug}`} className="relative aspect-[4/5] overflow-hidden">
                <CoverImage src={room.image} alt={room.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                <span className="absolute bottom-5 left-5 font-serif text-2xl text-ivory">{room.name}</span>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="container-wide pb-28">
        <p className="eyebrow">Materials</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedMaterials.map((material) => (
            <Link key={material.slug} href={`/materials/${material.slug}`}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <CoverImage src={material.image} alt={material.name} />
              </div>
              <h2 className="mt-4 font-serif text-2xl">{material.name}</h2>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
