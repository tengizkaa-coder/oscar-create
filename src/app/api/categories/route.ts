import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.slug,
      sortOrder: body.sortOrder || 0,
    },
  });
  return NextResponse.json(category);
}
