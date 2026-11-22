// IndexNow API client
// Notifies Bing, Yandex, Seznam, Naver about URL changes for fast indexing
// https://www.indexnow.org/

const INDEXNOW_KEY = "99f8bb47527c2078dda2cbd266c95b24";
const HOST = "xn--80aaf5ajejew9h7ac.xn--p1ai";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

// Endpoints: Yandex, Bing (api.indexnow.org forwards to all)
const ENDPOINTS = [
  "https://api.indexnow.org/IndexNow",
  "https://yandex.com/indexnow",
];

export type IndexNowResult = {
  endpoint: string;
  status: number;
  ok: boolean;
  message?: string;
};

/**
 * Push a single URL or multiple URLs to IndexNow.
 * Returns results from all endpoints. Failures are non-fatal.
 */
export async function pushToIndexNow(urls: string | string[]): Promise<IndexNowResult[]> {
  const urlList = Array.isArray(urls) ? urls : [urls];

  // IndexNow requires URLs to be on same host as key
  const validUrls = urlList.filter((u) => {
    try {
      const parsed = new URL(u);
      return parsed.host === HOST || parsed.host === "пьянаямосква.рф";
    } catch {
      return false;
    }
  });

  if (validUrls.length === 0) return [];

  const body =
    validUrls.length === 1
      ? null // GET request for single URL
      : {
          host: HOST,
          key: INDEXNOW_KEY,
          keyLocation: KEY_LOCATION,
          urlList: validUrls,
        };

  const results: IndexNowResult[] = [];

  for (const endpoint of ENDPOINTS) {
    try {
      let res: Response;
      if (validUrls.length === 1) {
        // Single URL — use GET
        const url = `${endpoint}?url=${encodeURIComponent(validUrls[0])}&key=${INDEXNOW_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`;
        res = await fetch(url, { method: "GET" });
      } else {
        // Batch — use POST
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
        });
      }

      results.push({
        endpoint,
        status: res.status,
        ok: res.ok || res.status === 202, // 200/202 = success
        message: res.ok ? undefined : await res.text().catch(() => undefined),
      });
    } catch (err) {
      results.push({
        endpoint,
        status: 0,
        ok: false,
        message: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}

/**
 * Helper: push a product URL (by slug).
 * Call this after creating/updating a product.
 */
export async function notifyProductChange(slug: string): Promise<IndexNowResult[]> {
  return pushToIndexNow([
    `https://${HOST}/product/${slug}`,
    `https://${HOST}/`,
    `https://${HOST}/catalog`,
  ]);
}

/**
 * Helper: push a category URL (by slug).
 */
export async function notifyCategoryChange(slug: string): Promise<IndexNowResult[]> {
  return pushToIndexNow([
    `https://${HOST}/catalog/${slug}`,
    `https://${HOST}/catalog`,
  ]);
}
