"use client";

import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: "product" | "set";
};

export function AddToCartButton({ id, name, price, image, type }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: `${type}-${id}`, type, name, price, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full sm:w-auto text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] px-8 sm:px-12 py-4 border transition-all duration-500 min-h-[48px] active:scale-[0.98] ${
        added
          ? "border-gold bg-gold text-noir"
          : "border-gold/40 text-gold hover:bg-gold/10 hover:border-gold active:bg-gold/20"
      }`}
    >
      {added ? "Добавлено" : "В корзину"}
    </button>
  );
}
