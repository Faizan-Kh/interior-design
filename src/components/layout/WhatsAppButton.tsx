"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={buildWhatsAppUrl(
        "Hello SpaceCraft, I would like help transforming my space.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_clicked", { source: "floating" })}
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#2f6b4f] text-ivory shadow-[0_12px_30px_rgba(28,25,22,0.18)] transition-transform duration-500 hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
    </a>
  );
}
