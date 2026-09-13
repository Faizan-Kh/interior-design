import Link from "next/link";
import { catalogItems } from "@/lib/data/catalog";
import { projects } from "@/lib/data/projects";
import { inquiries } from "@/lib/data/inquiries";
import { getVisibleServices } from "@/lib/data/services";
import { AdminFrame } from "@/components/admin/AdminFrame";

export default function AdminHomePage() {
  const cards = [
    { label: "Showroom items", value: catalogItems.filter((item) => item.visible).length, href: "/admin/showroom" },
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    { label: "Services", value: getVisibleServices().length, href: "/admin/services" },
    { label: "New inquiries", value: inquiries.filter((item) => item.status === "new").length, href: "/admin/inquiries" },
  ];

  return (
    <AdminFrame title="Your digital workshop">
      <p className="max-w-xl text-muted">
        This is a preview of how the business can stay organized online.
        Real products and project photos replace these samples later.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="border border-line p-6 hover:border-charcoal/30">
            <p className="eyebrow">{card.label}</p>
            <p className="mt-4 font-serif text-5xl">{card.value}</p>
          </Link>
        ))}
      </div>
    </AdminFrame>
  );
}
