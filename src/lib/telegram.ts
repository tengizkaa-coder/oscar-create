const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

type SendMessageOptions = {
  text: string;
  reply_markup?: object;
};

export async function sendTelegramMessage(options: SendMessageOptions) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram not configured, skipping notification");
    return null;
  }

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: options.text,
        parse_mode: "HTML",
        reply_markup: options.reply_markup,
      }),
    }
  );

  return res.json();
}

export async function editTelegramMessage(messageId: number, text: string, reply_markup?: object) {
  if (!BOT_TOKEN || !CHAT_ID) return null;

  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        message_id: messageId,
        text,
        parse_mode: "HTML",
        reply_markup,
      }),
    }
  );

  return res.json();
}

const DELIVERY_TIME_LABELS: Record<string, string> = {
  asap: "как можно скорее",
  "30min": "через 30 минут",
  "1hour": "через 1 час",
  "2hour": "через 2 часа",
  evening: "вечером (18:00-22:00)",
};

type OrderForTelegram = {
  id: number;
  number: string;
  customerName: string;
  phone: string;
  address: string;
  comment: string;
  deliveryTime: string;
  totalPrice: number;
  status: string;
  items: { name: string; quantity: number; price: number }[];
};

export function formatOrderMessage(order: OrderForTelegram): string {
  const statusEmoji: Record<string, string> = {
    new: "🆕",
    confirmed: "✅",
    assembling: "📦",
    delivering: "🚗",
    delivered: "🏠",
    cancelled: "❌",
  };

  const statusLabel: Record<string, string> = {
    new: "Новый",
    confirmed: "Подтвержден",
    assembling: "Собирается",
    delivering: "В доставке",
    delivered: "Доставлен",
    cancelled: "Отменен",
  };

  const itemsText = order.items
    .map((i) => `  • ${i.name} x${i.quantity} — ${new Intl.NumberFormat("ru-RU").format(i.price * i.quantity)} ₽`)
    .join("\n");

  const deliveryLabel = DELIVERY_TIME_LABELS[order.deliveryTime] || order.deliveryTime;

  return `${statusEmoji[order.status] || "📋"} <b>Заказ #${order.number}</b> — ${statusLabel[order.status] || order.status}

👤 ${order.customerName}
📱 ${order.phone}
📍 ${order.address}
🕐 Доставка: ${deliveryLabel}
${order.comment ? `💬 ${order.comment}\n` : ""}
📦 <b>Состав:</b>
${itemsText}

💰 <b>Итого: ${new Intl.NumberFormat("ru-RU").format(order.totalPrice)} ₽</b>`;
}

export function getStatusKeyboard(orderId: number) {
  return {
    inline_keyboard: [
      [
        { text: "✅ Подтвердить", callback_data: `status:${orderId}:confirmed` },
        { text: "📦 Собирать", callback_data: `status:${orderId}:assembling` },
      ],
      [
        { text: "🚗 В доставке", callback_data: `status:${orderId}:delivering` },
        { text: "🏠 Доставлен", callback_data: `status:${orderId}:delivered` },
      ],
      [
        { text: "❌ Отменить", callback_data: `status:${orderId}:cancelled` },
      ],
    ],
  };
}
