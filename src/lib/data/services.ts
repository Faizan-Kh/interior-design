export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  relatedKinds: Array<"material" | "product" | "service" | "project">;
  visible: boolean;
  order: number;
};

export const services: Service[] = [
  {
    slug: "interior-decoration",
    name: "Interior Decoration",
    short: "A room, considered as a whole.",
    description: "Walls, furniture and finishing planned together — so the space feels finished, not assembled.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["material", "product", "project"],
    visible: true,
    order: 1,
  },
  {
    slug: "wall-feature-designs",
    name: "Wall & Feature Designs",
    short: "The wall that holds the room.",
    description: "Feature walls, headboards, TV backgrounds and decorative treatments — designed around the space you have.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["material", "project"],
    visible: true,
    order: 2,
  },
  {
    slug: "custom-tv-units",
    name: "Custom TV Units",
    short: "Built for the wall, not bought for it.",
    description: "TV units and media walls made to the room — carpentry, panels and lighting as one piece.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["product", "project"],
    visible: true,
    order: 3,
  },
  {
    slug: "bedroom-backgrounds",
    name: "Bedroom Backgrounds",
    short: "The wall you wake up to.",
    description: "Headboard walls, soft backgrounds and bedroom feature work that makes the bed feel placed.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["material", "project"],
    visible: true,
    order: 4,
  },
  {
    slug: "cnc-fabrication",
    name: "CNC Design & Fabrication",
    short: "A pattern, cut for you.",
    description: "2D, 2.5D and 3D CNC work from the workshop — panels, tables, screens and decorative elements.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["product", "project"],
    visible: true,
    order: 5,
  },
  {
    slug: "custom-furniture",
    name: "Custom Furniture & Tables",
    short: "Pieces that do not exist until you ask.",
    description: "Tables, consoles and one-off pieces — designed to the room and made in the workshop.",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["product", "project"],
    visible: true,
    order: 6,
  },
  {
    slug: "cabinets-cupboards",
    name: "Cabinets & Cupboards",
    short: "Storage that looks intended.",
    description: "Kitchen, bedroom and living storage — measured, built and finished to the wall.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["product", "project"],
    visible: true,
    order: 7,
  },
  {
    slug: "wallpapers-materials",
    name: "Wallpapers & Decorative Materials",
    short: "The surface, chosen carefully.",
    description: "Wallpaper, UV boards, PVC and decorative panels — selected, supplied and installed.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["material", "project"],
    visible: true,
    order: 8,
  },
  {
    slug: "custom-projects",
    name: "Custom Projects",
    short: "If you can describe it, we can begin.",
    description: "Exterior numbers, one-off fabrication, mixed materials — work that does not fit a catalogue line.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=80",
    relatedKinds: ["project"],
    visible: true,
    order: 9,
  },
];

export function getVisibleServices() {
  return services.filter((service) => service.visible).sort((a, b) => a.order - b.order);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
