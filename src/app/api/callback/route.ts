import { NextRequest, NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram";

type CallbackItem = { name: string; quantity: number };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, items } = body as { phone?: string; items?: CallbackItem[] };

    if (!phone || phone.trim().length < 5) {
      return NextResponse.json({ error: "Не указан телефон" }, { status: 400 });
    }

    const itemsList = Array.isArray(items) && items.length > 0
      ? items
          .filter((i) => i && i.name)
          .map((i) => `  • ${i.name} ×${i.quantity || 1}`)
          .join("\n")
      : "  (корзина пуста)";

    const text = `☎️ <b>Запрос на обратный звонок</b>

📱 <b>Телефон клиента:</b> ${phone}

🛒 <b>В корзине:</b>
${itemsList}

⏱ ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`;

    await sendTelegramMessage({ text });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Callback error:", err);
    return NextResponse.json({ error: "Не удалось отправить заявку" }, { status: 500 });
  }
}
