import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImage } from "@/components/ProductImage";
import type { Metadata } from "next";

const SITE_URL = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const set = await prisma.productSet.findUnique({ where: { slug: decodeURIComponent(slug) } });
  if (!set) return {};
  return {
    title: `${set.name} — готовый сет с доставкой по Москве`,
    description: `${set.name}. ${set.description} Готовый набор алкоголя с доставкой по Москве 24/7. Оплата при получении.`,
    alternates: { canonical: `/set/${set.slug}` },
    openGraph: {
      title: `${set.name} — Пьяная Москва`,
      description: set.description,
      url: `/set/${set.slug}`,
      images: set.image ? [{ url: set.image }] : undefined,
      type: "website",
    },
  };
}

export default async function SetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const set = await prisma.productSet.findUnique({
    where: { slug },
    include: { items: { include: { product: true } } },
  });

  if (!set) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: set.name,
    description: set.description,
    image: set.image ? `${SITE_URL}${set.image}` : undefined,
    brand: { "@type": "Brand", name: "Пьяная Москва" },
    offers: {
      "@type": "Offer",
      availability: set.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/set/${set.slug}`,
      priceCurrency: "RUB",
      price: set.price,
      seller: { "@type": "Organization", name: "Пьяная Москва" },
    },
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hidden sm:flex items-center gap-3 text-[12px] text-ash uppercase tracking-[0.12em] mb-8 sm:mb-12">
        <Link href="/sets" className="hover:text-gold transition-colors">Сеты</Link>
        <span className="text-gold/20">/</span>
        <span className="text-ivory">{set.name}</span>
      </div>

      <Link href="/sets" className="sm:hidden text-ash text-[12px] uppercase tracking-[0.12em] mb-6 block">
        &larr; Сеты
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-20">
        <div className="rounded-sm overflow-hidden aspect-square border border-gold/[0.06]">
          <ProductImage category="set" name={set.name} image={set.image} type="set" size="lg" />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">Набор</p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-ivory mb-4 sm:mb-6">
            {set.name}
          </h1>
          <div className="w-8 sm:w-10 h-px bg-gold/30 mb-5 sm:mb-8" />
          <p className="text-ivory-muted leading-[1.8] mb-6 sm:mb-10 text-[13px] sm:text-[15px]">
            {set.description}
          </p>

          <div className="bg-noir-surface border border-gold/[0.06] p-4 sm:p-6 mb-6 sm:mb-10">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-4 sm:mb-5">Состав набора</p>
            <ul className="space-y-2.5 sm:space-y-3">
              {set.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="w-1 h-1 bg-gold/50 rounded-full shrink-0" />
                    <span className="text-[12px] sm:text-[13px] text-ivory-muted truncate">
                      {item.product?.name || item.customName}
                      {item.quantity > 1 && ` \u00D7${item.quantity}`}
                    </span>
                  </div>
                  {item.product && (
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="text-[10px] uppercase tracking-[0.15em] text-gold/50 hover:text-gold transition-colors shrink-0"
                    >
                      Открыть
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 sm:mb-10" />

          {set.inStock ? (
            <AddToCartButton id={set.id} name={set.name} price={set.price} image={set.image} type="set" />
          ) : (
            <p className="text-wine-bright text-[12px] uppercase tracking-[0.2em]">Нет в наличии</p>
          )}
        </div>
      </div>
    </div>
  );
}
