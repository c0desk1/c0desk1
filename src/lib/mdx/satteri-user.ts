// src/lib/mdx/satteri-user.ts
import { defineMdastPlugin } from 'satteri';

function getLabel(node: any): string {
  const labelNode = node.children?.[0];
  if (labelNode?.type === 'text') {
    return labelNode.value.trim();
  }
  return '';
}

function getAttributes(node: any): Record<string, string> {
  const props = node.attributes || {};
  const attrs: Record<string, string> = {};
  if (props.avatar) attrs.avatar = props.avatar;
  if (props.role) attrs.role = props.role;
  if (props.url) attrs.url = props.url;
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriUser = defineMdastPlugin({
  name: 'satteri-user',

  textDirective(node, ctx) {
    if (node.name !== 'user') return;

    const label = getLabel(node);
    if (!label) return;

    const attrs = getAttributes(node);

    const children: any[] = [];

    if (attrs.avatar) {
      children.push({
        type: 'image',
        url: attrs.avatar,
        alt: label,
        data: {
          hProperties: {
            className: ['user-avatar'],
            loading: 'lazy',
            width: 24,
            height: 24,
          },
        },
      });
    }

    children.push({
      type: 'text',
      value: label,
    });

    if (attrs.role) {
      children.push({
        type: 'text',
        value: ` · ${attrs.role}`,
      });
    }

    if (!attrs.url) {
      ctx.setProperty(node, 'data', {
        ...(node.data || {}),
        hName: 'span',
        hProperties: {
          className: ['user', attrs.class || ''].filter(Boolean).join(' '),
        },
      });
      ctx.setProperty(node, 'children', children);
      return;
    }

    const isExternal = attrs.url.startsWith('http');
    const rel = isExternal ? 'noopener noreferrer nofollow' : undefined;
    const target = isExternal ? '_blank' : '_self';

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'a',
      hProperties: {
        href: attrs.url,
        className: ['user-link', attrs.class || ''].filter(Boolean).join(' '),
        target: target,
        rel: rel,
      },
    });
    ctx.setProperty(node, 'children', children);
  },
});
