import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyProductChange } from "@/lib/indexnow";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description || "",
      price: parseFloat(body.price),
      image: body.image || "",
      categoryId: parseInt(body.categoryId),
      volume: body.volume || "",
      abv: body.abv || "",
      inStock: body.inStock !== false,
    },
  });
  // Notify search engines via IndexNow (non-blocking)
  notifyProductChange(product.slug).catch(() => {});
  return NextResponse.json(product);
}
