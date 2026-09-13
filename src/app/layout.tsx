import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Interior decoration & custom work, Bahrain`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "interior decoration Bahrain",
    "custom furniture Bahrain",
    "CNC design Bahrain",
    "TV unit Bahrain",
    "wallpaper Bahrain",
    "interior design Bahrain",
    "carpentry Bahrain",
    "custom cabinets Bahrain",
  ],
  openGraph: {
    title: `${site.name} — From an idea to your finished space.`,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
    url: site.url,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        alt: "Warm interior living space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — From an idea to your finished space.`,
    description: site.description,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  alternates: {
    canonical: site.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressCountry: site.address.countryCode,
  },
  areaServed: {
    "@type": "Country",
    name: "Bahrain",
  },
  priceRange: "$$",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory font-sans text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
