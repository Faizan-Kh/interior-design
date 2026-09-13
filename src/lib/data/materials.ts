export type MaterialCategory = "walls" | "flooring" | "outdoor";

export type Material = {
  slug: string;
  name: string;
  category: MaterialCategory;
  description: string;
  styles: string[];
  application: string;
  image: string;
  texture: string;
  estimate: { min: number; max: number; unit: string };
};

export const materialCategories: { id: MaterialCategory; label: string }[] = [
  { id: "walls", label: "Walls" },
  { id: "flooring", label: "Flooring" },
  { id: "outdoor", label: "Outdoor" },
];

export const materials: Material[] = [
  {
    slug: "wallpaper",
    name: "Wallpaper",
    category: "walls",
    description: "Pattern, linen, mural or quiet texture — chosen for the light in your room.",
    styles: ["Luxury", "Classic", "Bold"],
    application: "Bedrooms, majlis, dining rooms",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 8, max: 22, unit: "BHD / m²" },
  },
  {
    slug: "pvc-marble-panels",
    name: "PVC / Marble Panels",
    category: "walls",
    description: "The presence of stone, without the weight. Seamless, washable, architectural.",
    styles: ["Luxury", "Modern", "Contemporary Arabic"],
    application: "Living rooms, entrances, feature walls",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 14, max: 32, unit: "BHD / m²" },
  },
  {
    slug: "fluted-panels",
    name: "Fluted Panels",
    category: "walls",
    description: "Rhythm on the wall. Soft shadow, vertical line, a room that feels considered.",
    styles: ["Modern", "Minimal", "Warm & Cozy"],
    application: "TV walls, bedrooms, offices",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 12, max: 26, unit: "BHD / m²" },
  },
  {
    slug: "wood-panels",
    name: "Wood Panels",
    category: "walls",
    description: "Warmth you can see from the doorway. Natural grain, or a quieter stain.",
    styles: ["Natural", "Warm & Cozy", "Classic"],
    application: "Living rooms, studies, villa corridors",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 13, max: 28, unit: "BHD / m²" },
  },
  {
    slug: "uv-boards",
    name: "UV Boards",
    category: "walls",
    description: "A high-gloss or matte board for TV walls, kitchens and feature backgrounds.",
    styles: ["Modern", "Luxury", "Minimal"],
    application: "TV walls, cabinets, feature backgrounds",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 12, max: 26, unit: "BHD / m²" },
  },
  {
    slug: "3d-panels",
    name: "3D Decorative Panels",
    category: "walls",
    description: "A wall with dimension. Used sparingly, they become the room.",
    styles: ["Bold", "Modern", "Luxury"],
    application: "Feature walls, reception, commercial",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 11, max: 24, unit: "BHD / m²" },
  },
  {
    slug: "spc",
    name: "SPC Flooring",
    category: "flooring",
    description: "Stone-polymer strength underfoot. Quiet, waterproof, made for daily life.",
    styles: ["Modern", "Minimal", "Luxury"],
    application: "Living rooms, kitchens, commercial",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1615876234885-b0c5c0d0e8b0?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 9, max: 18, unit: "BHD / m²" },
  },
  {
    slug: "vinyl",
    name: "Vinyl",
    category: "flooring",
    description: "Soft step, easy care. A practical floor that still looks finished.",
    styles: ["Modern", "Warm & Cozy", "Minimal"],
    application: "Bedrooms, offices, rental homes",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 6, max: 14, unit: "BHD / m²" },
  },
  {
    slug: "laminate",
    name: "Laminate",
    category: "flooring",
    description: "The look of timber, ready for family life. Fast to install, simple to live with.",
    styles: ["Natural", "Classic", "Minimal"],
    application: "Bedrooms, dining, corridors",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 7, max: 15, unit: "BHD / m²" },
  },
  {
    slug: "carpet",
    name: "Carpet",
    category: "flooring",
    description: "Quiet underfoot. Chosen for bedrooms, majlis and rooms that should feel held.",
    styles: ["Warm & Cozy", "Luxury", "Contemporary Arabic"],
    application: "Bedrooms, majlis, media rooms",
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 8, max: 20, unit: "BHD / m²" },
  },
  {
    slug: "parquet",
    name: "Parquet",
    category: "flooring",
    description: "A floor with history in the pattern. For rooms that should feel established.",
    styles: ["Classic", "Luxury", "Natural"],
    application: "Dining rooms, villas, studies",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 16, max: 34, unit: "BHD / m²" },
  },
  {
    slug: "artificial-grass",
    name: "Artificial Grass",
    category: "outdoor",
    description: "Green that stays. For balconies, terraces and the edge of the villa.",
    styles: ["Natural", "Modern", "Minimal"],
    application: "Balconies, terraces, play areas",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 7, max: 16, unit: "BHD / m²" },
  },
  {
    slug: "outdoor-flooring",
    name: "Outdoor Flooring",
    category: "outdoor",
    description: "Decking and weather-ready boards that make the outside feel intended.",
    styles: ["Natural", "Modern", "Minimal"],
    application: "Terraces, pool edges, outdoor seating",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 10, max: 22, unit: "BHD / m²" },
  },
  {
    slug: "balcony-solutions",
    name: "Balcony Solutions",
    category: "outdoor",
    description: "Floor, screening and finish — a balcony treated as a room, not leftover space.",
    styles: ["Natural", "Minimal", "Warm & Cozy"],
    application: "Apartments and villa terraces",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdac?auto=format&fit=crop&w=1600&q=80",
    texture: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=800&q=80",
    estimate: { min: 12, max: 28, unit: "BHD / m²" },
  },
];

export function getMaterial(slug: string) {
  return materials.find((material) => material.slug === slug);
}

export function getMaterialsByCategory(category: MaterialCategory) {
  return materials.filter((material) => material.category === category);
}

export function getMaterialsBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getMaterial(slug))
    .filter((material): material is Material => Boolean(material));
}
