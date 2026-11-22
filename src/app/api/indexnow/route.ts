import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { pushToIndexNow } from "@/lib/indexnow";

const HOST = "https://xn--80aaf5ajejew9h7ac.xn--p1ai";

/**
 * POST /api/indexnow
 *
 * Body options:
 *   { all: true }                       -> push entire site (homepage + catalog + all products + all categories + all sets)
 *   { urls: ["/some/path", ...] }       -> push specific paths (absolute or relative to HOST)
 *
 * Returns: { pushed: number, results: [...] }
 *
 * Protected by middleware basic auth (admin only — same gate as /mgmt-x7k9f2).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  let urls: string[] = [];

  if (body.all === true) {
    // Build full site URL list from DB
    const [products, categories, sets] = await Promise.all([
      prisma.product.findMany({ select: { slug: true }, where: { inStock: true } }),
      prisma.category.findMany({ select: { slug: true } }),
      prisma.productSet.findMany({ select: { slug: true } }),
    ]);

    urls = [
      `${HOST}/`,
      `${HOST}/catalog`,
      `${HOST}/sets`,
      ...categories.map((c) => `${HOST}/catalog/${c.slug}`),
      ...products.map((p) => `${HOST}/product/${p.slug}`),
      ...sets.map((s) => `${HOST}/set/${s.slug}`),
    ];
  } else if (Array.isArray(body.urls)) {
    urls = body.urls.map((u: string) =>
      u.startsWith("http") ? u : `${HOST}${u.startsWith("/") ? u : "/" + u}`
    );
  } else {
    return NextResponse.json(
      { error: "Send { all: true } or { urls: [...] }" },
      { status: 400 }
    );
  }

  if (urls.length === 0) {
    return NextResponse.json({ pushed: 0, results: [] });
  }

  // IndexNow accepts up to 10 000 URLs per request — chunk just in case
  const CHUNK = 10000;
  const allResults = [];
  for (let i = 0; i < urls.length; i += CHUNK) {
    const chunk = urls.slice(i, i + CHUNK);
    const results = await pushToIndexNow(chunk);
    allResults.push(...results);
  }

  return NextResponse.json({
    pushed: urls.length,
    sample: urls.slice(0, 5),
    results: allResults,
  });
}

export async function GET() {
  return NextResponse.json({
    info: "Send POST with { all: true } to push the whole site, or { urls: [...] } for specific URLs.",
    key_file: `${HOST}/99f8bb47527c2078dda2cbd266c95b24.txt`,
  });
}
