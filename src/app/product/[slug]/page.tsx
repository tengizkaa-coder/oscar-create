import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductImage } from "@/components/ProductImage";
import type { Metadata } from "next";

const SITE_URL = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug: decodeURIComponent(slug) }, include: { category: true } });
  if (!product) return {};
  return {
    title: `${product.name} — купить с доставкой по Москве`,
    description: `${product.name} ${product.volume} ${product.abv}. ${product.description} Доставка по Москве за 20 минут, 24/7. Оплата при получении.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: `${product.name} — Пьяная Москва`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: product.image ? [{ url: product.image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image ? `${SITE_URL}${product.image}` : undefined,
    category: product.category.name,
    brand: { "@type": "Brand", name: product.name.split(" ")[0] },
    offers: {
      "@type": "Offer",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "RUB",
      price: product.price,
      seller: { "@type": "Organization", name: "Пьяная Москва" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Каталог", item: `${SITE_URL}/catalog` },
      { "@type": "ListItem", position: 2, name: product.category.name, item: `${SITE_URL}/catalog/${product.category.slug}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${SITE_URL}/product/${product.slug}` },
    ],
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Breadcrumb — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-3 text-[12px] text-ash uppercase tracking-[0.12em] mb-8 sm:mb-12">
        <Link href="/catalog" className="hover:text-gold transition-colors">Каталог</Link>
        <span className="text-gold/20">/</span>
        <Link href={`/catalog/${product.category.slug}`} className="hover:text-gold transition-colors">
          {product.category.name}
        </Link>
        <span className="text-gold/20">/</span>
        <span className="text-ivory truncate">{product.name}</span>
      </div>

      {/* Mobile back link */}
      <Link href="/catalog" className="sm:hidden text-ash text-[12px] uppercase tracking-[0.12em] mb-6 block">
        &larr; Каталог
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-20">
        {/* Image */}
        <div className="rounded-sm overflow-hidden">
          {product.image ? (
            <div className="relative product-img-hover">
              <img
                src={product.image}
                alt={product.name}
                className="product-img-dark w-full h-auto transition-opacity duration-500"
              />
              <img
                src={product.image.replace(/\.(png|webp)$/, "-light.$1")}
                alt={product.name}
                className="product-img-light absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
              />
            </div>
          ) : (
            <div className="aspect-square">
              <ProductImage
                category={product.category.slug}
                name={product.name}
                size="lg"
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted border border-gold/10 px-2 sm:px-3 py-1">
              {product.category.name}
            </span>
            {product.volume && (
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ash">{product.volume}</span>
            )}
            {product.abv && (
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ash">{product.abv}</span>
            )}
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-ivory leading-tight mb-4 sm:mb-6">
            {product.name}
          </h1>

          <div className="w-8 sm:w-10 h-px bg-gold/30 mb-5 sm:mb-8" />

          <p className="text-ivory-muted leading-[1.8] mb-4 sm:mb-6 text-[13px] sm:text-[15px]">
            {product.description}
          </p>

          {/* Hint for products with flavor/variant choices */}
          {(product.slug.includes("durex") || product.slug.includes("parliament") || product.slug.includes("marlboro") || product.slug.includes("heets") || product.slug.includes("coconara")) && (
            <div className="bg-gold/[0.06] border border-gold/10 rounded-sm px-4 py-3 mb-6 sm:mb-10">
              <p className="text-gold text-[12px] sm:text-[13px]">
                Уточните нужный вкус или вариант в комментарии при оформлении заказа
              </p>
            </div>
          )}

          {!product.slug.includes("durex") && !product.slug.includes("parliament") && !product.slug.includes("marlboro") && !product.slug.includes("heets") && !product.slug.includes("coconara") && (
            <div className="mb-4 sm:mb-4" />
          )}

          <div className="mb-6 sm:mb-10" />

          {product.inStock ? (
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              type="product"
            />
          ) : (
            <p className="text-wine-bright text-[12px] uppercase tracking-[0.2em]">Нет в наличии</p>
          )}

          {/* Delivery info */}
          <div className="mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-gold/[0.06] grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-1">Доставка</p>
              <p className="text-ivory-muted text-xs sm:text-sm">от 30 мин, 24/7</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold-muted mb-1">Оплата</p>
              <p className="text-ivory-muted text-xs sm:text-sm">при получении</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
