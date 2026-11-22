import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";

export async function GET() {
  const sets = await prisma.productSet.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json(sets);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.price) {
      return NextResponse.json({ error: "Название и цена обязательны" }, { status: 400 });
    }

    const slug = body.slug || slugify(body.name);

    // Check slug uniqueness
    const existing = await prisma.productSet.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: "Сет с таким slug уже существует" }, { status: 400 });
    }

    // Validate items - check that productId references exist
    const items = body.items || [];
    const validItems = await Promise.all(
      items.map(async (item: { productId?: number | null; customName?: string | null; quantity?: number }) => {
        let productId: number | null = null;
        if (item.productId) {
          const exists = await prisma.product.findUnique({ where: { id: item.productId } });
          if (exists) productId = item.productId;
        }
        return {
          productId,
          customName: item.customName || null,
          quantity: item.quantity || 1,
        };
      })
    );

    const set = await prisma.productSet.create({
      data: {
        name: body.name,
        slug,
        description: body.description || "",
        price: parseFloat(body.price),
        image: body.image || "",
        inStock: body.inStock !== false,
        items: { create: validItems },
      },
      include: { items: { include: { product: true } } },
    });

    return NextResponse.json(set);
  } catch (err) {
    console.error("Set creation error:", err);
    return NextResponse.json({ error: "Ошибка создания сета" }, { status: 500 });
  }
}
