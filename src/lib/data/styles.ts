export type Style = {
  slug: string;
  name: string;
  feeling: string;
  image: string;
  rooms: string[];
  materials: string[];
};

export const styles: Style[] = [
  {
    slug: "modern",
    name: "Modern",
    feeling: "Clean lines. Quiet confidence.",
    image: "https://images.unsplash.com/photo-1600210492499-bcc1068036d6?auto=format&fit=crop&w=1600&q=80",
    rooms: ["living-room", "office", "bedroom"],
    materials: ["spc", "fluted-panels", "vinyl"],
  },
  {
    slug: "luxury",
    name: "Luxury",
    feeling: "Depth, sheen and presence.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    rooms: ["living-room", "majlis", "villa"],
    materials: ["pvc-marble-panels", "wallpaper", "parquet"],
  },
  {
    slug: "minimal",
    name: "Minimal",
    feeling: "Less material. More calm.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    rooms: ["bedroom", "office", "balcony"],
    materials: ["wood-panels", "spc", "laminate"],
  },
  {
    slug: "warm-cozy",
    name: "Warm & Cozy",
    feeling: "Soft light. Soft edges.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
    rooms: ["bedroom", "dining-room", "living-room"],
    materials: ["wallpaper", "carpet", "wood-panels"],
  },
  {
    slug: "classic",
    name: "Classic",
    feeling: "Familiar, but finely done.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80",
    rooms: ["dining-room", "majlis", "villa"],
    materials: ["wallpaper", "parquet", "wood-panels"],
  },
  {
    slug: "contemporary-arabic",
    name: "Contemporary Arabic",
    feeling: "Heritage, spoken quietly.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    rooms: ["majlis", "villa", "living-room"],
    materials: ["wallpaper", "pvc-marble-panels", "carpet"],
  },
  {
    slug: "natural",
    name: "Natural",
    feeling: "Wood, stone, air.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    rooms: ["balcony", "villa", "bedroom"],
    materials: ["wood-panels", "artificial-grass", "laminate"],
  },
  {
    slug: "bold",
    name: "Bold",
    feeling: "A wall that starts the conversation.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1600&q=80",
    rooms: ["living-room", "office", "commercial"],
    materials: ["3d-panels", "wallpaper", "pvc-marble-panels"],
  },
];

export function getStyle(slug: string) {
  return styles.find((style) => style.slug === slug);
}
