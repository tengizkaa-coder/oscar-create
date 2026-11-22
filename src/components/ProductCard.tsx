"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { ProductImage } from "./ProductImage";
import { useState } from "react";

const CATEGORY_STYLES: Record<string, { bg: string; border: string }> = {
  wine:      { bg: "rgba(40, 8, 14, 0.25)",   border: "rgba(100, 25, 35, 0.25)" },
  champagne: { bg: "rgba(30, 25, 10, 0.25)",  border: "rgba(120, 100, 35, 0.2)" },
  vodka:     { bg: "rgba(12, 14, 28, 0.25)",  border: "rgba(45, 55, 110, 0.2)" },
  whiskey:   { bg: "rgba(30, 18, 8, 0.25)",   border: "rgba(110, 70, 20, 0.2)" },
  cognac:    { bg: "rgba(30, 20, 10, 0.25)",  border: "rgba(100, 65, 20, 0.2)" },
  gin:       { bg: "rgba(8, 25, 18, 0.25)",   border: "rgba(25, 90, 60, 0.2)" },
  rum:       { bg: "rgba(30, 16, 8, 0.25)",   border: "rgba(110, 60, 20, 0.2)" },
  beer:      { bg: "rgba(25, 20, 8, 0.25)",   border: "rgba(120, 95, 30, 0.2)" },
  snacks:    { bg: "rgba(25, 12, 18, 0.25)",  border: "rgba(90, 35, 55, 0.2)" },
  extras:    { bg: "rgba(14, 14, 28, 0.25)",  border: "rgba(55, 55, 110, 0.2)" },
};

type Props = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  volume?: string;
  abv?: string;
  category?: string;
  type?: "product" | "set";
};

export function ProductCard({
  id,
  name,
  slug,
  price,
  image,
  volume,
  abv,
  category,
  type = "product",
}: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const href = type === "set" ? `/set/${slug}` : `/product/${slug}`;
  const catStyle = CATEGORY_STYLES[category || ""] || { bg: "rgba(30, 22, 22, 0.4)", border: "rgba(198, 162, 78, 0.2)" };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: `${type}-${id}`, type, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Link href={href} className="block group">
      <div
        className="rounded-sm overflow-hidden transition-all duration-700"
        style={{
          backgroundColor: hovered ? catStyle.bg : "#1a1212",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: hovered ? catStyle.border : "rgba(198, 162, 78, 0.06)",
          boxShadow: hovered
            ? `0 0 0 1px ${catStyle.border}, 0 12px 30px rgba(0,0,0,0.3)`
            : "none",
          transform: hovered ? "translateY(-2px)" : "none",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <ProductImage category={category} name={name} image={image} type={type} size="md" />

          {/* Bottom gradient for button */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block" />
          <div className="absolute inset-x-0 bottom-0 pb-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:flex">
            <button
              onClick={handleAdd}
              className={`text-[11px] uppercase tracking-[0.2em] px-6 py-2.5 border transition-all duration-300 ${
                added
                  ? "border-gold bg-gold text-noir"
                  : "border-gold/40 text-gold hover:bg-gold/10"
              }`}
            >
              {added ? "Добавлено" : "В корзину"}
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-5 flex flex-col h-[100px] sm:h-[110px]">
          <p className="text-[9px] sm:text-[10px] text-ash uppercase tracking-[0.2em] mb-1 sm:mb-1.5 h-[14px]">
            {(volume || abv) ? [volume, abv].filter(Boolean).join(" \u00B7 ") : "\u00A0"}
          </p>
          <h3 className="text-[12px] sm:text-[13px] md:text-sm font-light text-ivory leading-snug mb-auto group-hover:text-gold transition-colors duration-500 line-clamp-2">
            {name}
            {(slug.includes("durex") || slug.includes("parliament") || slug.includes("marlboro") || slug.includes("heets")) && (
              <span className="block text-[9px] text-gold/60 mt-0.5 font-normal">Уточните вкус при заказе</span>
            )}
          </h3>
          <div className="flex items-center justify-end gap-2 mt-1">
            <button
              onClick={handleAdd}
              className={`sm:hidden text-[10px] uppercase tracking-wider px-4 py-1.5 border min-h-[32px] transition-all ${
                added
                  ? "border-gold bg-gold text-noir"
                  : "border-gold/30 text-gold active:bg-gold/10"
              }`}
            >
              {added ? "Добавлено" : "В корзину"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
