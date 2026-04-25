import type { APIContext } from "astro";
import { getSitemapChunks, toXml, wrapXml } from "@/lib/sitemap";

function getPage(value: string | undefined, max: number) {
  const n = Number(value);

  if (!Number.isInteger(n) || n < 1) return 1;
  if (n > max) return -1;

  return n;
}

export async function getStaticPaths() {
  const chunks = await getSitemapChunks();

  return chunks.map((_, i) => ({
    params: { page: String(i + 1) },
  }));
}

export async function GET({ params }: APIContext) {
  const chunks = await getSitemapChunks();
  const maxPage = chunks.length;

  const page = getPage(params.page, maxPage);

  if (page === -1) {
    return new Response("Not Found", { status: 404 });
  }

  const items = chunks[page - 1] ?? [];

  return new Response(wrapXml(items.map(toXml).join("")), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
