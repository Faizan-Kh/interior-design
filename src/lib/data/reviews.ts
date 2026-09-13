export type Review = {
  name: string;
  project: string;
  location: string;
  quote: string;
  placeholder: true;
};

export const reviews: Review[] = [
  {
    name: "A. Al-Khalifa",
    project: "Living room, Amwaj",
    location: "Amwaj Islands",
    quote: "They understood the room before they talked about the product. The wall is the first thing people notice.",
    placeholder: true,
  },
  {
    name: "Sara M.",
    project: "Bedroom, Riffa",
    location: "Riffa",
    quote: "I did not know what to choose. They brought samples, measured once, and the room felt finished.",
    placeholder: true,
  },
  {
    name: "Hassan R.",
    project: "Majlis, Seef",
    location: "Seef",
    quote: "The installation team was careful. The materials look like they belong to the house, not like they were added on.",
    placeholder: true,
  },
  {
    name: "N. Yusuf",
    project: "Cabinets, Riffa",
    location: "Riffa",
    quote: "I sent a photo of a cupboard I liked. They measured the wall and built something that actually fits.",
    placeholder: true,
  },
];
