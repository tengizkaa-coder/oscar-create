/**
 * Telegram Bot — Long Polling
 *
 * Запуск: npm run bot
 *
 * Обрабатывает inline-кнопки для смены статусов заказов.
 * Использует getUpdates вместо webhook.
 */

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

if (!BOT_TOKEN) {
  console.error("TELEGRAM_BOT_TOKEN is not set in .env");
  process.exit(1);
}

// === Telegram API helpers ===

async function apiCall(method: string, body?: object) {
  const res = await fetch(`${API}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

async function editMessageText(messageId: number, text: string, reply_markup?: object) {
  return apiCall("editMessageText", {
    chat_id: CHAT_ID,
    message_id: messageId,
    text,
    parse_mode: "HTML",
    reply_markup,
  });
}

async function answerCallbackQuery(callbackQueryId: string, text: string) {
  return apiCall("answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
  });
}

// === Order formatting (same as src/lib/telegram.ts) ===

const STATUS_EMOJI: Record<string, string> = {
  new: "🆕",
  confirmed: "✅",
  assembling: "📦",
  delivering: "🚗",
  delivered: "🏠",
  cancelled: "❌",
};

const STATUS_LABEL: Record<string, string> = {
  new: "Новый",
  confirmed: "Подтвержден",
  assembling: "Собирается",
  delivering: "В доставке",
  delivered: "Доставлен",
  cancelled: "Отменен",
};

const DELIVERY_LABELS: Record<string, string> = {
  asap: "как можно скорее",
  "30min": "через 30 минут",
  "1hour": "через 1 час",
  "2hour": "через 2 часа",
  evening: "вечером (18:00-22:00)",
};

type OrderWithItems = {
  id: number;
  number: string;
  customerName: string;
  phone: string;
  address: string;
  comment: string;
  deliveryTime: string;
  totalPrice: number;
  status: string;
  telegramMsgId: number | null;
  items: { name: string; quantity: number; price: number }[];
};

function formatOrderMessage(order: OrderWithItems): string {
  const itemsText = order.items
    .map((i) => `  • ${i.name} x${i.quantity} — ${fmt(i.price * i.quantity)} ₽`)
    .join("\n");

  return `${STATUS_EMOJI[order.status] || "📋"} <b>Заказ #${order.number}</b> — ${STATUS_LABEL[order.status] || order.status}

👤 ${order.customerName}
📱 ${order.phone}
📍 ${order.address}
🕐 Доставка: ${DELIVERY_LABELS[order.deliveryTime] || order.deliveryTime}
${order.comment ? `💬 ${order.comment}\n` : ""}
📦 <b>Состав:</b>
${itemsText}

💰 <b>Итого: ${fmt(order.totalPrice)} ₽</b>`;
}

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

function getStatusKeyboard(orderId: number) {
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
      [{ text: "❌ Отменить", callback_data: `status:${orderId}:cancelled` }],
    ],
  };
}

// === Callback handler ===

async function handleCallbackQuery(callbackQuery: {
  id: string;
  data?: string;
}) {
  const { data, id: callbackId } = callbackQuery;
  if (!data) return;

  const parts = data.split(":");
  if (parts[0] !== "status" || parts.length !== 3) return;

  const orderId = parseInt(parts[1]);
  const newStatus = parts[2];

  console.log(`[${new Date().toLocaleTimeString()}] Статус заказа ${orderId} → ${STATUS_LABEL[newStatus]}`);

  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: newStatus },
    include: { items: true },
  });

  // Update the Telegram message
  if (order.telegramMsgId) {
    const message = formatOrderMessage(order);
    const keyboard =
      newStatus === "delivered" || newStatus === "cancelled"
        ? undefined
        : getStatusKeyboard(order.id);
    await editMessageText(order.telegramMsgId, message, keyboard);
  }

  await answerCallbackQuery(callbackId, `Статус заказа #${order.number} обновлён: ${STATUS_LABEL[newStatus]}`);
}

// === Polling loop ===

async function poll() {
  let offset = 0;

  console.log("🤖 AlkoMarket Telegram Bot запущен (polling)");
  console.log(`   Token: ${BOT_TOKEN?.slice(0, 10)}...`);
  console.log(`   Chat ID: ${CHAT_ID}`);
  console.log("   Ожидание обновлений...\n");

  // Delete webhook if it was previously set
  await apiCall("deleteWebhook");

  while (true) {
    try {
      const result = await apiCall("getUpdates", {
        offset,
        timeout: 30,
        allowed_updates: ["callback_query"],
      });

      if (result.ok && result.result?.length > 0) {
        for (const update of result.result) {
          offset = update.update_id + 1;

          if (update.callback_query) {
            await handleCallbackQuery(update.callback_query);
          }
        }
      }
    } catch (err) {
      console.error("[ERROR] Polling failed:", err);
      // Wait before retry
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Бот остановлен");
  await prisma.$disconnect();
  process.exit(0);
});

poll();
