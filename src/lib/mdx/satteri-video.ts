// src/lib/mdx/satteri-video.ts
import { defineMdastPlugin } from 'satteri';

function getUrl(node: any): string {
  const child = node.children?.[0];
  if (!child) return '';
  if (child.type === 'text') return child.value.trim();
  if (child.type === 'link') return child.url || '';
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
  if (props.autoplay !== undefined) attrs.autoplay = 'true';
  if (props.loop !== undefined) attrs.loop = 'true';
  if (props.muted !== undefined) attrs.muted = 'true';
  if (props.controls !== undefined) attrs.controls = 'true';
  if (props.poster) attrs.poster = props.poster;
  if (props.preload) attrs.preload = props.preload;
  return attrs;
}

function getEmbedUrl(url: string): string | null {
  const shortsMatch = url.match(/(?:youtube\.com\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;

  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return null;
}

function isLocalVideo(url: string): boolean {
  const ext = url.split('.').pop()?.toLowerCase() || '';
  return ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(ext);
}

function buildIframe(embedUrl: string, attrs: Record<string, string>): string {
  const width = attrs.width || '100%';
  const height = attrs.height || '400';
  const title = attrs.title || 'Video embed';

  let allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  if (attrs.autoplay === 'true') allow += '; autoplay';
  if (attrs.loop === 'true') allow += '; loop';
  if (attrs.muted === 'true') allow += '; muted';

  return `<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="${embedUrl}" width="${width}" height="${height}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allow="${allow}" ${attrs.autoplay === 'true' ? 'autoplay' : ''} ${attrs.loop === 'true' ? 'loop' : ''} ${attrs.muted === 'true' ? 'muted' : ''} allowfullscreen loading="lazy" title="${title}"></iframe>
</div>`;
}

function buildVideo(url: string, attrs: Record<string, string>): string {
  const width = attrs.width || '100%';
  const height = attrs.height || '400';
  const poster = attrs.poster ? `poster="${attrs.poster}"` : '';
  const controls = attrs.controls === 'true' ? 'controls' : '';
  const autoplay = attrs.autoplay === 'true' ? 'autoplay' : '';
  const loop = attrs.loop === 'true' ? 'loop' : '';
  const muted = attrs.muted === 'true' ? 'muted' : '';
  const preload = attrs.preload || 'metadata';

  return `<video width="${width}" height="${height}" ${controls} ${autoplay} ${loop} ${muted} preload="${preload}" ${poster} style="width: 100%; border-radius: var(--radius-md);">
  <source src="${url}" />
  <p>Browser tidak mendukung video.</p>
</video>`;
}

export const satteriVideo = defineMdastPlugin({
  name: 'satteri-video',

  textDirective(node, ctx) {
    if (node.name !== 'video') return;
    this._renderVideo(node, ctx);
  },
  leafDirective(node, ctx) {
    if (node.name !== 'video') return;
    this._renderVideo(node, ctx);
  },
  containerDirective(node, ctx) {
    if (node.name !== 'video') return;
    this._renderVideo(node, ctx);
  },

  _renderVideo(node: any, ctx: any) {
    const url = getUrl(node);
    if (!url) {
      console.warn('⚠️ Video URL kosong:', node);
      return;
    }

    const attrs = getAttributes(node);

    const embedUrl = getEmbedUrl(url);
    if (embedUrl) {
      const html = buildIframe(embedUrl, attrs);
      ctx.replaceNode(node, { type: 'html', value: html });
      return;
    }

    if (isLocalVideo(url)) {
      const html = buildVideo(url, attrs);
      ctx.replaceNode(node, { type: 'html', value: html });
      return;
    }

    const html = `<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe src="${url}" width="100%" height="400" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen loading="lazy" title="Video"></iframe>
</div>`;
    ctx.replaceNode(node, { type: 'html', value: html });
  },
});
