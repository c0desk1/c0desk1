// src/pages/feed.atom.ts
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { 
  SITE, 
  AUTHOR, 
  CATEGORIES,
  ROUTES,
  PAGINATION 
} from "@/consts";
import { slugify } from "@/lib/utils";

export const GET: APIRoute = async (context) => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const sorted = posts
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, PAGINATION.postsPerFeed);

  const entries: string[] = [];

  for (const post of sorted) {
    const slug = post.data.slug || slugify(post.data.title);
    const url = new URL(`${ROUTES.blog}/${slug}`, SITE.url).href;

    let authorXml = `<name><![CDATA[${AUTHOR.name}]]></name><email>${SITE.email}</email>`;
    if (post.data.author) {
      try {
        const authorEntry = await getEntry(post.data.author);
        if (authorEntry?.data?.name) {
          const authorEmail = authorEntry.data.mail || SITE.email;
          authorXml = `<name><![CDATA[${authorEntry.data.name}]]></name><email>${authorEmail}</email>`;
        }
      } catch {}
    }

    const updatedDate = post.data.pubDate.toISOString();

    const imageSrc = post.data.heroImage?.src || post.data.seo?.ogImage || SITE.ogImage;
    const coverLink = imageSrc
      ? `<link rel="enclosure" type="image/jpeg" href="${new URL(imageSrc, SITE.url).href}" />`
      : "";

    const categorySlug = post.data.category || "uncategorized";
    const matchedCategory = CATEGORIES.find(c => c.slug === categorySlug);
    const categoryName = matchedCategory ? matchedCategory.label : categorySlug;

    const filteredTags = post.data.tags
      ?.map((t: string) => t.trim())
      .filter(
        (t: string) => 
          t.toLowerCase() !== categorySlug.toLowerCase() && 
          t !== ""
      ) || [];

    const entryXml = `
  <entry>
    <title type="text"><![CDATA[${post.data.title}]]></title>
    <link rel="alternate" type="text/html" href="${url}" />
    <id>${url}</id>
    <published>${updatedDate}</published>
    <updated>${updatedDate}</updated>
    <author>
      ${authorXml}
    </author>
    <category term="${categorySlug}" label="${categoryName}" />
    ${filteredTags.map((t: string) => {
        const term = t.toLowerCase().replace(/\s+/g, '-');
        return `    <category term="${term}" label="${t}" />`;
      }).join("\n")}
    <summary type="html"><![CDATA[${post.data.description || ""}]]></summary>
    ${coverLink}
  </entry>`;

    entries.push(entryXml);
  }
  
  const selfUrl = new URL(context.request.url).href;

  const atomXml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title type="text">${SITE.name}</title>
  <subtitle type="text">${SITE.description}</subtitle>
  <id>${SITE.url}/</id>
  <link rel="alternate" type="text/html" hreflang="${SITE.lang}" href="${SITE.url}" />
  <link rel="self" type="application/atom+xml" href="${selfUrl}" />
  <rights>© ${new Date().getFullYear()} ${SITE.name}</rights>
  <updated>${new Date().toISOString()}</updated>
${entries.join("\n")}
</feed>`;

  return new Response(atomXml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
};
