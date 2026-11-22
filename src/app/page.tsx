import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/ProductCard";
import { NotFoundCallout } from "@/components/NotFoundCallout";

export const dynamic = "force-dynamic";

const SITE_URL = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Как заказать доставку алкоголя в Москве?", acceptedAnswer: { "@type": "Answer", text: "Выберите товары в каталоге или закажите по телефону +7 (495) 095-95-99. Курьер привезёт заказ за 20-40 минут в любую точку Москвы внутри МКАД. Оплата — наличными или картой при получении." } },
    { "@type": "Question", name: "Сколько стоит доставка алкоголя по Москве?", acceptedAnswer: { "@type": "Answer", text: "Доставка внутри МКАД — бесплатно при заказе от 3000 ₽. За МКАД — рассчитывается индивидуально, по предоплате. Минимальный заказ — 1500 ₽." } },
    { "@type": "Question", name: "Работаете ли вы ночью? Можно заказать алкоголь круглосуточно?", acceptedAnswer: { "@type": "Answer", text: "Да, работаем 24 часа в сутки, 7 дней в неделю, включая праздники. Ночная доставка алкоголя по Москве — наша основная специализация." } },
    { "@type": "Question", name: "За сколько привезёте?", acceptedAnswer: { "@type": "Answer", text: "Среднее время доставки по Москве — 20-40 минут от момента подтверждения заказа. В часы пик и при дальних адресах может быть до 60 минут." } },
    { "@type": "Question", name: "Какой алкоголь у вас есть?", acceptedAnswer: { "@type": "Answer", text: "Вино (красное, белое, игристое, шампанское), виски (бурбон, скотч), водка, коньяк, джин, ром, текила, ликёры, пиво. Также сигареты, закуски, тоники, лёд и аксессуары." } },
    { "@type": "Question", name: "Куда доставляете?", acceptedAnswer: { "@type": "Answer", text: "По всей Москве в пределах МКАД: ЦАО, САО, СВАО, ВАО, ЮВАО, ЮАО, ЮЗАО, ЗАО, СЗАО. За МКАД (Новая Москва, Зеленоград, ближнее Подмосковье) — по предоплате." } },
    { "@type": "Question", name: "Как оплатить заказ?", acceptedAnswer: { "@type": "Answer", text: "Оплата при получении — наличными курьеру или картой через мобильный терминал. Для заказов за МКАД — предоплата онлайн." } },
    { "@type": "Question", name: "Что если я передумаю или товара не окажется?", acceptedAnswer: { "@type": "Answer", text: "Если что-то не так — звоните, всё решим. Заменим товар, отменим заказ или подберём аналог. Никаких штрафов и сложностей." } },
  ],
};

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Пьяная Москва — доставка алкоголя",
  alternateName: ["Пьяная Москва", "Доставка алкоголя Москва"],
  url: SITE_URL,
  telephone: "+7-495-095-95-99",
  email: "info@xn--80aaf5ajejew9h7ac.xn--p1ai",
  description: "Доставка алкоголя по Москве за 20 минут, круглосуточно. Вино, виски, водка, шампанское, пиво, коньяк. Оплата при получении.",
  image: `${SITE_URL}/icon-512.png`,
  priceRange: "₽₽",
  paymentAccepted: "Cash, Credit Card",
  currenciesAccepted: "RUB",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressRegion: "Москва",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 55.7558, longitude: 37.6173 },
  areaServed: [
    { "@type": "City", name: "Москва" },
    { "@type": "AdministrativeArea", name: "Центральный административный округ" },
    { "@type": "AdministrativeArea", name: "Северный административный округ" },
    { "@type": "AdministrativeArea", name: "Северо-Восточный административный округ" },
    { "@type": "AdministrativeArea", name: "Восточный административный округ" },
    { "@type": "AdministrativeArea", name: "Юго-Восточный административный округ" },
    { "@type": "AdministrativeArea", name: "Южный административный округ" },
    { "@type": "AdministrativeArea", name: "Юго-Западный административный округ" },
    { "@type": "AdministrativeArea", name: "Западный административный округ" },
    { "@type": "AdministrativeArea", name: "Северо-Западный административный округ" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Каталог алкоголя",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Вино" },
      { "@type": "OfferCatalog", name: "Виски" },
      { "@type": "OfferCatalog", name: "Водка" },
      { "@type": "OfferCatalog", name: "Шампанское и игристое" },
      { "@type": "OfferCatalog", name: "Коньяк" },
      { "@type": "OfferCatalog", name: "Джин" },
      { "@type": "OfferCatalog", name: "Ром" },
      { "@type": "OfferCatalog", name: "Текила" },
      { "@type": "OfferCatalog", name: "Пиво" },
      { "@type": "OfferCatalog", name: "Сигареты" },
    ],
  },
  potentialAction: {
    "@type": "OrderAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/catalog`, inLanguage: "ru-RU", actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
    deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
  },
};

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const sets = await prisma.productSet.findMany({
    include: { items: { include: { product: true } } },
  });

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  // Popular / most ordered (just take some known products)
  const popular = await prisma.product.findMany({
    where: {
      slug: { in: ["jack-daniels", "absolut-vodka", "moet-chandon", "corona-extra", "hendricks-gin", "bacardi-blanca", "coca-cola", "durex-elite"] }
    },
    include: { category: true },
  });

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      {/* === HERO === */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-wine/15 rounded-full blur-[120px] sm:blur-[180px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-gold/[0.04] rounded-full blur-[100px] sm:blur-[160px]" />
        </div>

        <div className="hidden sm:block absolute top-0 right-[20%] w-px h-[60%] bg-gradient-to-b from-transparent via-gold/20 to-transparent rotate-12 origin-top" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 md:py-32 relative">
          <div className="max-w-3xl">
            <p className="anim-reveal text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-5 sm:mb-8">
              24/7 &middot; Доставка за 20 минут &middot; Оплата при получении
            </p>

            <h1
              className="anim-reveal font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] mb-5 sm:mb-8"
              style={{ animationDelay: "0.15s" }}
            >
              <span className="sr-only">Доставка алкоголя по Москве 24/7 — Пьяная Москва. </span>
              <span className="text-ivory" aria-hidden="true">Любой</span>
              <br aria-hidden="true" />
              <span className="text-shimmer" aria-hidden="true">алкоголь</span>
              <br aria-hidden="true" />
              <span className="text-ivory/50 font-light italic" aria-hidden="true">за 20 минут</span>
            </h1>

            <p
              className="anim-reveal text-ash text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg"
              style={{ animationDelay: "0.3s" }}
            >
              Привезём вино, виски, водку, пиво и всё остальное.
              Сигареты, закуски, презервативы&nbsp;&mdash; тоже. Работаем круглосуточно.
            </p>

            <div
              className="anim-reveal flex flex-col sm:flex-row gap-3 sm:gap-4"
              style={{ animationDelay: "0.45s" }}
            >
              <Link
                href="/catalog"
                className="bg-gold hover:bg-gold-light text-noir text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 transition-all duration-500 text-center min-h-[48px] flex items-center justify-center active:scale-[0.98]"
              >
                Каталог
              </Link>
              <a
                href="tel:+74950959599"
                className="border border-gold/25 hover:border-gold/50 text-gold text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 transition-all duration-500 hover:bg-gold/[0.05] text-center min-h-[48px] flex items-center justify-center"
              >
                Позвонить нам
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-noir to-transparent" />
      </section>

      {/* === ADVANTAGES === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {[
            { title: "20 минут", sub: "среднее время доставки", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "24/7", sub: "работаем круглосуточно", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" },
            { title: "200+", sub: "довольных клиентов", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Звоните", sub: "если что-то не так — решим", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
          ].map((item, i) => (
            <div key={i} className="card-lux rounded-sm p-4 sm:p-6 text-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gold mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
              </svg>
              <p className="font-display text-xl sm:text-2xl text-ivory font-light mb-1">{item.title}</p>
              <p className="text-[11px] sm:text-[12px] text-ash">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === CATEGORY BAR === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalog/${cat.slug}`}
              className="group flex items-center gap-2 sm:gap-3 bg-noir-card border border-gold/[0.06] hover:border-gold/20 px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-[12px] uppercase tracking-[0.12em] whitespace-nowrap transition-all duration-500 active:bg-gold/[0.05]"
            >
              <span className="text-ash group-hover:text-gold transition-colors duration-500">
                {cat.name}
              </span>
              <span className="text-ash/40 text-[10px]">{cat._count.products}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* === POPULAR / ЧТО БЕРУТ ЧАЩЕ === */}
      {popular.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-24">
          <div className="mb-8 sm:mb-12">
            <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3">
              Хит продаж
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
              Берут чаще всего
            </h2>
            <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {popular.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                image={p.image}
                volume={p.volume}
                abv={p.abv}
                category={p.category.slug}
              />
            ))}
          </div>
        </section>
      )}

      {/* === SETS === */}
      {sets.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <div className="mb-8 sm:mb-12">
            <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3">
              Наборы на любой повод
            </p>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
                Готовые сеты
              </h2>
              <Link href="/sets" className="hidden sm:inline text-ash hover:text-gold text-[12px] uppercase tracking-[0.15em] transition-colors duration-500">
                Все сеты
              </Link>
            </div>
            <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sets.map((set) => (
              <Link key={set.id} href={`/set/${set.slug}`} className="group card-lux rounded-sm overflow-hidden active:scale-[0.99] transition-transform">
                <div className="relative overflow-hidden">
                  {set.image ? (
                    <div className="relative product-img-hover">
                      <img src={set.image} alt={set.name} className="product-img-dark w-full h-48 sm:h-56 object-cover transition-opacity duration-500" />
                      <img src={set.image.replace(/\.(png|webp)$/, "-light.$1")} alt={set.name} className="product-img-light absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-card via-noir-card/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5 sm:p-8">
                        <p className="text-gold-muted text-[10px] uppercase tracking-[0.4em] mb-2">Набор</p>
                        <h3 className="font-display text-xl sm:text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-500">{set.name}</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-wine/40 via-noir-card to-noir-card p-5 sm:p-8">
                      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gold/[0.04] rounded-full blur-3xl" />
                      <p className="text-gold-muted text-[10px] uppercase tracking-[0.4em] mb-2 sm:mb-3 relative">Набор</p>
                      <h3 className="font-display text-xl sm:text-2xl font-light text-ivory group-hover:text-gold transition-colors duration-500 relative">{set.name}</h3>
                      <p className="text-ash text-xs sm:text-sm mt-2 leading-relaxed relative line-clamp-2">{set.description}</p>
                    </div>
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {set.items.slice(0, 4).map((item) => (
                      <li key={item.id} className="flex items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] text-ivory-muted">
                        <span className="w-1 h-1 bg-gold/50 rounded-full shrink-0" />
                        <span className="truncate">{item.product?.name || item.customName}</span>
                      </li>
                    ))}
                    {set.items.length > 4 && <li className="text-[11px] text-ash">+{set.items.length - 4} ещё</li>}
                  </ul>
                  <div className="sep-gold mb-3 sm:mb-4" />
                  <div className="flex items-center justify-end">
                    <span className="text-ash text-[11px] uppercase tracking-[0.15em] group-hover:text-gold transition-all duration-500">Подробнее &rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* === NEW ARRIVALS === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="mb-8 sm:mb-12">
          <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3">
            Ассортимент
          </p>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory">Новинки</h2>
            <Link href="/catalog" className="hidden sm:inline text-ash hover:text-gold text-[12px] uppercase tracking-[0.15em] transition-colors duration-500">
              Все напитки
            </Link>
          </div>
          <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.image} volume={p.volume} abv={p.abv} category={p.category.slug} />
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <Link href="/catalog" className="text-ash hover:text-gold text-[12px] uppercase tracking-[0.15em]">Все напитки &rarr;</Link>
        </div>
      </section>

      {/* === CTA === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-24">
        <div className="relative overflow-hidden bg-gradient-to-r from-wine/20 via-noir-card to-wine/20 border border-gold/[0.06] py-12 sm:py-16 md:py-24 px-5 sm:px-8 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] bg-gold/[0.03] rounded-full blur-[100px]" />

          <p className="relative text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-4 sm:mb-6">
            Быстро &middot; Чётко &middot; 24/7
          </p>
          <h2 className="relative font-display text-2xl sm:text-3xl md:text-5xl font-light text-ivory mb-3 sm:mb-4">
            Доставим за <span className="text-shimmer">20 минут</span>
          </h2>
          <p className="relative text-ash mb-8 sm:mb-10 max-w-lg mx-auto text-xs sm:text-sm">
            Работаем быстро и&nbsp;чётко. Если что-то не&nbsp;так&nbsp;&mdash; звоните, решим.
            За&nbsp;МКАД&nbsp;&mdash; по&nbsp;предоплате.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/catalog" className="bg-gold hover:bg-gold-light text-noir text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 min-h-[48px] active:scale-[0.98] flex items-center justify-center">
              Заказать
            </Link>
            <a href="tel:+74950959599" className="border border-gold/25 hover:border-gold/50 text-gold text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 min-h-[48px] flex items-center justify-center">
              Позвонить
            </a>
          </div>
        </div>
      </section>

      {/* === NOT FOUND CALLOUT === */}
      <NotFoundCallout />

      {/* === FAQ === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div className="mb-8 sm:mb-12">
          <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3">
            Частые вопросы
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory">
            Как мы работаем
          </h2>
          <div className="w-12 sm:w-16 h-px bg-gold/30 mt-4 sm:mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
          {[
            {
              q: "Как заказать доставку алкоголя в Москве?",
              a: "Выберите товары в каталоге или закажите по телефону +7 (495) 095-95-99. Курьер привезёт заказ за 20-40 минут в любую точку Москвы внутри МКАД. Оплата — наличными или картой при получении.",
            },
            {
              q: "Сколько стоит доставка алкоголя по Москве?",
              a: "Доставка внутри МКАД — бесплатно при заказе от 3 000 ₽. За МКАД — рассчитывается индивидуально, по предоплате. Минимальный заказ — 1 500 ₽.",
            },
            {
              q: "Работаете ли вы ночью? Можно заказать алкоголь круглосуточно?",
              a: "Да, работаем 24 часа в сутки, 7 дней в неделю, включая праздники. Ночная доставка алкоголя по Москве — наша основная специализация.",
            },
            {
              q: "За сколько привезёте?",
              a: "Среднее время доставки по Москве — 20-40 минут от момента подтверждения заказа. В часы пик и при дальних адресах может быть до 60 минут.",
            },
            {
              q: "Какой алкоголь у вас есть?",
              a: "Вино (красное, белое, игристое, шампанское), виски (бурбон, скотч), водка, коньяк, джин, ром, текила, ликёры, пиво. Также сигареты, закуски, тоники, лёд и аксессуары.",
            },
            {
              q: "Куда доставляете?",
              a: "По всей Москве в пределах МКАД: ЦАО, САО, СВАО, ВАО, ЮВАО, ЮАО, ЮЗАО, ЗАО, СЗАО. За МКАД (Новая Москва, Зеленоград, ближнее Подмосковье) — по предоплате.",
            },
            {
              q: "Как оплатить заказ?",
              a: "Оплата при получении — наличными курьеру или картой через мобильный терминал. Для заказов за МКАД — предоплата онлайн.",
            },
            {
              q: "Что если я передумаю или товара не окажется?",
              a: "Если что-то не так — звоните, всё решим. Заменим товар, отменим заказ или подберём аналог. Никаких штрафов и сложностей.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group card-lux rounded-sm p-5 sm:p-6 cursor-pointer"
            >
              <summary className="flex items-start justify-between gap-4 list-none">
                <h3 className="font-display text-base sm:text-lg text-ivory font-light leading-snug">
                  {item.q}
                </h3>
                <svg className="w-4 h-4 text-gold shrink-0 mt-1 transition-transform duration-300 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </summary>
              <p className="text-ivory-muted text-sm leading-relaxed mt-4">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* === SEO TEXT === */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div className="sep-gold mb-8" />
        <div className="max-w-4xl text-ivory-muted text-[14px] leading-[1.8] space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl text-ivory font-light mb-6">
            Доставка алкоголя по Москве круглосуточно
          </h2>

          <p>
            <strong className="text-ivory">Пьяная Москва</strong> — служба доставки алкоголя по Москве, работающая <strong>24 часа в сутки, 7 дней в неделю</strong>.
            Привезём любой алкоголь к вашей двери за 20–40 минут: вино, виски, водку, шампанское, коньяк, джин, ром, текилу, пиво, ликёры.
            Доставка работает круглосуточно — в том числе ночью, в выходные и праздники.
          </p>

          <h3 className="font-display text-xl text-ivory font-light mt-8 mb-3">
            Что можно заказать
          </h3>
          <p>
            В каталоге более 60 позиций. <strong>Вино</strong> — красное, белое, розовое, игристое, шампанское от российских и европейских производителей.
            <strong> Крепкий алкоголь</strong> — водка, виски (бурбон, скотч, ирландский), коньяк, бренди, джин, ром, текила.
            <strong> Пиво</strong> — российское, чешское, немецкое, бельгийское, в бутылках и банках.
            Также доставляем <strong>сигареты</strong> (Marlboro, Parliament, Camel, Winston), стики Heets для IQOS, кальянный уголь,
            <strong> безалкогольные напитки</strong> (Coca-Cola, тоники Schweppes, соки, лёд) и закуски для миксов.
          </p>

          <h3 className="font-display text-xl text-ivory font-light mt-8 mb-3">
            Зоны доставки по Москве
          </h3>
          <p>
            Работаем по <strong>всей Москве в пределах МКАД</strong>: Центральный (ЦАО), Северный (САО), Северо-Восточный (СВАО),
            Восточный (ВАО), Юго-Восточный (ЮВАО), Южный (ЮАО), Юго-Западный (ЮЗАО), Западный (ЗАО), Северо-Западный (СЗАО) административные округа.
            Также доставляем в Новую Москву, Зеленоград и ближнее Подмосковье — по предварительному заказу с предоплатой.
          </p>

          <h3 className="font-display text-xl text-ivory font-light mt-8 mb-3">
            Сколько ждать и сколько стоит
          </h3>
          <p>
            Среднее время доставки — <strong>20–40 минут</strong> от подтверждения заказа. По ЦАО и ближним к центру районам — обычно 20–30 минут.
            На окраинах Москвы и в часы пик — до 60 минут. Доставка <strong>внутри МКАД бесплатна при заказе от 3 000 ₽</strong>.
            Минимальный заказ — 1 500 ₽. Оплата — наличными или картой курьеру при получении (без предоплаты).
          </p>

          <h3 className="font-display text-xl text-ivory font-light mt-8 mb-3">
            Почему выбирают нас
          </h3>
          <p>
            <strong>Быстро</strong> — собственные курьеры с авто, готовые к выезду круглосуточно.
            <strong> Честно</strong> — цены без скрытых наценок, оплата при получении, можно проверить товар до оплаты.
            <strong> Удобно</strong> — оформление заказа за 1 минуту через сайт или по телефону.
            <strong> Надёжно</strong> — работаем с проверенными поставщиками, весь алкоголь оригинальный, с акцизными марками.
            Если что-то пошло не так — звоните +7 (495) 095-95-99, решим вопрос моментально.
          </p>

          <h3 className="font-display text-xl text-ivory font-light mt-8 mb-3">
            Готовые наборы
          </h3>
          <p>
            <strong>Готовые сеты</strong> для любого повода: романтический вечер, встреча с друзьями, винная дегустация, день рождения, корпоратив.
            Каждый набор включает напитки, закуски, аксессуары и приятные бонусы.
            Сэкономьте время на выборе — закажите готовое решение и получите всё необходимое в одной доставке.
          </p>

          <p className="pt-4">
            Закажите доставку алкоголя в Москве прямо сейчас — на сайте или по телефону <a href="tel:+74950959599" className="text-gold hover:text-gold-light transition-colors">+7 (495) 095-95-99</a>.
            Работаем круглосуточно, доставим за 20 минут.
          </p>
        </div>
      </section>
    </div>
  );
}
