import { NextRequest } from "next/server";

const REST = "https://en.wikipedia.org/api/rest_v1/page/html/";
const UA = "Rabbithole/0.1 (daily Wikipedia navigation game; alex11bouchard@gmail.com)";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title")?.trim();
  if (!title || title.length > 300) {
    return new Response("Bad title", { status: 400 });
  }
  const upstream = await fetch(REST + encodeURIComponent(title.replace(/ /g, "_")), {
    headers: { Accept: "text/html", "User-Agent": UA },
    redirect: "follow",
  });
  if (!upstream.ok) {
    return new Response(`Wikipedia returned ${upstream.status}`, { status: upstream.status });
  }
  const html = await upstream.text();
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // One Wikipedia fetch per article per day across ALL players (Vercel edge cache)
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
