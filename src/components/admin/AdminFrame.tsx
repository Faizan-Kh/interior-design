import Link from "next/link";
import { site } from "@/lib/site";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/showroom", label: "Showroom" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/inquiries", label: "Inquiries" },
];

export function AdminFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-ivory">
      <aside className="border-b border-line px-6 py-5 lg:fixed lg:inset-y-0 lg:w-64 lg:border-r lg:border-b-0">
        <p className="font-serif text-2xl">{site.name}</p>
        <p className="mt-1 text-xs text-taupe">Catalog studio — sample data</p>
        <nav className="mt-8 flex flex-wrap gap-4 lg:flex-col">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-walnut">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-10 inline-block text-xs text-taupe">
          ← Back to website
        </Link>
      </aside>
      <div className="lg:pl-64">
        <header className="border-b border-line px-6 py-8 lg:px-12">
          <h1 className="font-serif text-4xl">{title}</h1>
        </header>
        <div className="px-6 py-10 lg:px-12">{children}</div>
      </div>
    </div>
  );
}
