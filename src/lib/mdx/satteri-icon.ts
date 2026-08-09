// src/lib/mdx/satteri-icon.ts
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
  if (props.size) attrs.size = props.size;
  if (props.class) attrs.class = props.class;
  return attrs;
}

export const satteriIcon = defineMdastPlugin({
  name: 'satteri-icon',

  // ===== TEXT DIRECTIVE: :icon (inline) =====
  textDirective(node, ctx) {
    if (node.name !== 'icon') return;
    this._renderIcon(node, ctx);
  },

  // ===== LEAF DIRECTIVE: ::icon (block) =====
  leafDirective(node, ctx) {
    if (node.name !== 'icon') return;
    this._renderIcon(node, ctx);
  },

  _renderIcon(node: any, ctx: any) {
    const label = getLabel(node);
    if (!label) return;

    const attrs = getAttributes(node);
    const size = attrs.size || 'md';
    const extraClass = attrs.class || '';

    ctx.setProperty(node, 'data', {
      ...(node.data || {}),
      hName: 'span',
      hProperties: {
        className: ['icon', `icon-${size}`, extraClass].filter(Boolean).join(' '),
        'data-icon': label,
        'aria-hidden': 'true',
      },
    });

    ctx.setProperty(node, 'children', []);
  },
});