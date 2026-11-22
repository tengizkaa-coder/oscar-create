export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU").format(price) + " \u20BD";
}

export const ORDER_STATUSES: Record<string, { label: string; color: string }> = {
  new: { label: "Новый", color: "bg-blue-900/30 text-blue-300" },
  confirmed: { label: "Подтвержден", color: "bg-indigo-900/30 text-indigo-300" },
  assembling: { label: "Собирается", color: "bg-yellow-900/30 text-yellow-300" },
  delivering: { label: "В доставке", color: "bg-orange-900/30 text-orange-300" },
  delivered: { label: "Доставлен", color: "bg-green-900/30 text-green-300" },
  cancelled: { label: "Отменен", color: "bg-red-900/30 text-red-300" },
};
