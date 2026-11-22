import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { NotFoundCallout } from "@/components/NotFoundCallout";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог алкоголя — Вино, виски, водка, пиво с доставкой",
  description: "Полный каталог алкоголя с доставкой по Москве. Вино, виски, водка, шампанское, коньяк, джин, ром, текила, пиво, сигареты. Доставка за 20 минут, 24/7.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: "Каталог алкоголя — Пьяная Москва",
    description: "Вино, виски, водка, пиво и многое другое с доставкой по Москве 24/7.",
    url: "/catalog",
    type: "website",
  },
};

export default async function CatalogPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { products: { where: { inStock: true } } },
  });

  return (
    <>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <div className="mb-10 sm:mb-16">
        <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">
          Все напитки
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-ivory">
          Каталог
        </h1>
        <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-16">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.slug}`}
            className="border border-gold/[0.08] hover:border-gold/30 text-ash hover:text-gold text-[11px] sm:text-[12px] uppercase tracking-[0.15em] px-4 sm:px-6 py-2 sm:py-2.5 transition-all duration-500 hover:bg-gold/[0.04] active:bg-gold/[0.06]"
          >
            {cat.name}
            <span className="text-ash/30 ml-1 sm:ml-2">{cat.products.length}</span>
          </a>
        ))}
      </div>

      {categories.map((cat) => (
        <section key={cat.id} className="mb-14 sm:mb-20" id={cat.slug}>
          <div className="flex items-end justify-between mb-5 sm:mb-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-ivory">
                {cat.name}
              </h2>
              <div className="w-8 sm:w-10 h-px bg-gold/30 mt-2 sm:mt-3" />
            </div>
            <Link
              href={`/catalog/${cat.slug}`}
              className="text-ash hover:text-gold text-[11px] uppercase tracking-[0.15em] transition-colors duration-500"
            >
              Все &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {cat.products.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                image={p.image}
                volume={p.volume}
                abv={p.abv}
                category={cat.slug}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
    <NotFoundCallout />
    </>
  );
}
