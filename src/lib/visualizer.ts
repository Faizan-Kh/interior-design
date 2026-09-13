import { getCatalogItem } from "@/lib/data/catalog";
import { getRoom } from "@/lib/data/rooms";

export type VisualizerStep =
  | "photo"
  | "room"
  | "category"
  | "look"
  | "visualizing"
  | "result";

export type VisualizerCategory = {
  id: string;
  name: string;
  description: string;
  image: string;
  itemSlugs: string[];
};

/**
 * Flexible look groups for the preview.
 * Add, hide or rename these later — they are not the whole business.
 */
export const visualizerCategories: VisualizerCategory[] = [
  {
    id: "wallpaper",
    name: "Wallpaper",
    description: "Pattern, linen or a quiet mural.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969ee37d?auto=format&fit=crop&w=1200&q=80",
    itemSlugs: ["wallpaper"],
  },
  {
    id: "pvc-uv",
    name: "PVC / UV Board",
    description: "Stone-look or high-gloss boards.",
    image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?auto=format&fit=crop&w=1200&q=80",
    itemSlugs: ["pvc-marble-panels", "uv-boards"],
  },
  {
    id: "feature-wall",
    name: "Feature Wall",
    description: "The wall that holds the room.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
    itemSlugs: ["fluted-panels", "wood-panels", "3d-panels"],
  },
  {
    id: "tv-wall",
    name: "TV Wall",
    description: "Panels, storage and the screen as one.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    itemSlugs: ["uv-boards", "fluted-panels", "tv-unit"],
  },
  {
    id: "decorative-panel",
    name: "Decorative Panel",
    description: "CNC cuts, 3D panels and screens.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=1200&q=80",
    itemSlugs: ["3d-panels", "decorative-cnc-panel", "wood-panels"],
  },
];

export type VisualizationRequest = {
  roomSlug: string;
  photoDataUrl?: string;
  categoryId: string;
  lookSlug: string;
};

export type VisualizationResult = {
  id: string;
  roomSlug: string;
  categoryId: string;
  lookSlug: string;
  /**
   * MVP uses a local overlay. A future AI service would return `generated`.
   */
  previewMode: "demonstration-overlay";
  estimate: { min: number; max: number; currency: "BHD" };
  createdAt: string;
};

export function getVisualizerCategory(id: string) {
  return visualizerCategories.find((item) => item.id === id);
}

export function getLooksForCategory(categoryId: string) {
  const category = getVisualizerCategory(categoryId);
  if (!category) return [];
  return category.itemSlugs
    .map((slug) => getCatalogItem(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

/**
 * Demonstration preview only.
 *
 * Future AI workflow to plug in here:
 * 1. Send the room photo + selected look reference to an image model
 * 2. Receive a generated visualization
 * 3. Return it as `previewMode: "generated"` with an image URL
 *
 * Do not call this from a server action until a real model is connected.
 */
export function createDemonstrationPreview(
  request: VisualizationRequest,
): VisualizationResult {
  const room = getRoom(request.roomSlug);
  const look = getCatalogItem(request.lookSlug);
  const area = room?.slug === "villa" || room?.slug === "commercial" ? 42 : 22;

  let mid = 520;
  if (look?.kind === "material") {
    const match = look.pricingLabel.match(/(\d+)/g);
    if (match && match.length >= 2) {
      mid = ((Number(match[0]) + Number(match[1])) / 2) * area * 0.55;
    }
  } else if (look?.kind === "product") {
    mid = 780;
  }

  const install = mid * 0.28;

  return {
    id: `viz_${Date.now()}`,
    roomSlug: request.roomSlug,
    categoryId: request.categoryId,
    lookSlug: request.lookSlug,
    previewMode: "demonstration-overlay",
    estimate: {
      min: Math.round((mid + install) * 0.82),
      max: Math.round((mid + install) * 1.25),
      currency: "BHD",
    },
    createdAt: new Date().toISOString(),
  };
}

export const sampleRoomPhotos = [
  {
    id: "sample-living",
    label: "Sample living room",
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-bedroom",
    label: "Sample bedroom",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-empty",
    label: "Sample plain room",
    src: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1600&q=80",
  },
];
