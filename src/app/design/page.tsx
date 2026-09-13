import type { Metadata } from "next";
import { Suspense } from "react";
import { RoomVisualizer } from "@/components/visualizer/RoomVisualizer";

export const metadata: Metadata = {
  title: "Design your space",
  description:
    "Upload a photo of your room and preview how a feature wall, TV background or material could look.",
};

export default function DesignPage() {
  return (
    <Suspense fallback={<div className="min-h-svh bg-ivory" />}>
      <RoomVisualizer />
    </Suspense>
  );
}
