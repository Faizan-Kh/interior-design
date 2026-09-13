export type Project = {
  slug: string;
  name: string;
  room: string;
  location: string;
  materials: string[];
  description: string;
  image: string;
  detail: string;
  kind?: "interior" | "furniture" | "cnc" | "exterior";
};

export const projects: Project[] = [
  {
    slug: "amwaj-living",
    name: "Amwaj Living Room",
    room: "Living Room",
    location: "Amwaj Islands",
    materials: ["pvc-marble-panels", "spc"],
    description: "A single marble wall and a quieter floor. The room did the rest.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft living room.",
    kind: "interior",
  },
  {
    slug: "riffa-bedroom",
    name: "Riffa Bedroom",
    room: "Bedroom",
    location: "Riffa",
    materials: ["wallpaper", "carpet"],
    description: "Linen wallpaper, a softer carpet, light left alone.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft bedroom.",
    kind: "interior",
  },
  {
    slug: "seef-majlis",
    name: "Seef Majlis",
    room: "Majlis",
    location: "Seef",
    materials: ["wood-panels", "carpet"],
    description: "Vertical timber, a deep carpet, seating that feels ceremonial without being loud.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft majlis.",
    kind: "interior",
  },
  {
    slug: "juffair-balcony",
    name: "Juffair Balcony",
    room: "Balcony",
    location: "Juffair",
    materials: ["artificial-grass", "balcony-solutions"],
    description: "A balcony treated as a room — grass, a finished edge, somewhere to sit.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft balcony.",
    kind: "exterior",
  },
  {
    slug: "saar-villa",
    name: "Saar Villa Hall",
    room: "Villa",
    location: "Saar",
    materials: ["fluted-panels", "laminate"],
    description: "A long wall given rhythm. The hall stopped feeling like a corridor.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft villa.",
    kind: "interior",
  },
  {
    slug: "manama-office",
    name: "Manama Studio",
    room: "Office",
    location: "Manama",
    materials: ["fluted-panels", "spc"],
    description: "A working room with one considered wall and a floor that stays quiet.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder project photography. Replace with a completed SpaceCraft office.",
    kind: "interior",
  },
  {
    slug: "saar-tv-wall",
    name: "Saar TV Wall",
    room: "Living Room",
    location: "Saar",
    materials: ["uv-boards", "fluted-panels"],
    description: "A TV wall built as furniture — storage below, a quiet panel behind.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder. Replace with a completed SpaceCraft TV unit.",
    kind: "furniture",
  },
  {
    slug: "riffa-cabinets",
    name: "Riffa Cabinets",
    room: "Villa",
    location: "Riffa",
    materials: ["cabinet"],
    description: "A run of cabinets that closed the unused wall.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder. Replace with completed carpentry.",
    kind: "furniture",
  },
  {
    slug: "muharraq-cnc",
    name: "Muharraq CNC Screen",
    room: "Villa",
    location: "Muharraq",
    materials: ["decorative-cnc-panel"],
    description: "A cut screen for the stair void — pattern drawn, then fabricated.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=2000&q=80",
    detail: "Placeholder. Replace with workshop CNC photography.",
    kind: "cnc",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByRoom(roomName: string) {
  return projects.filter((project) => project.room.toLowerCase() === roomName.toLowerCase());
}

export function getProjectsByMaterial(materialSlug: string) {
  return projects.filter((project) => project.materials.includes(materialSlug));
}
