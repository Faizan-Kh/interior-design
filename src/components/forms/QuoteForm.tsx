"use client";

import { useState } from "react";
import Link from "next/link";
import { rooms } from "@/lib/data/rooms";
import { getCatalogItem, getVisibleCatalog } from "@/lib/data/catalog";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl, quoteWhatsAppMessage } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/input";

export function QuoteForm({
  defaultRoom,
  defaultMaterial,
}: {
  defaultRoom?: string;
  defaultMaterial?: string;
}) {
  const items = getVisibleCatalog();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    room: defaultRoom ?? "",
    interest: defaultMaterial ?? "",
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    track("quote_requested", {
      room: form.room,
      material: form.interest,
      location: form.location,
    });
    const roomName = rooms.find((room) => room.slug === form.room)?.name;
    const interestName = getCatalogItem(form.interest)?.name;
    window.open(
      buildWhatsAppUrl(
        quoteWhatsAppMessage({
          name: form.name,
          room: roomName,
          location: form.location,
          interest: interestName,
          note: form.message,
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
        <p className="eyebrow">Quote requested</p>
        <p className="mt-4 font-serif text-3xl">Continue the conversation on WhatsApp.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-7 border border-line bg-ivory p-8 sm:p-10">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="q-name">Name</FieldLabel>
          <Input
            id="q-name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="q-phone">WhatsApp / Phone</FieldLabel>
          <Input
            id="q-phone"
            required
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="q-location">Area / Location</FieldLabel>
        <Input
          id="q-location"
          required
          value={form.location}
          onChange={(event) => update("location", event.target.value)}
        />
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="q-room">Room / space</FieldLabel>
          <select
            id="q-room"
            className="h-12 w-full border-b border-charcoal/20 bg-transparent outline-none"
            value={form.room}
            onChange={(event) => update("room", event.target.value)}
          >
            <option value="">Not sure yet</option>
            {rooms.map((room) => (
              <option key={room.slug} value={room.slug}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="q-interest">What do you need?</FieldLabel>
          <select
            id="q-interest"
            className="h-12 w-full border-b border-charcoal/20 bg-transparent outline-none"
            value={form.interest}
            onChange={(event) => update("interest", event.target.value)}
          >
            <option value="">Not sure yet</option>
            {items.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="q-message">What would you like us to make?</FieldLabel>
        <Textarea
          id="q-message"
          placeholder="A modern TV wall, a bedroom background, cabinets…"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </div>
      <Button type="submit" size="lg">
        Request a quotation
      </Button>
      <p className="text-sm text-taupe">
        Something more specific?{" "}
        <Link href="/custom" className="text-charcoal underline-offset-4 hover:underline">
          Send a custom request
        </Link>
      </p>
    </form>
  );
}
