"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { useState } from "react";

export function Header() {
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-noir/90 backdrop-blur-xl border-b border-gold/[0.06]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-0.5 shrink-0">
            <span className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-[0.12em] text-ivory group-hover:text-gold transition-colors duration-500">
              Пьяная
            </span>
            <span className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-[0.12em] text-gold-muted group-hover:text-gold transition-colors duration-500">
              Москва
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 overflow-x-auto">
            {[
              { href: "/catalog", label: "Каталог" },
              { href: "/sets", label: "Сеты" },
              { href: "/catalog/vodka", label: "Водка" },
              { href: "/catalog/whiskey", label: "Виски" },
              { href: "/catalog/wine", label: "Вино" },
              { href: "/catalog/champagne", label: "Игристое" },
              { href: "/catalog/gin", label: "Джин" },
              { href: "/catalog/beer", label: "Пиво" },
              { href: "/catalog/extras", label: "К заказу" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ash text-[13px] uppercase tracking-[0.12em] hover:text-gold transition-colors duration-500 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/cart"
              className="relative group flex items-center gap-2 sm:gap-3 min-h-[44px] min-w-[44px] justify-center"
            >
              <svg
                className="w-5 h-5 sm:w-[18px] sm:h-[18px] text-ivory-muted group-hover:text-gold transition-colors duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.2}
              >
                <path d="M6 7V6a6 6 0 1 1 12 0v1" />
                <path d="M3.5 7h17l-1.5 14H5z" />
              </svg>
              <span className="hidden sm:inline text-[13px] uppercase tracking-[0.12em] text-ash group-hover:text-gold transition-colors duration-500">
                Корзина
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-1 left-6 sm:-top-2 sm:-left-2 w-[18px] h-[18px] bg-gold text-noir text-[9px] font-bold flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button — 44px touch target */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5"
              aria-label="Меню"
            >
              <span
                className={`block w-5 h-px bg-ivory-muted transition-all duration-300 ${
                  mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-px bg-ivory-muted transition-all duration-300 ${
                  mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="sep-gold" />
        <nav className="px-4 py-5 space-y-1">
          {[
            { href: "/catalog", label: "Весь каталог" },
            { href: "/sets", label: "Готовые сеты" },
            { href: "/catalog/vodka", label: "Водка" },
            { href: "/catalog/whiskey", label: "Виски" },
            { href: "/catalog/wine", label: "Вино" },
            { href: "/catalog/champagne", label: "Шампанское" },
            { href: "/catalog/cognac", label: "Коньяк" },
            { href: "/catalog/gin", label: "Джин и мартини" },
            { href: "/catalog/rum", label: "Ром и текила" },
            { href: "/catalog/beer", label: "Пиво" },
            { href: "/catalog/snacks", label: "Закуски" },
            { href: "/catalog/extras", label: "К заказу" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-ash text-sm tracking-[0.1em] hover:text-gold transition-colors active:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
