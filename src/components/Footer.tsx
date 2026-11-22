import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-14 sm:mt-20">
      <div className="sep-gold" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-baseline gap-0.5 mb-4 sm:mb-5">
              <span className="font-display text-lg font-light tracking-[0.12em] text-ivory">Пьяная</span>
              <span className="font-display text-lg font-light tracking-[0.12em] text-gold-muted">Москва</span>
            </div>
            <p className="text-ash text-sm leading-relaxed">
              Доставка алкоголя по&nbsp;Москве.
              Вино, крепкие напитки, пиво и&nbsp;готовые сеты.
            </p>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-muted mb-4 sm:mb-5">Каталог</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { href: "/catalog/wine", label: "Вино" },
                { href: "/catalog/champagne", label: "Игристое" },
                { href: "/catalog/spirits", label: "Крепкие" },
                { href: "/catalog/beer", label: "Пиво" },
                { href: "/sets", label: "Сеты" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ash text-sm hover:text-gold transition-colors duration-500 active:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold-muted mb-4 sm:mb-5">Контакты</h3>
            <div className="space-y-2.5 sm:space-y-3 text-sm">
              <a href="tel:+74950959599" className="text-ivory font-display text-base sm:text-lg hover:text-gold transition-colors block">
                +7 (495) 095-95-99
              </a>
              <p className="text-ash">Москва, доставка по городу</p>
              <p className="text-ash">За МКАД — по предоплате</p>
              <p className="text-ash">Работаем 24/7</p>
              <p className="text-ash">Оплата при получении</p>
            </div>
          </div>
        </div>

        <div className="sep-gold mt-8 sm:mt-12 mb-5 sm:mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <p className="text-[11px] text-ash/40">&copy; {new Date().getFullYear()} Пьяная Москва</p>
          <p className="text-[11px] text-ash/40 text-center">18+. Чрезмерное употребление алкоголя вредит здоровью.</p>
        </div>
      </div>
    </footer>
  );
}
