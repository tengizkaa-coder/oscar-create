import { prisma } from "@/lib/db";
import type { MetadataRoute } from "next";

const BASE = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({ select: { slug: true, createdAt: true } });
  const categories = await prisma.category.findMany({ select: { slug: true } });
  const sets = await prisma.productSet.findMany({ select: { slug: true, createdAt: true } });

  return [
    { url: BASE, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/catalog`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/sets`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/cart`, changeFrequency: "always", priority: 0.5 },
    ...categories.map((c) => ({
      url: `${BASE}/catalog/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${BASE}/product/${p.slug}`,
      lastModified: p.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...sets.map((s) => ({
      url: `${BASE}/set/${s.slug}`,
      lastModified: s.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
