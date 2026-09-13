"use client";

import { useState } from "react";
import { rooms } from "@/lib/data/rooms";
import { track } from "@/lib/analytics";
import { measurementWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input, Textarea } from "@/components/ui/input";

export function MeasurementForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    room: "living-room",
    date: "",
    message: "",
  });

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    track("measurement_requested", {
      room: form.room,
      location: form.location,
    });
    const roomName = rooms.find((room) => room.slug === form.room)?.name;
    window.open(
      buildWhatsAppUrl(
        measurementWhatsAppMessage({
          name: form.name,
          room: roomName,
          location: form.location,
          date: form.date,
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
        <p className="mt-4 font-serif text-3xl">We’ll confirm the visit on WhatsApp.</p>
        <p className="mt-4 text-muted">
          If the chat did not open, use the WhatsApp button and mention a free measurement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-7" : "border border-line bg-ivory p-8 sm:p-10"}>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="phone">WhatsApp / Phone</FieldLabel>
          <Input
            id="phone"
            required
            inputMode="tel"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="location">Area / Location</FieldLabel>
          <Input
            id="location"
            required
            placeholder="e.g. Amwaj, Riffa"
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="room">Room type</FieldLabel>
          <select
            id="room"
            className="h-12 w-full border-b border-charcoal/20 bg-transparent outline-none"
            value={form.room}
            onChange={(event) => update("room", event.target.value)}
          >
            {rooms.map((room) => (
              <option key={room.slug} value={room.slug}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <FieldLabel htmlFor="date">Preferred date</FieldLabel>
        <Input
          id="date"
          type="date"
          value={form.date}
          onChange={(event) => update("date", event.target.value)}
        />
      </div>
      <div>
        <FieldLabel htmlFor="message">Optional message</FieldLabel>
        <Textarea
          id="message"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </div>
      <Button type="submit" size="lg" className="mt-4">
        Book a Free Measurement
      </Button>
    </form>
  );
}
