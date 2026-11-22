import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { NotFoundCallout } from "@/components/NotFoundCallout";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug: decodeURIComponent(slug) } });
  if (!cat) return {};
  return {
    title: `${cat.name} — купить с доставкой по Москве 24/7`,
    description: `${cat.name} с доставкой по Москве за 20 минут. Большой выбор, оплата при получении. Работаем круглосуточно.`,
    alternates: { canonical: `/catalog/${cat.slug}` },
    openGraph: {
      title: `${cat.name} — Пьяная Москва`,
      description: `${cat.name} с доставкой по Москве 24/7.`,
      url: `/catalog/${cat.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const category = await prisma.category.findUnique({
    where: { slug },
    include: { products: { where: { inStock: true } } },
  });

  if (!category) notFound();

  return (
    <>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] text-ash uppercase tracking-[0.12em] mb-8 sm:mb-12">
        <Link href="/catalog" className="hover:text-gold transition-colors active:text-gold">Каталог</Link>
        <span className="text-gold/20">/</span>
        <span className="text-ivory">{category.name}</span>
      </div>

      <div className="mb-8 sm:mb-12">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
          {category.name}
        </h1>
        <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {category.products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            slug={p.slug}
            price={p.price}
            image={p.image}
            volume={p.volume}
            abv={p.abv}
            category={slug}
          />
        ))}
      </div>

      {category.products.length === 0 && (
        <div className="text-center py-16 sm:py-24">
          <p className="text-ash">В этой категории пока нет товаров</p>
        </div>
      )}
    </div>
    <NotFoundCallout />
    </>
  );
}
