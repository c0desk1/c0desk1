import { getCollection } from "astro:content";
import { wrapXml, toImageXml } from "@/lib/sitemap";

export async function GET() {
  const posts = await getCollection("blog", (p) => !p.data.draft);

  const items = posts
    .filter((p) => p.data.image)
    .map((p) => ({
      url: `/blog/${p.id}/`,
      images: [p.data.image!],
    }));

  const body = items.map(toImageXml).join("");

  return new Response(
    wrapXml(
      body,
      'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'
    ),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
}