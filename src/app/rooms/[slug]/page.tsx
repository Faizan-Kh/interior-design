import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRoom, rooms } from "@/lib/data/rooms";
import { getMaterialsBySlugs } from "@/lib/data/materials";
import { getStyle } from "@/lib/data/styles";
import { projects } from "@/lib/data/projects";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return {};
  return {
    title: `${room.name} interiors in Bahrain`,
    description: room.description,
  };
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const relatedMaterials = getMaterialsBySlugs(room.materials);
  const relatedProjects = projects.filter((project) =>
    project.room.toLowerCase().includes(room.name.split(" ")[0].toLowerCase()),
  );
  const relatedStyles = room.styles.map((item) => getStyle(item)).filter(Boolean);

  return (
    <>
      <section className="relative h-[70vh] min-h-[520px]">
        <CoverImage src={room.image} alt={room.name} priority sizes="100vw" />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="container-wide relative flex h-full items-end pb-16 text-ivory">
          <div>
            <p className="eyebrow text-ivory/60">Room</p>
            <h1 className="mt-4 text-5xl sm:text-7xl">{room.name}</h1>
            <p className="mt-4 max-w-md text-lg text-ivory/80">{room.short}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="max-w-xl text-xl leading-relaxed text-ink">{room.description}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`/design?room=${room.slug}`}>Explore {room.name} Designs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/measure">Book a measurement</Link>
          </Button>
        </div>
      </section>

      <section className="container-wide pb-24">
        <p className="eyebrow">Looks that belong here</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {relatedMaterials.map((material) => (
            <Link key={material.slug} href={`/showroom/${material.slug}`} className="group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <CoverImage src={material.image} alt={material.name} className="transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h2 className="mt-4 font-serif text-2xl">{material.name}</h2>
              <p className="mt-2 text-sm text-muted">{material.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {relatedStyles.length ? (
        <section className="container-wide pb-24">
          <p className="eyebrow">Feelings that fit</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {relatedStyles.map((style) =>
              style ? (
                <Link key={style.slug} href={`/styles/${style.slug}`} className="border border-line px-5 py-3 text-sm">
                  {style.name}
                </Link>
              ) : null,
            )}
          </div>
        </section>
      ) : null}

      {relatedProjects.length ? (
        <section className="container-wide pb-28">
          <p className="eyebrow">Completed spaces</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {relatedProjects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <CoverImage src={project.image} alt={project.name} />
                </div>
                <h3 className="mt-4 font-serif text-2xl">{project.name}</h3>
                <p className="text-sm text-muted">{project.location}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
