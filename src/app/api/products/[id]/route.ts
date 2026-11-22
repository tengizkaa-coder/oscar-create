import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyProductChange, pushToIndexNow } from "@/lib/indexnow";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: { category: true },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: parseFloat(body.price),
      image: body.image,
      categoryId: parseInt(body.categoryId),
      volume: body.volume,
      abv: body.abv,
      inStock: body.inStock,
    },
  });
  // Notify search engines via IndexNow (non-blocking)
  notifyProductChange(product.slug).catch(() => {});
  return NextResponse.json(product);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
  await prisma.product.delete({ where: { id: parseInt(id) } });
  // Ping homepage and catalog to refresh indexes (non-blocking)
  if (product) {
    pushToIndexNow([
      `https://xn--80aaf5ajejew9h7ac.xn--p1ai/`,
      `https://xn--80aaf5ajejew9h7ac.xn--p1ai/catalog`,
    ]).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
