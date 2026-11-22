import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корзина — оформление заказа",
  description: "Ваша корзина. Оставьте заявку — мы перезвоним и оформим доставку алкоголя по Москве за 20 минут.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
