import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { editTelegramMessage, formatOrderMessage, getStatusKeyboard } from "@/lib/telegram";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { status } = body;

  const order = await prisma.order.update({
    where: { id: parseInt(id) },
    data: { status },
    include: { items: true },
  });

  // Update Telegram message
  if (order.telegramMsgId) {
    const message = formatOrderMessage(order);
    const keyboard = status === "delivered" || status === "cancelled"
      ? undefined
      : getStatusKeyboard(order.id);
    await editTelegramMessage(order.telegramMsgId, message, keyboard);
  }

  return NextResponse.json(order);
}
