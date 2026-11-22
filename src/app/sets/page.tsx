import Link from "next/link";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Готовые сеты алкоголя — Наборы с доставкой по Москве",
  description:
    "Готовые наборы алкоголя для любого повода: романтический вечер, вечер с друзьями, винная дегустация, праздничный сет. Бесплатная доставка по Москве 24/7. Оплата при получении.",
  keywords: [
    "готовые сеты алкоголя",
    "набор алкоголя москва",
    "подарочный сет алкоголь",
    "сет вино доставка",
    "набор виски москва",
    "алкоголь сет купить",
  ],
  alternates: { canonical: "/sets" },
  openGraph: {
    title: "Готовые сеты алкоголя — Пьяная Москва",
    description: "Наборы алкоголя на любой повод. Доставка по Москве 24/7.",
    url: "/sets",
    type: "website",
  },
};

export default async function SetsPage() {
  const sets = await prisma.productSet.findMany({
    where: { inStock: true },
    include: { items: { include: { product: true } } },
  });

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <div className="mb-10 sm:mb-16 max-w-2xl">
        <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">
          Наборы на любой повод
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-ivory mb-4 sm:mb-6">
          Готовые сеты
        </h1>
        <div className="w-12 sm:w-16 h-px bg-gold/30 mb-4 sm:mb-6" />
        <p className="text-ash text-sm leading-relaxed">
          Мы подобрали наборы для разных поводов.
          Каждый сет включает напитки, аксессуары и бонусы.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sets.map((set) => (
          <Link
            key={set.id}
            href={`/set/${set.slug}`}
            className="group card-lux rounded-sm overflow-hidden active:scale-[0.99] transition-transform"
          >
            <div className="relative overflow-hidden">
              {set.image ? (
                <div className="relative product-img-hover">
                  <img src={set.image} alt={set.name} className="product-img-dark w-full h-48 sm:h-64 object-cover transition-opacity duration-500" />
                  <img src={set.image.replace(/\.(png|webp)$/, "-light.$1")} alt={set.name} className="product-img-light absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-card via-noir-card/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                    <p className="text-gold-muted text-[10px] uppercase tracking-[0.4em] mb-2">Набор</p>
                    <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-light text-ivory group-hover:text-gold transition-colors duration-500">{set.name}</h2>
                    <p className="text-ash text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">{set.description}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-wine/40 via-noir-card to-noir-card p-5 sm:p-8">
                  <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gold/[0.04] rounded-full blur-3xl" />
                  <p className="text-gold-muted text-[10px] uppercase tracking-[0.4em] mb-2 sm:mb-3 relative">Набор</p>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-light text-ivory group-hover:text-gold transition-colors duration-500 relative">{set.name}</h2>
                  <p className="text-ash text-xs sm:text-sm mt-2 leading-relaxed relative line-clamp-2">{set.description}</p>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                {set.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-ivory-muted">
                    <span className="w-1 h-1 bg-gold/50 rounded-full shrink-0" />
                    <span className="truncate">{item.product?.name || item.customName}</span>
                    {item.quantity > 1 && (
                      <span className="text-ash text-[11px] shrink-0">&times;{item.quantity}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="sep-gold mb-3 sm:mb-4" />

              <div className="flex items-center justify-end">
                <span className="text-ash text-[11px] uppercase tracking-[0.15em] group-hover:text-gold transition-all duration-500">
                  Подробнее &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sets.length === 0 && (
        <div className="text-center py-16 sm:py-24">
          <p className="text-ash">Сеты появятся совсем скоро</p>
        </div>
      )}
    </div>
  );
}
