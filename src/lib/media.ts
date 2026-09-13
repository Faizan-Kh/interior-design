/**
 * Development imagery from Unsplash.
 * Replace these paths with real SpaceCraft project photography
 * by pointing each key to a file under /public/images.
 */
export const media = {
  hero: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    alt: "Architectural living space with stone, timber and low evening light",
  },
  heroStill: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=80",
    alt: "Quiet modern interior with sculptural furniture",
  },
  before: {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2000&q=80",
    alt: "Unfinished apartment with plain walls",
  },
  after: {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80",
    alt: "Finished living room with warm lighting and tailored furnishings",
  },
  finalCta: {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=80",
    alt: "Evening interior with layered lighting and natural materials",
  },
  measurement: {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
    alt: "Calm bedroom corner with linen and pale wood",
  },
} as const;

export type MediaAsset = {
  src: string;
  alt: string;
};
