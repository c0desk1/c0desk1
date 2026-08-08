// src/lib/mdx/satteri-badge.ts
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
  if (props.variant) attrs.variant = props.variant;
  if (props.icon) attrs.icon = props.icon;
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriBadge = defineMdastPlugin({
  name: 'satteri-badge',

  textDirective(node, ctx) {
    if (node.name !== 'badge') return;

    const label = getLabel(node);
    if (!label) return;

    const attrs = getAttributes(node);
    const variant = attrs.variant || 'default';
    const variantClass = `badge-${variant}`;
    const extraClass = attrs.class || '';

    const children: any[] = [];

    if (attrs.icon) {
      children.push({
        type: 'containerDirective',
        data: {
          hName: 'span',
          hProperties: {
            className: ['badge-icon'],
            'data-icon': attrs.icon,
          },
        },
        children: [],
      });
    }

    children.push({
      type: 'text',
      value: label,
    });

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'span',
      hProperties: {
        className: ['badge', variantClass, extraClass].filter(Boolean).join(' '),
      },
    });

    ctx.setProperty(node, 'children', children);
  },
});
