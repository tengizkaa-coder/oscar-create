import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendTelegramMessage, formatOrderMessage, getStatusKeyboard } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, address, comment, deliveryTime, items } = body;

    if (!customerName || !phone || !address || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const count = await prisma.order.count();
    const number = String(count + 1).padStart(4, "0");

    const totalPrice = items.reduce(
      (sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity,
      0
    );

    // Validate foreign keys — only link if product/set actually exists
    const orderItems = await Promise.all(
      items.map(async (i: { id: string; type: string; name: string; price: number; quantity: number }) => {
        const numericId = parseInt(i.id.split("-")[1]);
        let productId: number | null = null;
        let setId: number | null = null;

        if (i.type === "product" && numericId) {
          const exists = await prisma.product.findUnique({ where: { id: numericId } });
          if (exists) productId = numericId;
        } else if (i.type === "set" && numericId) {
          const exists = await prisma.productSet.findUnique({ where: { id: numericId } });
          if (exists) setId = numericId;
        }

        return {
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          productId,
          setId,
        };
      })
    );

    const order = await prisma.order.create({
      data: {
        number,
        customerName,
        phone,
        address,
        comment: comment || "",
        deliveryTime: deliveryTime || "asap",
        totalPrice,
        items: { create: orderItems },
      },
      include: { items: true },
    });

    // Send to Telegram
    const message = formatOrderMessage(order);
    const keyboard = getStatusKeyboard(order.id);
    const tgResult = await sendTelegramMessage({
      text: message,
      reply_markup: keyboard,
    });

    if (tgResult?.result?.message_id) {
      await prisma.order.update({
        where: { id: order.id },
        data: { telegramMsgId: tgResult.result.message_id },
      });
    }

    return NextResponse.json({ id: order.id, number: order.number });
  } catch (err) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  return NextResponse.json(orders);
}
