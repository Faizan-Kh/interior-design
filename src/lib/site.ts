export const site = {
  name: "SpaceCraft",
  tagline: "From an idea to your finished space.",
  description:
    "Interior decoration, custom design, CNC fabrication and carpentry in Bahrain — from the first idea to the finished room.",
  url: "https://spacecraft.bh",
  locale: "en_BH",
  country: "Bahrain",
  city: "Manama",
  phone: "+973 1700 0000",
  phoneHref: "tel:+97317000000",
  whatsapp: "+97317000000",
  email: "hello@spacecraft.bh",
  address: {
    street: "",
    locality: "Manama",
    country: "Bahrain",
    countryCode: "BH",
  },
  hours: "Saturday – Thursday, 9:00 – 18:00",
} as const;

export const navLinks = [
  { href: "/services", label: "Services", match: "services" },
  { href: "/projects", label: "Projects", match: "projects" },
  { href: "/showroom", label: "Showroom", match: "showroom" },
  { href: "/design", label: "Design Your Space", match: "design" },
  { href: "/custom", label: "Custom Request", match: "custom" },
] as const;
