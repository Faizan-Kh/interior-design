"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { rooms } from "@/lib/data/rooms";
import { getCatalogItem, type CatalogItem } from "@/lib/data/catalog";
import {
  createDemonstrationPreview,
  getLooksForCategory,
  getVisualizerCategory,
  sampleRoomPhotos,
  visualizerCategories,
  type VisualizationResult,
  type VisualizerStep,
} from "@/lib/visualizer";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl, designWhatsAppMessage } from "@/lib/whatsapp";
import { CoverImage } from "@/components/shared/CoverImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const steps: VisualizerStep[] = ["photo", "room", "category", "look", "visualizing", "result"];
const stepLabels = ["Photo", "Room", "Look", "Design", "Preview"];

export function RoomVisualizer() {
  const params = useSearchParams();
  const presetLook = params.get("material") ?? params.get("look") ?? "";
  const presetRoom = params.get("room") ?? "";
  const presetCategory = params.get("category") ?? "";

  const [step, setStep] = useState<VisualizerStep>("photo");
  const [roomSlug, setRoomSlug] = useState(presetRoom);
  const [photo, setPhoto] = useState("");
  const [categoryId, setCategoryId] = useState(presetCategory);
  const [lookSlug, setLookSlug] = useState(presetLook);
  const [result, setResult] = useState<VisualizationResult | null>(null);
  const [copied, setCopied] = useState(false);

  const room = rooms.find((item) => item.slug === roomSlug);
  const category = categoryId ? getVisualizerCategory(categoryId) : undefined;
  const look = lookSlug ? getCatalogItem(lookSlug) : undefined;
  const looks = categoryId ? getLooksForCategory(categoryId) : [];
  const stepIndex = Math.min(steps.indexOf(step), 4);

  useEffect(() => {
    if (step !== "visualizing") return;

    const timer = window.setTimeout(() => {
      const created = createDemonstrationPreview({
        roomSlug,
        photoDataUrl: photo,
        categoryId,
        lookSlug,
      });
      setResult(created);
      track("visualization_created", {
        room: roomSlug,
        category: categoryId,
        look: lookSlug,
      });
      setStep("result");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [step, roomSlug, photo, categoryId, lookSlug]);

  function onUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(String(reader.result));
      track("photo_uploaded", { room: roomSlug || "unspecified" });
    };
    reader.readAsDataURL(file);
  }

  function visualize() {
    setStep("visualizing");
  }

  function shareConcept() {
    const url = `${window.location.origin}/design?room=${roomSlug}&category=${categoryId}&look=${lookSlug}`;
    const text = `SpaceCraft concept: ${room?.name ?? "a room"} · ${look?.name ?? "custom look"}`;

    if (navigator.share) {
      void navigator.share({ title: "SpaceCraft concept", text, url }).catch(() => undefined);
      return;
    }

    void navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    });
  }

  const message = useMemo(
    () =>
      designWhatsAppMessage({
        room: room?.name,
        category: category?.name,
        look: look?.name,
      }),
    [room, category, look],
  );

  return (
    <div className="bg-ivory">
      <div className="container-page pt-28 pb-8">
        <p className="eyebrow">Space preview</p>
        <h1 className="mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          See a look in your room.
        </h1>
        <p className="mt-5 max-w-lg text-muted">
          A demonstration of how a wall or design could sit in your space.
          A live AI visualization can connect here later.
        </p>
        {step !== "visualizing" ? (
          <ol className="mt-10 flex flex-wrap gap-6 text-[0.7rem] tracking-[0.16em] uppercase text-taupe">
            {stepLabels.map((label, index) => (
              <li key={label} className={cn(index <= stepIndex && "text-charcoal")}>
                0{index + 1} {label}
              </li>
            ))}
          </ol>
        ) : null}
      </div>

      {step === "photo" ? (
        <section className="container-page pb-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <label className="relative flex min-h-[360px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-charcoal/20 bg-ivory-deep">
              {photo ? (
                <img src={photo} alt="Your room" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="px-8 text-center">
                  <p className="font-serif text-3xl">Upload a room photo</p>
                  <p className="mt-3 text-sm text-muted">A wide shot of the wall works best.</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onUpload(file);
                }}
              />
            </label>
            <div>
              <p className="eyebrow">Or start with a sample</p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {sampleRoomPhotos.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => setPhoto(sample.src)}
                    aria-label={sample.label}
                    className={cn(
                      "relative aspect-square overflow-hidden",
                      photo === sample.src && "ring-1 ring-charcoal",
                    )}
                  >
                    <CoverImage src={sample.src} alt={sample.label} sizes="20vw" />
                  </button>
                ))}
              </div>
              <Button className="mt-10" disabled={!photo} onClick={() => setStep("room")}>
                Choose the room
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {step === "room" ? (
        <section className="container-wide pb-24">
          <Back onClick={() => setStep("photo")}>Photo</Back>
          <p className="mb-8 text-muted">Which space are we looking at?</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setRoomSlug(item.slug);
                  track("room_selected", { room: item.slug, source: "visualizer" });
                  setStep("category");
                }}
                className="group relative aspect-[3/4] overflow-hidden text-left"
              >
                <CoverImage src={item.image} alt={item.name} sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <span className="absolute bottom-5 left-5 font-serif text-3xl text-ivory">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === "category" ? (
        <section className="container-wide pb-24">
          <Back onClick={() => setStep("room")}>{room?.name ?? "Room"}</Back>
          <p className="mb-8 text-muted">What would you like to try in this space?</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visualizerCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCategoryId(item.id);
                  setLookSlug("");
                  setStep("look");
                }}
                className="group relative aspect-[4/5] overflow-hidden text-left"
              >
                <CoverImage src={item.image} alt={item.name} sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="font-serif text-3xl">{item.name}</p>
                  <p className="mt-2 text-sm text-ivory/75">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === "look" ? (
        <section className="container-wide pb-24">
          <Back onClick={() => setStep("category")}>{category?.name ?? "Look"}</Back>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <PreviewCanvas photo={photo} texture={look?.texture ?? look?.image} />
            <div>
              <p className="eyebrow">Choose a design</p>
              <p className="mt-3 text-sm text-muted">
                {category?.description} Select one look to preview.
              </p>
              <SwatchRow
                items={looks}
                selected={lookSlug}
                onSelect={(slug) => {
                  setLookSlug(slug);
                  track("material_selected", { material: slug, source: "visualizer" });
                }}
              />
              <Button className="mt-10" disabled={!lookSlug} onClick={visualize}>
                Visualize this look
              </Button>
              <p className="mt-4 text-xs text-taupe">
                The next step is a demonstration overlay — not a live AI image yet.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {step === "visualizing" ? (
        <section className="container-page pb-32">
          <div className="relative mx-auto max-w-3xl overflow-hidden bg-ivory-deep">
            <div className="relative aspect-[5/4]">
              {photo ? (
                <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
              ) : null}
              <div className="absolute inset-0 bg-charcoal/35" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-ivory">
                <p className="eyebrow text-ivory/60">Demonstration</p>
                <p className="mt-5 font-serif text-4xl sm:text-5xl">Visualizing your space</p>
                <p className="mt-4 max-w-sm text-sm text-ivory/75">
                  Preparing a preview of {look?.name ?? "your look"} in the {room?.name?.toLowerCase() ?? "room"}.
                </p>
                <span className="mt-8 h-px w-24 origin-left animate-pulse bg-ivory/70" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {step === "result" && result ? (
        <section className="container-wide pb-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <PreviewCanvas photo={photo} texture={look?.texture ?? look?.image} strong />
            <div>
              <p className="eyebrow">Demonstration preview</p>
              <h2 className="mt-4 font-serif text-4xl">
                {room?.name}
                {look ? ` with ${look.name}` : ""}
              </h2>
              <p className="mt-5 text-muted">
                This is a demonstration overlay — not a live AI image yet.
                A real visualization service can connect here later. We refine the look after we visit.
              </p>
              <div className="mt-8 border-t border-line pt-6">
                <p className="eyebrow">Estimated project range</p>
                <p className="mt-3 font-serif text-4xl">
                  {result.estimate.min} – {result.estimate.max} BHD
                </p>
                <p className="mt-2 text-sm text-taupe">
                  A first range only. The exact quote follows a measurement.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild>
                  <a
                    href={buildWhatsAppUrl(message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_clicked", { source: "visualizer" })}
                  >
                    Send this design on WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link
                    href={`/quote?room=${roomSlug}&material=${lookSlug}`}
                    onClick={() => track("quote_requested", { source: "visualizer" })}
                  >
                    Request a quotation
                  </Link>
                </Button>
                <Button type="button" variant="ghost" onClick={shareConcept}>
                  {copied ? "Concept copied" : "Save / share this concept"}
                </Button>
              </div>
              <button
                type="button"
                className="mt-8 text-sm text-muted underline-offset-4 hover:underline"
                onClick={() => setStep("look")}
              >
                Try another design
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Back({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="mb-8 inline-flex items-center gap-2 text-sm text-muted"
      onClick={onClick}
    >
      <ArrowLeft className="h-4 w-4" /> {children}
    </button>
  );
}

function SwatchRow({
  items,
  selected,
  onSelect,
}: {
  items: CatalogItem[];
  selected: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
      {items.map((item) => (
        <button
          key={item.slug}
          type="button"
          onClick={() => onSelect(item.slug === selected ? "" : item.slug)}
          className={cn(
            "w-28 shrink-0 text-left transition-transform duration-400",
            selected === item.slug && "-translate-y-0.5",
          )}
        >
          <span
            className={cn(
              "relative block aspect-square overflow-hidden",
              selected === item.slug && "ring-1 ring-charcoal",
            )}
          >
            <CoverImage src={item.texture ?? item.image} alt={item.name} sizes="112px" />
          </span>
          <span className="mt-2 block text-[0.72rem] leading-tight">{item.name}</span>
        </button>
      ))}
    </div>
  );
}

function PreviewCanvas({
  photo,
  texture,
  strong,
}: {
  photo: string;
  texture?: string;
  strong?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep sm:aspect-[5/4]">
      {photo ? (
        <img src={photo} alt="Room preview" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      {texture ? (
        <div
          className="absolute inset-x-[12%] top-[8%] bottom-[38%] mix-blend-multiply"
          style={{
            backgroundImage: `url(${texture})`,
            backgroundSize: "cover",
            opacity: strong ? 0.42 : 0.28,
          }}
        />
      ) : null}
    </div>
  );
}
