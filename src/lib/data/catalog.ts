import { materials, type Material } from "@/lib/data/materials";

export type CatalogKind = "material" | "product" | "service";
export type ShowroomFilter = CatalogKind | "all" | "project";

export type CatalogItem = {
  slug: string;
  name: string;
  kind: CatalogKind;
  category: string;
  description: string;
  image: string;
  texture?: string;
  finishes?: string[];
  application?: string;
  pricingLabel: string;
  visible: boolean;
  order: number;
};

export const catalogKinds: { id: ShowroomFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "material", label: "Materials" },
  { id: "product", label: "Products" },
  { id: "service", label: "Services" },
  { id: "project", label: "Projects" },
];

const products: CatalogItem[] = [
  {
    slug: "tv-unit",
    name: "Custom TV Unit",
    kind: "product",
    category: "Living",
    description: "A media wall built to the room — storage, panels and the screen as one.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    finishes: ["Fluted wood", "UV board", "Painted MDF"],
    application: "Living rooms, majlis, bedrooms",
    pricingLabel: "Request quote",
    visible: true,
    order: 1,
  },
  {
    slug: "cabinet",
    name: "Custom Cabinet",
    kind: "product",
    category: "Storage",
    description: "Cabinets measured to the wall and built in the workshop.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    finishes: ["Walnut", "White lacquer", "Soft-close"],
    application: "Kitchens, living rooms, studies",
    pricingLabel: "Request quote",
    visible: true,
    order: 2,
  },
  {
    slug: "cupboard",
    name: "Cupboard",
    kind: "product",
    category: "Storage",
    description: "Bedroom and utility cupboards that sit flush and stay quiet.",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=80",
    finishes: ["Mirror", "Wood veneer", "Painted"],
    application: "Bedrooms, dressing rooms",
    pricingLabel: "Request quote",
    visible: true,
    order: 3,
  },
  {
    slug: "cnc-table",
    name: "CNC Table",
    kind: "product",
    category: "Furniture",
    description: "A table with a cut pattern — 2D or 2.5D — made for the room it sits in.",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?auto=format&fit=crop&w=1600&q=80",
    finishes: ["Oak", "Walnut", "Painted CNC"],
    application: "Dining, consoles, coffee tables",
    pricingLabel: "Request quote",
    visible: true,
    order: 4,
  },
  {
    slug: "decorative-cnc-panel",
    name: "Decorative CNC Panel",
    kind: "product",
    category: "CNC",
    description: "Screens, mashrabiya-inspired cuts and feature panels from the CNC workshop.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1600&q=80",
    finishes: ["2D", "2.5D", "3D"],
    application: "Feature walls, partitions, doors",
    pricingLabel: "Request quote",
    visible: true,
    order: 5,
  },
];

const serviceItems: CatalogItem[] = [
  {
    slug: "carpentry",
    name: "Carpentry",
    kind: "service",
    category: "Workshop",
    description: "Built-in work — units, frames and furniture made to measure.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    application: "Homes and commercial interiors",
    pricingLabel: "Request quote",
    visible: true,
    order: 1,
  },
  {
    slug: "installation",
    name: "Installation",
    kind: "service",
    category: "On site",
    description: "Professional fitting of walls, units and decorative work.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    application: "Across Bahrain",
    pricingLabel: "Included in project quote",
    visible: true,
    order: 2,
  },
  {
    slug: "custom-design",
    name: "Custom Design",
    kind: "service",
    category: "Studio",
    description: "Bring a reference, a sketch or a sentence. We turn it into a buildable plan.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    application: "Any room or exterior detail",
    pricingLabel: "Request quote",
    visible: true,
    order: 3,
  },
];

function fromMaterial(material: Material, order: number): CatalogItem {
  return {
    slug: material.slug,
    name: material.name,
    kind: "material",
    category: material.category,
    description: material.description,
    image: material.image,
    texture: material.texture,
    finishes: material.styles,
    application: material.application,
    pricingLabel: `${material.estimate.min}–${material.estimate.max} ${material.estimate.unit}`,
    visible: true,
    order,
  };
}

export const catalogItems: CatalogItem[] = [
  ...materials.map((material, index) => fromMaterial(material, index + 1)),
  ...products,
  ...serviceItems,
];

export function getVisibleCatalog(kind?: CatalogKind) {
  return catalogItems
    .filter((item) => item.visible && (!kind || item.kind === kind))
    .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function getCatalogItem(slug: string) {
  return catalogItems.find((item) => item.slug === slug);
}

export function getCatalogName(slug: string) {
  return getCatalogItem(slug)?.name;
}
