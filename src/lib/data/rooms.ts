export type Room = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  materials: string[];
  styles: string[];
};

export const rooms: Room[] = [
  {
    slug: "bedroom",
    name: "Bedroom",
    short: "The wall you wake up to.",
    description: "Headboard walls, quiet finishes and custom pieces that make the bedroom feel placed.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
    materials: ["wallpaper", "fluted-panels", "carpet"],
    styles: ["warm-cozy", "minimal", "luxury"],
  },
  {
    slug: "living-room",
    name: "Living Room",
    short: "The room everyone remembers.",
    description: "TV walls, feature panels and furniture planned as one — not as leftover pieces.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
    materials: ["pvc-marble-panels", "wood-panels", "spc"],
    styles: ["modern", "luxury", "contemporary-arabic"],
  },
  {
    slug: "majlis",
    name: "Majlis",
    short: "Hospitality, made material.",
    description: "Decorative walls, carpentry and finishes that feel generous — for gathering and quiet formality.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
    materials: ["wallpaper", "wood-panels", "carpet"],
    styles: ["contemporary-arabic", "luxury", "classic"],
  },
  {
    slug: "dining-room",
    name: "Dining Room",
    short: "Evenings that linger.",
    description: "Texture at eye level. A floor that grounds the table. Light that flatters the room.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1800&q=80",
    materials: ["wallpaper", "fluted-panels", "laminate"],
    styles: ["classic", "warm-cozy", "luxury"],
  },
  {
    slug: "balcony",
    name: "Balcony",
    short: "A little more outdoors.",
    description: "Grass, outdoor flooring and balcony solutions that make the edge of the home feel finished.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    materials: ["artificial-grass", "outdoor-flooring", "balcony-solutions"],
    styles: ["natural", "minimal", "modern"],
  },
  {
    slug: "office",
    name: "Office",
    short: "Focus, without feeling cold.",
    description: "Quiet panels, clean flooring and materials that photograph well on a call.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1800&q=80",
    materials: ["fluted-panels", "spc", "wood-panels"],
    styles: ["minimal", "modern", "bold"],
  },
  {
    slug: "villa",
    name: "Villa",
    short: "A whole home, considered.",
    description: "Materials that connect rooms — from the entrance to the last bedroom.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
    materials: ["pvc-marble-panels", "spc", "wood-panels"],
    styles: ["luxury", "contemporary-arabic", "natural"],
  },
  {
    slug: "commercial",
    name: "Commercial Space",
    short: "Spaces people walk into.",
    description: "Durable finishes for shops, clinics and offices that still feel designed.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
    materials: ["spc", "pvc-marble-panels", "3d-panels"],
    styles: ["modern", "bold", "minimal"],
  },
];

export function getRoom(slug: string) {
  return rooms.find((room) => room.slug === slug);
}
