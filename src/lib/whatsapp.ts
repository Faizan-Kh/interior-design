import { site } from "@/lib/site";

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function designWhatsAppMessage(input: {
  room?: string;
  category?: string;
  look?: string;
  wall?: string;
  floor?: string;
  style?: string;
}) {
  const room = input.room ?? "a room";
  const look = input.look ?? [input.wall, input.floor].filter(Boolean).join(" and ");
  const category = input.category ? ` (${input.category})` : "";
  const style = input.style ? ` in a ${input.style} style` : "";
  const materialLine = look
    ? ` using ${look}${category}`
    : " and would like help choosing a look";

  return `Hello SpaceCraft, I designed ${room}${style}${materialLine} and would like a quotation.`;
}

export function quoteWhatsAppMessage(input: {
  name?: string;
  room?: string;
  location?: string;
  interest?: string;
  note?: string;
}) {
  const name = input.name ? `My name is ${input.name}. ` : "";
  const room = input.room ? ` for a ${input.room}` : "";
  const location = input.location ? ` in ${input.location}` : "";
  const interest = input.interest ? ` Interested in ${input.interest}.` : "";
  const note = input.note ? ` ${input.note}` : "";
  return `Hello SpaceCraft, ${name}I would like a quotation${room}${location}.${interest}${note}`;
}

export function customWhatsAppMessage(input: {
  name?: string;
  location?: string;
  idea?: string;
  material?: string;
  size?: string;
  budget?: string;
  photos?: number;
}) {
  const name = input.name ? `My name is ${input.name}. ` : "";
  const location = input.location ? ` Location: ${input.location}.` : "";
  const material = input.material ? ` Preferred material: ${input.material}.` : "";
  const size = input.size ? ` Approximate size: ${input.size}.` : "";
  const budget = input.budget ? ` Budget: ${input.budget}.` : "";
  const photos = input.photos ? ` I have ${input.photos} reference photo${input.photos === 1 ? "" : "s"} to send.` : "";
  const idea = input.idea ? ` ${input.idea}` : " I have a custom idea.";
  return `Hello SpaceCraft, ${name}I would like a custom quotation.${idea}${material}${size}${budget}${photos}${location}`;
}

export function measurementWhatsAppMessage(input: {
  name?: string;
  room?: string;
  location?: string;
  date?: string;
}) {
  const name = input.name ? `My name is ${input.name}. ` : "";
  const room = input.room ? ` for a ${input.room}` : "";
  const location = input.location ? ` in ${input.location}` : "";
  const date = input.date ? ` Preferred date: ${input.date}.` : "";
  return `Hello SpaceCraft, ${name}I would like to book a free home measurement${room}${location}.${date}`;
}
