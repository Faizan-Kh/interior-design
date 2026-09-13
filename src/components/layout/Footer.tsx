"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/showroom", label: "Showroom" },
  { href: "/design", label: "Design Your Space" },
  { href: "/custom", label: "Custom Request" },
  { href: "/quote", label: "Get a Quote" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-line bg-ivory-deep">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl">{site.name}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Interior decoration, custom design, CNC and carpentry.
            Manama, Bahrain.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-ink">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-walnut">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5">Visit</p>
          <p className="text-sm leading-7 text-ink">
            {site.city}, {site.country}
            <br />
            {site.hours}
            <br />
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
          <p className="mt-6">
            <Link href="/admin" className="text-xs text-taupe hover:text-charcoal">
              Catalog studio
            </Link>
          </p>
        </div>
      </div>
      <div className="container-wide flex flex-col gap-2 border-t border-line py-6 text-xs text-taupe sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Design, fabrication and installation across Bahrain.</p>
      </div>
    </footer>
  );
}
