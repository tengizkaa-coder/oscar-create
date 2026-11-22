"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";

const SHOP_PHONE_DISPLAY = "+7 (495) 095-95-99";
const SHOP_PHONE_TEL = "+74950959599";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [showCallback, setShowCallback] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length === 0) return "";
    let result = "+7";
    if (digits.length > 1) result += " (" + digits.slice(1, 4);
    if (digits.length > 4) result += ") " + digits.slice(4, 7);
    if (digits.length > 7) result += "-" + digits.slice(7, 9);
    if (digits.length > 9) result += "-" + digits.slice(9, 11);
    return result;
  };

  const handleCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          items: items.map((i) => ({ name: i.name, quantity: i.quantity })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert("Ошибка: " + (data.error || "не удалось отправить заявку"));
        return;
      }
      setDone(true);
      clearCart();
    } catch {
      alert("Ошибка при отправке. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
        <div className="w-14 h-14 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="font-display text-3xl sm:text-4xl font-light text-ivory mb-3">Заявка принята</p>
        <p className="text-ash text-sm mb-8 sm:mb-10 max-w-md mx-auto">
          Мы перезвоним вам в течение нескольких минут и уточним детали заказа и доставки.
        </p>
        <Link
          href="/catalog"
          className="inline-block bg-gold hover:bg-gold-light text-noir text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 min-h-[48px] active:scale-[0.98]"
        >
          В каталог
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
        <p className="font-display text-3xl sm:text-4xl font-light text-ivory mb-4">Корзина пуста</p>
        <p className="text-ash text-sm mb-8 sm:mb-10">Добавьте напитки из каталога</p>
        <Link
          href="/catalog"
          className="inline-block bg-gold hover:bg-gold-light text-noir text-[12px] uppercase tracking-[0.25em] px-8 sm:px-10 py-4 min-h-[48px] active:scale-[0.98]"
        >
          В каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-ivory mb-2">Корзина</h1>
      <div className="w-8 sm:w-10 h-px bg-gold/30 mb-8 sm:mb-12" />

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-lux rounded-sm p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5"
            >
              <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-sm overflow-hidden bg-noir-surface shrink-0">
                  {item.image ? (
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path d="M12 22V14m0 0c4 0 6-3 6-7H6c0 4 2 7 6 7z" />
                        <line x1="8" y1="22" x2="16" y2="22" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm text-ivory font-light leading-tight mb-0.5 truncate">{item.name}</h3>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-ash">
                    {item.type === "set" ? "Набор" : "Товар"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 sm:w-8 sm:h-8 border border-gold/10 hover:border-gold/30 flex items-center justify-center text-ivory text-sm transition-colors active:bg-gold/10"
                  >
                    &minus;
                  </button>
                  <span className="w-8 text-center text-sm text-ivory">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 sm:w-8 sm:h-8 border border-gold/10 hover:border-gold/30 flex items-center justify-center text-ivory text-sm transition-colors active:bg-gold/10"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[11px] text-ash hover:text-red-400 transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: delivery info & callback */}
        <div>
          <div className="card-lux rounded-sm p-5 sm:p-6 sticky top-20 sm:top-24">
            <h2 className="font-display text-lg sm:text-xl text-ivory font-light mb-3">
              Доставка по телефону
            </h2>
            <p className="text-ash text-[13px] leading-[1.7] mb-5">
              Теперь мы оформляем доставку по телефону. Позвоните нам, и оператор уточнит детали заказа, адрес и время доставки.
            </p>

            <div className="sep-gold mb-5" />

            <p className="text-[10px] uppercase tracking-[0.2em] text-gold-muted mb-2">
              Наш номер
            </p>
            <a
              href={`tel:${SHOP_PHONE_TEL}`}
              className="block font-display text-2xl sm:text-3xl text-gold font-light mb-6 hover:text-gold-light transition-colors"
            >
              {SHOP_PHONE_DISPLAY}
            </a>

            <div className="text-center text-ash text-[11px] uppercase tracking-[0.2em] mb-4">
              — или —
            </div>

            <button
              onClick={() => setShowCallback(true)}
              className="w-full bg-gold hover:bg-gold-light text-noir text-[12px] uppercase tracking-[0.25em] py-4 min-h-[48px] flex items-center justify-center active:scale-[0.98] transition-all"
            >
              Перезвоните мне
            </button>
          </div>
        </div>
      </div>

      {/* Callback modal */}
      {showCallback && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => !submitting && setShowCallback(false)}
        >
          <div
            className="bg-noir-card border border-gold/10 rounded-sm w-full max-w-md p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !submitting && setShowCallback(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center text-ash hover:text-gold transition-colors"
              aria-label="Закрыть"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-display text-xl sm:text-2xl text-ivory font-light mb-2">
              Заказать звонок
            </h3>
            <p className="text-ash text-[13px] mb-6">
              Оставьте свой номер — перезвоним в течение нескольких минут и оформим заказ.
            </p>

            <form onSubmit={handleCallback} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-gold-muted mb-2">
                  Ваш телефон
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="input-dark w-full px-4 py-3 text-sm rounded-sm min-h-[48px]"
                  placeholder="+7 (999) 123-45-67"
                  pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                  title="Формат: +7 (999) 123-45-67"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gold hover:bg-gold-light disabled:opacity-50 text-noir text-[12px] uppercase tracking-[0.25em] py-4 min-h-[48px] transition-all active:scale-[0.98]"
              >
                {submitting ? "Отправляем..." : "Жду звонка"}
              </button>

              <p className="text-[11px] text-ash text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
