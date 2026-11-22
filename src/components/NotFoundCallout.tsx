export function NotFoundCallout() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-14 sm:pb-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-wine/25 via-noir-card to-noir-card border border-gold/15 rounded-sm py-10 sm:py-14 md:py-16 px-5 sm:px-8 md:px-12">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[280px] sm:w-[420px] h-[200px] sm:h-[260px] bg-gold/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[200px] sm:w-[320px] h-[150px] sm:h-[220px] bg-wine/30 rounded-full blur-[120px]" />

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
          <div className="flex-1 max-w-2xl">
            <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4">
              Привезём всё, что нужно
            </p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-ivory mb-3 sm:mb-4 leading-tight">
              Не нашли <span className="text-shimmer">свой алкоголь</span>?
            </h2>
            <p className="text-ash text-sm sm:text-base leading-relaxed">
              Позвоните нам — привезём всё, чего нет в каталоге.
              Подскажем по выбору, рассчитаем стоимость, доставим за 20 минут.
              Работаем круглосуточно.
            </p>
          </div>

          <a
            href="tel:+74950959599"
            className="group shrink-0 inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-noir text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] px-6 sm:px-8 py-4 sm:py-5 transition-all duration-500 min-h-[52px] active:scale-[0.98]"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Позвонить</span>
          </a>
        </div>
      </div>
    </section>
  );
}
