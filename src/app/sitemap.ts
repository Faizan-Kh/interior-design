import type { MetadataRoute } from "next";
import { rooms } from "@/lib/data/rooms";
import { styles } from "@/lib/data/styles";
import { catalogItems } from "@/lib/data/catalog";
import { projects } from "@/lib/data/projects";
import { getVisibleServices } from "@/lib/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/services",
    "/projects",
    "/showroom",
    "/design",
    "/custom",
    "/quote",
    "/measure",
    "/rooms",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
  }));

  return [
    ...staticRoutes,
    ...getVisibleServices().map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
    })),
    ...rooms.map((room) => ({ url: `${site.url}/rooms/${room.slug}`, lastModified: now })),
    ...styles.map((style) => ({ url: `${site.url}/styles/${style.slug}`, lastModified: now })),
    ...catalogItems.map((item) => ({
      url: `${site.url}/showroom/${item.slug}`,
      lastModified: now,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: now,
    })),
  ];
}
