// src/lib/mdx/satteri-video.ts
import { defineMdastPlugin } from 'satteri';

function getUrl(node: any): string {
  const child = node.children?.[0];
  if (!child) return '';

  if (child.type === 'text') {
    return child.value.trim();
  }

  if (child.type === 'link') {
    return child.url || '';
  }

  if (child.type === 'paragraph') {
    const linkNode = child.children.find((c: any) => c.type === 'link');
    if (linkNode) return linkNode.url || '';
    const textNode = child.children.find((c: any) => c.type === 'text');
    if (textNode) return textNode.value.trim();
  }

  return '';
}

function getAttributes(node: any): Record<string, string> {
  const props = node.attributes || {};
  const attrs: Record<string, string> = {};
  if (props.width) attrs.width = props.width;
  if (props.height) attrs.height = props.height;
  if (props.title) attrs.title = props.title;
  return attrs;
}

function getEmbedUrl(url: string): string {
    const shortsMatch = url.match(
    /(?:youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (shortsMatch) {
        return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
    }

    const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
        return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
}

export const satteriVideo = defineMdastPlugin({
  name: 'satteri-video',

  leafDirective(node, ctx) {
    if (node.name !== 'video') return;

    const url = getUrl(node);
    if (!url) return;

    const attrs = getAttributes(node);
    const embedUrl = getEmbedUrl(url);

    const width = attrs.width || '100%';
    const height = attrs.height || '400';
    const title = attrs.title || 'Video embed';

    const html = `<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="${embedUrl}" width="${width}" height="${height}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" title="${title}"></iframe>
</div>`;

    ctx.replaceNode(node, {
      type: 'html',
      value: html,
    });
  },
});
