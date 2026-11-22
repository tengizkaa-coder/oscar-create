"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/mgmt-x7k9f2/products", label: "Товары" },
  { href: "/mgmt-x7k9f2/sets", label: "Сеты" },
  { href: "/mgmt-x7k9f2/categories", label: "Категории" },
  { href: "/mgmt-x7k9f2/settings", label: "Настройки" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-noir">
      {/* Top bar */}
      <div className="bg-noir-card border-b border-gold/[0.06] px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/mgmt-x7k9f2/products" className="font-display text-base sm:text-lg text-ivory font-light tracking-wider">
            Админка
          </Link>
          <Link href="/" className="text-[11px] uppercase tracking-[0.15em] text-ash hover:text-gold transition-colors">
            На сайт
          </Link>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar — desktop only */}
        <nav className="w-48 lg:w-52 bg-noir-card border-r border-gold/[0.06] min-h-[calc(100vh-48px)] p-3 sm:p-4 space-y-1 hidden md:block">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 sm:px-4 py-2.5 text-[13px] tracking-wide transition-all duration-300 rounded-sm ${
                pathname === item.href
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-ash hover:text-ivory hover:bg-noir-surface"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile bottom nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-noir-card border-t border-gold/[0.06] flex z-50 safe-area-bottom">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 py-3 text-center text-[10px] sm:text-[11px] uppercase tracking-wider min-h-[48px] flex items-center justify-center ${
                pathname === item.href ? "text-gold" : "text-ash"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <main className="flex-1 p-4 sm:p-6 pb-24 md:pb-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
