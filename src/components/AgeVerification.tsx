"use client";

import { useState, useEffect } from "react";

export function AgeVerification() {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [declined, setDeclined] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("age_verified");
    setVerified(v === "true");
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (verified === null || verified) return null;

  if (declined) {
    return (
      <div className="fixed inset-0 z-[100] bg-noir flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <p className="font-display text-2xl sm:text-3xl font-light text-ivory mb-6">
            Доступ ограничен
          </p>
          <p className="text-ash text-sm leading-relaxed mb-8">
            Содержимое данного ресурса предназначено исключительно
            для лиц, достигших совершеннолетия.
          </p>
          <button
            onClick={() => setDeclined(false)}
            className="text-gold text-sm tracking-wider uppercase hover:text-gold-light transition-colors min-h-[44px]"
          >
            Назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-noir flex items-center justify-center p-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-wine/20 rounded-full blur-[160px] pointer-events-none" />

      <div
        className={`relative text-center max-w-sm sm:max-w-lg px-4 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="w-12 h-px bg-gold/40 mx-auto mb-8 sm:mb-10" />

        <div className="mb-5 sm:mb-6">
          <span className="font-display text-3xl sm:text-5xl font-light tracking-[0.15em] text-ivory">
            Пьяная
          </span>
          <span className="font-display text-3xl sm:text-5xl font-light tracking-[0.15em] text-shimmer">
            Москва
          </span>
        </div>

        <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-8 sm:mb-12">
          Доставка алкоголя &middot; Москва
        </p>

        <p className="text-ivory-muted text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 font-light">
          Подтвердите, что вам <span className="text-ivory">исполнилось 18 лет</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => {
              localStorage.setItem("age_verified", "true");
              setVerified(true);
            }}
            className="relative overflow-hidden bg-transparent border border-gold/40 hover:border-gold text-gold px-8 sm:px-12 py-4 text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-500 hover:bg-gold/10 min-h-[48px] active:bg-gold/20"
          >
            Да, мне есть 18
          </button>
          <button
            onClick={() => setDeclined(true)}
            className="border border-ash/20 hover:border-ash/40 text-ash px-8 sm:px-12 py-4 text-[12px] sm:text-[13px] uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all duration-500 min-h-[48px]"
          >
            Нет
          </button>
        </div>

        <div className="w-12 h-px bg-gold/40 mx-auto mt-8 sm:mt-12" />
      </div>
    </div>
  );
}
