"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl, customWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/input";

export function CustomRequestForm() {
  const [sent, setSent] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    idea: "",
    material: "",
    size: "",
    budget: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function onFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).slice(0, 4).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((current) => [...current, String(reader.result)].slice(0, 4));
      };
      reader.readAsDataURL(file);
    });
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    track("custom_requested", { location: form.location });
    window.open(
      buildWhatsAppUrl(
        customWhatsAppMessage({
          name: form.name,
          location: form.location,
          idea: form.idea,
          material: form.material,
          size: form.size,
          budget: form.budget,
          photos: photos.length || undefined,
        }),
      ),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-line bg-ivory p-8 sm:p-10">
        <p className="eyebrow">Request sent</p>
        <p className="mt-4 font-serif text-3xl">We’ll reply on WhatsApp with the next step.</p>
        {photos.length ? (
          <p className="mt-4 text-sm text-muted">
            Attach your reference photos in the WhatsApp chat so we can see the idea clearly.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7 border border-line bg-ivory p-8 sm:p-10">
      <div>
        <FieldLabel htmlFor="idea">What would you like us to make?</FieldLabel>
        <Textarea
          id="idea"
          required
          placeholder="A modern TV wall, a CNC screen, a cupboard…"
          value={form.idea}
          onChange={(event) => update("idea", event.target.value)}
        />
      </div>
      <div>
        <FieldLabel htmlFor="c-photos">Reference images</FieldLabel>
        <label
          htmlFor="c-photos"
          className="mt-2 flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-charcoal/20 bg-ivory-deep px-4 py-6 text-center text-sm text-muted"
        >
          {photos.length
            ? `${photos.length} photo${photos.length === 1 ? "" : "s"} selected`
            : "Add a sketch, a Pinterest save, or a photo of the space"}
          <input
            id="c-photos"
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => onFiles(event.target.files)}
          />
        </label>
        {photos.length ? (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {photos.map((src) => (
              <img key={src.slice(0, 48)} src={src} alt="" className="aspect-square object-cover" />
            ))}
          </div>
        ) : null}
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="c-name">Name</FieldLabel>
          <Input
            id="c-name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="c-phone">WhatsApp / Phone</FieldLabel>
          <Input
            id="c-phone"
            required
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="c-location">Area / Location</FieldLabel>
        <Input
          id="c-location"
          required
          placeholder="e.g. Riffa, Amwaj"
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
        />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="c-size">Approximate size</FieldLabel>
          <Input
            id="c-size"
            placeholder="e.g. 3m wall, 2×1m table"
            value={form.size}
            onChange={(event) => update("size", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="c-material">Preferred material</FieldLabel>
          <Input
            id="c-material"
            placeholder="If you know — or leave blank"
            value={form.material}
            onChange={(event) => update("material", event.target.value)}
          />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="c-budget">Budget range (optional)</FieldLabel>
        <Input
          id="c-budget"
          placeholder="e.g. 400–800 BHD"
          value={form.budget}
          onChange={(event) => update("budget", event.target.value)}
        />
      </div>
      <p className="text-sm text-taupe">
        After WhatsApp opens, send the reference photos in the chat so we can see them.
      </p>
      <Button type="submit" size="lg">
        Send custom request
      </Button>
    </form>
  );
}
