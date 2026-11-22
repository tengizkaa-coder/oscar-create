"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatPrice, ORDER_STATUSES } from "@/lib/format";

type Order = {
  id: number;
  number: string;
  customerName: string;
  phone: string;
  address: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: { id: number; name: string; quantity: number; price: number }[];
};

export default function OrderPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    const res = await fetch(`/api/orders/${params.id}`);
    if (res.ok) setOrder(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [params.id]);

  if (loading) return <div className="px-4 py-20 text-center text-ash">Загрузка...</div>;
  if (!order) return (
    <div className="px-4 py-20 text-center">
      <p className="font-display text-2xl sm:text-3xl text-ivory mb-4">Заказ не найден</p>
      <Link href="/" className="text-gold text-sm">На главную</Link>
    </div>
  );

  const status = ORDER_STATUSES[order.status] || ORDER_STATUSES.new;
  const steps = ["new", "confirmed", "assembling", "delivering", "delivered"];
  const currentStep = steps.indexOf(order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-16">
      {/* Success */}
      <div className="text-center mb-8 sm:mb-14">
        <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-ivory mb-2 sm:mb-3">Заказ оформлен</h1>
        <p className="text-ash text-sm">
          Номер: <span className="font-display text-gold text-base sm:text-lg">#{order.number}</span>
        </p>
      </div>

      {/* Status tracker */}
      <div className="card-lux rounded-sm p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="font-display text-base sm:text-lg text-ivory font-light">Статус</span>
          <span className={`text-[10px] sm:text-[11px] uppercase tracking-[0.15em] px-2.5 sm:px-3 py-1 rounded-sm ${status.color}`}>
            {status.label}
          </span>
        </div>

        {!isCancelled && (
          <div className="flex items-start gap-0.5 sm:gap-1 mt-3 sm:mt-4">
            {steps.map((step, i) => {
              const done = i <= currentStep;
              const label = ORDER_STATUSES[step]?.label || step;
              return (
                <div key={step} className="flex-1 flex flex-col items-center gap-1.5 sm:gap-2">
                  <div className="w-full flex items-center">
                    <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 transition-colors duration-500 ${
                      done ? "bg-gold" : "bg-noir-surface border border-gold/10"
                    }`} />
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px transition-colors duration-500 ${
                        i < currentStep ? "bg-gold/50" : "bg-gold/10"
                      }`} />
                    )}
                  </div>
                  <span className={`text-[8px] sm:text-[9px] uppercase tracking-wider leading-tight text-center ${
                    done ? "text-gold" : "text-ash/50"
                  }`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {isCancelled && <p className="text-red-400 text-sm mt-2">Заказ был отменён</p>}
        <p className="text-[10px] sm:text-[11px] text-ash mt-3 sm:mt-4">Обновляется автоматически</p>
      </div>

      {/* Payment */}
      <div className="relative overflow-hidden bg-gradient-to-br from-wine/30 via-noir-card to-noir-card border border-gold/[0.08] p-5 sm:p-8 mb-4 sm:mb-6">
        <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-gold/[0.03] rounded-full blur-3xl" />
        <p className="text-gold-muted text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 relative">
          Оплата при получении
        </p>
        <p className="text-ash text-xs sm:text-sm mb-4 sm:mb-6 relative">
          Оплатите курьеру наличными или картой.
        </p>
        <div className="bg-noir/40 border border-gold/[0.06] p-4 sm:p-5 relative">
          <div className="flex justify-between items-center">
            <span className="text-ash text-xs sm:text-sm">Сумма</span>
            <span className="font-display text-2xl sm:text-3xl text-gold font-light">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="card-lux rounded-sm p-4 sm:p-6 mb-8 sm:mb-10">
        <h2 className="font-display text-base sm:text-lg text-ivory font-light mb-4 sm:mb-5">Детали</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-4 sm:mb-6">
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-gold-muted mb-1">Имя</p>
            <p className="text-ivory-muted">{order.customerName}</p>
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-gold-muted mb-1">Телефон</p>
            <p className="text-ivory-muted">{order.phone}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-gold-muted mb-1">Адрес</p>
            <p className="text-ivory-muted">{order.address}</p>
          </div>
        </div>

        <div className="sep-gold mb-3 sm:mb-4" />

        <div className="space-y-2 sm:space-y-2.5 text-sm">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-2">
              <span className="text-ash truncate">{item.name} &times;{item.quantity}</span>
              <span className="text-ivory-muted shrink-0">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="sep-gold my-3 sm:my-4" />
        <div className="flex justify-between">
          <span className="font-display text-base sm:text-lg text-ivory">Итого</span>
          <span className="font-display text-lg sm:text-xl text-gold">{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-ash hover:text-gold text-[12px] uppercase tracking-[0.15em] transition-colors min-h-[44px] inline-flex items-center">
          &larr; На главную
        </Link>
      </div>
    </div>
  );
}
