// DEPRECATED: Используйте polling-бот вместо webhook (npm run bot)
// Этот файл оставлен для обратной совместимости.

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { editTelegramMessage, formatOrderMessage, getStatusKeyboard } from "@/lib/telegram";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Handle callback queries (inline button presses)
  if (body.callback_query) {
    const { data, id: callbackId } = body.callback_query;

    // Parse callback data: "status:orderId:newStatus"
    const parts = data?.split(":");
    if (parts?.[0] === "status" && parts.length === 3) {
      const orderId = parseInt(parts[1]);
      const newStatus = parts[2];

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
        include: { items: true },
      });

      // Update the message
      if (order.telegramMsgId) {
        const message = formatOrderMessage(order);
        const keyboard = newStatus === "delivered" || newStatus === "cancelled"
          ? undefined
          : getStatusKeyboard(order.id);
        await editTelegramMessage(order.telegramMsgId, message, keyboard);
      }

      // Answer callback query
      if (BOT_TOKEN) {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callbackId,
            text: `Статус заказа #${order.number} обновлен`,
          }),
        });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
