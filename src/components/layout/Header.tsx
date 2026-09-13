"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;
  const solid = pathname !== "/" || scrolled || open;

  useEffect(() => {
    const sentinel = document.querySelector("[data-hero-top]");
    if (!sentinel || pathname !== "/") {
      setScrolled(pathname !== "/");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-8px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        solid
          ? "bg-ivory/92 shadow-[0_1px_0_var(--line)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="container-wide flex h-[76px] items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-serif text-[1.55rem] tracking-tight",
            overHero ? "text-ivory" : "text-charcoal",
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[0.75rem] tracking-[0.1em] uppercase transition-colors",
                overHero
                  ? "text-ivory/78 hover:text-ivory"
                  : "text-charcoal/70 hover:text-charcoal",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant={overHero && !open ? "invert" : "primary"}
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/quote">Get a Quote</Link>
          </Button>
          <button
            type="button"
            className={cn(
              "lg:hidden",
              overHero && !open ? "text-ivory" : "text-charcoal",
            )}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X strokeWidth={1.4} /> : <Menu strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 top-[76px] z-40 bg-ivory lg:hidden"
          >
            <div className="container-page flex h-full flex-col justify-between py-12">
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.06 * index, duration: reduce ? 0 : 0.5 }}
                  >
                    <Link
                      href={link.href}
                      className="font-serif text-4xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <Button asChild size="lg">
                <Link href="/quote" onClick={() => setOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
